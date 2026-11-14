import { useId, useRef } from "react";
import { Field } from "./StoreForms";
import { removePack, type PackEditor } from "@/lib/packSizes";
export default function PackSizeEditor({
  value,
  onChange,
  disabled,
}: {
  value: PackEditor;
  onChange: (value: PackEditor) => void;
  disabled: boolean;
}) {
  const group = useId();
  const counter = useRef(0);
  const selected = value.rows.find((row) => row.id === value.defaultId);
  return (
    <fieldset
      disabled={disabled}
      className="min-w-0 space-y-4 rounded-2xl border p-4 md:col-span-2"
    >
      <legend className="px-2 font-semibold">Pack sizes and prices</legend>
      <p className="text-sm text-muted-foreground">
        Add each weight and price once. Select the default pack shown first in the store.
      </p>
      <div className="space-y-3">
        {value.rows.map((row, index) => (
          <div
            key={row.id}
            className={
              "grid min-w-0 gap-3 rounded-xl border p-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto] sm:items-end " +
              (row.id === value.defaultId ? "border-primary/40 bg-primary/5" : "")
            }
          >
            <Field
              label={`Weight / pack size ${index + 1}`}
              placeholder="250g, 500g, 1kg…"
              value={row.weight}
              required
              onChange={(e) =>
                onChange({
                  ...value,
                  rows: value.rows.map((pack) =>
                    pack.id === row.id ? { ...pack, weight: e.target.value } : pack,
                  ),
                })
              }
            />
            <Field
              label={`Price (₹) ${index + 1}`}
              type="number"
              inputMode="decimal"
              step="0.01"
              min="0.01"
              max="100000"
              required
              value={row.price}
              onChange={(e) =>
                onChange({
                  ...value,
                  rows: value.rows.map((pack) =>
                    pack.id === row.id ? { ...pack, price: e.target.value } : pack,
                  ),
                })
              }
            />
            <label className="inline-flex min-h-11 items-center gap-2 text-sm font-medium">
              <input
                type="radio"
                name={group}
                checked={row.id === value.defaultId}
                onChange={() => onChange({ ...value, defaultId: row.id })}
              />
              Default<span className="sr-only"> pack {index + 1}</span>
            </label>
            <button
              type="button"
              aria-label={`Remove pack ${index + 1}`}
              disabled={disabled || value.rows.length === 1}
              className="min-h-11 text-left text-sm text-destructive disabled:opacity-40 sm:px-2"
              onClick={() => onChange(removePack(value, row.id))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        disabled={disabled}
        className="min-h-11 rounded-xl border border-primary/30 px-4 text-sm font-semibold text-primary"
        onClick={() =>
          onChange({
            ...value,
            rows: [...value.rows, { id: `new-pack-${counter.current++}`, weight: "", price: "" }],
          })
        }
      >
        + Add pack size
      </button>
      <p aria-live="polite" className="text-sm text-muted-foreground">
        Default:{" "}
        <strong className="text-foreground">
          {selected?.weight.trim() || "Enter weight"} ·{" "}
          {selected?.price ? `₹${selected.price}` : "Enter price"}
        </strong>
        . Product weight and price are kept in sync automatically.
      </p>
    </fieldset>
  );
}
