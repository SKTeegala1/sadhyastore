import { useNavigate } from "@tanstack/react-router";
import { CATEGORIES } from "@/data/products";

export default function CategoryGrid({
  selectedCategoryId,
  onCategorySelect,
}: {
  selectedCategoryId: number | null;
  onCategorySelect: (categoryId: number | null) => void;
}) {
const navigate = useNavigate();
const handleCategoryClick = (id: number | null) => {
    if (id === null) {
        navigate({ to: "/" });
    } else {
        navigate({
            to: "/category/$categoryId",
            params: {
                categoryId: id.toString(),
            },
        });
    }
};

  return (
    <section id="categories" className="max-w-7xl mx-auto px-6 py-10">
      <div className="text-center mb-12">
        <p className="text-primary font-semibold uppercase tracking-widest text-xs">
          Shop by Category
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary mt-2">
          Handpicked Collections
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => handleCategoryClick(c.id)}
            className={`group text-center p-4 rounded-2xl border transition ${
              selectedCategoryId === c.id
                ? "ring-2 ring-primary"
                : "hover:shadow-lg"
            }`}
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="aspect-square rounded-full overflow-hidden mb-3 bg-muted">
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            <div className="font-semibold text-secondary text-sm">
              {c.name}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}