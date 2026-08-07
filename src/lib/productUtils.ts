import { PRODUCTS, CATEGORIES } from "@/data/products";

export function getProductsByCategory(
    categoryId: number
) {
    return PRODUCTS.filter(
        p => p.categoryId === categoryId
    );
}

export function getCategory(
    categoryId: number
) {
    return CATEGORIES.find(
        c => c.id === categoryId
    );
}