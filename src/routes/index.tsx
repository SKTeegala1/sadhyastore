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
import OfferSection from "@/components/home/OfferSection";
export const Route = createFileRoute("/")({
  component: Index,
});


function Index() {
   const [selectedCategoryId, setSelectedCategoryId] =
  useState<number | null>(null);
   return (
    
      <div className="min-h-screen bg-background font-sans">

        <Hero />
        <OfferSection />
        <CategoryGrid
          selectedCategoryId={selectedCategoryId}
          onCategorySelect={setSelectedCategoryId}
        />
        <ProductSections />
        <Features />
      </div>
  );
}






