import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import type { Product } from "./cart";
export type StoreProduct = Product & { stockQuantity: number; isActive: boolean };
export function useCatalog(admin = false) {
  const query = useQuery({
    queryKey: [admin ? "admin-products" : "products"],
    queryFn: () => api<StoreProduct[]>(admin ? "/admin/products" : "/products"),
    retry: 1,
  });
  return { ...query, products: query.data ?? [] };
}
