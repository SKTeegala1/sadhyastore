import { mapsUrl } from "@/lib/googleMaps";
import type { Order } from "@/lib/orders";
import { money } from "@/lib/orders";
export default function OrderList({
  orders,
  onStatus,
}: {
  orders: Order[];
  onStatus?: (id: string, status: string) => Promise<void>;
}) {
  if (!orders.length)
    return (
      <p className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
        No orders yet.
      </p>
    );
  const nextStatus: Record<string, string> = {
    Pending: "Confirmed",
    Confirmed: "Shipped",
    Shipped: "Delivered",
  };
  return (
    <div className="space-y-4">
      {orders.map((o) => (
        <article key={o.id} className="rounded-2xl border bg-card p-5">
          <div className="flex flex-wrap justify-between gap-3">
            <div>
              <h3 className="font-semibold">Order #{o.id.slice(0, 8).toUpperCase()}</h3>
              <p className="text-xs text-muted-foreground">
                {new Date(o.createdAt).toLocaleString("en-IN")} · {o.paymentMethod}
              </p>
            </div>
            <span className="h-fit rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              {o.status}
            </span>
          </div>
          <div className="my-4 space-y-2">
            {o.items.map((i, n) => (
              <div key={n} className="flex justify-between gap-3 text-sm">
                <span>
                  {i.name} · {i.weight} × {i.quantity}
                </span>
                <span>{money(i.unitPrice * i.quantity)}</span>
              </div>
            ))}
          </div>
          <p className="text-right font-semibold">Total {money(o.total)}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            {o.address.fullName} · {o.address.line1} {o.address.line2}, {o.address.city},{" "}
            {o.address.state} {o.address.postalCode} · {o.address.phone}
          </p>
          {o.address.latitude != null && o.address.longitude != null && (
            <a
              href={mapsUrl({ latitude: o.address.latitude, longitude: o.address.longitude })}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-primary"
            >
              Open delivery location on Google Maps ↗
            </a>
          )}
          {onStatus && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
              <span>{o.customerEmail}</span>
              {nextStatus[o.status] && (
                <button
                  className="font-semibold text-primary"
                  onClick={() => void onStatus(o.id, nextStatus[o.status])}
                >
                  Mark {nextStatus[o.status]} →
                </button>
              )}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
