import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import banner1 from "@/assets/slider/Banner1.png";
import banner2 from "@/assets/slider/Banner2.png";
import banner3 from "@/assets/slider/Banner3.png";
import banner4 from "@/assets/slider/Banner4.png";
import banner5 from "@/assets/slider/Banner5.png";
import banner6 from "@/assets/slider/Banner6.png";
import banner7 from "@/assets/slider/Banner7.png";
import banner9 from "@/assets/slider/Banner9.png";
import banner10 from "@/assets/slider/Banner10.png";
import banner0 from "@/assets/slider/Banner0.png";

const slides = [
    { src: banner1, alt: "Assorted Sadhya Snack Boxes - Banner 1" },
    { src: banner0, alt: "Assorted Sadhya Snack Boxes - Banner 0" },
    { src: banner2, alt: "Assorted Sadhya Snack Boxes - Banner 2" },
  { src: banner3, alt: "Assorted Sadhya Snack Boxes - Banner 3" },
  { src: banner4, alt: "Assorted Sadhya Snack Boxes - Banner 4" },
  { src: banner5, alt: "Assorted Sadhya Snack Boxes - Banner 5" },
  { src: banner6, alt: "Assorted Sadhya Snack Boxes - Banner 6" },
  { src: banner7, alt: "Assorted Sadhya Snack Boxes - Banner 7" },
  { src: banner9, alt: "Assorted Sadhya Snack Boxes - Banner 9" },
  { src: banner10, alt: "Assorted Sadhya Snack Boxes - Banner 10" },
];

const AUTOPLAY_MS = 2000;

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

      <div className="relative rounded-3xl shadow-2xl overflow-hidden aspect-[24/9]">
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
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, oklch(0.94 0.08 70), oklch(0.88 0.14 55))" }} />
      <div className="relative max-w-8xl mx-auto px-6 py-10 md:py-10  md:grid-cols-2 gap-10 items-center">
         <div className="relative animate-float-up">
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
  
}
