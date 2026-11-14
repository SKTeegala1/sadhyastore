import type { Product, ProductVariant } from "./cart";
export type PackRow = { id: string; weight: string; price: string };
export type PackEditor = { rows: PackRow[]; defaultId: string };
const weightKey = (value: string) => value.replace(/\s+/g, "").toLowerCase();
export function initialPacks(product: Pick<Product, "weight" | "price" | "variants">): PackEditor {
  const source = product.variants?.length
    ? product.variants
    : [{ weight: product.weight, price: product.price }];
  const rows = source.map((pack, index) => ({
    id: `pack-${index}`,
    weight: pack.weight,
    price: pack.price > 0 ? String(pack.price) : "",
  }));
  const exact = rows.find(
    (row) =>
      weightKey(row.weight) === weightKey(product.weight) && Number(row.price) === product.price,
  );
  const sameWeight = rows.find((row) => weightKey(row.weight) === weightKey(product.weight));
  return { rows, defaultId: (exact ?? sameWeight ?? rows[0]).id };
}
export function preparePacks(
  editor: PackEditor,
): { variants: ProductVariant[]; weight: string; price: number } | { error: string } {
  if (!editor.rows.length) return { error: "Add at least one pack size." };
  const variants = editor.rows.map((row) => ({
    weight: row.weight.trim().replace(/\s+/g, " "),
    price: Number(row.price),
  }));
  if (
    variants.some(
      (pack) =>
        !pack.weight ||
        !Number.isFinite(pack.price) ||
        pack.price <= 0 ||
        pack.price > 100000 ||
        Math.abs(pack.price * 100 - Math.round(pack.price * 100)) > 0.000001,
    )
  )
    return {
      error:
        "Enter a weight and price from ₹0.01 to ₹100,000 with up to two decimal places for every pack.",
    };
  if (new Set(variants.map((pack) => weightKey(pack.weight))).size !== variants.length)
    return {
      error: "Each pack size must be unique. Combine duplicate weights such as “250g” and “250 g”.",
    };
  const index = editor.rows.findIndex((row) => row.id === editor.defaultId);
  if (index < 0) return { error: "Choose a default pack size." };
  const selected = variants[index];
  return {
    weight: selected.weight,
    price: selected.price,
    variants: [selected, ...variants.filter((_, i) => i !== index)],
  };
}
export function removePack(editor: PackEditor, id: string): PackEditor {
  if (editor.rows.length <= 1) return editor;
  const rows = editor.rows.filter((row) => row.id !== id);
  return { rows, defaultId: editor.defaultId === id ? rows[0].id : editor.defaultId };
}
