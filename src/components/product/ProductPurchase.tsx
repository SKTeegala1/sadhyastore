import { useState } from "react";
import type { Product } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { Leaf, ShieldCheck, Truck } from "lucide-react";
import {  useEffect } from "react";

type Props = {
  product: Product;
};


export default function ProductPurchase({ product }: Props) {
  const { add } = useCart();

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] ?? {
      weight: product.weight,
      price: product.price,
    }
  );

  useEffect(() => {
  setSelectedVariant(
    product.variants?.[0] ?? {
      weight: product.weight,
      price: product.price,
    }
  );
}, [product]);

  const handleAdd = () => {
    if (product.stockQuantity === 0) return;
    add(
      {
        ...product,
        weight: selectedVariant.weight,
        price: selectedVariant.price,
      },
      {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
      product.image
    );


  };

  return (
    <div className="space-y-8">

      {/* Price */}

      <div className="flex items-end gap-3">

        <span className="text-4xl font-bold text-primary">
          ₹{selectedVariant.price}
        </span>

        <span className="text-lg text-muted-foreground line-through">
          ₹{Math.round(selectedVariant.price * 1.08)}
        </span>

      </div>

      {/* Weight */}

      <div>

        <h3 className="font-semibold mb-3">
          Select Weight
        </h3>

        <div className="flex gap-3 flex-wrap">

          {(product.variants ?? []).map((variant) => (

            <Button
              key={variant.weight}
              variant={
                selectedVariant.weight === variant.weight
                  ? "default"
                  : "outline"
              }
              onClick={() => setSelectedVariant(variant)}
            >
              {variant.weight}
            </Button>

          ))}

        </div>

      </div>

      {/* Highlights */}

      <div className="space-y-3">

        <div className="flex items-center gap-3">
          <Leaf className="h-5 w-5 text-green-600" />
          <span>100% Natural Ingredients</span>
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span>Premium Quality Assured</span>
        </div>

        <div className="flex items-center gap-3">
          <Truck className="h-5 w-5 text-orange-500" />
          <span>Fast Delivery Across India</span>
        </div>

      </div>

      {/* Button */}

      <Button
        size="lg"
        className="w-full"
        disabled={product.stockQuantity === 0}
        onClick={handleAdd}
      >
        {product.stockQuantity === 0 ? "Out of stock" : "Add To Cart"}
      </Button>

    </div>
  );
}