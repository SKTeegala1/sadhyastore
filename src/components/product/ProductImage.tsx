import type { Product } from "@/lib/cart";

type ProductImageProps = {
  product: Product;
};

export default function ProductImage({
  product,
}: ProductImageProps) {
  return (
    <div className="rounded-3xl border bg-card p-8 shadow-sm">

      <img
        src={product.image}
        alt={product.name}
        className="
          w-full
          max-h-[550px]
          object-contain
          transition-transform
          duration-300
          hover:scale-105
        "
      />

    </div>
  );
}