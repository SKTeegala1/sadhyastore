import { Product } from "@/lib/cart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  product: Product | null;
  onOpenChange: (open: boolean) => void;
};

export default function ProductDetailsDialog({
  open,
  product,
  onOpenChange,
}: Props) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden">
        <div className="grid md:grid-cols-2">

          {/* Left */}
          <div className="bg-muted p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-sm object-contain"
            />
          </div>

          {/* Right */}
          <div className="p-8">

            <DialogHeader className="mb-4">
              <DialogTitle className="text-3xl font-bold">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            <p className="text-muted-foreground">
              {product.tagline}
            </p>

            <div className="mt-6">
              <span className="text-4xl font-bold text-primary">
                ₹{product.price}
              </span>
            </div>

          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}