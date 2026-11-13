import { useState } from "react";
import type { Product } from "@/lib/cart";
export default function ProductGallery({ product }: { product: Product }) {
  const images = product.images?.length ? product.images : [product.image];
  const [selected, setSelected] = useState(images[0]);
  const [zoomed, setZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const current = images.includes(selected) ? selected : images[0];
  return (
    <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:gap-5">
      <div className="order-2 flex min-w-0 gap-2 overflow-x-auto pb-2 sm:order-1 sm:max-h-[34rem] sm:shrink-0 sm:flex-col sm:overflow-y-auto sm:overflow-x-hidden sm:pb-0">
        {images.map((image, index) => (
          <button
            key={index}
            aria-label={`View product image ${index + 1}`}
            aria-pressed={image === current}
            onClick={() => setSelected(image)}
            className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-white sm:h-20 sm:w-20 ${image === current ? "border-primary" : "border-border"}`}
          >
            <img src={image} alt="" className="h-full w-full object-contain p-1" />
          </button>
        ))}
      </div>
      <div className="order-1 min-w-0 flex-1 sm:order-2">
        <div
          className="relative aspect-square overflow-hidden rounded-3xl border bg-white shadow-sm"
          onMouseEnter={() => {
            if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setZoomed(true);
          }}
          onMouseLeave={() => setZoomed(false)}
          onMouseMove={(e) => {
            if (!zoomed) return;
            const rect = e.currentTarget.getBoundingClientRect();
            setPosition({
              x: ((e.clientX - rect.left) / rect.width) * 100,
              y: ((e.clientY - rect.top) / rect.height) * 100,
            });
          }}
        >
          <img
            src={current}
            alt={product.name}
            className={
              "absolute inset-0 h-full w-full object-contain p-4 transition-transform sm:p-8 " +
              (zoomed ? "scale-200" : "scale-100")
            }
            style={{ transformOrigin: `${position.x}% ${position.y}%` }}
          />
        </div>
      </div>
    </div>
  );
}
