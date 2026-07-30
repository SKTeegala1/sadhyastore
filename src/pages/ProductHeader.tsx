import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/cart";

type Props = {
  product: Product;
};

export default function ProductHeader({ product }: Props) {
  return (
    <div className="border-b p-8">
      {product.badge && (
        <Badge className="mb-4">
          {product.badge}
        </Badge>
      )}

      <h2 className="text-3xl font-bold">
        {product.name}
      </h2>

      <div className="flex items-center gap-3 mt-3">
        <span className="text-yellow-500 text-lg">
          ⭐⭐⭐⭐⭐
        </span>

        <span className="text-sm text-muted-foreground">
          {product.rating} ({product.reviews} Reviews)
        </span>
      </div>

      <p className="mt-4 text-muted-foreground leading-7">
        {product.tagline}
      </p>
    </div>
  );
}