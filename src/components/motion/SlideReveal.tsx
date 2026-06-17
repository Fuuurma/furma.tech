"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO, motionDuration } from "@/lib/motion";

interface SlideRevealProps {
  isActive: boolean;
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** One-shot enter when a fullscreen section becomes active */
export function SlideReveal({
  isActive,
  children,
  className,
  delay = 0,
  y = 24,
}: SlideRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={false}
      animate={
        reduceMotion || isActive
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y, filter: "blur(4px)" }
      }
      transition={{
        duration: motionDuration.slow,
        delay: isActive ? delay : 0,
        ease: EASE_OUT_EXPO,
      }}
    >
      {children}
    </motion.div>
  );
}
