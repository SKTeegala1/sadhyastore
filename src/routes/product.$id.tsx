import { useCategories } from "@/lib/categories";
import { useCatalog } from "@/lib/catalog";
import { createFileRoute } from "@tanstack/react-router";

import ProductHeader from "@/components/product/ProductHeader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductLayout from "@/components/product/ProductLayout";
import ProductImage from "@/components/product/ProductImage";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ProductPurchase from "@/components/product/ProductPurchase";
import ProductContent from "@/components/product/ProductContent";
import { useCart } from "@/lib/cart";
import ProductGallery from "@/components/product/ProductGallery";
import ProductSection from "@/components/product/ProductSection";
import Hero from "@/components/home/Hero";

export const Route = createFileRoute("/product/$id")({
  component: ProductDetailsPage,
});

function ProductDetailsPage() {
  const { products: PRODUCTS, isPending: catalogLoading, error: catalogError } = useCatalog();
  const { categories: CATEGORIES } = useCategories();
  const { id } = Route.useParams();

  const { items } = useCart();

  const product = PRODUCTS.find((p) => p.id === id);

  const category = CATEGORIES.find((c) => c.id === product?.categoryId);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.categoryId === product?.categoryId && p.id !== product?.id,
  ).slice(0, 4);

  if (catalogLoading) return <p className="p-10 text-center">Loading product…</p>;
  if (catalogError)
    return (
      <p role="alert" className="p-10 text-center">
        Product details are unavailable. Please try again later.
      </p>
    );
  if (!product) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold">Product not found</h1>
      </div>
    );
  }

  return (
    <>
      <section className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}

        <Breadcrumb
          items={[
            {
              label: category?.name ?? "Category",
              to: "/",
            },
            {
              label: product.name,
            },
          ]}
        />
        <ProductLayout
          left={<ProductGallery product={product} />}
          right={
            <div className="lg:sticky lg:top-24 space-y-8">
              <ProductHeader product={product} />
              <ProductPurchase product={product} />
            </div>
          }
        />
        <ProductContent product={product} />

        <ProductSection title="You May Also Like" products={relatedProducts} />
      </section>
    </>
  );
}
