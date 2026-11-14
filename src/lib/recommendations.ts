import type { Product } from "./cart";
export function relatedProducts(
  products: Product[],
  {
    categoryId,
    productId,
    excludeIds = [],
  }: { categoryId?: number; productId?: string; excludeIds?: string[] },
) {
  return products
    .filter((p) => p.isActive !== false && p.id !== productId && !excludeIds.includes(p.id))
    .sort(
      (a, b) =>
        Number(b.categoryId === categoryId) - Number(a.categoryId === categoryId) ||
        Number((b.stockQuantity ?? 0) > 0) - Number((a.stockQuantity ?? 0) > 0) ||
        Number(!!b.isBestSeller) - Number(!!a.isBestSeller),
    )
    .slice(0, 4);
}
