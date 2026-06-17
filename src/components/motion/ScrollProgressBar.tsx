"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const reduceMotion = useReducedMotion();
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
