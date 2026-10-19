"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/** Cycles through words with a vertical slide. The longest word reserves the width. */
export function RotatingWords({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [interval, reduce, words.length]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className="relative inline-grid align-bottom">
      {/* Invisible sizer keeps the layout from jumping */}
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap">{longest}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          className="text-gradient col-start-1 row-start-1 whitespace-nowrap"
          initial={{ y: "60%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-60%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
