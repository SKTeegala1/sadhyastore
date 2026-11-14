import { Link } from "@tanstack/react-router";
import type { Product, Category } from "@/lib/cart";
import ProductCard from "../ProductCard";
export default function CategorySection({
  category,
  products,
}: {
  category: Category;
  products: Product[];
}) {
  return (
    <section
      aria-label={`${category.name} products`}
      className="border-t border-primary/15 pt-8 sm:pt-10"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex min-w-0 items-center gap-3 font-display text-xl font-bold tracking-wide text-secondary sm:text-3xl">
          <span aria-hidden="true" className="text-base text-primary">
            ✦
          </span>
          {category.name}
          <span aria-hidden="true" className="hidden h-px w-12 bg-primary/40 sm:block" />
        </h2>
        <Link
          to="/category/$categoryId"
          params={{ categoryId: String(category.id) }}
          aria-label={`View all ${category.name} products`}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-primary/30 px-4 text-sm font-semibold text-primary transition hover:bg-primary/10"
        >
          View All <span aria-hidden="true">→</span>
        </Link>
      </div>
      {products.length ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
          New products are coming to this collection soon.
        </p>
      )}
    </section>
  );
}
