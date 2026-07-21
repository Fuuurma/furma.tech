"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { V2_STATS } from "@/lib/v2-projects";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      <span className="text-[var(--v2-accent)]">{suffix}</span>
    </span>
  );
}

export function V2Stats() {
  return (
    <section
      aria-label="Studio numbers"
      className="border-y border-[var(--v2-ink)] bg-[var(--v2-dark)] text-[var(--v2-cream-on-dark)]"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {V2_STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col gap-3 px-[var(--v2-gutter)] py-12 md:py-16 ${
              i > 0 ? "border-l border-[oklch(1_0_0/0.1)]" : ""
            } ${i >= 2 ? "max-lg:border-t max-lg:border-[oklch(1_0_0/0.1)]" : ""} ${
              i === 2 ? "max-lg:border-l-0" : ""
            }`}
          >
            <span className="v2-display text-[clamp(2.6rem,5.5vw,5rem)]">
              <Counter value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="v2-label v2-label--cream">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
