import { useCatalog } from "@/lib/catalog";
import { useCategories } from "@/lib/categories";
import ProductCard from "@/components/ProductCard";
import CategorySection from "./CategorySection";
export default function ProductSections() {
  const { products, isPending, error } = useCatalog();
  const { categories, isPending: categoriesLoading, error: categoriesError } = useCategories();
  const featured = products.filter((p) => p.isBestSeller);
  const bestsellers = (featured.length ? featured : products).slice(0, 8);
  const offers = categories.find((category) => category.id === 101);
  const collections = categories.filter((category) => category.id !== offers?.id);
  if (isPending || categoriesLoading)
    return (
      <p role="status" className="p-10 text-center">
        Loading products…
      </p>
    );
  if (error || categoriesError)
    return (
      <p role="alert" className="p-10 text-center">
        Products are unavailable. Please try again later.
      </p>
    );
  return (
    <div
      id="shop"
      className="mx-auto max-w-7xl scroll-mt-24 space-y-10 px-4 py-10 sm:space-y-14 sm:px-6 sm:py-14"
    >
      {offers && (
        <CategorySection
          category={offers}
          products={products.filter((p) => p.categoryId === offers.id || p.isOffer).slice(0, 8)}
        />
      )}
      <section
        aria-label="Best selling products"
        className="border-t border-primary/15 pt-8 sm:pt-10"
      >
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-primary">
            Customer favourites
          </p>
          <h2 className="mt-3 flex items-center justify-center gap-3 font-display text-2xl font-bold text-secondary sm:text-4xl">
            <span aria-hidden="true" className="text-base text-primary">
              ✦
            </span>
            Best Selling
            <span aria-hidden="true" className="text-base text-primary">
              ✦
            </span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Our handpicked favourites for your everyday pantry.
          </p>
        </div>
        {bestsellers.length ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            Our best-selling selection is coming soon.
          </p>
        )}
      </section>
      {collections.map((category) => (
        <CategorySection
          key={category.id}
          category={category}
          products={products.filter((p) => p.categoryId === category.id).slice(0, 8)}
        />
      ))}
    </div>
  );
}
