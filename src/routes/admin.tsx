import SlideManager from "@/components/account/SlideManager";
import CategoryManager from "@/components/account/CategoryManager";
import ImageUpload from "@/components/account/ImageUpload";
import { useCategories } from "@/lib/categories";
import { prepareCatalogImport } from "@/lib/catalogSeed";
import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api, message } from "@/lib/api";
import { useCatalog, type StoreProduct } from "@/lib/catalog";
import { PRODUCTS } from "@/data/products";
import { money, type Order } from "@/lib/orders";
import RequireAccount from "@/components/account/RequireAccount";
import OrderList from "@/components/account/OrderList";
import {
  Panel,
  Field,
  ErrorNotice,
  buttonClass,
  fieldClass,
} from "@/components/account/StoreForms";
export const Route = createFileRoute("/admin")({
  component: () => (
    <RequireAccount admin next="/admin">
      <Admin />
    </RequireAccount>
  ),
});
const blank = (): StoreProduct => ({
  id: "",
  name: "",
  categoryId: 103,
  image: "",
  images: [],
  tagline: "",
  price: 0,
  weight: "250g",
  variants: [],
  description: "",
  benefits: [],
  nutrition: { servingSize: "100g", items: [] },
  storage: [],
  delivery: [],
  rating: 0,
  reviews: 0,
  stockQuantity: 0,
  isActive: false,
});
function Admin() {
  const cache = useQueryClient();
  const catalog = useCatalog(true);
  const { categories: CATEGORIES } = useCategories();
  const orders = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => api<Order[]>("/admin/orders"),
  });
  const [tab, setTab] = useState<"products" | "categories" | "slides" | "orders">("products");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState<StoreProduct | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  async function refresh() {
    await Promise.all([
      cache.invalidateQueries({ queryKey: ["products"] }),
      cache.invalidateQueries({ queryKey: ["admin-products"] }),
      cache.invalidateQueries({ queryKey: ["admin-orders"] }),
    ]);
  }
  async function run(action: () => Promise<unknown>, success: string) {
    setError("");
    setNotice("");
    setBusy(true);
    try {
      await action();
      await refresh();
      setNotice(success);
    } catch (e) {
      setError(message(e));
    } finally {
      setBusy(false);
    }
  }
  const filtered = catalog.products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <Panel title="Store dashboard" subtitle="Manage your catalog and customer orders.">
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          ["Products", catalog.products.length],
          ["Low stock (≤10 packs)", catalog.products.filter((p) => p.stockQuantity <= 10).length],
          ["Orders received", orders.data?.length ?? 0],
        ].map(([title, value]) => (
          <div key={title} className="rounded-2xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>
      <div className="mb-5 flex flex-wrap gap-2 border-b pb-3 sm:gap-5">
        {(["products", "categories", "slides", "orders"] as const).map((t) => (
          <button
            key={t}
            className={tab === t ? "font-bold text-primary" : "text-muted-foreground"}
            onClick={() => setTab(t)}
          >
            {t === "products"
              ? "Products"
              : t === "categories"
                ? "Categories"
                : t === "slides"
                  ? "Slides"
                  : "Orders"}
          </button>
        ))}
      </div>
      <ErrorNotice text={error || (catalog.error ? message(catalog.error) : "")} />
      {notice && (
        <p role="status" className="my-4 rounded-xl bg-primary/10 p-3 text-primary">
          {notice}
        </p>
      )}
      {tab === "products" ? (
        <>
          <div className="my-5 flex flex-wrap gap-3">
            <input
              aria-label="Search catalog"
              placeholder="Search products…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={fieldClass + " max-w-sm"}
            />
            <button
              disabled={busy}
              className={buttonClass}
              onClick={() => {
                setDraft({ ...blank(), categoryId: CATEGORIES[0]?.id ?? 103 });
                setIsNew(true);
              }}
            >
              + Add product
            </button>
            {!catalog.isPending && !catalog.error && !catalog.products.length && (
              <button
                disabled={busy}
                className="rounded-xl border px-4 py-2 text-sm"
                onClick={() =>
                  void run(
                    () =>
                      api("/admin/products/import", {
                        method: "POST",
                        body: JSON.stringify(prepareCatalogImport(PRODUCTS)),
                      }),
                    "Existing product catalog imported. Set stock quantities to make products available for purchase.",
                  )
                }
              >
                Import existing products
              </button>
            )}
          </div>
          {catalog.isPending ? (
            <p>Loading catalog…</p>
          ) : (
            <div className="min-w-0">
              <div className="grid gap-3 md:hidden">
                {filtered.map((p) => (
                  <article
                    key={p.id}
                    className="flex min-w-0 items-center gap-3 rounded-2xl border bg-card p-3"
                  >
                    <img
                      src={p.image}
                      alt=""
                      className="h-16 w-16 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="break-words text-sm font-semibold">{p.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {CATEGORIES.find((c) => c.id === p.categoryId)?.name} · {p.weight}
                      </p>
                      <p className="mt-1 text-sm">
                        {money(p.price)} · Stock {p.stockQuantity}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {p.isActive ? "Active" : "Hidden"}
                        {p.isBestSeller ? " · Best seller" : ""}
                      </p>
                    </div>
                    <button
                      disabled={busy}
                      className="min-h-11 shrink-0 px-2 text-sm font-semibold text-primary"
                      onClick={() => {
                        setDraft(structuredClone(p));
                        setIsNew(false);
                      }}
                    >
                      Edit
                    </button>
                  </article>
                ))}
              </div>
              <div className="hidden overflow-x-auto rounded-2xl border md:block">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted">
                    <tr>
                      {["Product", "Category", "Price", "Stock", "Status", "Action"].map((h) => (
                        <th key={h} className="p-4">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p) => (
                      <tr key={p.id} className="border-t">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt=""
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                            <div className="min-w-40 font-semibold">
                              {p.name}
                              <small className="block font-normal text-muted-foreground">
                                {p.weight}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          {CATEGORIES.find((c) => c.id === p.categoryId)?.name}
                        </td>
                        <td className="p-4">{money(p.price)}</td>
                        <td className="p-4">{p.stockQuantity}</td>
                        <td className="p-4">{p.isActive ? "Active" : "Hidden"}</td>
                        <td className="p-4">
                          <button
                            disabled={busy}
                            className="font-semibold text-primary"
                            onClick={() => {
                              setDraft(structuredClone(p));
                              setIsNew(false);
                            }}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!filtered.length && (
                <p className="p-8 text-center text-muted-foreground">
                  No products found. Add a product or import the existing catalog.
                </p>
              )}
            </div>
          )}
          {draft && (
            <ProductEditor
              key={isNew ? "new" : draft.id}
              initial={draft}
              isNew={isNew}
              busy={busy}
              onCancel={() => setDraft(null)}
              onSave={(p) =>
                run(async () => {
                  await api(`/admin/products/${encodeURIComponent(p.id)}`, {
                    method: "PUT",
                    body: JSON.stringify(p),
                  });
                  setDraft(null);
                }, "Product saved. The storefront now uses the updated details.")
              }
            />
          )}
        </>
      ) : tab === "slides" ? (
        <SlideManager />
      ) : tab === "categories" ? (
        <CategoryManager />
      ) : (
        <>
          <ErrorNotice text={orders.error ? message(orders.error) : ""} />
          {orders.isPending ? (
            <p>Loading orders…</p>
          ) : (
            <div className={busy ? "pointer-events-none opacity-60" : ""}>
              <OrderList
                orders={orders.data ?? []}
                onStatus={(id, status) =>
                  run(
                    () =>
                      api(`/admin/orders/${id}/status`, {
                        method: "PUT",
                        body: JSON.stringify({ status }),
                      }),
                    "Order status updated.",
                  )
                }
              />
            </div>
          )}
        </>
      )}
    </Panel>
  );
}
function ProductEditor({
  initial,
  isNew,
  busy,
  onSave,
  onCancel,
}: {
  initial: StoreProduct;
  isNew: boolean;
  busy: boolean;
  onSave: (product: StoreProduct) => Promise<void>;
  onCancel: () => void;
}) {
  const { categories: CATEGORIES } = useCategories();
  const [uploading, setUploading] = useState(0);
  const [p, set] = useState(initial);
  const [error, setError] = useState("");
  const [variants, setVariants] = useState(
    initial.variants?.map((v) => `${v.weight} | ${v.price}`).join("\n") ?? "",
  );
  const [nutrition, setNutrition] = useState(
    initial.nutrition.items.map((i) => `${i.name} | ${i.value} | ${i.unit}`).join("\n"),
  );
  const update = <K extends keyof StoreProduct>(key: K, value: StoreProduct[K]) =>
    set((prev) => ({ ...prev, [key]: value }));
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (uploading) return;
    setError("");
    const packs = variants
      .split("\n")
      .filter((v) => v.trim())
      .map((v) => {
        const [weight, price] = v.split("|").map((s) => s.trim());
        return { weight, price: Number(price) };
      });
    const items = nutrition
      .split("\n")
      .filter((v) => v.trim())
      .map((v) => {
        const [name, value, unit] = v.split("|").map((s) => s.trim());
        return { name, value: Number(value), unit };
      });
    if (
      packs.some((v) => !v.weight || !Number.isFinite(v.price) || v.price <= 0) ||
      items.some((i) => !i.name || !i.unit || !Number.isFinite(i.value) || i.value < 0)
    ) {
      setError("Check pack sizes and nutrition values. Use the shown format.");
      return;
    }
    if (packs.length && !packs.some((v) => v.weight === p.weight && v.price === p.price)) {
      setError("Pack sizes must include the default weight and price.");
      return;
    }
    await onSave({
      ...p,
      images: p.images?.filter((v) => v.trim()),
      benefits: p.benefits.filter((v) => v.trim()),
      storage: p.storage.filter((v) => v.trim()),
      delivery: p.delivery.filter((v) => v.trim()),
      variants: packs,
      nutrition: { ...p.nutrition, items },
    });
  }
  function lines(label: string, key: "benefits" | "storage" | "delivery" | "images") {
    return (
      <label className="grid gap-1 text-sm">
        {label} (one per line)
        <textarea
          className={fieldClass}
          rows={3}
          value={(p[key] ?? []).join("\n")}
          onChange={(e) => update(key, e.target.value.split("\n"))}
        />
      </label>
    );
  }
  return (
    <section className="mt-8 min-w-0 rounded-2xl border bg-card p-4 sm:p-6">
      <div className="mb-5 flex justify-between">
        <h2 className="text-xl font-bold">{isNew ? "Add product" : `Edit ${initial.name}`}</h2>
        <button disabled={busy || uploading > 0} onClick={onCancel}>
          Close
        </button>
      </div>
      <ErrorNotice text={error} />
      <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
        <Field
          label="Product ID (lowercase, hyphens)"
          value={p.id}
          disabled={!isNew}
          pattern="[a-z0-9][a-z0-9-]{0,79}"
          required
          onChange={(e) => update("id", e.target.value)}
        />
        <Field
          label="Product name"
          value={p.name}
          maxLength={150}
          required
          onChange={(e) => update("name", e.target.value)}
        />
        <label className="grid gap-1 text-sm">
          Category
          <select
            className={fieldClass}
            value={p.categoryId}
            onChange={(e) => update("categoryId", Number(e.target.value))}
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <Field
          label="Primary image (HTTPS URL or /path)"
          value={p.image}
          required
          onChange={(e) => update("image", e.target.value)}
        />
        <ImageUpload
          onBusyChange={(value) => setUploading((n) => n + (value ? 1 : -1))}
          label="Upload product image"
          value={p.image}
          disabled={busy || uploading > 0}
          onChange={(url) => update("image", url)}
        />
        <div className="space-y-3">
          <ImageUpload
            onBusyChange={(value) => setUploading((n) => n + (value ? 1 : -1))}
            label="Add gallery image"
            disabled={busy || uploading > 0}
            onChange={(url) => update("images", [...(p.images ?? []).filter(Boolean), url])}
          />
          <div className="flex flex-wrap gap-2">
            {(p.images ?? []).filter(Boolean).map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <button
                  type="button"
                  aria-label={`Remove gallery image ${index + 1}`}
                  className="absolute -right-1 -top-1 h-7 w-7 rounded-full bg-background shadow"
                  onClick={() =>
                    update(
                      "images",
                      (p.images ?? []).filter((_, i) => i !== index),
                    )
                  }
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        <Field
          label="Tagline"
          value={p.tagline}
          onChange={(e) => update("tagline", e.target.value)}
        />
        <Field
          label="Badge (optional)"
          value={p.badge ?? ""}
          onChange={(e) => update("badge", e.target.value)}
        />
        <Field
          label="Default price (₹)"
          type="number"
          step="0.01"
          min="0.01"
          max="100000"
          required
          value={p.price}
          onChange={(e) => update("price", Number(e.target.value))}
        />
        <Field
          label="Default pack size"
          required
          value={p.weight}
          onChange={(e) => update("weight", e.target.value)}
        />
        <Field
          label="Stock quantity (packs, across all sizes)"
          type="number"
          step="1"
          min="0"
          max="1000000"
          required
          value={p.stockQuantity}
          onChange={(e) => update("stockQuantity", Number(e.target.value))}
        />
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={p.isActive}
            onChange={(e) => update("isActive", e.target.checked)}
          />
          Visible in storefront
        </label>
        <label className="flex min-h-11 items-center gap-3">
          <input
            type="checkbox"
            checked={p.isBestSeller ?? false}
            onChange={(e) => update("isBestSeller", e.target.checked)}
          />
          Feature in Best Selling
        </label>
        <label className="flex min-h-11 items-center gap-3">
          <input
            type="checkbox"
            checked={p.isOffer ?? false}
            onChange={(e) => update("isOffer", e.target.checked)}
          />
          Also show in Offer Zone
        </label>
        <label className="grid gap-1 text-sm md:col-span-2">
          Description
          <textarea
            className={fieldClass}
            rows={4}
            required
            value={p.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </label>
        <label className="grid gap-1 text-sm">
          Pack sizes: weight | price (one per line)
          <textarea
            className={fieldClass}
            rows={4}
            placeholder={"250g | 349\n500g | 689"}
            value={variants}
            onChange={(e) => setVariants(e.target.value)}
          />
        </label>
        {lines("Gallery image URLs", "images")}
        {lines("Benefits", "benefits")}
        {lines("Storage instructions", "storage")}
        {lines("Delivery details", "delivery")}
        <Field
          label="Nutrition serving size"
          value={p.nutrition.servingSize}
          onChange={(e) => update("nutrition", { ...p.nutrition, servingSize: e.target.value })}
        />
        <label className="grid gap-1 text-sm md:col-span-2">
          Nutrition: name | value | unit (one per line)
          <textarea
            className={fieldClass}
            rows={4}
            placeholder="Protein | 18 | g"
            value={nutrition}
            onChange={(e) => setNutrition(e.target.value)}
          />
        </label>
        <div className="flex gap-4 md:col-span-2">
          <button disabled={busy || uploading > 0} className={buttonClass}>
            {busy ? "Saving…" : "Save product"}
          </button>
          <button type="button" disabled={busy || uploading > 0} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
