import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/cart";

type Props = {
  product: Product;
  selectedWeight: string;
  selectedPrice: number;
  onWeightChange: (weight: string, price: number) => void;
  onAdd: () => void;
};

export default function ProductFooter({
  product,
  selectedWeight,
  selectedPrice,
  onWeightChange,
  onAdd,
}: Props) {
  return (
    <div className="border-t bg-background p-6 space-y-5">

      <div>
        <h3 className="font-semibold mb-3">
          Select Weight
        </h3>

        <div className="flex gap-3 flex-wrap">

          {(product.variants ?? []).map((variant) => (

            <Button
              key={variant.weight}
              variant="outline"
              className={`min-w-20 rounded-xl transition-all duration-200 ${
                selectedWeight === variant.weight
                  ? "bg-primary text-white border-primary shadow-md scale-105"
                  : "hover:border-primary hover:text-primary"
              }`}
              onClick={() =>
                onWeightChange(
                  variant.weight,
                  variant.price
                )
              }
            >
              {variant.weight}
            </Button>

          ))}

        </div>
      </div>

      <div className="flex items-center justify-between">

        <span className="text-3xl font-bold text-primary">
          ₹{selectedPrice}
        </span>

        <Button
          size="lg"
          className="px-10"
          onClick={onAdd}
        >
          Add To Cart
        </Button>

      </div>

    </div>
  );
}