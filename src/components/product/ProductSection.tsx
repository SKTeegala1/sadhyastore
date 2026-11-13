import type { Product } from "@/lib/cart";
import ProductCard from "@/components/ProductCard";

type Props = {
  title: string;
  products: Product[];
};

export default function ProductSection({ title, products }: Props) {
  if (products.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-secondary">{title}</h2>

        <span className="text-sm text-muted-foreground">{products.length} Products</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
