// import { createFileRoute } from "@tanstack/react-router";
// import { useRef, useState } from "react";
// import { CartProvider, useCart, type Product } from "@/lib/cart";
// import FloatingCart from "@/components/FloatingCart";
// import { ShoppingBag, Sparkles, Truck, Leaf, ShieldCheck, LogOut } from "lucide-react";
// import hero from "@/assets/hero.jpg";
// import { PRODUCTS, CATEGORIES } from "@/data/products";
// import Header from "@/components/layout/Header";
// import { useNavigate } from "@tanstack/react-router";

// import ProductCard from "@/components/ProductCard";
// import Footer from "@/components/layout/Footer";
// export const Route = createFileRoute("/")({
//   component: Index,
// });



// function Index() {
//    const [selectedCategoryId, setSelectedCategoryId] =
//   useState<number | null>(null);
//    return (
    
//       <div className="min-h-screen bg-background font-sans">
//         <Hero />
//         <Categories
//           selectedCategoryId={selectedCategoryId}
//           onCategorySelect={setSelectedCategoryId}
//         />
//         <Products selectedCategoryId={selectedCategoryId} />
//         <Features />
//       </div>
//   );
// }



// function Hero() {
//   return (
//     <section className="relative overflow-hidden">
//       <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, oklch(0.94 0.08 70), oklch(0.88 0.14 55))" }} />
//       <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
//         <div className="animate-float-up">
//           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/70 backdrop-blur border text-xs font-semibold text-secondary mb-6">
//             <Sparkles className="w-3.5 h-3.5 text-primary" /> TRADITION · OCCASION · NUTRITION
//           </div>
//           <h1 className="font-display text-5xl md:text-7xl font-bold text-secondary leading-[1.05]">
//             Indulge in a <span className="italic text-primary">handcrafted</span> box of goodness.
//           </h1>
//           <p className="mt-6 text-lg text-secondary/80 max-w-lg">
//             Premium dry fruits, roasted nuts and artisanal namkeens — sourced from India's finest orchards and packed fresh for you.
//           </p>
//           <div className="mt-8 flex flex-wrap gap-4">
//             <a href="#shop" className="px-8 py-4 rounded-full text-primary-foreground font-semibold hover:scale-105 transition" style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-warm)" }}>
//               Shop Now
//             </a>
//             <a href="#categories" className="px-8 py-4 rounded-full border-2 border-secondary text-secondary font-semibold hover:bg-secondary hover:text-primary-foreground transition">
//               Explore Range
//             </a>
//           </div>
//           <div className="mt-10 flex items-center gap-6 text-sm text-secondary/80">
//             <div><span className="font-display font-bold text-2xl text-primary">10K+</span><div className="text-xs">Happy Boxes</div></div>
//             <div className="w-px h-10 bg-secondary/20" />
//             <div><span className="font-display font-bold text-2xl text-primary">100%</span><div className="text-xs">Fresh Sourced</div></div>
//             <div className="w-px h-10 bg-secondary/20" />
//             <div><span className="font-display font-bold text-2xl text-primary">4.9★</span><div className="text-xs">Rated</div></div>
//           </div>
//         </div>
//         <div className="relative animate-float-up">
//           <div className="absolute -inset-8 rounded-full blur-3xl opacity-40" style={{ background: "var(--gradient-warm)" }} />
//           <img src={hero} alt="Assorted Sadhya Snack Boxes" className="relative rounded-3xl shadow-2xl" width={1600} height={900} />
//           <div className="absolute -bottom-6 -left-6 bg-background rounded-2xl px-5 py-3 shadow-xl border">
//             <div className="text-xs text-muted-foreground">Flat</div>
//             <div className="font-display font-bold text-3xl text-primary">10% OFF</div>
//             <div className="text-xs text-secondary">on first order</div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function Categories({
//   selectedCategoryId,
//   onCategorySelect,
// }: {
//   selectedCategoryId: number | null;
//   onCategorySelect: (categoryId: number | null) => void;
// }) {
// const navigate = useNavigate();
// const handleCategoryClick = (id: number | null) => {
//     if (id === null) {
//         navigate({ to: "/" });
//     } else {
//         navigate({
//             to: "/category/$categoryId",
//             params: {
//                 categoryId: id.toString(),
//             },
//         });
//     }
// };

