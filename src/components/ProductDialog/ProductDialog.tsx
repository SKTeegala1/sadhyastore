import { useEffect, useState } from "react";

import type { Product } from "@/lib/cart";
import { useCart } from "@/lib/cart";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import ProductHeader from "../../pages/ProductHeader";
import ProductBenefits from "../../pages/ProductBenefits";
import NutritionTable from "../../pages/NutritionTable";
import ProductInfo from "../../pages/ProductInfo";
import ProductFooter from "../../pages/ProductFooter";

type Props = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ProductDialog({
  product,
  open,
  onOpenChange,
}: Props) {
  const { add } = useCart();

  const [selectedWeight, setSelectedWeight] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);

  useEffect(() => {
    if (!product) return;

    setSelectedWeight(product.weight);
    setSelectedPrice(product.price);
  }, [product]);

  if (!product) return null;

  const handleWeightChange = (weight: string, price: number) => {
    setSelectedWeight(weight);
    setSelectedPrice(price);
  };

  const handleAddToCart = () => {
    add(
      {
        ...product,
        weight: selectedWeight,
        price: selectedPrice,
      },
      {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
      product.image
    );

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh] overflow-hidden p-0">

        <div className="grid h-full md:grid-cols-[45%_55%]">

          {/* Left Image */}
         <div className="bg-muted/30 flex items-center justify-center overflow-hidden p-8">

  <div className="rounded-3xl bg-white p-6 shadow-lg">

    <img
      src={product.image}
      alt={product.name}
      className="max-h-[70vh] w-auto object-contain transition-transform duration-300 hover:scale-105"
    />

  </div>

</div>

          {/* Right Side */}
          <div className="flex h-full min-h-0 flex-col">

            {/* Product Header */}
            <ProductHeader product={product} />

            {/* Footer */}
            <ProductFooter
              product={product}
              selectedWeight={selectedWeight}
              selectedPrice={selectedPrice}
              onWeightChange={handleWeightChange}
              onAdd={handleAddToCart}
            />

            {/* Scrollable Content */}
            <div className="flex-1 min-h-0 overflow-y-auto">

  <div className="space-y-8 px-8 py-6">

    <ProductInfo product={product} />

    <ProductBenefits product={product} />

    <NutritionTable product={product} />

  </div>

</div>
            

          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
}