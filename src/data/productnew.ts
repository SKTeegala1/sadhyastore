// ============================================================================
// Dry Fruits & Snacks — Product Catalog
// Sourced from: https://www.dryfruitkingdom.com/ (names, prices, taglines)
// Nutrition values are standard USDA-based figures per 100g for each dry fruit.
// ============================================================================
//
// NOTE ON IMAGES:
// The `image` field below references a variable (e.g. `cashewPremium`), the
// same pattern as your sample. Import your actual image files at the top of
// this file (or wherever you keep assets) using these same variable names,
// e.g.:
//   import cashewPremium from "../assets/images/cashew-premium.jpg";
//   import cashewJumbo from "../assets/images/cashew-jumbo.jpg";
//   ...etc
//
// I've left them as string placeholders ("cashew-premium.jpg") so this file
// is valid JSON-ish/JS on its own — swap them for your actual imports.

const products = [
  // ---------------------------------------------------------------------
  // CASHEW (Kaju)
  // ---------------------------------------------------------------------
  {
    id: "cashew-premium",
    category: "Cashew",
    name: "Premium W240 Cashew",
    price: 349,
    weight: "250g",
    image: "cashew-premium.jpg",
    tagline: "Buttery & crunchy whole cashews",
    variants: [
      { weight: "250g", price: 349 },
      { weight: "500g", price: 689 },
      { weight: "1kg", price: 1349 },
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
        { name: "Energy", value: 553, unit: "kcal" },
        { name: "Protein", value: 18, unit: "g" },
        { name: "Carbohydrates", value: 30, unit: "g" },
        { name: "Fat", value: 44, unit: "g" },
        { name: "Fiber", value: 3, unit: "g" },
        { name: "Calcium", value: 37, unit: "mg" },
        { name: "Iron", value: 6, unit: "mg" },
      ],
    },
  },
  {
    id: "cashew-jumbo",
    category: "Cashew",
    name: "Jumbo W210 Cashew",
    price: 450,
    weight: "250g",
    image: "cashew-jumbo.jpg",
    tagline: "Extra-large, handpicked jumbo cashews",
    variants: [
      { weight: "250g", price: 450 },
      { weight: "500g", price: 875 },
      { weight: "1kg", price: 1699 },
    ],
    description:
      "W210 jumbo cashews stand out for their extraordinary size and creamy sweetness. Handpicked by size and mass, they make an impressive gifting option as well as a rich everyday snack.",
    benefits: [
      "Rich in Protein",
      "Great for Gifting",
      "High in Healthy Fats",
      "Handpicked Quality",
    ],
    nutrition: {
      servingSize: "100g",
      items: [
        { name: "Energy", value: 553, unit: "kcal" },
        { name: "Protein", value: 18, unit: "g" },
        { name: "Carbohydrates", value: 30, unit: "g" },
        { name: "Fat", value: 44, unit: "g" },
        { name: "Fiber", value: 3, unit: "g" },
        { name: "Calcium", value: 37, unit: "mg" },
        { name: "Iron", value: 6, unit: "mg" },
      ],
    },
  },
  {
    id: "cashew-roasted-salted",
    category: "Cashew",
    name: "Roasted Salted Cashew",
    price: 350,
    weight: "250g",
    image: "cashew-roasted-salted.jpg",
    tagline: "Dry roasted with a light salty crunch",
    variants: [
      { weight: "250g", price: 350 },
      { weight: "500g", price: 685 },
      { weight: "1kg", price: 1325 },
    ],
    description:
      "Whole cashews dry-roasted and finished with a light coating of salt for a crunchy, savoury, anytime snack.",
    benefits: [
      "Ready-to-Eat Snack",
      "Rich in Protein",
      "Good Source of Copper",
      "No Artificial Colors",
    ],
    nutrition: {
      servingSize: "100g",
      items: [
        { name: "Energy", value: 574, unit: "kcal" },
        { name: "Protein", value: 17, unit: "g" },
        { name: "Carbohydrates", value: 28, unit: "g" },
        { name: "Fat", value: 46, unit: "g" },
        { name: "Fiber", value: 3.3, unit: "g" },
        { name: "Sodium", value: 340, unit: "mg" },
        { name: "Iron", value: 5.5, unit: "mg" },
      ],
    },
  },

  // ---------------------------------------------------------------------
  // ALMOND (Badam)
  // ---------------------------------------------------------------------
  {
    id: "almond-american-regular",
    category: "Almond",
    name: "American Almonds (Badam)",
    price: 275,
    weight: "250g",
    image: "almond-american.jpg",
    tagline: "California-sourced, sweet & crunchy",
    variants: [
      { weight: "250g", price: 275 },
      { weight: "500g", price: 539 },
      { weight: "1kg", price: 1049 },
    ],
    description:
      "Plain almonds sourced from California, prized for their sweet taste and satisfying crunch. A daily wellness staple that works equally well as a snack or a cooking ingredient.",
    benefits: [
      "Rich in Vitamin E",
      "Good for Brain Health",
      "High in Fiber",
      "Supports Heart Health",
    ],
    nutrition: {
      servingSize: "100g",
      items: [
        { name: "Energy", value: 579, unit: "kcal" },
        { name: "Protein", value: 21, unit: "g" },
        { name: "Carbohydrates", value: 22, unit: "g" },
        { name: "Fat", value: 50, unit: "g" },
        { name: "Fiber", value: 12.5, unit: "g" },
        { name: "Calcium", value: 269, unit: "mg" },
        { name: "Iron", value: 3.7, unit: "mg" },
      ],
    },
  },
  {
    id: "almond-mamra-premium",
    category: "Almond",
    name: "Mamra Almonds Premium (Badam)",
    price: 1050,
    weight: "250g",
    image: "almond-mamra.jpg",
    tagline: "Iranian Mamra almonds, naturally sweet",
    variants: [
      { weight: "250g", price: 1050 },
      { weight: "500g", price: 2059 },
      { weight: "1kg", price: 4050 },
    ],
    description:
      "A premium variety of almonds grown in Iran, known for being more nutritious and having a distinctly natural sweetness. Considered one of the healthiest almond varieties available.",
    benefits: [
      "Extra Nutrient Dense",
      "Naturally Sweet",
      "Rich in Healthy Fats",
      "Premium Iranian Quality",
    ],
    nutrition: {
      servingSize: "100g",
      items: [
        { name: "Energy", value: 590, unit: "kcal" },
        { name: "Protein", value: 22, unit: "g" },
        { name: "Carbohydrates", value: 20, unit: "g" },
        { name: "Fat", value: 52, unit: "g" },
        { name: "Fiber", value: 11, unit: "g" },
        { name: "Calcium", value: 264, unit: "mg" },
        { name: "Iron", value: 4, unit: "mg" },
      ],
    },
  },

  // ---------------------------------------------------------------------
  // PISTACHIO (Pista)
  // ---------------------------------------------------------------------
  {
    id: "pistachio-salted-round",
    category: "Pistachio",
    name: "Salted Pistachio Round (Khara Pista)",
    price: 400,
    weight: "250g",
    image: "pistachio-salted-round.jpg",
    tagline: "Roasted & salted, native to Iran",
    variants: [
      { weight: "250g", price: 400 },
      { weight: "500g", price: 785 },
      { weight: "1kg", price: 1525 },
    ],
    description:
      "Round-shaped pistachios native to Iran, roasted in-shell and finished with salt for a satisfying savoury crunch. A perfect anytime snack.",
    benefits: [
      "Rich in Antioxidants",
      "Good Source of Protein",
      "Supports Heart Health",
      "High in Potassium",
    ],
    nutrition: {
      servingSize: "100g",
      items: [
        { name: "Energy", value: 560, unit: "kcal" },
        { name: "Protein", value: 20, unit: "g" },
        { name: "Carbohydrates", value: 28, unit: "g" },
        { name: "Fat", value: 45, unit: "g" },
        { name: "Fiber", value: 10, unit: "g" },
        { name: "Calcium", value: 105, unit: "mg" },
        { name: "Iron", value: 3.9, unit: "mg" },
      ],
    },
  },
  {
    id: "pistachio-raw-unsalted",
    category: "Pistachio",
    name: "Raw Unsalted Pistachio (Pista)",
    price: 675,
    weight: "250g",
    image: "pistachio-raw.jpg",
    tagline: "Natural, unsalted pistachio kernels",
    variants: [
      { weight: "250g", price: 675 },
      { weight: "500g", price: 1325 },
      { weight: "1kg", price: 2599 },
    ],
    description:
      "Natural, unsalted pistachio kernels that can be eaten directly or added to dishes, desserts, and trail mixes for a nutty bite.",
    benefits: [
      "No Added Salt",
      "Rich in Antioxidants",
      "Good for Weight Management",
      "High in Protein",
    ],
    nutrition: {
      servingSize: "100g",
      items: [
        { name: "Energy", value: 562, unit: "kcal" },
        { name: "Protein", value: 21, unit: "g" },
        { name: "Carbohydrates", value: 28, unit: "g" },
        { name: "Fat", value: 45, unit: "g" },
        { name: "Fiber", value: 10.6, unit: "g" },
        { name: "Calcium", value: 107, unit: "mg" },
        { name: "Iron", value: 4, unit: "mg" },
      ],
    },
  },

  // ---------------------------------------------------------------------
  // FIG (Anjeer)
  // ---------------------------------------------------------------------
  {
    id: "fig-regular",
    category: "Fig",
    name: "Fig Regular (Anjeer)",
    price: 550,
    weight: "250g",
    image: "fig-regular.jpg",
    tagline: "Naturally sweet & chewy dried figs",
    variants: [
      { weight: "250g", price: 550 },
      { weight: "500g", price: 1079 },
      { weight: "1kg", price: 2099 },
    ],
    description:
      "Sun-dried figs sourced from Afghanistan, soft and chewy with a naturally sweet taste. Great on their own or chopped into desserts and cereals.",
    benefits: [
      "High in Dietary Fiber",
      "Good Source of Calcium",
      "Supports Digestion",
      "Naturally Sweet",
    ],
    nutrition: {
      servingSize: "100g",
      items: [
        { name: "Energy", value: 249, unit: "kcal" },
        { name: "Protein", value: 3.3, unit: "g" },
        { name: "Carbohydrates", value: 64, unit: "g" },
        { name: "Fat", value: 0.9, unit: "g" },
        { name: "Fiber", value: 9.8, unit: "g" },
        { name: "Calcium", value: 162, unit: "mg" },
        { name: "Iron", value: 2, unit: "mg" },
      ],
    },
  },
  {
    id: "fig-premium",
    category: "Fig",
    name: "Fig Premium (Anjeer)",
    price: 700,
    weight: "250g",
    image: "fig-premium.jpg",
    tagline: "Large, hand-selected premium figs",
    variants: [
      { weight: "250g", price: 700 },
      { weight: "500g", price: 1375 },
      { weight: "1kg", price: 2675 },
    ],
    description:
      "Large, hand-selected dried figs prized for their size and rich, chewy sweetness. A premium choice for gifting and healthy snacking alike.",
    benefits: [
      "High in Dietary Fiber",
      "Rich in Antioxidants",
      "Good Source of Calcium",
      "Hand-Selected Quality",
    ],
    nutrition: {
      servingSize: "100g",
      items: [
        { name: "Energy", value: 249, unit: "kcal" },
        { name: "Protein", value: 3.3, unit: "g" },
        { name: "Carbohydrates", value: 64, unit: "g" },
        { name: "Fat", value: 0.9, unit: "g" },
        { name: "Fiber", value: 9.8, unit: "g" },
        { name: "Calcium", value: 162, unit: "mg" },
        { name: "Iron", value: 2, unit: "mg" },
      ],
    },
  },

  // ---------------------------------------------------------------------
  // RAISIN (Kishmish)
  // ---------------------------------------------------------------------
  {
    id: "raisin-indian-golden",
    category: "Raisin",
    name: "Indian Raisin Golden (Kishmish)",
    price: 150,
    weight: "250g",
    image: "raisin-golden.jpg",
    tagline: "Classic golden dried grapes",
    variants: [
      { weight: "250g", price: 150 },
      { weight: "500g", price: 295 },
      { weight: "1kg", price: 575 },
    ],
    description:
      "Sun-dried golden raisins made from harvested grapes, naturally sweet and soft. A pantry staple perfect for snacking, baking, and Indian sweets.",
    benefits: [
      "Natural Energy Booster",
      "Good Source of Iron",
      "Supports Digestion",
      "No Added Sugar",
    ],
    nutrition: {
      servingSize: "100g",
      items: [
        { name: "Energy", value: 299, unit: "kcal" },
        { name: "Protein", value: 3.1, unit: "g" },
        { name: "Carbohydrates", value: 79, unit: "g" },
        { name: "Fat", value: 0.5, unit: "g" },
        { name: "Fiber", value: 3.7, unit: "g" },
        { name: "Calcium", value: 50, unit: "mg" },
        { name: "Iron", value: 1.9, unit: "mg" },
      ],
    },
  },
  {
    id: "raisin-afghan-selected",
    category: "Raisin",
    name: "Afghan Raisin Selected (Kishmish)",
    price: 350,
    weight: "250g",
    image: "raisin-afghan.jpg",
    tagline: "Superior quality raisins from Afghanistan",
    variants: [
      { weight: "250g", price: 350 },
      { weight: "500g", price: 689 },
      { weight: "1kg", price: 1349 },
    ],
    description:
      "Superior quality raisins sourced from Afghanistan, selected for their plump texture and rich, sweet-tangy flavour.",
    benefits: [
      "Rich in Antioxidants",
      "Natural Source of Energy",
      "Good for Bone Health",
      "Premium Sourcing",
    ],
    nutrition: {
      servingSize: "100g",
      items: [
        { name: "Energy", value: 302, unit: "kcal" },
        { name: "Protein", value: 3, unit: "g" },
        { name: "Carbohydrates", value: 80, unit: "g" },
        { name: "Fat", value: 0.5, unit: "g" },
        { name: "Fiber", value: 4, unit: "g" },
        { name: "Calcium", value: 53, unit: "mg" },
        { name: "Iron", value: 2, unit: "mg" },
      ],
    },
  },

  // ---------------------------------------------------------------------
  // WALNUT (Akhrot)
  // ---------------------------------------------------------------------
  {
    id: "walnut-regular",
    category: "Walnut",
    name: "Walnut Regular (Akhrot Magaj)",
    price: 450,
    weight: "250g",
    image: "walnut-regular.jpg",
    tagline: "One of the healthiest everyday nuts",
    variants: [
      { weight: "250g", price: 450 },
      { weight: "500g", price: 885 },
      { weight: "1kg", price: 1725 },
    ],
    description:
      "Shelled walnut halves that can be eaten directly or added to meals, salads, and health bars. Known as one of the most nutritionally dense nuts available.",
    benefits: [
      "Rich in Omega-3 Fatty Acids",
      "Supports Brain Health",
      "Good Source of Protein",
      "Heart Healthy",
    ],
    nutrition: {
      servingSize: "100g",
      items: [
        { name: "Energy", value: 654, unit: "kcal" },
        { name: "Protein", value: 15, unit: "g" },
        { name: "Carbohydrates", value: 14, unit: "g" },
        { name: "Fat", value: 65, unit: "g" },
        { name: "Fiber", value: 6.7, unit: "g" },
        { name: "Calcium", value: 98, unit: "mg" },
        { name: "Iron", value: 2.9, unit: "mg" },
      ],
    },
  },
  {
    id: "walnut-premium",
    category: "Walnut",
    name: "Walnut Premium (Akhrot Magaj)",
    price: 600,
    weight: "250g",
    image: "walnut-premium.jpg",
    tagline: "Large, high-grade walnut kernels",
    variants: [
      { weight: "250g", price: 600 },
      { weight: "500g", price: 1179 },
      { weight: "1kg", price: 2299 },
    ],
    description:
      "Premium grade walnut kernels, larger in size with a rich, buttery taste. Ideal for gifting or as a nutrient-dense daily snack.",
    benefits: [
      "Rich in Omega-3 Fatty Acids",
      "Premium Large Kernels",
      "Supports Brain Health",
      "Good Source of Protein",
    ],
    nutrition: {
      servingSize: "100g",
      items: [
        { name: "Energy", value: 654, unit: "kcal" },
        { name: "Protein", value: 15, unit: "g" },
        { name: "Carbohydrates", value: 14, unit: "g" },
        { name: "Fat", value: 65, unit: "g" },
        { name: "Fiber", value: 6.7, unit: "g" },
        { name: "Calcium", value: 98, unit: "mg" },
        { name: "Iron", value: 2.9, unit: "mg" },
      ],
    },
  },

  // ---------------------------------------------------------------------
  // DATES (Khajoor)
  // ---------------------------------------------------------------------
  {
    id: "dates-ajwa",
    category: "Dates",
    name: "Ajwa Dates (Khajoor)",
    price: 400,
    weight: "250g",
    image: "dates-ajwa.jpg",
    tagline: "Soft, juicy, premium Ajwa dates",
    variants: [
      { weight: "250g", price: 400 },
      { weight: "500g", price: 785 },
      { weight: "1kg", price: 1525 },
    ],
    description:
      "Soft and juicy Ajwa dates, a premium variety loved for their rich flavour and tender texture. Perfect for daily snacking or festive gifting.",
    benefits: [
      "Natural Source of Energy",
      "Rich in Fiber",
      "Good Source of Potassium",
      "No Added Sugar",
    ],
    nutrition: {
      servingSize: "100g",
      items: [
        { name: "Energy", value: 277, unit: "kcal" },
        { name: "Protein", value: 1.8, unit: "g" },
        { name: "Carbohydrates", value: 75, unit: "g" },
        { name: "Fat", value: 0.2, unit: "g" },
        { name: "Fiber", value: 6.7, unit: "g" },
        { name: "Calcium", value: 64, unit: "mg" },
        { name: "Iron", value: 0.9, unit: "mg" },
      ],
    },
  },
  {
    id: "dates-black-seedless",
    category: "Dates",
    name: "Black Dates Seedless (Kala Khajoor)",
    price: 200,
    weight: "250g",
    image: "dates-black.jpg",
    tagline: "Sweet, seedless, good for skin & hair",
    variants: [
      { weight: "250g", price: 200 },
      { weight: "500g", price: 389 },
      { weight: "1kg", price: 759 },
    ],
    description:
      "Sweet, seedless black dates known for their natural goodness for skin and hair, in addition to being a wholesome everyday snack.",
    benefits: [
      "Naturally Sweet",
      "Seedless & Convenient",
      "Good for Skin & Hair",
      "Rich in Fiber",
    ],
    nutrition: {
      servingSize: "100g",
      items: [
        { name: "Energy", value: 277, unit: "kcal" },
        { name: "Protein", value: 1.8, unit: "g" },
        { name: "Carbohydrates", value: 75, unit: "g" },
        { name: "Fat", value: 0.2, unit: "g" },
        { name: "Fiber", value: 6.7, unit: "g" },
        { name: "Calcium", value: 64, unit: "mg" },
        { name: "Iron", value: 0.9, unit: "mg" },
      ],
    },
  },

  // ---------------------------------------------------------------------
  // FOX NUT (Makhana)
  // ---------------------------------------------------------------------
  {
    id: "foxnut-makhana",
    category: "Fox Nut",
    name: "Fox Nut (Makhana)",
    price: 400,
    weight: "250g",
    image: "foxnut-makhana.jpg",
    tagline: "Light, roasted lotus-seed snack",
    variants: [
      { weight: "250g", price: 400 },
      { weight: "500g", price: 785 },
      { weight: "1kg", price: 1525 },
    ],
    description:
      "Fox nuts (Makhana), derived from lotus seeds, offer a light and cottony-soft texture. One of the best low-calorie snacks with multiple health benefits.",
    benefits: [
      "Low in Calories",
      "May Help Stabilize Blood Sugar",
      "Rich in Antioxidants",
      "May Support Weight Loss",
    ],
    nutrition: {
      servingSize: "100g",
      items: [
        { name: "Energy", value: 347, unit: "kcal" },
        { name: "Protein", value: 9.7, unit: "g" },
        { name: "Carbohydrates", value: 76, unit: "g" },
        { name: "Fat", value: 0.1, unit: "g" },
        { name: "Fiber", value: 14.5, unit: "g" },
        { name: "Calcium", value: 60, unit: "mg" },
        { name: "Iron", value: 1.4, unit: "mg" },
      ],
    },
  },

  // ---------------------------------------------------------------------
  // SNACKS (Mixes)
  // ---------------------------------------------------------------------
  {
    id: "snack-dryfruit-hotmix",
    category: "Snacks",
    name: "Dryfruit Hotmix",
    price: 300,
    weight: "250g",
    image: "snack-hotmix.jpg",
    tagline: "Spiced mix of nuts & dry fruits",
    variants: [
      { weight: "250g", price: 300 },
      { weight: "500g", price: 589 },
      { weight: "1kg", price: 1149 },
    ],
    description:
      "Our signature Hotmix blends premium nuts and dry fruits with a selection of Indian spices for a bold, savoury snacking experience.",
    benefits: [
      "Mix of Nuts & Dry Fruits",
      "Spiced for Bold Flavour",
      "Good Source of Protein",
      "Great for Sharing",
    ],
    nutrition: {
      servingSize: "100g",
      items: [
        { name: "Energy", value: 480, unit: "kcal" },
        { name: "Protein", value: 12, unit: "g" },
        { name: "Carbohydrates", value: 45, unit: "g" },
        { name: "Fat", value: 28, unit: "g" },
        { name: "Fiber", value: 6, unit: "g" },
        { name: "Sodium", value: 380, unit: "mg" },
        { name: "Iron", value: 3, unit: "mg" },
      ],
    },
  },
  {
    id: "snack-dryfruit-remix",
    category: "Snacks",
    name: "Dryfruit Remix",
    price: 300,
    weight: "250g",
    image: "snack-remix.jpg",
    tagline: "Sweet, salty & a little spicy — all at once",
    variants: [
      { weight: "250g", price: 300 },
      { weight: "500g", price: 600 },
      { weight: "1kg", price: 1200 },
    ],
    description:
      "Our flagship Remix is a unique combination of dry fruits and Indian masalas — sweet, salty, and a little spicy all at the same time. A perfect gift or festive centerpiece.",
    benefits: [
      "Signature Flavour Blend",
      "Mix of Dry Fruits & Spices",
      "Perfect for Gifting",
      "Great Anytime Snack",
    ],
    nutrition: {
      servingSize: "100g",
      items: [
        { name: "Energy", value: 470, unit: "kcal" },
        { name: "Protein", value: 11, unit: "g" },
        { name: "Carbohydrates", value: 48, unit: "g" },
        { name: "Fat", value: 26, unit: "g" },
        { name: "Fiber", value: 5.5, unit: "g" },
        { name: "Sodium", value: 360, unit: "mg" },
        { name: "Iron", value: 2.8, unit: "mg" },
      ],
    },
  },
  {
    id: "snack-farali-banana-mix",
    category: "Snacks",
    name: "Farali Banana Mix (Kela Upwas Chivda)",
    price: 150,
    weight: "250g",
    image: "snack-banana-mix.jpg",
    tagline: "Fasting-friendly banana chip chivda",
    variants: [
      { weight: "250g", price: 150 },
      { weight: "500g", price: 295 },
      { weight: "1kg", price: 575 },
    ],
    description:
      "A fasting-friendly (Farali) mix of banana chips, spices, and dry fruits — a crunchy, anytime snack suitable for religious fasting diets.",
    benefits: [
      "Fasting-Friendly Recipe",
      "Crunchy & Lightly Spiced",
      "Mix of Banana Chips & Dry Fruits",
      "No Onion or Garlic",
    ],
    nutrition: {
      
    },
  },
];

export default products;