import type { Product } from "@/lib/cart";
import {
  FileText,
  Heart,
  Salad,
  Package,
  Truck,
} from "lucide-react";

type Props = {
  product: Product;
};

export default function ProductContent({ product }: Props) {
  return (
    <section className="mt-16 space-y-8">

      {/* Description */}

      <div className="rounded-3xl border bg-card shadow-sm p-8">

        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-full bg-primary/10 p-3">
            <FileText className="h-5 w-5 text-primary" />
          </div>

          <h2 className="text-2xl font-bold">
            Product Description
          </h2>
        </div>

        <p className="leading-8 text-muted-foreground text-[16px]">
          {product.description}
        </p>

      </div>

      {/* Benefits */}

      <div className="rounded-3xl border bg-card shadow-sm p-8">

        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-full bg-green-100 p-3">
            <Heart className="h-5 w-5 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold">
            Health Benefits
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">

          {product.benefits.map((benefit) => (

            <div
              key={benefit}
              className="flex items-center gap-3 rounded-xl bg-muted/40 p-4"
            >
              <span className="text-green-600 text-lg">✔</span>

              <span>{benefit}</span>

            </div>

          ))}

        </div>

      </div>

      {/* Nutrition Facts */}

<div className="rounded-3xl border bg-card shadow-sm p-8">

  <div className="flex items-center gap-3 mb-6">

    <div className="rounded-full bg-orange-100 p-3">
      <Salad className="h-5 w-5 text-orange-600" />
    </div>

    <h2 className="text-2xl font-bold">
      Nutrition Facts
    </h2>

  </div>

  <div className="divide-y rounded-2xl border overflow-hidden">

    {product.nutrition.items.map((item) => (

      <div
        key={item.name}
        className="flex justify-between items-center px-5 py-4 bg-background hover:bg-muted/40 transition"
      >
        <span className="font-medium">
          {item.name}
        </span>

        <span className="text-primary font-semibold">
          {item.value} {item.unit}
        </span>

      </div>

    ))}

  </div>

</div>

{/* Storage & Delivery */}

<div className="grid md:grid-cols-2 gap-6">

  {/* Storage */}

  <div className="rounded-3xl border bg-card shadow-sm p-8">

    <div className="flex items-center gap-3 mb-6">

      <div className="rounded-full bg-blue-100 p-3">
        <Package className="h-5 w-5 text-blue-600" />
      </div>

      <h2 className="text-2xl font-bold">
        Storage
      </h2>

    </div>

    <div className="space-y-4">

      {product.storage.map((item) => (

        <div
          key={item}
          className="flex items-start gap-3"
        >

          <span className="text-primary font-bold mt-1">
            ✓
          </span>

          <span>
            {item}
          </span>

        </div>

      ))}

    </div>

  </div>

  {/* Delivery */}

  <div className="rounded-3xl border bg-card shadow-sm p-8">

    <div className="flex items-center gap-3 mb-6">

      <div className="rounded-full bg-green-100 p-3">
        <Truck className="h-5 w-5 text-green-600" />
      </div>

      <h2 className="text-2xl font-bold">
        Delivery
      </h2>

    </div>

    <div className="space-y-4">

      {product.delivery.map((item) => (

        <div
          key={item}
          className="flex items-start gap-3"
        >

          <span className="text-primary font-bold mt-1">
            ✓
          </span>

          <span>
            {item}
          </span>

        </div>

      ))}

    </div>

  </div>

</div>

    </section>
  );
}