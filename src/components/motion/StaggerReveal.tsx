"use client";

import type { ReactNode } from "react";
import { Children } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "@/hooks/useScroll";
import { EASE_OUT_EXPO, motionStagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: motionStagger.base,
      delayChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
};

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
}

export function StaggerReveal({ children, className }: StaggerRevealProps) {
  const [ref, inView] = useInView(0.08);
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {Children.map(children, (child, i) => (
        <motion.div key={i} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
