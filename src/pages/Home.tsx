// import { createFileRoute } from "@tanstack/react-router";
// import { useRef, useState } from "react";
// import { CartProvider, useCart, type Product } from "@/lib/cart";
// import { FloatingCart } from "@/components/FloatingCart";
// import { ShoppingBag, Sparkles, Truck, Leaf, ShieldCheck, LogOut } from "lucide-react";
// import hero from "@/assets/hero.jpg";
// import cashew from "@/assets/cashew-w210-jumbo-kaju.jpeg";
// import almond from "@/assets/almonds-regular.jpeg";
// import pistachio from "@/assets/salted-pistachio-round-pista.jpeg";
// import fig from "@/assets/premium-anjeer.jpeg";
// import namkeen from "@/assets/namkeen.jpg";
// import raisin from "@/assets/raisin-premium-kishmish.jpeg";
// import walnut from "@/assets/premium-akhrot.jpeg";
// import giftbox from "@/assets/giftbox.jpg";
// import logo from "@/assets/logo.jpg";
// import ProductCard from "@/components/ProductCard";
// import ProductDialog from "@/components/ProductDialog/ProductDialog";

// export const Route = createFileRoute("/")({
//   component: Index,
// });

// //const [selectedCategory, setSelectedCategory] = useState("All");

// const PRODUCTS: Product[] = [

//   {
//     id: "cashew-premium",

//     category: "Cashew",

//     name: "Premium W240 Cashew",

//     price: 349,

//     weight: "250g",

//     image: cashew,

//     tagline: "Buttery & crunchy whole cashews",

//     variants: [
//         {
//             weight: "250g",
//             price: 349,
//         },
//         {
//             weight: "500g",
//             price: 689,
//         },
//         {
//             weight: "1kg",
//             price: 1349,
//         },
//     ],

//     description:
//         "Premium W240 whole cashews carefully selected for their rich taste, crunchy texture, and natural freshness. Vacuum packed to preserve quality and flavour.",

//     benefits: [
//         "Rich in Protein",
//         "Heart Healthy",
//         "High in Magnesium",
//         "No Artificial Preservatives",
//     ],

//     nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },

//     storage: [
//         "Store in a cool & dry place.",
//         "Keep in an airtight container after opening.",
//     ],

//     delivery: [
//         "Ships within 24 Hours",
//         "Vacuum Packed",
//         "Pan India Delivery",
//     ],

//     rating: 4.9,

//     reviews: 128,

//     badge: "Best Seller",
// },
//   // Cashew
//   {
//     id: "cashew-w240", category: "Cashew", price: 349,
//     weight: "250g", name: "Premium Kaju W240", image: cashew, tagline: "Large premium whole cashews", variants: [{ weight: "250g", price: 500 }, { weight: "500g", price: 799 }, { weight: "1kg", price: 1499 }],
//     description: "",
//     benefits: [],
//     nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "cashew-w320", category: "Cashew", price: 299, weight: "250g", name: "Premium Kaju W320", image: cashew, tagline: "Everyday crunchy goodness", variants: [{ weight: "500g", price: 699 }, { weight: "1kg", price: 1299 }],
//     description: "",
//     benefits: [],
//     nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "cashew-salted", category: "Cashew", price: 299, weight: "250g", name: "Roasted Salted Cashews", image: cashew, tagline: "Perfect tea-time snack", variants: [{ weight: "500g", price: 699 }, { weight: "1kg", price: 1299 }],
//     description: "",
//     benefits: [],
//       nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },

