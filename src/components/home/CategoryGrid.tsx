import { Link } from "@tanstack/react-router";
import { useCategories } from "@/lib/categories";
export default function CategoryGrid() {
  const { categories, isPending, error } = useCategories();
  return (
    <section id="categories" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-primary">Our Categories</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-secondary sm:text-5xl">
          Handpicked Collections
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Discover everyday goodness, picked for you.
        </p>
      </div>
      {isPending ? (
        <p role="status" className="text-center">
          Loading collections…
        </p>
      ) : error ? (
        <p role="alert" className="text-center">
          Collections are unavailable. Please try again.
        </p>
      ) : !categories.length ? (
        <p className="text-center text-muted-foreground">New collections are coming soon.</p>
      ) : (
        <div className="grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-4 sm:gap-6 lg:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/category/$categoryId"
              params={{ categoryId: String(c.id) }}
              className="group flex min-w-0 flex-col items-center rounded-2xl p-1 text-center outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-3"
            >
              <div className="mb-3 aspect-square w-full max-w-36 overflow-hidden rounded-full border border-primary/10 bg-muted shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md">
                <img
                  src={c.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <span className="text-xs font-semibold leading-snug text-secondary sm:text-sm">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
