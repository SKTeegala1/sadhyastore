import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { DEFAULT_SLIDES, useSlides } from "@/lib/slides";
export default function Hero() {
  const { data, isPending, error } = useSlides();
  const slides = data?.configured ? data.slides : DEFAULT_SLIDES;
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touch = useRef<number | null>(null);
  const index = slides.length ? selected % slides.length : 0;
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const changed = () => setReducedMotion(media.matches);
    media.addEventListener("change", changed);
    return () => media.removeEventListener("change", changed);
  }, []);
  useEffect(() => {
    if (paused || hovered || focused || reducedMotion || slides.length < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setSelected((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, hovered, focused, reducedMotion, slides.length]);
  function step(delta: number) {
    setSelected((current) => (current + delta + slides.length) % slides.length);
  }
  if (isPending)
    return (
      <section aria-label="Loading promotional slides" className="bg-primary/5">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6">
          <div className="aspect-[8/3] animate-pulse rounded-2xl bg-muted motion-reduce:animate-none" />
        </div>
      </section>
    );
  if (error || !slides.length) return null;
  return (
    <section
      aria-label="Sadhya promotional slides"
      aria-roledescription="carousel"
      className="bg-primary/5"
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6">
        <div
          className="overflow-hidden rounded-2xl border border-primary/10 bg-background shadow-sm sm:rounded-3xl"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
          }}
          onTouchStart={(e) => {
            touch.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touch.current === null) return;
            const distance = e.changedTouches[0].clientX - touch.current;
            touch.current = null;
            if (Math.abs(distance) > 50 && slides.length > 1) step(distance > 0 ? -1 : 1);
          }}
        >
          <div
            className={
              "relative w-full bg-muted/20 " +
              (slides.some((slide) => slide.mobileImage)
                ? "aspect-[4/3] sm:aspect-[8/3]"
                : "aspect-[8/3]")
            }
            style={{ touchAction: "pan-y" }}
          >
            {slides.map((slide, i) => (
              <picture
                key={slide.id}
                aria-hidden={i !== index}
                className={
                  "absolute inset-0 block transition-opacity duration-500 motion-reduce:transition-none " +
                  (i === index ? "opacity-100" : "pointer-events-none opacity-0")
                }
              >
                {slide.mobileImage && (
                  <source media="(max-width: 639px)" srcSet={slide.mobileImage} />
                )}
                <img
                  src={slide.image}
                  alt={slide.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-contain"
                />
              </picture>
            ))}
          </div>
          {slides.length > 1 && (
            <div className="flex min-h-14 items-center justify-between gap-2 border-t bg-background px-2 sm:px-4">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => step(-1)}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-muted"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex min-w-0 items-center gap-1 overflow-x-auto px-1">
                {slides.map((slide, i) => (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                    onClick={() => setSelected(i)}
                    className="grid h-11 w-6 shrink-0 place-items-center sm:w-7"
                  >
                    <span
                      className={
                        "h-2 rounded-full " + (i === index ? "w-5 bg-primary" : "w-2 bg-primary/25")
                      }
                    />
                  </button>
                ))}
              </div>
              <div className="flex shrink-0">
                <button
                  type="button"
                  aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                  aria-pressed={paused}
                  onClick={() => setPaused((v) => !v)}
                  className="inline-flex h-11 w-9 items-center justify-center rounded-full hover:bg-muted"
                >
                  {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  aria-label="Next slide"
                  onClick={() => step(1)}
                  className="inline-flex h-11 w-9 items-center justify-center rounded-full hover:bg-muted"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
