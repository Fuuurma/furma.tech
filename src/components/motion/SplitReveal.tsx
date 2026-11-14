"use client";

import type { RefObject } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useScroll";
import { useStableReducedMotion } from "@/lib/use-reduced-motion";
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
  /** Reserve this block out of the background plate's ink. */
  reserve?: boolean;
  id?: string;
}

export function SplitReveal({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  by = "word",
  trigger,
  reserve = false,
  id,
}: SplitRevealProps) {
  const [ref, isInView] = useInView(0.15);
  const reduceMotion = useStableReducedMotion();
  const isVisible = trigger ?? isInView;
  const units =
    by === "line"
      ? text.split("\n").filter(Boolean)
      : text.split(/\s+/).filter(Boolean);

  const occurrences = new Map<string, number>();
  const keyedUnits = units.map((unit) => {
    const occurrence = occurrences.get(unit) ?? 0;
    occurrences.set(unit, occurrence + 1);
    return { unit, key: `${unit}-${occurrence}` };
  });

  if (reduceMotion) {
    return (
      <Tag
        id={id}
        ref={ref as RefObject<HTMLHeadingElement>}
        className={className}
        data-screen-reserve={reserve ? "block" : undefined}
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
      data-screen-reserve={reserve ? "block" : undefined}
    >
      {keyedUnits.map(({ unit, key }, i) => (
        <span key={key} className="split-reveal__unit">
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
