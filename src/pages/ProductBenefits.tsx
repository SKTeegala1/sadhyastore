import type { Product } from "@/lib/cart";

type Props = {
  product: Product;
};

export default function ProductBenefits({ product }: Props) {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-4">
        Benefits
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {product.benefits.map((benefit) => (
          <div
            key={benefit}
            className="rounded-xl border bg-muted/20 p-4"
          >
            ✅ {benefit}
          </div>
        ))}
      </div>
    </section>
  );
}