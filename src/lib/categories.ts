import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
export type StoreCategory = { id: number; name: string; image: string; sortOrder: number };
export function useCategories() {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: () => api<StoreCategory[]>("/categories"),
    retry: 1,
  });
  return { ...query, categories: query.data ?? [] };
}
