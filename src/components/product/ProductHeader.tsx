import type { Product } from "@/lib/cart";
import { Badge } from "@/components/ui/badge";

type Props = {
  product: Product;
};

export default function ProductHeader({ product }: Props) {
  return (
    <div className="space-y-5">

      {product.badge && (
        <Badge className="rounded-full px-3 py-1">
          {product.badge}
        </Badge>
      )}

      <div>
        <h1 className="text-4xl font-bold text-secondary">
          {product.name}
        </h1>

        <p className="mt-2 text-lg text-muted-foreground">
          {product.tagline}
        </p>
      </div>

      <div className="flex items-center gap-3">

        <div className="text-yellow-500 text-lg">
          ⭐⭐⭐⭐⭐
        </div>

        <span className="text-sm text-muted-foreground">
          {product.rating} ({product.reviews} Reviews)
        </span>

      </div>

    </div>
  );
}