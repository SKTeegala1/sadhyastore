import type { Product } from "@/lib/cart";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  return (
    <div className="space-y-8">

      {/* Description */}
      <section>
        <h3 className="text-lg font-semibold mb-3">
          Description
        </h3>

        <p className="text-muted-foreground leading-7">
          {product.description}
        </p>
      </section>

      {/* Storage */}
      <section>
        <h3 className="text-lg font-semibold mb-3">
          📦 Storage
        </h3>

        <div className="space-y-2">
          {product.storage.map((item) => (
            <div
              key={item}
              className="rounded-lg border bg-muted/20 p-3"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Delivery */}
      <section>
        <h3 className="text-lg font-semibold mb-3">
          🚚 Delivery
        </h3>

        <div className="space-y-2">
          {product.delivery.map((item) => (
            <div
              key={item}
              className="rounded-lg border bg-muted/20 p-3"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}