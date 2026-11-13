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
