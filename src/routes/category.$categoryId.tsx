import { useCategories } from "@/lib/categories";
import { useCatalog } from "@/lib/catalog";
import { createFileRoute } from "@tanstack/react-router";

import Breadcrumb from "@/components/layout/Breadcrumb";
import ProductCard from "@/components/ProductCard";

export const Route = createFileRoute("/category/$categoryId")({
  component: CategoryPage,
});

function CategoryPage() {
  const { categoryId } = Route.useParams();

  const { categories, isPending: categoriesLoading, error: categoriesError } = useCategories();
  const category = categories.find((c) => c.id === Number(categoryId));

  const { products: allProducts, isPending, error } = useCatalog();
  const products = allProducts.filter(
    (p) => p.categoryId === Number(categoryId) || (Number(categoryId) === 101 && p.isOffer),
  );
  if (isPending || categoriesLoading) return <p className="p-10 text-center">Loading products…</p>;
  if (error || categoriesError)
    return (
      <p role="alert" className="p-10 text-center">
        Products are unavailable. Please try again later.
      </p>
    );

  if (!category) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold">Category not found</h1>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          {
            label: category.name,
          },
        ]}
      />

      <div className="mt-6 mb-10">
        <h1 className="text-4xl font-bold">{category.name}</h1>

        <p className="text-muted-foreground mt-2">
          Explore our premium {category.name.toLowerCase()} collection.
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">No products available.</div>
      )}
    </section>
  );
}
