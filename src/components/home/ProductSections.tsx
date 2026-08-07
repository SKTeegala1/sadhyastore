import { PRODUCTS, CATEGORIES, CATEGORY_IDS } from "@/data/products";
import CategorySection from "./CategorySection";
import { PRODUCTS_PER_ROW } from "@/constants/product";

export default function ProductSections() {
  const categoryIdsToShow = Object.values(CATEGORY_IDS);

  return (
    <section
      id="shop"
      className="max-w-7xl mx-auto px-6 py-10 scroll-mt-28"
    >
      <div className="text-center mb-14">
        <p className="text-primary font-semibold uppercase tracking-widest text-xs">
          Our Bestsellers
        </p>

        <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary mt-2">
          Fresh from the Sadhya
        </h2>

        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          Each pack is hand-checked, vacuum-sealed and dispatched within 24
          hours.
        </p>
      </div>

      <div className="space-y-16">
        {categoryIdsToShow.map((categoryId) => 
        {

            
    const category = CATEGORIES.find(
        c => c.id === categoryId
    );

    if (!category) return null;

    const categoryProducts = PRODUCTS.filter(
        p => p.categoryId === categoryId
    );

    const visibleProducts =
    categoryProducts.slice(0, PRODUCTS_PER_ROW);

    if (categoryProducts.length === 0)
        return null;

    return (
       <CategorySection
    key={category.id}
    category={category}
    products={visibleProducts}
/>
    );

})}

      </div>

    </section>
  );
}