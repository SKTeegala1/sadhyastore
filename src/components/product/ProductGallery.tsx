import { useState } from "react";
import type { Product } from "@/lib/cart";

type Props = {
  product: Product;
};

export default function ProductGallery({ product }: Props) {
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({
  x: 50,
  y: 50,
});

  return (
    <div className="flex gap-5">
      {/* Thumbnails */}
      <div className="flex flex-col gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`group relative w-20 h-20 rounded-2xl overflow-hidden border-2 bg-white transition-all duration-300 ${
  selectedImage === image
    ? "border-primary shadow-lg scale-105"
    : "border-gray-200 hover:border-primary/40 hover:scale-105"
}`}
          >
           <img
  src={image}
  alt={`${product.name}-${index + 1}`}
  className="w-full h-full object-contain p-2"
/>
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1">
  <div
  className="relative aspect-square rounded-3xl overflow-hidden border bg-white shadow-sm cursor-zoom-in"
  onMouseEnter={() => setIsZoomed(true)}
  onMouseLeave={() => {
    setIsZoomed(false);
    setPosition({ x: 50, y: 50 });
  }}
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPosition({ x, y });
  }}
>
    <img
      key={selectedImage}
      src={selectedImage}
      alt={product.name}
      className={`absolute inset-0 h-full w-full object-contain p-8 transition-transform duration-150 ${
  isZoomed ? "scale-200" : "scale-100"
}`}
style={{
  transformOrigin: `${position.x}% ${position.y}%`,
}}
    />
  </div>
</div>
      
    </div>
  );
}