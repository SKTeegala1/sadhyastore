import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCart } from "@/lib/cart";
import { api, message } from "@/lib/api";
import { money, type Order } from "@/lib/orders";
import RequireAccount from "@/components/account/RequireAccount";
import AddressBook from "@/components/account/AddressBook";
import { Panel, ErrorNotice, buttonClass } from "@/components/account/StoreForms";
export const Route = createFileRoute("/checkout")({
  component: () => (
    <RequireAccount next="/checkout">
      <Checkout />
    </RequireAccount>
  ),
});
function Checkout() {
  const { items, clear } = useCart();
  const cache = useQueryClient();
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const requestKey = useRef("");
  const inFlight = useRef(false);
  async function placeOrder() {
    if (inFlight.current) return;
    inFlight.current = true;
    setBusy(true);
    setError("");
    // Keep the same key on network retries so a confirmed order is not duplicated.
    requestKey.current ||= crypto.randomUUID();
    try {
      const result = await api<Order>("/orders", {
        method: "POST",
        body: JSON.stringify({
          addressId: address,
          requestKey: requestKey.current,
          items: items.map((i) => ({ productId: i.id, weight: i.weight, quantity: i.qty })),
        }),
      });
      setOrder(result);
      clear();
      await cache.invalidateQueries({ queryKey: ["products"] });
      await cache.invalidateQueries({ queryKey: ["orders"] });
    } catch (e) {
      setError(message(e));
    } finally {
      setBusy(false);
      inFlight.current = false;
    }
  }
  if (order)
    return (
      <Panel
        title="Thank you for your order!"
        subtitle={`Order #${order.id.slice(0, 8).toUpperCase()} has been received.`}
      >
        <p>Pay {money(order.total)} on delivery. Your order is pending store confirmation.</p>
        <Link to="/account" className="mt-6 inline-block font-semibold text-primary">
          View your orders →
        </Link>
      </Panel>
    );
  if (!items.length)
    return (
      <Panel title="Your cart is empty">
        <Link to="/" className="text-primary">
          Continue shopping →
        </Link>
      </Panel>
    );
  return (
    <Panel title="Checkout" subtitle="1. Delivery address · 2. Review your order · 3. Place order">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Delivery address</h2>
          <AddressBook selected={address} onSelect={setAddress} />
        </div>
        <aside className="h-fit rounded-2xl border bg-card p-6">
          <h2 className="text-xl font-semibold">Order summary</h2>
          <div className="my-5 space-y-3">
            {items.map((i) => (
              <div key={i.cartKey} className="flex justify-between gap-3 text-sm">
                <span>
                  {i.name}
                  <small className="block text-muted-foreground">
                    {i.weight} × {i.qty}
                  </small>
                </span>
                <span>{money(i.price * i.qty)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between border-t pt-4 font-bold">
            <span>Estimated total</span>
            <span>{money(items.reduce((sum, i) => sum + i.price * i.qty, 0))}</span>
          </div>
          <p className="my-4 text-xs text-muted-foreground">
            Cash on delivery. No online payment is collected. Prices and stock are verified when
            placing the order. No delivery fee is currently added.
          </p>
          <ErrorNotice text={error} />
          <button
            onClick={() => void placeOrder()}
            disabled={!address || busy}
            className={buttonClass + " mt-4 w-full"}
          >
            {busy ? "Placing order…" : "Place order · Pay on delivery"}
          </button>
          {!address && (
            <p className="mt-2 text-xs text-muted-foreground">
              Select a saved address to continue.
            </p>
          )}
        </aside>
      </div>
    </Panel>
  );
}
