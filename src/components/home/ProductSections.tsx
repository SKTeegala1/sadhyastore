import { useCatalog } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";
export default function ProductSections() {
  const { products, isPending, error } = useCatalog();
  const featured = products.filter((p) => p.isBestSeller);
  const bestsellers = (featured.length ? featured : products).slice(0, 8);
  return (
    <section id="shop" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-primary">
          Customer favourites
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-secondary sm:text-5xl">
          Best Selling
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Our handpicked favourites for your everyday pantry.
        </p>
      </div>
      {isPending ? (
        <p role="status" className="text-center">
          Loading products…
        </p>
      ) : error ? (
        <p role="alert" className="text-center">
          Products are unavailable. Please try again later.
        </p>
      ) : !bestsellers.length ? (
        <p className="rounded-2xl border border-dashed p-8 text-center text-muted-foreground">
          Explore our collections above. Our best-selling selection is coming soon.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
