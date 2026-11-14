import { relatedProducts } from "@/lib/recommendations";
import { useCatalog } from "@/lib/catalog";
import ProductSection from "./ProductSection";
export default function RelatedProducts({
  categoryId,
  productId,
  excludeIds = [],
  title = "Related Products",
}: {
  categoryId?: number;
  productId?: string;
  excludeIds?: string[];
  title?: string;
}) {
  const { products } = useCatalog();
  return (
    <ProductSection
      title={title}
      products={relatedProducts(products, { categoryId, productId, excludeIds })}
    />
  );
}
