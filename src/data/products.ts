import cashew from "@/assets/cashew-w210-jumbo-kaju.jpeg";
import almond from "@/assets/almonds-regular.jpeg";
import pistachio from "@/assets/salted-pistachio-round-pista.jpeg";
import fig from "@/assets/premium-anjeer.jpeg";
import namkeen from "@/assets/namkeen.jpg";
import raisin from "@/assets/raisin-premium-kishmish.jpeg";
import walnut from "@/assets/premium-akhrot.jpeg";
import giftbox from "@/assets/giftbox.jpg";
import { Category, Product } from "@/lib/cart";

export const CATEGORY_IDS = {
  CASHEW: 1,
  ALMOND: 2,
  PISTACHIO: 3,
  ANJEER: 4,
  WALNUT: 5,
  DATES: 6,
  RAISINS: 7,
  SEEDS: 8,
  SNACKS: 9,
  DEHYDRATED_FRUITS: 10,
  SPICES: 11,
  GIFT_BOXES: 12,
} as const;

const PRODUCTS: Product[] = [

  {
    id: "cashew-premium",

    categoryId: CATEGORY_IDS.CASHEW,

    name: "Premium W240 Cashew",

    price: 349,

    weight: "250g",

    image: cashew,
    images: [
    cashew,
    almond,
    pistachio,
    giftbox,
],

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
        " Premium W240 Cashew Premium W240 whole cashews carefully selected for their rich taste, crunchy texture, and natural freshness. Vacuum packed to preserve quality and flavour.",

    benefits: [
        "Premium W240 Cashew",
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
        "Premium W240 Cashew",
        "Store in a cool & dry place.",
        "Keep in an airtight container after opening.",
    ],

    delivery: [
        "Premium W240 Cashew",
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
    id: "cashew-w240", categoryId: CATEGORY_IDS.CASHEW, price: 349,
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
    id: "cashew-w320", categoryId: CATEGORY_IDS.CASHEW, price: 299, weight: "250g", name: "Premium Kaju W320", image: cashew, tagline: "Everyday crunchy goodness", variants: [{ weight: "500g", price: 699 }, { weight: "1kg", price: 1299 }],
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
    id: "cashew-salted", categoryId: CATEGORY_IDS.CASHEW, price: 299, weight: "250g", name: "Roasted Salted Cashews", 
    image: cashew, 
    images: [
        cashew,
        cashew,
        cashew,
        cashew,
    ],
    tagline: "Perfect tea-time snack", variants: [{ weight: "500g", price: 699 }, { weight: "1kg", price: 1299 }],
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
    id: "almond-california", categoryId: CATEGORY_IDS.ALMOND, price: 399, weight: "250g", name: "California Almonds",
     image: almond,
     images: [
        almond,
        almond,
        almond,
        almond,
     ],
     tagline: "Rich in Vitamin E", variants: [{ weight: "500g", price: 699 }, { weight: "1kg", price: 1299 }],
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
    id: "almond-california2", categoryId: CATEGORY_IDS.ALMOND, price: 399, weight: "250g", name: "California Almonds",
     image: almond,
     images: [
        almond,
        almond,
        almond,
        almond,
     ],
     tagline: "Rich in Vitamin E", variants: [{ weight: "500g", price: 699 }, { weight: "1kg", price: 1299 }],
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
    id: "almond-premium", categoryId: CATEGORY_IDS.ALMOND, price: 299, weight: "250g",
     name: "Premium Badam", 
     image: almond,
     images: [
        almond,
        almond,
        almond,
        almond,
     ], tagline: "Naturally crunchy & fresh", variants: [{ weight: "250g", price: 299 }, { weight: "500g", price: 599 }],
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
    id: "almond-roasted", categoryId: CATEGORY_IDS.ALMOND, price: 299, weight: "250g", name: "Roasted Almonds", 
    image: almond, 
    images: [
        almond,
        almond,
        almond,
        almond,
     ],tagline: "Lightly roasted perfection", variants: [{ weight: "500g", price: 599 }, { weight: "1kg", price: 1099 }],
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
    id: "pista-salted", categoryId: CATEGORY_IDS.PISTACHIO, price: 399, weight: "250g",
     name: "Salted Roasted Pista", 
     image: pistachio,
     images: [
        pistachio,
        pistachio,
        pistachio,
        pistachio,
     ],
     tagline: "Premium crunchy pistachios", variants: [{ weight: "500g", price: 899 }, { weight: "1kg", price: 1699 }],
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
    id: "pista-salted1", categoryId: CATEGORY_IDS.PISTACHIO, price: 399, weight: "250g",
     name: "Salted Roasted Pista", 
     image: pistachio,
     images: [
        pistachio,
        pistachio,
        pistachio,
        pistachio,
     ],
     tagline: "Premium crunchy pistachios", variants: [{ weight: "500g", price: 899 }, { weight: "1kg", price: 1699 }],
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
    id: "pista-salted2", categoryId: CATEGORY_IDS.PISTACHIO, price: 399, weight: "250g",
     name: "Salted Roasted Pista", 
     image: pistachio,
     images: [
        pistachio,
        pistachio,
        pistachio,
        pistachio,
     ],
     tagline: "Premium crunchy pistachios", variants: [{ weight: "500g", price: 899 }, { weight: "1kg", price: 1699 }],
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
    id: "pista-premium", categoryId: CATEGORY_IDS.PISTACHIO, price: 469, weight: "250g",
     name: "Premium Pista", 
     image: pistachio,
     images: [
        pistachio,
        pistachio,
        pistachio,
        pistachio,
     ],
     tagline: "Freshly selected kernels", variants: [{ weight: "250g", price: 469 }, { weight: "500g", price: 899 }],
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
    id: "pista-jumbo", categoryId: CATEGORY_IDS.PISTACHIO, price: 949, weight: "250g",
    name: "Jumbo Pista", 
    image: pistachio,
    images: [
       pistachio,
       pistachio,
       pistachio,
       pistachio,
    ],
    tagline: "Extra large premium nuts", variants: [{ weight: "500g", price: 949 }, { weight: "1kg", price: 1799 }],
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
    id: "anjeer-afghan", categoryId: CATEGORY_IDS.ANJEER, price: 799, 
    weight: "250g", name: "Afghan Anjeer", 
    image: fig,
    images: [
       fig,
       fig,
       fig,
       fig,
    ],
    tagline: "Naturally sweet dry figs", variants: [{ weight: "500g", price: 799 }],
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
    id: "anjeer-afghan1", categoryId: CATEGORY_IDS.ANJEER, price: 799, 
    weight: "250g", name: "Afghan Anjeer", 
    image: fig,
    images: [
       fig,
       fig,
       fig,
       fig,
    ],
    tagline: "Naturally sweet dry figs", variants: [{ weight: "500g", price: 799 }],
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
    id: "anjeer-afghan2", categoryId: CATEGORY_IDS.ANJEER, price: 799, 
    weight: "250g", name: "Afghan Anjeer", 
    image: fig,
    images: [
       fig,
       fig,
       fig,
       fig,
    ],
    tagline: "Naturally sweet dry figs", variants: [{ weight: "500g", price: 799 }],
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
    id: "anjeer-premium", categoryId: CATEGORY_IDS.ANJEER, price: 429, weight: "250g",
     name: "Premium Dry Figs", 
     image: fig,
     images: [
        fig,
        fig,
        fig,
        fig,
     ],
     tagline: "Soft & fibre rich", variants: [{ weight: "250g", price: 429 }],
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
    id: "walnut-light", categoryId: CATEGORY_IDS.WALNUT, price: 749, weight: "250g", name: "Light Walnut Kernels", 
    image: walnut,
    images: [
       walnut,
       walnut,
       walnut,
       walnut,
    ],
    tagline: "Healthy omega-3 rich nuts", variants: [{ weight: "500g", price: 749 }],
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
    id: "walnut-premium", categoryId: CATEGORY_IDS.WALNUT, price: 399, weight: "250g", name: "Premium Akhrot",
    image: walnut,
    images: [
       walnut,
       walnut,
       walnut,
       walnut,
    ],
    tagline: "Fresh handpicked kernels", variants: [{ weight: "250g", price: 399 }],
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
    id: "dates-ajwa", categoryId: CATEGORY_IDS.DATES, price: 699, weight: "250g", name: "Ajwa Dates", 
    image: giftbox,
    images: [
       giftbox,
       giftbox,
       giftbox,
       giftbox,
    ],
    tagline: "Soft premium Arabian dates", variants: [{ weight: "500g", price: 699 }],
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
    id: "dates-medjool", categoryId: CATEGORY_IDS.DATES, price: 899, weight: "250g", name: "Medjool Dates", 
    image: giftbox,
    images: [
       giftbox,
       giftbox,
       giftbox,
       giftbox,
    ],
    tagline: "King of all dates", variants: [{ weight: "500g", price: 899 }],
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
    id: "dates-kimia", categoryId: CATEGORY_IDS.DATES, price: 399, weight: "250g", name: "Kimia Dates", 
    image: giftbox,
    images: [
       giftbox,
       giftbox,
       giftbox,
       giftbox,
    ],
    tagline: "Naturally juicy & sweet", variants: [{ weight: "500g", price: 399 }],
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
    id: "apricot-premium", categoryId: CATEGORY_IDS.DEHYDRATED_FRUITS, price: 549, weight: "250g", name: "Premium Apricots",
    image: giftbox,
    images: [
       giftbox,
       giftbox,
       giftbox,
       giftbox,
    ],
    tagline: "Soft & naturally sweet", variants: [{ weight: "500g", price: 549 }],
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
    id: "apricot-premium2", categoryId: CATEGORY_IDS.DEHYDRATED_FRUITS, price: 549, weight: "250g", name: "Premium Apricots",
    image: giftbox,
    images: [
       giftbox,
       giftbox,
       giftbox,
       giftbox,
    ],
    tagline: "Soft & naturally sweet", variants: [{ weight: "500g", price: 549 }],
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
    id: "apricot-premium3", categoryId: CATEGORY_IDS.DEHYDRATED_FRUITS, price: 549, weight: "250g", name: "Premium Apricots",
    image: giftbox,
    images: [
       giftbox,
       giftbox,
       giftbox,
       giftbox,
    ],
    tagline: "Soft & naturally sweet", variants: [{ weight: "500g", price: 549 }],
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
    id: "apricot-dried", categoryId: CATEGORY_IDS.DEHYDRATED_FRUITS, price: 299, weight: "250g", name: "Dried Apricots",
    image: giftbox,
    images: [
       giftbox,
       giftbox,
       giftbox,
       giftbox,
    ],
    tagline: "Rich in antioxidants", variants: [{ weight: "250g", price: 299 }],
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
    id: "seed-mix", categoryId: CATEGORY_IDS.SEEDS, price: 299, weight: "250g", name: "Healthy Seed Mix", 
    image: giftbox, 
    images: [
       giftbox,
       giftbox,
       giftbox,
       giftbox,
    ],
    tagline: "5 super seeds in one pack", variants: [{ weight: "250g", price: 299 }],
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
    id: "chia", categoryId: CATEGORY_IDS.SEEDS, price: 249, weight: "250g", name: "Chia Seeds", 
    image: giftbox,
    images: [
       giftbox,
       giftbox,
       giftbox,
       giftbox,
    ],
    tagline: "Excellent source of fibre", variants: [{ weight: "250g", price: 249 }],
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
    id: "flax", categoryId: CATEGORY_IDS.SEEDS, price: 199, weight: "250g", name: "Flax Seeds", 
    image: giftbox,
    images: [
       giftbox,
       giftbox,
       giftbox,
       giftbox,
    ],
    tagline: "Rich in omega-3", variants: [{ weight: "250g", price: 199 }],
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
    id: "pumpkin", categoryId: CATEGORY_IDS.SEEDS, price: 349, weight: "250g", name: "Pumpkin Seeds", 
    image: giftbox,
    images: [
       giftbox,
       giftbox,
       giftbox,
       giftbox,
    ],
    tagline: "Protein packed snack", variants: [{ weight: "250g", price: 349 }],
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
    id: "namkeen", categoryId: CATEGORY_IDS.SNACKS, price: 199, weight: "300g", name: "Masala Namkeen Mix", 
    image: namkeen,
    images: [
       namkeen,
       namkeen,
       namkeen,
       namkeen,
    ],
    tagline: "Crispy traditional mix", variants: [{ weight: "300g", price: 199 }, { weight: "500g", price: 299 }],
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
    id: "corn-mixture", categoryId: CATEGORY_IDS.SNACKS, price: 199, weight: "300g", name: "Corn Mixture", 
    image: namkeen,
    images: [
       namkeen,
       namkeen,
       namkeen,
       namkeen,
    ],
    tagline: "Crunchy & spicy delight", variants: [{ weight: "300g", price: 199 }],
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
    id: "diet-mixture", categoryId: CATEGORY_IDS.SNACKS, price: 279, weight: "300g", name: "Diet Mixture", 
    image: namkeen,
    images: [
       namkeen,
       namkeen,
       namkeen,
       namkeen,
    ],
    tagline: "Healthy roasted snack", variants: [{ weight: "300g", price: 279 }],
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
    id: "kiwi", categoryId: CATEGORY_IDS.DEHYDRATED_FRUITS, price: 399, weight: "250g", name: "Dried Kiwi", 
    image: giftbox,
    images: [
       giftbox,
       giftbox,
       giftbox,
       giftbox,
    ],
    tagline: "Tangy tropical slices", variants: [{ weight: "250g", price: 399 }],
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
    id: "pineapple", categoryId: CATEGORY_IDS.DEHYDRATED_FRUITS, price: 349, weight: "250g", name: "Dried Pineapple", 
    image: giftbox,
    images: [
       giftbox,
       giftbox,
       giftbox,
       giftbox,
    ],
    tagline: "Naturally sweet bites", variants: [{ weight: "250g", price: 349 }],
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
    id: "strawberry", categoryId: CATEGORY_IDS.DEHYDRATED_FRUITS, price: 449, weight: "250g", name: "Dried Strawberry", 
    image: giftbox,
    images: [
       giftbox,
       giftbox,
       giftbox,
       giftbox,
    ],
    tagline: "Burst of fruity flavour", variants: [{ weight: "250g", price: 449 }],
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
    id: "turmeric", categoryId: CATEGORY_IDS.SPICES, price: 149, weight: "250g", name: "Organic Turmeric Powder", 
    image: giftbox,
    images: [
       giftbox,
       giftbox,
       giftbox,
       giftbox,
    ],
    tagline: "Pure farm-fresh turmeric", variants: [{ weight: "250g", price: 149 }],
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
    id: "pepper", categoryId: CATEGORY_IDS.SPICES, price: 249, weight: "250g", name: "Black Pepper", 
    image: giftbox,
    images: [
       giftbox,
       giftbox,
       giftbox,
       giftbox,
    ],
    tagline: "Bold aroma & flavour", variants: [{ weight: "250g", price: 249 }],
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
    id: "cardamom", categoryId: CATEGORY_IDS.SPICES, price: 499, weight: "100g", name: "Green Cardamom", 
    image: giftbox,
    images: [
       giftbox,
       giftbox,
       giftbox,
       giftbox,
    ],
    tagline: "Premium aromatic spice", variants: [{ weight: "100g", price: 499 }],
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
    id: "gift-classic", categoryId: CATEGORY_IDS.GIFT_BOXES, price: 999, weight: "750g", name: "Classic Gift Box", image: giftbox, tagline: "Perfect for every celebration", variants: [{ weight: "750g", price: 999 }],
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
    id: "gift-premium", categoryId: CATEGORY_IDS.GIFT_BOXES, price: 1499, weight: "1kg", name: "Premium Gift Box", image: giftbox, tagline: "Luxury assorted dry fruits", variants: [{ weight: "1kg", price: 1499 }],
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
    id: "gift-deluxe", categoryId: CATEGORY_IDS.GIFT_BOXES, price: 2499, weight: "2kg", name: "Deluxe Family Hamper", 
    image: giftbox,
    images: [
       giftbox,
       giftbox,
       giftbox,
       giftbox,
    ],
    tagline: "Elegant festive gifting", variants: [{ weight: "2kg", price: 2499 }],
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



const CATEGORIES: Category[] = [
  {
    id: CATEGORY_IDS.CASHEW,
    name: "Cashew",
    image: cashew,
  },
  {
    id: CATEGORY_IDS.ALMOND,
    name: "Almond",
    image: almond,
  },
  {
    id: CATEGORY_IDS.PISTACHIO,
    name: "Pistachio",
    image: pistachio,
  },
  {
    id: CATEGORY_IDS.ANJEER,
    name: "Anjeer",
    image: fig,
  },
  {
    id: CATEGORY_IDS.WALNUT,
    name: "Walnut",
    image: walnut,
  },
  {
    id: CATEGORY_IDS.DATES,
    name: "Dates",
    image: giftbox,
  },
  {
    id: CATEGORY_IDS.RAISINS,
    name: "Raisins",
    image: giftbox,
  },
  {
    id: CATEGORY_IDS.SEEDS,
    name: "Seeds",
    image: giftbox,
  },
  {
    id: CATEGORY_IDS.SNACKS,
    name: "Snacks",
    image: giftbox,
  },
  {
    id: CATEGORY_IDS.DEHYDRATED_FRUITS,
    name: "Dehydrated Fruits",
    image: giftbox,
  },
  {
    id: CATEGORY_IDS.SPICES,
    name: "Spices",
    image: giftbox,
  },
  {
    id: CATEGORY_IDS.GIFT_BOXES,
    name: "Gift Boxes",
    image: giftbox,
  },
];

export { CATEGORIES, PRODUCTS };