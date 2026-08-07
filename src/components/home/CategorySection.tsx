import type { Product, Category } from "@/lib/cart";
import { useNavigate } from "@tanstack/react-router";
import ProductCard from "../ProductCard";

type Props = {
  category: Category;
  products: Product[];
};


export default function CategorySection({
  category,
  products,
}: Props) {

    const navigate = useNavigate();

    const handleViewAll = () => {
    navigate({
        to: "/category/$categoryId",
        params: {
            categoryId: category.id.toString(),
        },
    });
};

    return (
  <section className="mb-16">

    <div className="flex items-center justify-between mb-6">

      <div>

        <h2 className="text-3xl font-display font-bold text-secondary">
          {category.name}
        </h2>

        <p className="text-muted-foreground mt-1">
          Premium {category.name.toLowerCase()} Collection
        </p>

      </div>

      <button
        onClick={handleViewAll}
        className="text-primary font-semibold hover:underline"
      >
        View All →
      </button>

    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                      ))}
                    </div>

  </section>
);
}