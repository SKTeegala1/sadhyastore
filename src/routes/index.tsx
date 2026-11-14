import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import CategoryGrid from "@/components/home/CategoryGrid";
import ProductSections from "@/components/home/ProductSections";
export const Route = createFileRoute("/")({ component: Index });
function Index() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Hero />
      <CategoryGrid />
      <ProductSections />
      <Features />
    </div>
  );
}