//   // Almond
//   {
//     id: "almond-california", category: "Almond", price: 399, weight: "250g", name: "California Almonds", image: almond, tagline: "Rich in Vitamin E", variants: [{ weight: "500g", price: 699 }, { weight: "1kg", price: 1299 }],
//     description: "",
//     benefits: [],
//    nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "almond-premium", category: "Almond", price: 299, weight: "250g", name: "Premium Badam", image: almond, tagline: "Naturally crunchy & fresh", variants: [{ weight: "250g", price: 299 }, { weight: "500g", price: 599 }],
//     description: "",
//     benefits: [],
//    nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "almond-roasted", category: "Almond", price: 299, weight: "250g", name: "Roasted Almonds", image: almond, tagline: "Lightly roasted perfection", variants: [{ weight: "500g", price: 599 }, { weight: "1kg", price: 1099 }],
//     description: "",
//     benefits: [],
//    nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },

//   // Pista
//   {
//     id: "pista-salted", category: "Pista", price: 399, weight: "250g", name: "Salted Roasted Pista", image: pistachio, tagline: "Premium crunchy pistachios", variants: [{ weight: "500g", price: 899 }, { weight: "1kg", price: 1699 }],
//     description: "",
//     benefits: [],
//   nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "pista-premium", category: "Pista", price: 469, weight: "250g", name: "Premium Pista", image: pistachio, tagline: "Freshly selected kernels", variants: [{ weight: "250g", price: 469 }, { weight: "500g", price: 899 }],
//     description: "",
//     benefits: [],
//    nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "pista-jumbo", category: "Pista", price: 949, weight: "250g", name: "Jumbo Pista", image: pistachio, tagline: "Extra large premium nuts", variants: [{ weight: "500g", price: 949 }, { weight: "1kg", price: 1799 }],
//     description: "",
//     benefits: [],
//   nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },

//   // Anjeer
//   {
//     id: "anjeer-afghan", category: "Anjeer", price: 799, weight: "250g", name: "Afghan Anjeer", image: fig, tagline: "Naturally sweet dry figs", variants: [{ weight: "500g", price: 799 }],
//     description: "",
//     benefits: [],
//    nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "anjeer-premium", category: "Anjeer", price: 429, weight: "250g", name: "Premium Dry Figs", image: fig, tagline: "Soft & fibre rich", variants: [{ weight: "250g", price: 429 }],
//     description: "",
//     benefits: [],
//    nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },

//   // Walnut
//   {
//     id: "walnut-light", category: "Walnut", price: 749, weight: "250g", name: "Light Walnut Kernels", image: walnut, tagline: "Healthy omega-3 rich nuts", variants: [{ weight: "500g", price: 749 }],
//     description: "",
//     benefits: [],
//    nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "walnut-premium", category: "Walnut", price: 399, weight: "250g", name: "Premium Akhrot", image: walnut, tagline: "Fresh handpicked kernels", variants: [{ weight: "250g", price: 399 }],
//     description: "",
//     benefits: [],
//     nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },

//   // Dates
//   {
//     id: "dates-ajwa", category: "Dates", price: 699, weight: "250g", name: "Ajwa Dates", image: giftbox, tagline: "Soft premium Arabian dates", variants: [{ weight: "500g", price: 699 }],
//     description: "",
//     benefits: [],
//    nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "dates-medjool", category: "Dates", price: 899, weight: "250g", name: "Medjool Dates", image: giftbox, tagline: "King of all dates", variants: [{ weight: "500g", price: 899 }],
//     description: "",
//     benefits: [],
//    nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "dates-kimia", category: "Dates", price: 399, weight: "250g", name: "Kimia Dates", image: giftbox, tagline: "Naturally juicy & sweet", variants: [{ weight: "500g", price: 399 }],
//     description: "",
//     benefits: [],
//     nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },

//   // Apricot
//   {
//     id: "apricot-premium", category: "Apricot", price: 549, weight: "250g", name: "Premium Apricots", image: giftbox, tagline: "Soft & naturally sweet", variants: [{ weight: "500g", price: 549 }],
//     description: "",
//     benefits: [],
//     nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "apricot-dried", category: "Apricot", price: 299, weight: "250g", name: "Dried Apricots", image: giftbox, tagline: "Rich in antioxidants", variants: [{ weight: "250g", price: 299 }],
//     description: "",
//     benefits: [],
//     nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },

