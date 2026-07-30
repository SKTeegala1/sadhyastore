import cashew from "@/assets/cashew-w210-jumbo-kaju.jpeg";
import almond from "@/assets/almonds-regular.jpeg";
import pistachio from "@/assets/salted-pistachio-round-pista.jpeg";
import fig from "@/assets/premium-anjeer.jpeg";
import namkeen from "@/assets/namkeen.jpg";
import raisin from "@/assets/raisin-premium-kishmish.jpeg";
import walnut from "@/assets/premium-akhrot.jpeg";
import giftbox from "@/assets/giftbox.jpg";
import { Product } from "@/lib/cart";

const PRODUCTS: Product[] = [

  {
    id: "cashew-premium",

    category: "Cashew",

    name: "Premium W240 Cashew",

    price: 349,

    weight: "250g",

    image: cashew,

    tagline: "Buttery & crunchy whole cashews",

    variants: [
        {
            weight: "250g",
            price: 349,
        },
        {
            weight: "500g",
            price: 689,
        },
        {
            weight: "1kg",
            price: 1349,
        },
    ],

    description:
        "Premium W240 whole cashews carefully selected for their rich taste, crunchy texture, and natural freshness. Vacuum packed to preserve quality and flavour.",

    benefits: [
        "Rich in Protein",
        "Heart Healthy",
        "High in Magnesium",
        "No Artificial Preservatives",
    ],

    nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},

    storage: [
        "Store in a cool & dry place.",
        "Keep in an airtight container after opening.",
    ],

    delivery: [
        "Ships within 24 Hours",
        "Vacuum Packed",
        "Pan India Delivery",
    ],

    rating: 4.9,

    reviews: 128,

    badge: "Best Seller",
},
  // Cashew
  {
    id: "cashew-w240", category: "Cashew", price: 349,
    weight: "250g", name: "Premium Kaju W240", image: cashew, tagline: "Large premium whole cashews", variants: [{ weight: "250g", price: 500 }, { weight: "500g", price: 799 }, { weight: "1kg", price: 1499 }],
    description: "",
    benefits: [],
    nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "cashew-w320", category: "Cashew", price: 299, weight: "250g", name: "Premium Kaju W320", image: cashew, tagline: "Everyday crunchy goodness", variants: [{ weight: "500g", price: 699 }, { weight: "1kg", price: 1299 }],
    description: "",
    benefits: [],
    nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "cashew-salted", category: "Cashew", price: 299, weight: "250g", name: "Roasted Salted Cashews", image: cashew, tagline: "Perfect tea-time snack", variants: [{ weight: "500g", price: 699 }, { weight: "1kg", price: 1299 }],
    description: "",
    benefits: [],
      nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },

  // Almond
  {
    id: "almond-california", category: "Almond", price: 399, weight: "250g", name: "California Almonds", image: almond, tagline: "Rich in Vitamin E", variants: [{ weight: "500g", price: 699 }, { weight: "1kg", price: 1299 }],
    description: "",
    benefits: [],
   nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "almond-premium", category: "Almond", price: 299, weight: "250g", name: "Premium Badam", image: almond, tagline: "Naturally crunchy & fresh", variants: [{ weight: "250g", price: 299 }, { weight: "500g", price: 599 }],
    description: "",
    benefits: [],
   nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "almond-roasted", category: "Almond", price: 299, weight: "250g", name: "Roasted Almonds", image: almond, tagline: "Lightly roasted perfection", variants: [{ weight: "500g", price: 599 }, { weight: "1kg", price: 1099 }],
    description: "",
    benefits: [],
   nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },

  // Pista
  {
    id: "pista-salted", category: "Pista", price: 399, weight: "250g", name: "Salted Roasted Pista", image: pistachio, tagline: "Premium crunchy pistachios", variants: [{ weight: "500g", price: 899 }, { weight: "1kg", price: 1699 }],
    description: "",
    benefits: [],
  nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "pista-premium", category: "Pista", price: 469, weight: "250g", name: "Premium Pista", image: pistachio, tagline: "Freshly selected kernels", variants: [{ weight: "250g", price: 469 }, { weight: "500g", price: 899 }],
    description: "",
    benefits: [],
   nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "pista-jumbo", category: "Pista", price: 949, weight: "250g", name: "Jumbo Pista", image: pistachio, tagline: "Extra large premium nuts", variants: [{ weight: "500g", price: 949 }, { weight: "1kg", price: 1799 }],
    description: "",
    benefits: [],
  nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },

  // Anjeer
  {
    id: "anjeer-afghan", category: "Anjeer", price: 799, weight: "250g", name: "Afghan Anjeer", image: fig, tagline: "Naturally sweet dry figs", variants: [{ weight: "500g", price: 799 }],
    description: "",
    benefits: [],
   nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "anjeer-premium", category: "Anjeer", price: 429, weight: "250g", name: "Premium Dry Figs", image: fig, tagline: "Soft & fibre rich", variants: [{ weight: "250g", price: 429 }],
    description: "",
    benefits: [],
   nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },

  // Walnut
  {
    id: "walnut-light", category: "Walnut", price: 749, weight: "250g", name: "Light Walnut Kernels", image: walnut, tagline: "Healthy omega-3 rich nuts", variants: [{ weight: "500g", price: 749 }],
    description: "",
    benefits: [],
   nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "walnut-premium", category: "Walnut", price: 399, weight: "250g", name: "Premium Akhrot", image: walnut, tagline: "Fresh handpicked kernels", variants: [{ weight: "250g", price: 399 }],
    description: "",
    benefits: [],
    nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },

  // Dates
  {
    id: "dates-ajwa", category: "Dates", price: 699, weight: "250g", name: "Ajwa Dates", image: giftbox, tagline: "Soft premium Arabian dates", variants: [{ weight: "500g", price: 699 }],
    description: "",
    benefits: [],
   nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "dates-medjool", category: "Dates", price: 899, weight: "250g", name: "Medjool Dates", image: giftbox, tagline: "King of all dates", variants: [{ weight: "500g", price: 899 }],
    description: "",
    benefits: [],
   nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "dates-kimia", category: "Dates", price: 399, weight: "250g", name: "Kimia Dates", image: giftbox, tagline: "Naturally juicy & sweet", variants: [{ weight: "500g", price: 399 }],
    description: "",
    benefits: [],
    nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },

  // Apricot
  {
    id: "apricot-premium", category: "Apricot", price: 549, weight: "250g", name: "Premium Apricots", image: giftbox, tagline: "Soft & naturally sweet", variants: [{ weight: "500g", price: 549 }],
    description: "",
    benefits: [],
    nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "apricot-dried", category: "Apricot", price: 299, weight: "250g", name: "Dried Apricots", image: giftbox, tagline: "Rich in antioxidants", variants: [{ weight: "250g", price: 299 }],
    description: "",
    benefits: [],
    nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },

  // Seeds
  {
    id: "seed-mix", category: "Seeds", price: 299, weight: "250g", name: "Healthy Seed Mix", image: giftbox, tagline: "5 super seeds in one pack", variants: [{ weight: "250g", price: 299 }],
    description: "",
    benefits: [],
    nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "chia", category: "Seeds", price: 249, weight: "250g", name: "Chia Seeds", image: giftbox, tagline: "Excellent source of fibre", variants: [{ weight: "250g", price: 249 }],
    description: "",
    benefits: [],
   nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "flax", category: "Seeds", price: 199, weight: "250g", name: "Flax Seeds", image: giftbox, tagline: "Rich in omega-3", variants: [{ weight: "250g", price: 199 }],
    description: "",
    benefits: [],
    nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "pumpkin", category: "Seeds", price: 349, weight: "250g", name: "Pumpkin Seeds", image: giftbox, tagline: "Protein packed snack", variants: [{ weight: "250g", price: 349 }],
    description: "",
    benefits: [],
    nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },

  // Snacks
  {
    id: "namkeen", category: "Snacks", price: 199, weight: "300g", name: "Masala Namkeen Mix", image: namkeen, tagline: "Crispy traditional mix", variants: [{ weight: "300g", price: 199 }, { weight: "500g", price: 299 }],
    description: "",
    benefits: [],
   nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "corn-mixture", category: "Snacks", price: 199, weight: "300g", name: "Corn Mixture", image: namkeen, tagline: "Crunchy & spicy delight", variants: [{ weight: "300g", price: 199 }],
    description: "",
    benefits: [],
    nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "diet-mixture", category: "Snacks", price: 279, weight: "300g", name: "Diet Mixture", image: namkeen, tagline: "Healthy roasted snack", variants: [{ weight: "300g", price: 279 }],
    description: "",
    benefits: [],
    nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },

  // Dehydrated Fruits
  {
    id: "kiwi", category: "Dehydrated Fruits", price: 399, weight: "250g", name: "Dried Kiwi", image: giftbox, tagline: "Tangy tropical slices", variants: [{ weight: "250g", price: 399 }],
    description: "",
    benefits: [],
    nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "pineapple", category: "Dehydrated Fruits", price: 349, weight: "250g", name: "Dried Pineapple", image: giftbox, tagline: "Naturally sweet bites", variants: [{ weight: "250g", price: 349 }],
    description: "",
    benefits: [],
    nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "strawberry", category: "Dehydrated Fruits", price: 449, weight: "250g", name: "Dried Strawberry", image: giftbox, tagline: "Burst of fruity flavour", variants: [{ weight: "250g", price: 449 }],
    description: "",
    benefits: [],
   nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },

  // Spices
  {
    id: "turmeric", category: "Spices", price: 149, weight: "250g", name: "Organic Turmeric Powder", image: giftbox, tagline: "Pure farm-fresh turmeric", variants: [{ weight: "250g", price: 149 }],
    description: "",
    benefits: [],
    nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "pepper", category: "Spices", price: 249, weight: "250g", name: "Black Pepper", image: giftbox, tagline: "Bold aroma & flavour", variants: [{ weight: "250g", price: 249 }],
    description: "",
    benefits: [],
   nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "cardamom", category: "Spices", price: 499, weight: "100g", name: "Green Cardamom", image: giftbox, tagline: "Premium aromatic spice", variants: [{ weight: "100g", price: 499 }],
    description: "",
    benefits: [],
    nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },

  // Gift Boxes
  {
    id: "gift-classic", category: "GiftBoxes", price: 999, weight: "750g", name: "Classic Gift Box", image: giftbox, tagline: "Perfect for every celebration", variants: [{ weight: "750g", price: 999 }],
    description: "",
    benefits: [],
    nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "gift-premium", category: "GiftBoxes", price: 1499, weight: "1kg", name: "Premium Gift Box", image: giftbox, tagline: "Luxury assorted dry fruits", variants: [{ weight: "1kg", price: 1499 }],
    description: "",
    benefits: [],
    nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
  {
    id: "gift-deluxe", category: "GiftBoxes", price: 2499, weight: "2kg", name: "Deluxe Family Hamper", image: giftbox, tagline: "Elegant festive gifting", variants: [{ weight: "2kg", price: 2499 }],
    description: "",
    benefits: [],
   nutrition: {

    servingSize: "100g",

    items: [

        {
            name: "Energy",
            value: 553,
            unit: "kcal",
        },

        {
            name: "Protein",
            value: 18,
            unit: "g",
        },

        {
            name: "Carbohydrates",
            value: 30,
            unit: "g",
        },

        {
            name: "Fat",
            value: 44,
            unit: "g",
        },

        {
            name: "Fiber",
            value: 3,
            unit: "g",
        },

        {
            name: "Calcium",
            value: 37,
            unit: "mg",
        },

        {
            name: "Iron",
            value: 6,
            unit: "mg",
        },

    ],
},
    storage: [],
    delivery: [],
    rating: 0,
    reviews: 0
  },
];

const CATEGORIES = [
  { name: "Cashew",category: "Cashew", image: cashew },
  { name: "Almond",category: "Almond", image: almond },
  { name: "Pistachio",category: "Pista", image: pistachio },
  { name: "Anjeer",category: "Anjeer", image: fig },
  { name: "Walnut",category: "Walnut", image: walnut },
  { name: "Dates",category: "Dates", image: giftbox },
  { name: "Raisins",category: "Raisin", image: giftbox },
  { name: "Pista",category: "Pista", image: giftbox },
  { name: "Apricot",category: "Apricot", image: giftbox },
  { name: "Seeds",category: "Seeds", image: giftbox },
  { name: "Snacks",category: "Snacks", image: giftbox },
  { name: "Dehydrated Fruits",category: "Dehydrated Fruits", image: giftbox },
  { name: "Spices",category: "Spices", image: giftbox },
  { name: "Gift Boxes",category: "GiftBoxes", image: giftbox },
];

export { CATEGORIES, PRODUCTS };