"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO, motionDuration } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface AnimatedNumberProps {
  value: number;
  className?: string;
  pad?: number;
  duration?: number;
  trigger?: boolean;
}

export function AnimatedNumber({
  value,
  className,
  pad = 0,
  duration = 1.1,
  trigger,
}: AnimatedNumberProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const shouldRun = trigger ?? inView;
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!shouldRun || reduceMotion) {
      setDisplay(value);
      return;
    }

    let start: number | null = null;
    let frame = 0;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min(1, (ts - start) / (duration * 1000));
      const eased = 1 - (1 - t) ** 3;
      setDisplay(Math.round(eased * value));
      if (t < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [shouldRun, value, duration, reduceMotion]);

  const text = pad > 0 ? String(display).padStart(pad, "0") : String(display);

  return (
    <motion.span
      ref={ref}
      className={cn("animated-number tabular-nums", className)}
      initial={{ opacity: 0, y: 8 }}
      animate={shouldRun ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: motionDuration.base, ease: EASE_OUT_EXPO }}
    >
      {text}
    </motion.span>
  );
}
