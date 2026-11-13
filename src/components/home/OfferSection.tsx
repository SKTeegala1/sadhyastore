import { Sparkles } from "lucide-react";
import { useCatalog } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";

export default function OfferSection() {
  const { products } = useCatalog();
  const offerProducts = products.filter((product) => product.isOffer);

  if (offerProducts.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl scroll-mt-28 px-6 py-10">
      <header className="mb-10 text-center md:mb-14">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
          <Sparkles className="h-4 w-4" />
          Limited-time deals
        </p>

        <h2 className="mt-2 text-3xl font-bold text-secondary sm:text-4xl md:text-5xl">
          Offers <span className="text-primary">for You</span>
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          Enjoy special prices on your favourite dry fruits and snacks.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {offerProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
