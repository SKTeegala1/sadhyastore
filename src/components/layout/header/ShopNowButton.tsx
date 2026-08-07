import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
type Props = {
    className?: string;
};

export default function ShopNowButton({
    className = "",
}: Props) {
  return (
    <Link
      to="/"
      hash="shop"
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-primary-foreground text-sm font-semibold hover:scale-105 transition ${className}`}
      style={{ background: "var(--gradient-hero)" }}
    >
      <ShoppingBag className="w-4 h-4" />
      Shop Now
    </Link>
  );
}