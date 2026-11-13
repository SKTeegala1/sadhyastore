import { useEffect, useRef, useState } from "react";
import { Product } from "@/lib/cart";
import { useCart } from "@/lib/cart";
import { ShoppingBag, Sparkles, Truck, Leaf, ShieldCheck, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const { add } = useCart();
  const imgRef = useRef<HTMLImageElement>(null);

   const navigate = useNavigate();


  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] ?? {
      weight: product.weight,
      price: product.price,
    }
  );


  useEffect(() => { setSelectedVariant(product.variants?.[0] ?? { weight: product.weight, price: product.price }); }, [product]);
   const handleAdd = () => {
    if (product.stockQuantity === 0) return;
    const el = imgRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
   // add(product, { x: r.left + r.width / 2, y: r.top + r.height / 2 }, product.image);
    add(
    {
        ...product,
        price: selectedVariant.price,
        weight: selectedVariant.weight,
    },
    {
        x: r.left + r.width / 2,
        y: r.top + r.height / 2,
    },
    product.image
);
  };

  return (
    <div className="group relative bg-card rounded-3xl overflow-hidden border flex flex-col hover:-translate-y-1 transition" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="aspect-square overflow-hidden bg-muted">
        <div
    className="cursor-pointer"
   onClick={() =>
        navigate({
            to: "/product/$id",
            params: {
                id: product.id,
            },
        })
    }
>
<img ref={imgRef} src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
</div>
        
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-display font-bold text-lg text-secondary">{product.name}</h3>
        <p className="text-xs text-muted-foreground mt-1">{product.tagline}</p>
        <div className="flex gap-2 mt-4">
    {(product.variants ?? []).map((variant) => (
        <button
            key={variant.weight}
            onClick={() => setSelectedVariant(variant)}
            className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold transition-all duration-200
                ${
                    selectedVariant.weight === variant.weight
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-secondary hover:border-primary"
                }`}
        >
            {variant.weight}
        </button>
    ))}
</div>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-2xl font-bold text-primary"><div className="mt-4 flex items-center gap-2">
    <span className="text-gray-400 line-through text-sm">
        ₹{Math.round(selectedVariant.price * 1.08)}
    </span>

    <span className="font-display text-2xl font-bold text-primary">
        ₹{selectedVariant.price}
    </span>
</div></span>
          <button
            disabled={product.stockQuantity === 0}
            onClick={handleAdd}
            className="px-4 py-2 rounded-full text-primary-foreground text-sm font-semibold flex items-center gap-1.5 hover:scale-105 transition"
            style={{ background: "var(--gradient-hero)" }}
          >
            <ShoppingBag className="w-4 h-4" /> {product.stockQuantity === 0 ? "Sold out" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}