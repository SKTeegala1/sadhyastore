// import { createFileRoute } from "@tanstack/react-router";
// import { useRef, useState } from "react";
// import { CartProvider, useCart, type Product } from "@/lib/cart";
// import { FloatingCart } from "@/components/FloatingCart";
// import { ShoppingBag, Sparkles, Truck, Leaf, ShieldCheck } from "lucide-react";
// import hero from "@/assets/hero.jpg";
// import cashew from "@/assets/cashew-w210-jumbo-kaju.jpeg";
// import almond from "@/assets/almonds-regular.jpeg";
// import pistachio from "@/assets/salted-pistachio-round-pista.jpeg";
// import fig from "@/assets/premium-anjeer.jpeg";
// import namkeen from "@/assets/namkeen.jpg";
// import raisin from "@/assets/raisin-premium-kishmish.jpeg";
// import walnut from "@/assets/premium-akhrot.jpeg";
// import giftbox from "@/assets/giftbox.jpg";

// export const Route = createFileRoute("/index copy")({
//   component: Index,
// });

// //const [selectedCategory, setSelectedCategory] = useState("All");

// const PRODUCTS: Product[] = [
//   { id: "cashew", category: "Cashew", name: "Premium Kaju (Cashew)", price: 300, weight: "250g", image: cashew, tagline: "Buttery & crunchy W240 grade" },
//   { id: "almond", category: "Almond", name: "California Badam", price: 549, weight: "500g", image: almond, tagline: "Rich in vitamin E" },
//   { id: "pistachio", category: "Pistachio", name: "Roasted Pista", price: 899, weight: "500g", image: pistachio, tagline: "Salted & lightly roasted" },
//   { id: "fig", category: "Anjeer", name: "Anjeer (Dry Fig)", price: 799, weight: "500g", image: fig, tagline: "Afghan premium figs" },
//   { id: "raisin", category: "Raisin", name: "Golden Kishmish", price: 299, weight: "500g", image: raisin, tagline: "Naturally sun-dried" },
//   { id: "walnut", category: "Walnut", name: "Kashmiri Akhrot", price: 749, weight: "500g", image: walnut, tagline: "Fresh light halves" },
//   { id: "namkeen", category: "Snacks", name: "Masala Namkeen Mix", price: 249, weight: "400g", image: namkeen, tagline: "House-blend spice mix" },
//   { id: "gift", category: "GiftBoxes", name: "Royal Sadhya Gift Box", price: 1499, weight: "1kg", image: giftbox, tagline: "Festive assorted hamper" },
// ];

// const CATEGORIES = [
//   { name: "Cashew",category: "Cashew", image: cashew },
//   { name: "Almond",category: "Almond", image: almond },
//   { name: "Pistachio",category: "Pistachio", image: pistachio },
//   { name: "Anjeer",category: "Anjeer", image: fig },
//   { name: "Walnut",category: "Walnut", image: walnut },
//   { name: "Dates",category: "Dates", image: giftbox },
//   { name: "Pista",category: "Pista", image: giftbox },
//   { name: "Apricot",category: "Apricot", image: giftbox },
//   { name: "Seeds",category: "Seeds", image: giftbox },
//   { name: "Snacks",category: "Snacks", image: giftbox },
//   { name: "Dehydrated Fruits",category: "Dehydrated Fruits", image: giftbox },
//   { name: "Spices",category: "Spices", image: giftbox },
//   { name: "Gift Boxes",category: "GiftBoxes", image: giftbox },
// ];

// function Index() {
//   return (
//     <CartProvider>
//       <div className="min-h-screen bg-background font-sans">
//         <Header />
//         <Hero />
//         <Categories  />
//         <Products  />
//         <Features />
//         <Footer />
//         <FloatingCart />
//       </div>
//     </CartProvider>
//   );
// }

// //const filteredProducts =
// //  selectedCategory === "All"
// //    ? PRODUCTS
// //    : PRODUCTS.filter(
// //        (product) => product.category === selectedCategory
// //      );

// function Header() {
//   return (
//     <header className="sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//         <a href="#" className="flex items-center gap-3">
//           <div className="w-11 h-11 rounded-full grid place-items-center text-primary-foreground font-display font-bold" style={{ background: "var(--gradient-hero)" }}>
//             S
//           </div>
//           <div>
//             <div className="font-display text-xl font-bold leading-none text-secondary">Sadhya</div>
//             <div className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Snak Box</div>
//           </div>
//         </a>
//         <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
//           <a href="#shop" className="hover:text-primary transition">Shop</a>
//           <a href="#categories" className="hover:text-primary transition">Categories</a>
//           <a href="#why" className="hover:text-primary transition">Why Us</a>
//           <a href="#contact" className="hover:text-primary transition">Contact</a>
//         </nav>
//         <a href="#shop" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-primary-foreground text-sm font-semibold hover:scale-105 transition" style={{ background: "var(--gradient-hero)" }}>
//           <ShoppingBag className="w-4 h-4" /> Shop Now
//         </a>
//       </div>
//     </header>
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