//   // Seeds
//   {
//     id: "seed-mix", category: "Seeds", price: 299, weight: "250g", name: "Healthy Seed Mix", image: giftbox, tagline: "5 super seeds in one pack", variants: [{ weight: "250g", price: 299 }],
//     description: "",
//     benefits: [],
//     nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "chia", category: "Seeds", price: 249, weight: "250g", name: "Chia Seeds", image: giftbox, tagline: "Excellent source of fibre", variants: [{ weight: "250g", price: 249 }],
//     description: "",
//     benefits: [],
//    nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "flax", category: "Seeds", price: 199, weight: "250g", name: "Flax Seeds", image: giftbox, tagline: "Rich in omega-3", variants: [{ weight: "250g", price: 199 }],
//     description: "",
//     benefits: [],
//     nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "pumpkin", category: "Seeds", price: 349, weight: "250g", name: "Pumpkin Seeds", image: giftbox, tagline: "Protein packed snack", variants: [{ weight: "250g", price: 349 }],
//     description: "",
//     benefits: [],
//     nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },

//   // Snacks
//   {
//     id: "namkeen", category: "Snacks", price: 199, weight: "300g", name: "Masala Namkeen Mix", image: namkeen, tagline: "Crispy traditional mix", variants: [{ weight: "300g", price: 199 }, { weight: "500g", price: 299 }],
//     description: "",
//     benefits: [],
//    nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "corn-mixture", category: "Snacks", price: 199, weight: "300g", name: "Corn Mixture", image: namkeen, tagline: "Crunchy & spicy delight", variants: [{ weight: "300g", price: 199 }],
//     description: "",
//     benefits: [],
//     nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "diet-mixture", category: "Snacks", price: 279, weight: "300g", name: "Diet Mixture", image: namkeen, tagline: "Healthy roasted snack", variants: [{ weight: "300g", price: 279 }],
//     description: "",
//     benefits: [],
//     nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },

//   // Dehydrated Fruits
//   {
//     id: "kiwi", category: "Dehydrated Fruits", price: 399, weight: "250g", name: "Dried Kiwi", image: giftbox, tagline: "Tangy tropical slices", variants: [{ weight: "250g", price: 399 }],
//     description: "",
//     benefits: [],
//     nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "pineapple", category: "Dehydrated Fruits", price: 349, weight: "250g", name: "Dried Pineapple", image: giftbox, tagline: "Naturally sweet bites", variants: [{ weight: "250g", price: 349 }],
//     description: "",
//     benefits: [],
//     nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "strawberry", category: "Dehydrated Fruits", price: 449, weight: "250g", name: "Dried Strawberry", image: giftbox, tagline: "Burst of fruity flavour", variants: [{ weight: "250g", price: 449 }],
//     description: "",
//     benefits: [],
//    nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },

//   // Spices
//   {
//     id: "turmeric", category: "Spices", price: 149, weight: "250g", name: "Organic Turmeric Powder", image: giftbox, tagline: "Pure farm-fresh turmeric", variants: [{ weight: "250g", price: 149 }],
//     description: "",
//     benefits: [],
//     nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "pepper", category: "Spices", price: 249, weight: "250g", name: "Black Pepper", image: giftbox, tagline: "Bold aroma & flavour", variants: [{ weight: "250g", price: 249 }],
//     description: "",
//     benefits: [],
//    nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "cardamom", category: "Spices", price: 499, weight: "100g", name: "Green Cardamom", image: giftbox, tagline: "Premium aromatic spice", variants: [{ weight: "100g", price: 499 }],
//     description: "",
//     benefits: [],
//     nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },

