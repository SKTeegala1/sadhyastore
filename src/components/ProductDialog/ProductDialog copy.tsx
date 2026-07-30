import type { Product } from "@/lib/cart";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "../ui/badge";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";

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
    if (!product) return null;

    const [selectedWeight, setSelectedWeight] = useState(product.weight);
const [selectedPrice, setSelectedPrice] = useState(product.price);

const { add } = useCart();

useEffect(() => {
  if (!product) return;

  setSelectedWeight(product.weight);
  setSelectedPrice(product.price);
}, [product]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-6xl h-[90vh] p-0 overflow-hidden">
  <div className="grid md:grid-cols-2 h-full">

    {/* Left Side */}
    <div className="bg-muted/30 flex items-center justify-center p-10">

      <img
        src={product.image}
        alt={product.name}
        className="w-full max-w-md transition-transform duration-300 hover:scale-110"
      />

    </div>

    {/* Right Side */}
    <div className="flex flex-col h-full">

      <DialogHeader className="p-0">
        {product.badge && (
    <Badge className="mb-4">
        {product.badge}
    </Badge>
)}
        <DialogTitle className="text-3xl font-bold">
          {product.name}
        </DialogTitle>
        <div className="flex items-center gap-3 mt-3">

    <div className="flex text-yellow-500 text-lg">

        ⭐⭐⭐⭐⭐

    </div>

    <span className="text-sm text-muted-foreground">

         {product.rating} ({product.reviews} Reviews)

    </span>

</div>
      </DialogHeader>

      <p className="mt-3 text-muted-foreground leading-7">
        {product.tagline}
      </p>

<div className="mt-8">

    <h3 className="font-semibold mb-3">
        Select Weight
    </h3>

    <div className="flex gap-3">

        {(product.variants ?? []).map((variant) => (
           <Button
    key={variant.weight}
    variant="outline"
    className={`min-w-20 rounded-xl transition-all duration-200 ${
        selectedWeight === variant.weight
            ? "bg-primary text-white border-primary shadow-md scale-105"
            : "hover:border-primary hover:text-primary"
    }`}
    onClick={() => {
        setSelectedWeight(variant.weight);
        setSelectedPrice(variant.price);
    }}
>
    {variant.weight}
</Button>

        ))}

    </div>

</div>

<div className="mt-8 flex items-center gap-4">

    <span className="text-4xl font-bold text-primary">

        ₹{selectedPrice}

    </span>

</div>
<Button
    className="mt-8 w-full"
    size="lg"
    onClick={() => {

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

    }}
>
    Add To Cart
</Button>

<div className="flex-1 overflow-y-auto p-8">    
<div className="mt-8">
    <h3 className="font-semibold mb-4">

        Benefits

    </h3>

    <div className="space-y-2">

        {product.benefits.map((benefit) => (

            <div key={benefit}>

                ✅ {benefit}

            </div>

        ))}

    </div>

</div>

<div className="mt-8">

<h3 className="font-semibold mb-4">

Nutrition Facts

</h3>

<div className="grid grid-cols-2 gap-3 text-sm">

{/* <div>Energy</div> */}
<span>
        {product.nutrition.items.map((item) => (

    <div
        key={item.name}
        className="flex justify-between border-b py-2"
    >
        <span>{item.name}</span>

        <span>

            {item.value}
            {item.unit}

        </span>

    </div>

))}
    </span>

</div>

</div>

<div className="mt-8">

<h3 className="font-semibold mb-3">

Storage

</h3>

<ul className="list-disc pl-5 space-y-1">

{product.storage.map(item => (

<li key={item}>

{item}

</li>

))}

</ul>

</div>

<div className="mt-8">

<h3 className="font-semibold mb-3">

Delivery

</h3>

<ul className="list-disc pl-5 space-y-1">

{product.delivery.map(item => (

<li key={item}>

{item}

</li>

))}

</ul>

</div>

</div>

    </div>

  </div>

</DialogContent>
        </Dialog>
    );
}