// function Categories() {
//   return (
//     <section id="categories" className="max-w-7xl mx-auto px-6 py-20">
//       <div className="text-center mb-12">
//         <p className="text-primary font-semibold uppercase tracking-widest text-xs">Shop by Category</p>
//         <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary mt-2">Handpicked Collections</h2>
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//         {CATEGORIES.map((c) => (
//           <a key={c.name} href="#shop" className="group text-center p-4 rounded-2xl bg-card border hover:shadow-lg transition" style={{ boxShadow: "var(--shadow-card)" }}>
//             <div className="aspect-square rounded-full overflow-hidden mb-3 bg-muted">
//               <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
//             </div>
//             <div className="font-semibold text-secondary text-sm">{c.name}</div>
//           </a>
//         ))}
//       </div>
      
//     </section>
//   );
// }

// function Products() {
//   return (
//     <section id="shop" className="max-w-7xl mx-auto px-6 py-20">
//       <div className="text-center mb-14">
//         <p className="text-primary font-semibold uppercase tracking-widest text-xs">Our Bestsellers</p>
//         <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary mt-2">Fresh from the Kingdom</h2>
//         <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Each pack is hand-checked, vacuum-sealed and dispatched within 24 hours.</p>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {PRODUCTS.map((p) => (
//           <ProductCard key={p.id} product={p} />
//         ))}
//       </div>
//     </section>
//   );
// }

// function ProductCard({ product }: { product: Product }) {
//   const { add } = useCart();
//   const imgRef = useRef<HTMLImageElement>(null);

//   const handleAdd = () => {
//     const el = imgRef.current;
//     if (!el) return;
//     const r = el.getBoundingClientRect();
//     add(product, { x: r.left + r.width / 2, y: r.top + r.height / 2 }, product.image);
//   };

//   return (
//     <div className="group relative bg-card rounded-3xl overflow-hidden border flex flex-col hover:-translate-y-1 transition" style={{ boxShadow: "var(--shadow-card)" }}>
//       <div className="aspect-square overflow-hidden bg-muted">
//         <img ref={imgRef} src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
//       </div>
//       <div className="p-5 flex-1 flex flex-col">
//         <h3 className="font-display font-bold text-lg text-secondary">{product.name}</h3>
//         <p className="text-xs text-muted-foreground mt-1">{product.tagline}</p>
//         <p className="text-xs text-muted-foreground">{product.weight}</p>
//         <div className="mt-4 flex items-center justify-between">
//           <span className="font-display text-2xl font-bold text-primary">₹{product.price}</span>
//           <button
//             onClick={handleAdd}
//             className="px-4 py-2 rounded-full text-primary-foreground text-sm font-semibold flex items-center gap-1.5 hover:scale-105 transition"
//             style={{ background: "var(--gradient-hero)" }}
//           >
//             <ShoppingBag className="w-4 h-4" /> Add
//           </button>
//         </div>
//       </div>
//     </div>
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

// function Footer() {
//   return (
//     <footer id="contact" className="bg-background border-t">
//       <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
//         <div>
//           <div className="flex items-center gap-3">
//             <div className="w-11 h-11 rounded-full grid place-items-center text-primary-foreground font-display font-bold" style={{ background: "var(--gradient-hero)" }}>S</div>
//             <div>
//               <div className="font-display text-xl font-bold text-secondary">Sadhya Snak Box</div>
//               <div className="text-[10px] tracking-widest text-muted-foreground uppercase">Tradition · Nutrition</div>
//             </div>
//           </div>
//           <p className="text-sm text-muted-foreground mt-4 max-w-xs">Premium dry fruits, nuts & snack boxes handcrafted for every celebration.</p>
//         </div>
//         <div>
//           <h4 className="font-display font-bold text-secondary mb-3">Order via WhatsApp</h4>
//           <a href="https://wa.me/919014733003" target="_blank" rel="noreferrer" className="text-primary font-semibold hover:underline">+91 90147 33003</a>
//           <p className="text-sm text-muted-foreground mt-2">Message us to place your order or ask for custom hampers.</p>
//         </div>
//         <div>
//           <h4 className="font-display font-bold text-secondary mb-3">Quick Links</h4>
//           <ul className="space-y-2 text-sm text-muted-foreground">
//             <li><a href="#shop" className="hover:text-primary">Shop</a></li>
//             <li><a href="#categories" className="hover:text-primary">Categories</a></li>
//             <li><a href="#why" className="hover:text-primary">Why Sadhya</a></li>
//           </ul>
//         </div>
//       </div>
//       <div className="border-t py-5 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Sadhya Snak Box. Made with love.</div>
//     </footer>
//   );
// }
