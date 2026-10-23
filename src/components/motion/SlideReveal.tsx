"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useStableReducedMotion } from "@/lib/use-reduced-motion";
import { EASE_OUT_EXPO, motionDuration } from "@/lib/motion";

interface SlideRevealProps {
  isActive: boolean;
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Reserve this block out of the background plate's ink. */
  reserve?: boolean;
}

/** One-shot enter when a fullscreen section becomes active */
export function SlideReveal({
  isActive,
  children,
  className,
  delay = 0,
  y = 24,
  reserve = false,
}: SlideRevealProps) {
  const reduceMotion = useStableReducedMotion();

  return (
    <motion.div
      className={className}
      data-screen-reserve={reserve || undefined}
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
