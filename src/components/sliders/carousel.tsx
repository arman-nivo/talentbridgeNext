"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

type EmblaOptionsType = NonNullable<Parameters<typeof useEmblaCarousel>[0]>;

type CarouselProps = {
  children: ReactNode;
  label: string;
  /** Tailwind width classes for each slide, e.g. "basis-full md:basis-1/2". */
  slideClassName?: string;
  autoplay?: boolean;
  delay?: number;
  options?: EmblaOptionsType;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
};

/**
 * Accessible, touch-friendly slider built on Embla.
 * Slides are passed as children, so they can be server-rendered.
 */
export function Carousel({
  children,
  label,
  slideClassName = "basis-full",
  autoplay = false,
  delay = 5500,
  options,
  showArrows = true,
  showDots = true,
  className = "",
}: CarouselProps) {
  const plugins = useMemo(
    () => (autoplay ? [Autoplay({ delay, stopOnInteraction: false, stopOnMouseEnter: true })] : []),
    [autoplay, delay],
  );
  const [viewportRef, api] = useEmblaCarousel({ loop: true, align: "start", ...options }, plugins);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const slides = Children.toArray(children);

  useEffect(() => {
    if (!api) return;
    const sync = () => {
      setSnaps(api.scrollSnapList());
      setSelected(api.selectedScrollSnap());
    };
    api.on("select", sync).on("reInit", sync).on("init", sync);
    // Run once for the current state (Embla may already be initialised).
    queueMicrotask(sync);
    return () => {
      api.off("select", sync).off("reInit", sync).off("init", sync);
    };
  }, [api]);

  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);

  return (
    <div
      className={`relative ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }}
    >
      <div className="overflow-hidden" ref={viewportRef}>
        <div className="-ml-5 flex touch-pan-y">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`min-w-0 shrink-0 grow-0 pl-5 ${slideClassName}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {(showArrows || showDots) && (
        <div className="mt-8 flex items-center justify-between gap-4">
          {showDots ? (
            <div className="flex flex-wrap items-center gap-2">
              {snaps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === selected}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === selected ? "w-8 bg-accent" : "w-2 bg-line-strong hover:bg-subtle"
                  }`}
                />
              ))}
            </div>
          ) : (
            <span />
          )}
          {showArrows ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-fg transition hover:border-accent/50 hover:text-accent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-fg transition hover:border-accent/50 hover:text-accent"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
