import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Product = {
  id: string;
  name: string;
  price: number;
  weight: string;
  image: string;
  tagline: string;
};

export type CartItem = Product & { qty: number };

type FlyEvent = { id: number; from: { x: number; y: number }; image: string };

type CartCtx = {
  items: CartItem[];
  add: (p: Product, from: { x: number; y: number }, image: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  flies: FlyEvent[];
  bump: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [flies, setFlies] = useState<FlyEvent[]>([]);
  const [bump, setBump] = useState(0);

  const add = useCallback((p: Product, from: { x: number; y: number }, image: string) => {
    const id = Date.now() + Math.random();
    setFlies((f) => [...f, { id, from, image }]);
    window.setTimeout(() => {
      setItems((prev) => {
        const found = prev.find((i) => i.id === p.id);
        if (found) return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
        return [...prev, { ...p, qty: 1 }];
      });
      setBump((b) => b + 1);
      setFlies((f) => f.filter((x) => x.id !== id));
    }, 850);
  }, []);

  const remove = useCallback((id: string) => setItems((p) => p.filter((i) => i.id !== id)), []);
  const setQty = useCallback(
    (id: string, qty: number) =>
      setItems((p) => (qty <= 0 ? p.filter((i) => i.id !== id) : p.map((i) => (i.id === id ? { ...i, qty } : i)))),
    [],
  );
  const clear = useCallback(() => setItems([]), []);

  return (
    <Ctx.Provider value={{ items, add, remove, setQty, clear, open, setOpen, flies, bump }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside provider");
  return c;
}