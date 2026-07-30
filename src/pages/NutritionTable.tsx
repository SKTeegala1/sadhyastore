import type { Product } from "@/lib/cart";

type Props = {
  product: Product;
};

export default function NutritionTable({ product }: Props) {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-4">
        Nutrition Facts
      </h3>

      <div className="space-y-2">
        {product.nutrition.items.map((item) => (
          <div
            key={item.name}
            className="flex justify-between rounded-lg border bg-muted/20 px-4 py-3"
          >
            <span>{item.name}</span>

            <span className="font-semibold">
              {item.value} {item.unit}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}