//   // Gift Boxes
//   {
//     id: "gift-classic", category: "GiftBoxes", price: 999, weight: "750g", name: "Classic Gift Box", image: giftbox, tagline: "Perfect for every celebration", variants: [{ weight: "750g", price: 999 }],
//     description: "",
//     benefits: [],
//     nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "gift-premium", category: "GiftBoxes", price: 1499, weight: "1kg", name: "Premium Gift Box", image: giftbox, tagline: "Luxury assorted dry fruits", variants: [{ weight: "1kg", price: 1499 }],
//     description: "",
//     benefits: [],
//     nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
//   {
//     id: "gift-deluxe", categoryId: CATEGORIES., price: 2499, weight: "2kg", name: "Deluxe Family Hamper", image: giftbox, tagline: "Elegant festive gifting", variants: [{ weight: "2kg", price: 2499 }],
//     description: "",
//     benefits: [],
//    nutrition: {

//     servingSize: "100g",

//     items: [

//         {
//             name: "Energy",
//             value: 553,
//             unit: "kcal",
//         },

//         {
//             name: "Protein",
//             value: 18,
//             unit: "g",
//         },

//         {
//             name: "Carbohydrates",
//             value: 30,
//             unit: "g",
//         },

//         {
//             name: "Fat",
//             value: 44,
//             unit: "g",
//         },

//         {
//             name: "Fiber",
//             value: 3,
//             unit: "g",
//         },

//         {
//             name: "Calcium",
//             value: 37,
//             unit: "mg",
//         },

//         {
//             name: "Iron",
//             value: 6,
//             unit: "mg",
//         },

//     ],
// },
//     storage: [],
//     delivery: [],
//     rating: 0,
//     reviews: 0
//   },
// ];

// const CATEGORIES = [
//   { name: "Cashew",category: "Cashew", image: cashew },
//   { name: "Almond",category: "Almond", image: almond },
//   { name: "Pistachio",category: "Pista", image: pistachio },
//   { name: "Anjeer",category: "Anjeer", image: fig },
//   { name: "Walnut",category: "Walnut", image: walnut },
//   { name: "Dates",category: "Dates", image: giftbox },
//   { name: "Raisins",category: "Raisin", image: giftbox },
//   { name: "Pista",category: "Pista", image: giftbox },
//   { name: "Apricot",category: "Apricot", image: giftbox },
//   { name: "Seeds",category: "Seeds", image: giftbox },
//   { name: "Snacks",category: "Snacks", image: giftbox },
//   { name: "Dehydrated Fruits",category: "Dehydrated Fruits", image: giftbox },
//   { name: "Spices",category: "Spices", image: giftbox },
//   { name: "Gift Boxes",category: "GiftBoxes", image: giftbox },
// ];

// function Home() {
//    const [selectedCategory, setSelectedCategory] = useState("All");
//    return (
    
//       <div className="min-h-screen bg-background font-sans">
//         <Header />
//         <Hero />
//         <Categories
//           selectedCategory={selectedCategory}
//           onCategorySelect={setSelectedCategory}
//         />
//         <Products selectedCategory={selectedCategory} />
//         <Features />
//         <Footer />
//         <FloatingCart />
//       </div>
//   );
// }



// function Header() {
//   return (
//     <header className="sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//         <a href="#" className="flex items-center gap-3">
//           {/* <div className="w-11 h-11 rounded-full grid place-items-center text-primary-foreground font-display font-bold" style={{ background: "var(--gradient-hero)" }}>
//             S
//           </div> */}
//           <div
//   className="w-11 h-11 rounded-full overflow-hidden border border-primary/20 bg-white flex items-center justify-center"
// >
//   <img
//     src={logo}
//     alt="Sadhya Snack Box"
//     className="w-full h-full object-cover"
//   />
// </div>
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

// function Categories({
//   selectedCategory,
//   onCategorySelect,
// }: {
//   selectedCategory: string;
//   onCategorySelect: (category: string) => void;
// }) {
//   const handleCategoryClick = (category: string) => {
//   onCategorySelect(category);

//   setTimeout(() => {
//     document.getElementById("shop")?.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   }, 50);
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
//           onClick={() => handleCategoryClick("All")}
//           className={`group text-center p-4 rounded-2xl border transition ${
//             selectedCategory === "All"
//               ? "bg-primary text-white"
//               : "bg-card hover:shadow-lg"
//           }`}
//         >
//           <div className="font-semibold text-sm">All</div>
//         </button>

