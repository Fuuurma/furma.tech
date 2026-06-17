"use client";

import { motion, useReducedMotion, useSpring } from "framer-motion";

interface ScrollProgressProps {
  activeIndex: number;
  total: number;
}

export function ScrollProgress({ activeIndex, total }: ScrollProgressProps) {
  const reduceMotion = useReducedMotion();
  const progress = total <= 1 ? 0 : activeIndex / (total - 1);
  const height = useSpring(progress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  });

  if (reduceMotion) {
    return (
      <div
        className="absolute right-0 top-0 bottom-0 z-40 w-px bg-foreground/10 pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute left-0 w-px bg-foreground"
          style={{ height: `${progress * 100}%`, top: 0 }}
        />
      </div>
    );
  }

  return (
    <div
      className="absolute right-0 top-0 bottom-0 z-40 w-px bg-foreground/10 pointer-events-none"
      aria-hidden
    >
      <motion.div
        className="absolute left-0 top-0 w-px bg-foreground origin-top"
        style={{ scaleY: height, height: "100%" }}
      />
    </div>
  );
}
