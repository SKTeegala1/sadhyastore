import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import CategoryGrid from "@/components/home/CategoryGrid";
import { CartProvider, useCart, type Product } from "@/lib/cart";
import FloatingCart from "@/components/FloatingCart";
import { ShoppingBag, Sparkles, Truck, Leaf, ShieldCheck, LogOut } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { PRODUCTS, CATEGORIES, CATEGORY_IDS } from "@/data/products";
import Header from "@/components/layout/Header";
import { useNavigate } from "@tanstack/react-router";
import ProductSections from "@/components/home/ProductSections";

import ProductCard from "@/components/ProductCard";
import Footer from "@/components/layout/Footer";
import CategorySection from "@/components/home/CategorySection";
export const Route = createFileRoute("/")({
  component: Index,
});

// Friendly display names for each category
const CATEGORY_LABELS: Record<number, string> = {
  [CATEGORY_IDS.CASHEW]: "DRY FRUITS",
  [CATEGORY_IDS.ALMOND]: "NUTS",
  [CATEGORY_IDS.PISTACHIO]: "SEEDS",
  [CATEGORY_IDS.ANJEER]: "BERRIES",
  [CATEGORY_IDS.WALNUT]: "SPICES",
  [CATEGORY_IDS.DATES]: "DATES",
  [CATEGORY_IDS.RAISINS]: "HEALTHY SNACKS",
  [CATEGORY_IDS.SEEDS]: "PODULU",
  [CATEGORY_IDS.SNACKS]: "RICE & MILLETS",
  [CATEGORY_IDS.DEHYDRATED_FRUITS]: "Dehydrated Fruits",
  [CATEGORY_IDS.SPICES]: "Spices",
  [CATEGORY_IDS.GIFT_BOXES]: "Gift Boxes",
};


function Index() {
   const [selectedCategoryId, setSelectedCategoryId] =
  useState<number | null>(null);
   return (
    
      <div className="min-h-screen bg-background font-sans">

        <Hero />
        <CategoryGrid
          selectedCategoryId={selectedCategoryId}
          onCategorySelect={setSelectedCategoryId}
        />
        <ProductSections />
        <Features />
      </div>
  );
}






