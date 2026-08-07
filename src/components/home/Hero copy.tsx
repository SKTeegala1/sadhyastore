import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import banner2 from "@/assets/slider/Banner2.png";
import banner3 from "@/assets/slider/Banner3.png";
import banner4 from "@/assets/slider/Banner4.png";
import banner5 from "@/assets/slider/Banner5.png";
import banner1 from "@/assets/Hero.jpg";

const slides = [
    { src: banner1, alt: "Assorted Sadhya Snack Boxes - Banner 1" },
  { src: banner2, alt: "Assorted Sadhya Snack Boxes - Banner 2" },
  { src: banner3, alt: "Assorted Sadhya Snack Boxes - Banner 3" },
  { src: banner4, alt: "Assorted Sadhya Snack Boxes - Banner 4" },
  { src: banner5, alt: "Assorted Sadhya Snack Boxes - Banner 5" },
];

const AUTOPLAY_MS = 4000;

function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex(((i % slides.length) + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute -inset-8 rounded-full blur-3xl opacity-40" style={{ background: "var(--gradient-warm)" }} />

      <div className="relative rounded-3xl shadow-2xl overflow-hidden aspect-[16/9]">
        {slides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={1600}
            height={900}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? "auto" : "none" }}
          />
        ))}

        {/* Prev / Next arrows */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/70 backdrop-blur border flex items-center justify-center hover:bg-background transition"
        >
          <ChevronLeft className="w-4 h-4 text-secondary" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/70 backdrop-blur border flex items-center justify-center hover:bg-background transition"
        >
          <ChevronRight className="w-4 h-4 text-secondary" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === index ? "1.5rem" : "0.5rem",
                background: i === index ? "var(--gradient-hero, #fff)" : "rgba(255,255,255,0.6)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute -bottom-6 -left-6 bg-background rounded-2xl px-5 py-3 shadow-xl border">
        <div className="text-xs text-muted-foreground">Flat</div>
        <div className="font-display font-bold text-3xl text-primary">10% OFF</div>
        <div className="text-xs text-secondary">on first order</div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, oklch(0.94 0.08 70), oklch(0.88 0.14 55))" }} />
      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div className="animate-float-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/70 backdrop-blur border text-xs font-semibold text-secondary mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" /> TRADITION · OCCASION · NUTRITION
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-secondary leading-[1.05]">
            Indulge in a <span className="italic text-primary">handcrafted</span> box of goodness.
          </h1>
          <p className="mt-6 text-lg text-secondary/80 max-w-lg">
            Premium dry fruits, roasted nuts and artisanal namkeens — sourced from India's finest orchards and packed fresh for you.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#shop" className="px-8 py-4 rounded-full text-primary-foreground font-semibold hover:scale-105 transition" style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-warm)" }}>
              Shop Now
            </a>
            <a href="#categories" className="px-8 py-4 rounded-full border-2 border-secondary text-secondary font-semibold hover:bg-secondary hover:text-primary-foreground transition">
              Explore Range
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-secondary/80">
            <div><span className="font-display font-bold text-2xl text-primary">10K+</span><div className="text-xs">Happy Boxes</div></div>
            <div className="w-px h-10 bg-secondary/20" />
            <div><span className="font-display font-bold text-2xl text-primary">100%</span><div className="text-xs">Fresh Sourced</div></div>
            <div className="w-px h-10 bg-secondary/20" />
            <div><span className="font-display font-bold text-2xl text-primary">4.9★</span><div className="text-xs">Rated</div></div>
          </div>
        </div>
        <div className="relative animate-float-up">
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}
