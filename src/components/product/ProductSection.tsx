import type { Product } from "@/lib/cart";
import ProductCard from "@/components/ProductCard";


type Props = {
  title: string;
  products: Product[];
};

export default function ProductSection({
  title,
  products,
}: Props) {
  if (products.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold font-display text-secondary">
          {title}
        </h2>

        <span className="text-sm text-muted-foreground">
          {products.length} Products
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}