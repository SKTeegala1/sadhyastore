import { Search } from "lucide-react";
import { useState } from "react";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { useNavigate } from "@tanstack/react-router";
import { Product } from "@/lib/cart";
import { useEffect, useRef ,useMemo} from "react";




export default function SearchBar() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const itemRefs =
    useRef<(HTMLDivElement | null)[]>([]);


    const searchRef = useRef<HTMLDivElement>(null);

   const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];

    const search = query.toLowerCase();

    return PRODUCTS.filter((product) => {

        const category = CATEGORIES.find(
            c => c.id === product.categoryId
        );

        return (
            product.name.toLowerCase().includes(search) ||
            product.tagline.toLowerCase().includes(search) ||
            category?.name.toLowerCase().includes(search)
        );

    }).slice(0, 6);

}, [query]);

useEffect(() => {

    if (
        selectedIndex >= 0 &&
        itemRefs.current[selectedIndex]
    ) {

        itemRefs.current[selectedIndex]
            ?.scrollIntoView({

                block: "nearest",

            });

    }

}, [selectedIndex]);

useEffect(() => {

    setSelectedIndex(-1);

}, [query]);


const handleProductClick = (
    product: Product
) => {

    navigate({

        to: "/product/$id",

        params: {

            id: product.id,

        },

    });

    setQuery("");

    setSelectedIndex(-1);

};


const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
) => {

    if (!filteredProducts.length)
        return;

    switch (e.key) {

        case "ArrowDown":

            e.preventDefault();

            setSelectedIndex(prev =>
                prev < filteredProducts.length - 1
                    ? prev + 1
                    : 0
            );

            break;

        case "ArrowUp":

            e.preventDefault();

            setSelectedIndex(prev =>
                prev > 0
                    ? prev - 1
                    : filteredProducts.length - 1
            );

            break;

        case "Enter":

            if (selectedIndex >= 0) {

                e.preventDefault();

                handleProductClick(
                    filteredProducts[selectedIndex]
                );
            }

            break;

        case "Escape":

            setQuery("");

            break;

    }

};



useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (
            searchRef.current &&
            !searchRef.current.contains(event.target as Node)
        ) {
            setQuery("");
        }
    };

    document.addEventListener(
        "mousedown",
        handleClickOutside
    );

    return () => {
        document.removeEventListener(
            "mousedown",
            handleClickOutside
        );
    };
}, []);

  return (
    <div
    ref={searchRef}
    className="relative w-72"
>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={18}
      />

      <input
    type="text"
    placeholder="Search products..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    onKeyDown={handleKeyDown}
    className="w-full rounded-full border bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
/>

{filteredProducts.length > 0 && (
  <div className="absolute left-0 right-0 mt-2 rounded-2xl border bg-background shadow-xl overflow-hidden z-50">

    {filteredProducts.map((product, index) => (

      <div
        key={product.id}
        onClick={() => handleProductClick(product)}
        className={`flex items-center gap-3 p-3 cursor-pointer transition
${
selectedIndex === index
? "bg-primary/10"
: "hover:bg-muted"
}`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-12 h-12 rounded-lg object-cover"
        />

        <div className="flex-1">

          <div className="font-semibold">
            {product.name}
          </div>

          <div className="text-sm text-muted-foreground">
            ₹{product.price}
          </div>

        </div>

      </div>

    ))}

  </div>
)}

    </div>
  );
}