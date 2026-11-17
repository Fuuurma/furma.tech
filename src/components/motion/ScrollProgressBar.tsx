"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useStableReducedMotion } from "@/lib/use-reduced-motion";

export function ScrollProgressBar() {
  const reduceMotion = useStableReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX, transformOrigin: "0% 50%" }}
      aria-hidden
    />
  );
}
