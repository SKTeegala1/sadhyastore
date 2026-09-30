import { useCart } from "@/lib/cart";
import { useEffect, useRef, useState } from "react";
import {
  ShoppingBag,
  X,
  Minus,
  Plus,
  MessageCircle,
  MapPin,
  Navigation,
} from "lucide-react";

const WHATSAPP = "919666585143";
type DeliveryDetails = {
  name: string;
  phone: string;
  address: string;
  mapLink: string;
};

export default function FloatingCart() {
  const { items, open, setOpen, setQty, remove, flies, bump, clear } = useCart();
  const cartRef = useRef<HTMLButtonElement>(null);
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [animBump, setAnimBump] = useState(false);

  
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [delivery, setDelivery] = useState<DeliveryDetails>({
    name: "",
    phone: "",
    address: "",
    mapLink: "",
  });

  const updateDelivery = (field: keyof DeliveryDetails, value: string) => {
    setDelivery((current) => ({ ...current, [field]: value }));
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Location is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const link = `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;
        updateDelivery("mapLink", link);
      },
      () => {
        alert("Unable to access your location. Please paste a Google Maps link.");
      },
      { enableHighAccuracy: true }
    );
  };

  const placeOrder = () => {
    if (!showAddressForm) {
      setShowAddressForm(true);
      return;
    }

    if (
      !delivery.name.trim() ||
      !delivery.phone.trim() ||
      !delivery.address.trim()
    ) {
      alert("Please enter your name, phone number, and delivery address.");
      return;
    }

    const lines = items
      .map(
        (i) =>
          `• ${i.name} (${i.weight}) × ${i.qty} — ₹${i.price * i.qty}`
      )
      .join("\n");

    const locationText = delivery.mapLink.trim()
      ? `\nGoogle Maps location: ${delivery.mapLink.trim()}`
      : "";

    const msg = `Hi Sadhya Snak Box! I'd like to place an order:

${lines}

*Total: ₹${total}*

Customer name: ${delivery.name}
Phone: ${delivery.phone}
Delivery address: ${delivery.address}${locationText}

Please confirm availability. Thank you!`;

    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };


  useEffect(() => {
    if (cartRef.current) {
      const r = cartRef.current.getBoundingClientRect();
      setTarget({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    }
  }, [flies]);

  useEffect(() => {
    if (bump === 0) return;
    setAnimBump(true);
    const t = setTimeout(() => setAnimBump(false), 500);
    return () => clearTimeout(t);
  }, [bump]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  // const placeOrder = () => {
  //   const lines = items.map((i) => `• ${i.name} (${i.weight}) × ${i.qty} — ₹${i.price * i.qty}`).join("\n");
  //   const msg = `Hi Sadhya Snak Box! I'd like to place an order:\n\n${lines}\n\n*Total: ₹${total}*\n\nPlease confirm availability. Thank you!`;
  //   window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  // };

  return (
    <>
      {/* Fly animations */}
      {flies.map((f) => (
        <img
          key={f.id}
          src={f.image}
          alt=""
          style={{
            position: "fixed",
            left: f.from.x - 40,
            top: f.from.y - 40,
            width: 80,
            height: 80,
            zIndex: 100,
            pointerEvents: "none",
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            // @ts-ignore css var
            "--fly-end": `translate(${target.x - f.from.x}px, ${target.y - f.from.y}px)`,
            animation: "fly-to-cart 0.85s cubic-bezier(0.5, -0.3, 0.7, 0.3) forwards",
          }}
        />
      ))}

      {/* Floating cart button */}
      <button
        ref={cartRef}
        onClick={() => setOpen(true)}
        aria-label="Open cart"
        className={`fixed bottom-6 right-6 z-20 h-16 w-16 rounded-full grid place-items-center text-primary-foreground shadow-2xl transition-transform hover:scale-110 ${animBump ? "animate-cart-bounce" : ""}`}
        style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-warm)" }}
      >
        <ShoppingBag className="w-7 h-7" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 h-7 w-7 rounded-full bg-accent text-accent-foreground text-sm font-bold grid place-items-center border-2 border-background">
            {count}
          </span>
        )}
      </button>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/50 animate-fade-in" />
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-background w-full max-w-md h-full flex flex-col shadow-2xl animate-slide-in-right"
          >
            <div className="flex items-center justify-between p-6 border-b" style={{ background: "var(--gradient-hero)" }}>
              <h2 className="font-display text-2xl font-bold text-primary-foreground">Your Snack Box</h2>
              <button onClick={() => setOpen(false)} className="text-primary-foreground/90 hover:text-primary-foreground">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>Your box is empty.</p>
                  <p className="text-sm mt-2">Add some delicious treats!</p>
                </div>
              )}
              {items.map((it) => (
                <div key={it.cartKey} className="flex gap-4 p-3 rounded-xl border bg-card">
                  <img src={it.image} alt={it.name} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground">{it.name}</h3>
                    <p className="text-xs text-muted-foreground">{it.weight}</p>
                    <p className="text-primary font-bold mt-1">₹{it.price * it.qty}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => remove(it.cartKey)} className="text-muted-foreground hover:text-destructive">
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-1 border rounded-full px-1">
                      <button onClick={() => setQty(it.cartKey, it.qty - 1)} className="p-1 hover:text-primary">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm w-5 text-center">{it.qty}</span>
                      <button onClick={() => setQty(it.cartKey, it.qty + 1)} className="p-1 hover:text-primary">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="border-t p-6 space-y-4 bg-muted/30">
                <div className="flex justify-between text-lg">
                  <span className="font-medium">Total</span>
                  <span className="font-display font-bold text-2xl text-primary">₹{total}</span>
                </div>


                {showAddressForm && (
                  <div className="space-y-3 rounded-xl border bg-background p-4">
                    <h3 className="font-semibold">Delivery details</h3>

                    <input
                      value={delivery.name}
                      onChange={(e) => updateDelivery("name", e.target.value)}
                      placeholder="Full name"
                      className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />

                    <input
                      value={delivery.phone}
                      onChange={(e) => updateDelivery("phone", e.target.value)}
                      placeholder="Phone number"
                      type="tel"
                      className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />

                    <textarea
                      value={delivery.address}
                      onChange={(e) =>
                        updateDelivery("address", e.target.value)
                      }
                      placeholder="Complete delivery address"
                      rows={3}
                      className="w-full resize-none rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />

                    <input
                      value={delivery.mapLink}
                      onChange={(e) =>
                        updateDelivery("mapLink", e.target.value)
                      }
                      placeholder="Paste Google Maps link (optional)"
                      type="url"
                      className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                    />

                    <div className="flex flex-col gap-2 sm:flex-row">
                      <a
                        href="https://www.google.com/maps"
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-muted"
                      >
                        <MapPin className="h-4 w-4" />
                        Choose on Google Maps
                      </a>

                      <button
                        type="button"
                        onClick={useCurrentLocation}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-muted"
                      >
                        <Navigation className="h-4 w-4" />
                        Use my location
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={placeOrder}
                  className="w-full py-4 rounded-full text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-95 transition"
                  style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-warm)" }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    {showAddressForm
                      ? "Send Order on WhatsApp"
                      : "Place Order on WhatsApp"}
                  </span>
                </button>
                <button onClick={clear} className="w-full text-sm text-muted-foreground hover:text-destructive">
                  Clear cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
