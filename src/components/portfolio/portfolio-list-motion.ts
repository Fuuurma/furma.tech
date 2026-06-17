import type { Variants } from "framer-motion";
import { EASE_OUT_EXPO, motionDuration } from "@/lib/motion";

export const listRowVariants: Variants = {
  rest: {},
  hover: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.18,
    },
  },
};

export const expandChildVariants: Variants = {
  rest: {
    opacity: 0,
    y: 20,
    filter: "blur(6px)",
  },
  hover: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: motionDuration.slow,
      ease: EASE_OUT_EXPO,
    },
  },
};

export const previewVisualVariants: Variants = {
  rest: { scale: 0.92, opacity: 0.85 },
  hover: {
    scale: 1,
    opacity: 1,
    transition: { duration: motionDuration.slow, ease: EASE_OUT_EXPO },
  },
};

export const indexVariants: Variants = {
  rest: { scale: 1, opacity: 0.35 },
  hover: {
    scale: 1.2,
    opacity: 0.7,
    transition: { duration: motionDuration.base, ease: EASE_OUT_EXPO },
  },
};
