import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ProductVariant = {
  weight: string;
  price: number;
};

export type NutritionItem = {
    name: string;
    value: number;
    unit: string;
};

export type NutritionValue = {
  value: number;
  unit: string;
};

export type NutritionFacts = {
    servingSize: string;

    items: NutritionItem[];
};

export type Category = {
  id: number;
  name: string;
  image: string;
};

export type Product = {
  id: string;
  name: string;
  categoryId: number;
  image: string;          // Primary image (used by cards & cart animation)
  images?: string[];      // Product gallery images
  tagline: string;

  price: number;
  weight: string;
  variants?: ProductVariant[];

  // Product Details
  description: string;
  benefits: string[];

  nutrition: NutritionFacts;

  storage: string[];

  delivery: string[];

  rating: number;
  reviews: number;

  badge?: string;
};

export type CartItem = Product & {
  cartKey: string;
  qty: number;
};

type FlyEvent = {
  id: number;
  from: { x: number; y: number };
  image: string;
};

type CartCtx = {
  items: CartItem[];
  add: (
    product: Product,
    from: { x: number; y: number },
    image: string
  ) => void;
  remove: (cartKey: string) => void;
  setQty: (cartKey: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  flies: FlyEvent[];
  bump: number;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [flies, setFlies] = useState<FlyEvent[]>([]);
  const [bump, setBump] = useState(0);

  useEffect(() => {
  console.log("CartProvider Mounted");

  return () => {
    console.log("CartProvider Unmounted");
  };
}, []);

  const add = useCallback(
    (
      product: Product,
      from: { x: number; y: number },
      image: string
    ) => {
      const flyId = Date.now() + Math.random();

      setFlies((prev) => [
        ...prev,
        {
          id: flyId,
          from,
          image,
        },
      ]);

      window.setTimeout(() => {
        setItems((prevItems) => {
          const cartKey = `${product.id}-${product.weight}`;
          const existingItem = prevItems.find(
    item => item.cartKey === cartKey
);

          if (existingItem) {
            return prevItems.map(item =>
    item.cartKey === cartKey
        ? {
              ...item,
              qty: item.qty + 1,
          }
        : item
);
          }


return [
    ...prevItems,
    {
        ...product,
        cartKey,
        qty: 1,
    },
];
        });

        setBump((b) => b + 1);

        setFlies((prev) =>
          prev.filter((fly) => fly.id !== flyId)
        );
      }, 850);
    },
    []
  );

 const remove = useCallback((cartKey: string) => {
    setItems(prev =>
        prev.filter(item => item.cartKey !== cartKey)
    );
}, []);

  const setQty = useCallback((cartKey: string, qty: number) => {
    setItems((prev) => {
      if (qty <= 0) {
        return prev.filter((item) => item.cartKey !== cartKey);
      }

      return prev.map((item) =>
        item.cartKey === cartKey
          ? {
              ...item,
              qty,
            }
          : item
      );
    });
  }, []);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        remove,
        setQty,
        clear,
        open,
        setOpen,
        flies,
        bump,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}