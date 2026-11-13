import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { DEFAULT_SLIDES, useSlides, type Slide } from "@/lib/slides";
import { api, message } from "@/lib/api";
import ImageUpload from "./ImageUpload";
import { Field, ErrorNotice, buttonClass } from "./StoreForms";
export default function SlideManager() {
  const query = useSlides(true);
  const cache = useQueryClient();
  const [draft, setDraft] = useState<Slide[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const slides = draft ?? (query.data?.configured ? query.data.slides : DEFAULT_SLIDES);
  const locked = busy || uploading > 0;
  function update(id: string, values: Partial<Slide>) {
    setDraft((previous) =>
      (previous ?? slides).map((slide) => (slide.id === id ? { ...slide, ...values } : slide)),
    );
    setNotice("");
  }
  function move(index: number, delta: number) {
    const next = [...slides];
    [next[index], next[index + delta]] = [next[index + delta], next[index]];
    setDraft(next);
    setNotice("");
  }
  async function save() {
    if (locked) return;
    setError("");
    setNotice("");
    if (slides.some((s) => !s.image || !s.alt.trim())) {
      setError("Upload an image and enter a description for every slide.");
      return;
    }
    setBusy(true);
    try {
      await api("/admin/slides", { method: "PUT", body: JSON.stringify(slides) });
      await Promise.all([
        cache.invalidateQueries({ queryKey: ["slides"] }),
        cache.invalidateQueries({ queryKey: ["admin-slides"] }),
      ]);
      setDraft(null);
      setNotice("Homepage slides saved.");
    } catch (e) {
      setError(message(e));
    } finally {
      setBusy(false);
    }
  }
  if (query.isPending) return <p>Loading slides…</p>;
  if (query.error) return <ErrorNotice text={message(query.error)} />;
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">Homepage slides</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Upload desktop banners and optional mobile versions. Move slides into order, then save
            changes. Images fill the full-width banner. Use matching aspect ratios to control
            cropping.
          </p>
        </div>
        <button
          className={buttonClass}
          disabled={locked || slides.length >= 30}
          onClick={() => {
            setDraft([
              ...slides,
              { id: crypto.randomUUID(), image: "", mobileImage: "", alt: "", isActive: true },
            ]);
            setNotice("");
          }}
        >
          + Add slide
        </button>
      </div>
      <button disabled={locked} className={buttonClass} onClick={() => void save()}>
        {busy ? "Saving…" : uploading ? "Uploading images…" : "Save changes"}
      </button>
      <ErrorNotice text={error} />
      {notice && (
        <p role="status" className="rounded-xl bg-primary/10 p-3 text-primary">
          {notice}
        </p>
      )}
      <div className="grid gap-4 lg:grid-cols-2">
        {slides.map((slide, index) => (
          <article
            key={slide.id}
            className="min-w-0 space-y-4 rounded-2xl border bg-card p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold">Slide {index + 1}</h3>
              <div className="flex gap-1">
                <button
                  type="button"
                  aria-label={`Move slide ${index + 1} up`}
                  disabled={locked || index === 0}
                  onClick={() => move(index, -1)}
                  className="min-h-11 rounded-lg border px-3 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  aria-label={`Move slide ${index + 1} down`}
                  disabled={locked || index === slides.length - 1}
                  onClick={() => move(index, 1)}
                  className="min-h-11 rounded-lg border px-3 disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  type="button"
                  disabled={locked}
                  className="min-h-11 px-3 text-sm text-destructive"
                  onClick={() => {
                    setDraft(slides.filter((s) => s.id !== slide.id));
                    setNotice("");
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
            {slide.image && (
              <div className="aspect-[8/3] overflow-hidden rounded-xl border bg-muted/30">
                <img
                  src={slide.image}
                  alt={slide.alt || "Slide preview"}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <Field
              label="Slide description / alt text"
              maxLength={200}
              required
              value={slide.alt}
              disabled={busy}
              onChange={(e) => update(slide.id, { alt: e.target.value })}
            />
            <ImageUpload
              label="Upload desktop slide"
              value={slide.image}
              disabled={busy}
              onBusyChange={(value) => setUploading((n) => n + (value ? 1 : -1))}
              onChange={(url) => update(slide.id, { image: url })}
            />
            <details className="rounded-xl border p-3">
              <summary className="cursor-pointer text-sm font-medium">
                Mobile image (optional)
              </summary>
              <div className="mt-3">
                <ImageUpload
                  label="Upload mobile slide"
                  value={slide.mobileImage}
                  disabled={busy}
                  onBusyChange={(value) => setUploading((n) => n + (value ? 1 : -1))}
                  onChange={(url) => update(slide.id, { mobileImage: url })}
                />
                {slide.mobileImage && (
                  <button
                    type="button"
                    disabled={locked}
                    className="mt-2 min-h-11 text-sm text-destructive"
                    onClick={() => update(slide.id, { mobileImage: "" })}
                  >
                    Use desktop image on mobile
                  </button>
                )}
              </div>
            </details>
            <label className="flex min-h-11 items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={slide.isActive}
                disabled={busy}
                onChange={(e) => update(slide.id, { isActive: e.target.checked })}
              />
              Visible on homepage
            </label>
          </article>
        ))}
      </div>
      {!slides.length && (
        <p className="rounded-xl border border-dashed p-6 text-center text-muted-foreground">
          No slides. Add one, or save to hide the homepage carousel.
        </p>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <button disabled={locked} className={buttonClass} onClick={() => void save()}>
          {uploading ? "Uploading images…" : busy ? "Saving…" : "Save slides"}
        </button>
        <button
          disabled={locked || draft === null}
          onClick={() => {
            setDraft(null);
            setError("");
            setNotice("");
          }}
        >
          Discard changes
        </button>
        <p className="text-xs text-muted-foreground">
          {slides.length}/30 slides · JPEG, PNG or WebP up to 5 MB each
        </p>
      </div>
    </div>
  );
}
