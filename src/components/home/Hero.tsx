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
      <section
        aria-label="Loading promotional slides"
        className="aspect-[8/3] w-full animate-pulse bg-muted motion-reduce:animate-none"
      />
    );
  if (error || !slides.length) return null;
  return (
    <section
      aria-label="Sadhya promotional slides"
      aria-roledescription="carousel"
      className="w-full"
    >
      <div
        className="relative w-full overflow-hidden bg-muted/20"
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
            "relative w-full " +
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
                className="h-full w-full object-cover object-center"
              />
            </picture>
          ))}
        </div>
        {slides.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => step(-1)}
              className="absolute left-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white shadow-sm transition hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:left-5 sm:h-11 sm:w-11"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => step(1)}
              className="absolute right-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white shadow-sm transition hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:right-5 sm:h-11 sm:w-11"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="absolute bottom-2 left-1/2 z-10 flex max-w-[calc(100%-7rem)] -translate-x-1/2 items-center overflow-x-auto rounded-full bg-black/35 px-2 sm:bottom-4">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => setSelected(i)}
                  className="grid h-8 w-5 shrink-0 place-items-center sm:h-10 sm:w-6"
                >
                  <span
                    className={
                      "h-2 rounded-full shadow-sm " +
                      (i === index ? "w-4 bg-white" : "w-2 bg-white/50")
                    }
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              aria-pressed={paused}
              onClick={() => setPaused((v) => !v)}
              className="absolute bottom-2 right-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 sm:bottom-4 sm:right-5 sm:h-10 sm:w-10"
            >
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
