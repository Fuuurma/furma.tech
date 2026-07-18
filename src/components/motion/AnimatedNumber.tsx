"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
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
  const count = useMotionValue(reduceMotion ? value : 0);
  const display = useTransform(count, (v) => {
    const rounded = Math.round(v);
    return pad > 0 ? String(rounded).padStart(pad, "0") : String(rounded);
  });

  useEffect(() => {
    if (!shouldRun || reduceMotion) {
      count.set(value);
      return;
    }

    count.set(0);
    const controls = animate(count, value, {
      duration,
      ease: "easeOut",
    });
    return controls.stop;
  }, [shouldRun, value, duration, reduceMotion, count]);

  return (
    <motion.span
      ref={ref}
      className={cn("animated-number tabular-nums", className)}
      initial={{ opacity: 0, y: 8 }}
      animate={shouldRun ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: motionDuration.base, ease: EASE_OUT_EXPO }}
    >
      {display}
    </motion.span>
  );
}
