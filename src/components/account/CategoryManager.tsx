import { useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCategories, type StoreCategory } from "@/lib/categories";
import { useCatalog } from "@/lib/catalog";
import { api, message } from "@/lib/api";
import { Field, ErrorNotice, buttonClass, fieldClass } from "./StoreForms";
import ImageUpload from "./ImageUpload";
export default function CategoryManager() {
  const { categories, isPending, error: loadError } = useCategories();
  const { products } = useCatalog(true);
  const cache = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [draft, setDraft] = useState<StoreCategory | null>(null);
  const [remove, setRemove] = useState<StoreCategory | null>(null);
  const [replacement, setReplacement] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  async function refresh() {
    await Promise.all(
      ["categories", "products", "admin-products"].map((key) =>
        cache.invalidateQueries({ queryKey: [key] }),
      ),
    );
  }
  async function save(e: FormEvent) {
    e.preventDefault();
    if (!draft || uploading) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await api(draft.id ? `/admin/categories/${draft.id}` : "/admin/categories", {
        method: draft.id ? "PUT" : "POST",
        body: JSON.stringify(draft),
      });
      await refresh();
      setDraft(null);
      setNotice("Category saved.");
    } catch (e) {
      setError(message(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Add collections, upload images and control their display order.
        </p>
        <button
          disabled={busy || uploading}
          className={buttonClass}
          onClick={() => {
            setDraft({ id: 0, name: "", image: "", sortOrder: categories.length });
            setRemove(null);
          }}
        >
          + Add category
        </button>
      </div>
      <ErrorNotice text={error || (loadError ? message(loadError) : "")} />
      {notice && (
        <p role="status" className="text-primary">
          {notice}
        </p>
      )}
      {isPending ? (
        <p>Loading categories…</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <article key={c.id} className="flex min-w-0 items-center gap-3 rounded-2xl border p-4">
              <img src={c.image} alt="" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0">
                <h3 className="break-words font-semibold">{c.name}</h3>
                <p className="text-xs text-muted-foreground">
                  Order {c.sortOrder} · {products.filter((p) => p.categoryId === c.id).length}{" "}
                  products
                </p>
                <div className="mt-2 flex gap-4 text-sm">
                  <button
                    disabled={busy || uploading}
                    className="min-h-10 text-primary"
                    onClick={() => {
                      setDraft({ ...c });
                      setRemove(null);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    disabled={busy || uploading}
                    className="min-h-10 text-destructive"
                    onClick={() => {
                      setRemove(c);
                      setReplacement("");
                      setDraft(null);
                      setError("");
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
      {draft && (
        <form
          onSubmit={save}
          className="grid gap-4 rounded-2xl border bg-card p-4 sm:grid-cols-2 sm:p-6"
        >
          <h3 className="font-semibold sm:col-span-2">
            {draft.id ? "Edit category" : "New category"}
          </h3>
          <Field
            label="Category name"
            value={draft.name}
            required
            maxLength={80}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          />
          <Field
            label="Display order"
            type="number"
            value={draft.sortOrder}
            min={0}
            max={10000}
            required
            onChange={(e) => setDraft({ ...draft, sortOrder: Number(e.target.value) })}
          />
          <Field
            label="Category image URL"
            value={draft.image}
            required
            onChange={(e) => setDraft({ ...draft, image: e.target.value })}
          />
          <ImageUpload
            onBusyChange={setUploading}
            label="Upload category image"
            value={draft.image}
            disabled={busy || uploading}
            onChange={(url) => setDraft((prev) => (prev ? { ...prev, image: url } : null))}
          />
          <div className="flex gap-3 sm:col-span-2">
            <button disabled={busy || uploading} className={buttonClass}>
              {busy ? "Saving…" : "Save category"}
            </button>
            <button type="button" disabled={busy || uploading} onClick={() => setDraft(null)}>
              Cancel
            </button>
          </div>
        </form>
      )}
      {remove && (
        <div className="space-y-4 rounded-2xl border border-destructive/30 p-5">
          <h3 className="font-semibold">Remove {remove.name}?</h3>
          <p className="text-sm text-muted-foreground">
            Products will be preserved. If this collection contains products, choose where to move
            them.
          </p>
          <label className="grid gap-2 text-sm">
            Move assigned products to
            <select
              className={fieldClass}
              value={replacement}
              onChange={(e) => setReplacement(e.target.value)}
            >
              <option value="">No replacement (empty categories only)</option>
              {categories
                .filter((c) => c.id !== remove.id)
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </label>
          <div className="flex gap-4">
            <button
              disabled={busy || uploading}
              className="rounded-xl bg-destructive px-4 py-3 font-semibold text-white"
              onClick={async () => {
                setBusy(true);
                setError("");
                try {
                  await api(
                    `/admin/categories/${remove.id}${replacement ? "?reassignTo=" + replacement : ""}`,
                    { method: "DELETE" },
                  );
                  await refresh();
                  setRemove(null);
                  setNotice("Category removed. Assigned products were preserved.");
                } catch (e) {
                  setError(message(e));
                } finally {
                  setBusy(false);
                }
              }}
            >
              Remove category
            </button>
            <button disabled={busy || uploading} onClick={() => setRemove(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