//         {CATEGORIES.map((c) => (
//           <button
//             key={c.category}
//             onClick={() => handleCategoryClick(c.category)}
//             className={`group text-center p-4 rounded-2xl border transition ${
//               selectedCategory === c.category
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
//   selectedCategory,
// }: {
//   selectedCategory: string;
// }) {
//   const filteredProducts =
//     selectedCategory === "All"
//       ? PRODUCTS
//       : PRODUCTS.filter(
//           (product) => product.category === selectedCategory
//         );

//         const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
// const [dialogOpen, setDialogOpen] = useState(false);

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
//     product={p}
// />
//           ))
//         ) : (
//           <div className="col-span-full text-center text-muted-foreground py-10">
//             No products available in this category.
//           </div>
//         )}
//       </div>
//       {/* <ProductDialog
//     product={selectedProduct}
//     open={dialogOpen}
//     onOpenChange={setDialogOpen}
// /> */}
//     </section>
//   );
// }



// // function ProductCard({ product }: { product: Product }) {
// //   const { add } = useCart();
// //   const imgRef = useRef<HTMLImageElement>(null);

// //   const [selectedVariant, setSelectedVariant] = useState(
// //     product.variants?.[0] ?? {
// //         weight: product.weight,
// //         price: product.price,
// //     }
// // );
  
// //   const handleAdd = () => {
// //     const el = imgRef.current;
// //     if (!el) return;
// //     const r = el.getBoundingClientRect();
// //    // add(product, { x: r.left + r.width / 2, y: r.top + r.height / 2 }, product.image);
// //     add(
// //     {
// //         ...product,
// //         price: selectedVariant.price,
// //         weight: selectedVariant.weight,
// //     },
// //     {
// //         x: r.left + r.width / 2,
// //         y: r.top + r.height / 2,
// //     },
// //     product.image
// // );
// //   };

// //   return (
// //     <div className="group relative bg-card rounded-3xl overflow-hidden border flex flex-col hover:-translate-y-1 transition" style={{ boxShadow: "var(--shadow-card)" }}>
// //       <div className="aspect-square overflow-hidden bg-muted">
// //         <img ref={imgRef} src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
// //       </div>
// //       <div className="p-5 flex-1 flex flex-col">
// //         <h3 className="font-display font-bold text-lg text-secondary">{product.name}</h3>
// //         <p className="text-xs text-muted-foreground mt-1">{product.tagline}</p>
// //         <div className="flex gap-2 mt-4">
// //     {(product.variants ?? []).map((variant) => (
// //         <button
// //             key={variant.weight}
// //             onClick={() => setSelectedVariant(variant)}
// //             className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold transition-all duration-200
// //                 ${
// //                     selectedVariant.weight === variant.weight
// //                         ? "bg-primary text-primary-foreground border-primary"
// //                         : "bg-background text-secondary hover:border-primary"
// //                 }`}
// //         >
// //             {variant.weight}
// //         </button>
// //     ))}
// // </div>
// //         <div className="mt-4 flex items-center justify-between">
// //           <span className="font-display text-2xl font-bold text-primary"><div className="mt-4 flex items-center gap-2">
// //     <span className="text-gray-400 line-through text-sm">
// //         ₹{Math.round(selectedVariant.price * 1.08)}
// //     </span>

// //     <span className="font-display text-2xl font-bold text-primary">
// //         ₹{selectedVariant.price}
// //     </span>
// // </div></span>
// //           <button
// //             onClick={handleAdd}
// //             className="px-4 py-2 rounded-full text-primary-foreground text-sm font-semibold flex items-center gap-1.5 hover:scale-105 transition"
// //             style={{ background: "var(--gradient-hero)" }}
// //           >
// //             <ShoppingBag className="w-4 h-4" /> Add
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

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
