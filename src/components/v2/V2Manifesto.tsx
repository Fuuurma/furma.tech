"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const CREED =
  "We don't chase unicorns. We forge tools that operators actually use — then charge money for them. Eleven products, two verticals, zero investors. Every line of code pays its rent.";

const PRINCIPLES = [
  {
    n: "01",
    title: "Software that works",
    body: "No demos-of-demos. If it doesn't survive a busy Friday night service, it doesn't ship.",
  },
  {
    n: "02",
    title: "Charge from day one",
    body: "Revenue is the only honest metric. Profitability before flashy — always.",
  },
  {
    n: "03",
    title: "Small on purpose",
    body: "No layers, no committees. A tight workshop where craft compounds.",
  },
] as const;

function Word({
  children,
  index,
  total,
  progress,
}: {
  children: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.14, 1]);
  const accent = children.includes("rent") || children.includes("money");

  return (
    <motion.span
      style={{ opacity }}
      className={accent ? "text-[var(--v2-accent-deep)]" : undefined}
    >
      {children}{" "}
    </motion.span>
  );
}

export function V2Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.42"],
  });

  const words = CREED.split(" ");

  return (
    <section
      id="workshop"
      className="relative px-[var(--v2-gutter)] py-[var(--v2-section)]"
    >
      <div className="mb-12 flex items-center justify-between">
        <p className="v2-label">
          <span className="text-[var(--v2-accent-deep)]">§01</span> — The workshop
          creed
        </p>
        <p className="v2-label hidden md:block">Read time: 8 seconds</p>
      </div>

      <div ref={ref}>
        <p className="max-w-[24ch] font-[family-name:var(--v2-font-display)] text-[clamp(1.9rem,4.6vw,4.2rem)] leading-[1.12] font-bold tracking-[-0.015em] [font-stretch:112%]">
          {words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              index={i}
              total={words.length}
              progress={scrollYProgress}
            >
              {word}
            </Word>
          ))}
        </p>
      </div>

      <div className="mt-20 grid gap-10 border-t border-[var(--v2-line)] pt-10 md:grid-cols-3 md:gap-8">
        {PRINCIPLES.map((p, i) => (
          <motion.article
            key={p.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.12,
            }}
            className="group"
          >
            <p className="v2-label mb-5 flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-[var(--v2-accent)] transition-all duration-500 group-hover:w-14" />
              {p.n}
            </p>
            <h3 className="mb-3 font-[family-name:var(--v2-font-display)] text-[clamp(1.2rem,1.7vw,1.5rem)] font-extrabold tracking-[-0.01em] uppercase [font-stretch:118%]">
              {p.title}
            </h3>
            <p className="max-w-[36ch] text-[0.95rem] leading-[1.65] text-[var(--v2-ink-60)]">
              {p.body}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
