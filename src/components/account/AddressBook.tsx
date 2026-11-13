import DeliveryLocation from "./DeliveryLocation";
import { mapsUrl, type LocationPin } from "@/lib/googleMaps";
import { useState, type FormEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api, message } from "@/lib/api";
import type { Address } from "@/lib/orders";
import { Field, ErrorNotice, buttonClass } from "./StoreForms";
export default function AddressBook({
  selected,
  onSelect,
}: {
  selected?: string;
  onSelect?: (id: string) => void;
}) {
  const cache = useQueryClient();
  const {
    data: addresses = [],
    isPending,
    error: loadError,
  } = useQuery({ queryKey: ["addresses"], queryFn: () => api<Address[]>("/addresses"), retry: 1 });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [adding, setAdding] = useState(false);
  const [location, setLocation] = useState<LocationPin | null>(null);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setBusy(true);
    setError("");
    try {
      const address = await api<Address>("/addresses", {
        method: "POST",
        body: JSON.stringify({
          ...Object.fromEntries(new FormData(form)),
          latitude: location?.latitude ?? null,
          longitude: location?.longitude ?? null,
        }),
      });
      await cache.invalidateQueries({ queryKey: ["addresses"] });
      onSelect?.(address.id);
      form.reset();
      setAdding(false);
      setLocation(null);
    } catch (e) {
      setError(message(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="space-y-4">
      <ErrorNotice text={error || (loadError ? message(loadError) : "")} />
      {isPending && <p>Loading addresses…</p>}
      <div className="grid gap-3 sm:grid-cols-2">
        {addresses.map((a) => (
          <div
            key={a.id}
            className={
              "rounded-xl border p-4 " +
              (selected === a.id ? "border-primary bg-primary/5" : "bg-card")
            }
          >
            {onSelect && (
              <label className="mb-2 flex gap-2 text-sm font-semibold">
                <input
                  type="radio"
                  name="delivery-address"
                  checked={selected === a.id}
                  onChange={() => onSelect(a.id)}
                />
                Deliver here
              </label>
            )}
            <p className="font-semibold">{a.details.fullName}</p>
            <p className="text-sm">
              {a.details.line1} {a.details.line2}
            </p>
            <p className="text-sm">
              {a.details.city}, {a.details.state} – {a.details.postalCode}
            </p>
            <p className="mt-1 text-sm">{a.details.phone}</p>
            {a.details.latitude != null && a.details.longitude != null && (
              <a
                href={mapsUrl({ latitude: a.details.latitude, longitude: a.details.longitude })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center text-xs font-semibold text-primary"
              >
                Delivery pin on Google Maps ↗
              </a>
            )}
            <button
              type="button"
              disabled={busy}
              className="mt-3 text-xs text-destructive"
              onClick={async () => {
                setBusy(true);
                try {
                  await api(`/addresses/${a.id}`, { method: "DELETE" });
                  if (selected === a.id) onSelect?.("");
                  await cache.invalidateQueries({ queryKey: ["addresses"] });
                } catch (e) {
                  setError(message(e));
                } finally {
                  setBusy(false);
                }
              }}
            >
              Remove address
            </button>
          </div>
        ))}
      </div>
      {!adding && (
        <button
          type="button"
          className="text-sm font-semibold text-primary"
          onClick={() => setAdding(true)}
        >
          + Add delivery address
        </button>
      )}
      {adding && (
        <form
          onSubmit={submit}
          className="grid gap-4 rounded-2xl border bg-card p-5 sm:grid-cols-2"
        >
          <h3 className="font-semibold sm:col-span-2">New delivery address</h3>
          <DeliveryLocation value={location} onChange={setLocation} />
          <Field
            label="Full name"
            name="fullName"
            autoComplete="shipping name"
            maxLength={100}
            required
          />
          <Field
            label="Mobile number"
            name="phone"
            autoComplete="shipping tel-national"
            inputMode="tel"
            pattern="[6-9][0-9]{9}"
            title="10-digit Indian mobile number"
            required
          />
          <Field
            label="House / flat, street"
            name="line1"
            autoComplete="shipping address-line1"
            maxLength={200}
            required
          />
          <Field
            label="Area / landmark (optional)"
            name="line2"
            autoComplete="shipping address-line2"
            maxLength={200}
          />
          <Field
            label="City"
            name="city"
            autoComplete="shipping address-level2"
            maxLength={100}
            required
          />
          <Field
            label="State"
            name="state"
            autoComplete="shipping address-level1"
            maxLength={100}
            required
          />
          <Field
            label="PIN code"
            name="postalCode"
            autoComplete="shipping postal-code"
            inputMode="numeric"
            pattern="[1-9][0-9]{5}"
            title="6-digit PIN code"
            required
          />
          <div className="flex items-end gap-4">
            <button disabled={busy} className={buttonClass}>
              {busy ? "Saving…" : "Save address"}
            </button>
            <button
              type="button"
              onClick={() => {
                setAdding(false);
                setLocation(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
