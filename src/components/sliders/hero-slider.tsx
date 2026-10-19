"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Activity, HeartPulse, Rocket } from "lucide-react";
import { useEffect, useState } from "react";

export type HeroSlide = { image: string; alt: string; eyebrow: string; title: string };

const DURATION = 6000;

/** Crossfading photo slider with progress bars and floating stat cards. */
export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), DURATION);
    return () => window.clearTimeout(id);
  }, [index, paused, reduce, slides.length]);

  const slide = slides[index];

  return (
    <div
      className="relative mx-auto w-full max-w-xl lg:max-w-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute -inset-4 rounded-[2.5rem] bg-brand opacity-25 blur-3xl" />

      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line-strong bg-surface-solid shadow-2xl sm:aspect-[5/5]">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.image}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">{slide.eyebrow}</span>
              <p className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">{slide.title}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex gap-2" role="tablist" aria-label="Hero slides">
            {slides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show slide ${i + 1}: ${s.eyebrow}`}
                onClick={() => setIndex(i)}
                className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/25"
              >
                {i < index ? <span className="absolute inset-0 bg-white" /> : null}
                {i === index ? (
                  <motion.span
                    key={`${index}-${paused}`}
                    className="absolute inset-y-0 left-0 bg-white"
                    initial={{ width: paused || reduce ? "100%" : "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: paused || reduce ? 0 : DURATION / 1000, ease: "linear" }}
                  />
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating glass stat cards */}
      <div className="glass absolute -left-4 top-10 hidden animate-float rounded-2xl p-4 shadow-xl sm:block lg:-left-10">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
            <HeartPulse className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-subtle">Retention score</p>
            <p className="font-display text-lg font-bold text-fg">96% · Low risk</p>
          </div>
        </div>
      </div>

      <div className="glass absolute -right-3 top-1/2 hidden animate-float-slow rounded-2xl p-4 shadow-xl sm:block lg:-right-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-500">
            <Rocket className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-subtle">Team deployed</p>
            <p className="font-display text-lg font-bold text-fg">12 days</p>
          </div>
        </div>
      </div>

      <div className="glass absolute -bottom-6 left-10 hidden items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-fg shadow-xl md:flex">
        <Activity className="h-4 w-4 text-accent" />
        Live sprint velocity <b className="text-accent">94.8</b>
      </div>
    </div>
  );
}
