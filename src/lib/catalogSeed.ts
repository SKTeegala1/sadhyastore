import type { Product } from "./cart";
import type { StoreProduct } from "./catalog";

function catalogImage(image: string) {
  const names = [
    "cashew-w210-jumbo-kaju.jpeg",
    "almonds-regular.jpeg",
    "salted-pistachio-round-pista.jpeg",
    "premium-anjeer.jpeg",
    "namkeen.jpg",
    "raisin-premium-kishmish.jpeg",
    "premium-akhrot.jpeg",
    "giftbox.jpg",
  ];
  const name = names.find(
    (name) => image.includes(name) || image.includes(name.replace(/\.[^.]+$/, "") + "-"),
  );
  return name ? `/catalog/${name}` : image;
}

export function prepareCatalogImport(products: Product[]): StoreProduct[] {
  return products.map((product) => {
    // The existing storefront displays the first variant. Keep that pack/price
    // together when older records have an inconsistent top-level default.
    const pack = product.variants?.[0] ?? { weight: product.weight, price: product.price };
    return {
      ...product,
      categoryId: [1, 2, 3, 5].includes(product.categoryId)
        ? 103
        : [4, 7].includes(product.categoryId)
          ? 102
          : product.categoryId === 6
            ? 106
            : product.categoryId === 8
              ? 107
              : product.categoryId === 9
                ? 105
                : product.categoryId === 10
                  ? /berr/i.test(product.name)
                    ? 108
                    : 102
                  : product.categoryId === 11
                    ? 104
                    : [12, 13].includes(product.categoryId)
                      ? 101
                      : product.categoryId,
      isBestSeller: false,
      isOffer: product.isOffer ?? [12, 13].includes(product.categoryId),
      weight: pack.weight,
      price: pack.price,
      description: product.description.trim() || product.tagline || product.name,
      image: catalogImage(product.image),
      images: product.images?.map(catalogImage),
      stockQuantity: 0,
      isActive: true,
    };
  });
}
