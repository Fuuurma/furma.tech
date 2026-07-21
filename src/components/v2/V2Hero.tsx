"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const lineVariants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, ease: EASE, delay: 0.35 + i * 0.12 },
  }),
};

function RevealLine({
  index,
  children,
  className,
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className ?? ""}`}
        custom={index}
        variants={lineVariants}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function V2Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="v2-blueprint relative flex min-h-svh flex-col justify-between overflow-hidden pt-16"
    >
      {/* fade the blueprint out toward the bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_35%,var(--v2-paper)_92%)]"
      />

      {/* meta strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-10 flex items-center justify-between px-[var(--v2-gutter)] pt-6"
      >
        <p className="v2-label">Est. OÜ — Tallinn</p>
        <p className="v2-label hidden md:block">41.23°N, 1.81°E — Sitges, CAT</p>
        <p className="v2-label">Portfolio ℅ 2026</p>
      </motion.div>

      {/* main lockup */}
      <div className="relative z-10 px-[var(--v2-gutter)]">
        <h1 className="v2-display text-[clamp(2.5rem,12.4vw,11.5rem)]">
          <RevealLine index={0}>
            We build
            <span
              aria-hidden="true"
              className="v2-star ml-[0.12em] text-[0.5em] align-[0.28em]"
            >
              ✳
            </span>
          </RevealLine>
          <RevealLine index={1} className="v2-display-outline">
            Software
          </RevealLine>
          <RevealLine index={2}>
            <span className="v2-serif-accent mr-[0.15em] text-[0.92em] font-normal normal-case">
              that
            </span>
            works
            <span className="text-[var(--v2-accent)]">.</span>
          </RevealLine>
        </h1>

        {/* sticker */}
        <motion.div
          initial={reduceMotion ? false : { scale: 0, rotate: -14 }}
          animate={{ scale: 1, rotate: -2 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.15 }}
          className="absolute -top-2 right-[var(--v2-gutter)] hidden lg:block"
        >
          <span className="v2-sticker">0% VC — 100% ours</span>
        </motion.div>
      </div>

      {/* bottom row */}
      <div className="relative z-10 px-[var(--v2-gutter)] pb-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 1.0 }}
            className="max-w-[42ch] text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.55] font-medium text-[var(--v2-ink-60)]"
          >
            A bootstrapped venture studio forging{" "}
            <span className="text-[var(--v2-ink)]">11 products</span> across AI,
            SaaS, games and civic tech. No pitch decks. No burn rate.{" "}
            <span className="v2-serif-accent text-[1.1em] text-[var(--v2-ink)]">
              Profitable before flashy.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 1.1 }}
            className="flex items-center gap-4"
          >
            <a
              href="#index"
              data-cursor-label="scroll"
              className="group inline-flex items-center gap-3 rounded-full bg-[var(--v2-ink)] px-7 py-4 font-[family-name:var(--v2-font-mono)] text-[11px] tracking-[0.12em] text-[var(--v2-paper)] uppercase transition-colors duration-300 hover:bg-[var(--v2-accent-deep)]"
            >
              See the index
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </a>
            <span className="v2-label hidden sm:block">
              11 products
              <br />
              2 verticals
            </span>
          </motion.div>
        </div>

        {/* stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-10 grid grid-cols-2 gap-px border-t border-[var(--v2-line)] pt-5 md:grid-cols-4"
        >
          {[
            ["Products", "11"],
            ["In development", "04"],
            ["Venture capital", "0%"],
            ["Headcount", "Small on purpose"],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col gap-1 pr-4">
              <span className="v2-label">{label}</span>
              <span className="font-[family-name:var(--v2-font-display)] text-[clamp(1.1rem,1.8vw,1.5rem)] font-bold tracking-[-0.01em] [font-stretch:110%]">
                {value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
