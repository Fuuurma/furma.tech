"use client";

import type { RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "@/hooks/useScroll";
import { EASE_OUT_EXPO, motionDuration, motionStagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SplitRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  by?: "word" | "line";
  /** When set, overrides scroll-in-view (e.g. fullscreen section active) */
  trigger?: boolean;
  id?: string;
}

export function SplitReveal({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  by = "word",
  trigger,
  id,
}: SplitRevealProps) {
  const [ref, isInView] = useInView(0.15);
  const reduceMotion = useReducedMotion();
  const isVisible = trigger ?? isInView;
  const units =
    by === "line"
      ? text.split("\n").filter(Boolean)
      : text.split(/\s+/).filter(Boolean);

  if (reduceMotion) {
    return (
      <Tag
        id={id}
        ref={ref as RefObject<HTMLHeadingElement>}
        className={className}
      >
        {text}
      </Tag>
    );
  }

  return (
    <Tag
      id={id}
      ref={ref as RefObject<HTMLHeadingElement>}
      className={cn("split-reveal", className)}
      aria-label={text}
    >
      {units.map((unit, i) => (
        <span key={`${unit}-${i}`} className="split-reveal__unit">
          <motion.span
            className="split-reveal__inner"
            initial={{ y: "115%", rotate: 1.5 }}
            animate={
              isVisible
                ? { y: "0%", rotate: 0 }
                : { y: "115%", rotate: 1.5 }
            }
            transition={{
              duration: motionDuration.reveal,
              delay: delay / 1000 + i * motionStagger.base,
              ease: EASE_OUT_EXPO,
            }}
            aria-hidden
          >
            {unit}
            {by === "word" ? "\u00a0" : null}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