//   return (
//     <section id="categories" className="max-w-7xl mx-auto px-6 py-20">
//       <div className="text-center mb-12">
//         <p className="text-primary font-semibold uppercase tracking-widest text-xs">
//           Shop by Category
//         </p>
//         <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary mt-2">
//           Handpicked Collections
//         </h2>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

//         {/* All Category */}
//         <button
//           onClick={() => handleCategoryClick(null)}
//           className={`group text-center p-4 rounded-2xl border transition ${
//             selectedCategoryId === null
//               ? "bg-primary text-white"
//               : "bg-card hover:shadow-lg"
//           }`}
//         >
//           <div className="font-semibold text-sm">All</div>
//         </button>

//         {CATEGORIES.map((c) => (
//           <button
//             key={c.id}
//             onClick={() => handleCategoryClick(c.id)}
//             className={`group text-center p-4 rounded-2xl border transition ${
//               selectedCategoryId === c.id
//                 ? "ring-2 ring-primary"
//                 : "hover:shadow-lg"
//             }`}
//             style={{ boxShadow: "var(--shadow-card)" }}
//           >
//             <div className="aspect-square rounded-full overflow-hidden mb-3 bg-muted">
//               <img
//                 src={c.image}
//                 alt={c.name}
//                 loading="lazy"
//                 className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//               />
//             </div>

//             <div className="font-semibold text-secondary text-sm">
//               {c.name}
//             </div>
//           </button>
//         ))}
//       </div>
//     </section>
//   );
// }


// function Products({
//   selectedCategoryId,
// }: {
//   selectedCategoryId: number | null;
// }) {
//   const filteredProducts =
//   selectedCategoryId === null
//     ? PRODUCTS
//     : PRODUCTS.filter(
//         (product) => product.categoryId === selectedCategoryId
//       );
//   return (
//     <section id="shop" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-28">
//       <div className="text-center mb-14">
//         <p className="text-primary font-semibold uppercase tracking-widest text-xs">
//           Our Bestsellers
//         </p>
//         <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary mt-2">
//           Fresh from the Sadhya
//         </h2>
//         <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
//           Each pack is hand-checked, vacuum-sealed and dispatched within 24
//           hours.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((p) => (
//             <ProductCard
//     key={p.id}
//     product={p}/>
//           ))
//         ) : (
//           <div className="col-span-full text-center text-muted-foreground py-10">
//             No products available in this category.
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// function Features() {
//   const feats = [
//     { icon: Leaf, title: "100% Natural", desc: "No preservatives, no additives — just pure goodness." },
//     { icon: Truck, title: "Fresh Delivery", desc: "Vacuum-sealed & dispatched within 24 hours pan-India." },
//     { icon: ShieldCheck, title: "Quality Assured", desc: "Hand-graded and lab-tested for freshness & purity." },
//     { icon: Sparkles, title: "Festive Ready", desc: "Elegant gift boxes for every occasion & celebration." },
//   ];
//   return (
//     <section id="why" className="py-20" style={{ background: "linear-gradient(135deg, oklch(0.36 0.11 30), oklch(0.28 0.08 25))" }}>
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="text-center mb-14">
//           <p className="text-accent font-semibold uppercase tracking-widest text-xs">Why Sadhya</p>
//           <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mt-2">Every box tells a story of care.</h2>
//         </div>
//         <div className="grid md:grid-cols-4 gap-6">
//           {feats.map((f) => (
//             <div key={f.title} className="p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 text-primary-foreground">
//               <div className="w-12 h-12 rounded-xl grid place-items-center mb-4" style={{ background: "var(--gradient-warm)" }}>
//                 <f.icon className="w-6 h-6 text-primary-foreground" />
//               </div>
//               <h3 className="font-display font-bold text-xl">{f.title}</h3>
//               <p className="text-sm text-primary-foreground/70 mt-2">{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


