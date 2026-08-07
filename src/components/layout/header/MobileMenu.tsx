import { X } from "lucide-react";
import { Link } from "@tanstack/react-router";

import SearchBar from "@/components/search/SearchBar";
import ShopNowButton from "./ShopNowButton";
import { NAV_ITEMS } from "@/types/NavigationItems";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({
  open,
  onClose,
}: Props) {
//   if (!open) return null;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
        document.body.style.overflow = "auto";
    };
}, [open]);

  return (
    <div
    className={`fixed inset-0 z-50 transition-all duration-300
        ${
            open
                ? "visible pointer-events-auto"
                : "invisible pointer-events-none"
        }`}
>

      {/* Overlay */}
     <div
    className={`absolute inset-0 bg-black transition-opacity duration-300
        ${open ? "opacity-40" : "opacity-0"}`}
    onClick={onClose}
/>

      {/* Drawer */}
     <div
        className={`absolute right-0 top-0 h-full w-80 flex flex-col shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{ background: "#ffffff" }}
        >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="font-display text-xl font-bold text-secondary">
            Menu
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-muted transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col py-2">

          {NAV_ITEMS.map((item) => (

            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              onClick={onClose}
              className="px-5 py-3 hover:bg-muted transition font-medium"
            >
              {item.label}
            </Link>

          ))}

        </nav>

        {/* Search */}
        <div className="border-t p-5">
          <SearchBar />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer Button */}
        <div className="border-t p-5">

          <ShopNowButton className="inline-flex w-full justify-center" />

        </div>

      </div>

    </div>
  );
}