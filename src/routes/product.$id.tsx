import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/data/products";
import ProductHeader from "@/components/product/ProductHeader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductLayout from "@/components/product/ProductLayout";
import ProductImage from "@/components/product/ProductImage";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ProductPurchase from "@/components/product/ProductPurchase";
import ProductContent from "@/components/product/ProductContent";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$id")({
  component: ProductDetailsPage,
});

function ProductDetailsPage() {
  const { id } = Route.useParams();

  const { items } = useCart();
  console.log(items);

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold">
          Product not found
        </h1>
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
      label: product.category,
      to: "/",
    },
    {
      label: product.name,
    },
  ]}
/>
<ProductLayout
  left={<ProductImage product={product} />}
  right={
   <div className="lg:sticky lg:top-24 space-y-8">
    <ProductHeader product={product} />
    <ProductPurchase product={product} />
</div>
  }
/>
      <ProductContent
            product={product}
        />

    </section>


  </>
);
}