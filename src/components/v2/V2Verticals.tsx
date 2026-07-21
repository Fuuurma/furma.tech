"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const SAAS_ITEMS = [
  { name: "restauManager", tag: "Hospitality", href: "/portfolio/restauramanager" },
  { name: "GuideTours", tag: "Tourism", href: "/portfolio/guidetours" },
  { name: "FinanceHub", tag: "Finance", href: "/portfolio/financehub" },
  { name: "QArt", tag: "Marketing", href: "/portfolio/qart" },
] as const;

const AITLAS_ITEMS = [
  { name: "Nova", tag: "Workspace", href: "/portfolio/aitlas/nova" },
  { name: "Nexus", tag: "Runtime", href: "/portfolio/aitlas/nexus" },
  { name: "Agents", tag: "Marketplace", href: "/portfolio/aitlas/agents" },
] as const;

export function V2Verticals() {
  return (
    <section
      id="verticals"
      className="relative border-t border-[var(--v2-line)] bg-[var(--v2-paper-deep)] px-[var(--v2-gutter)] py-[var(--v2-section)]"
    >
      <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="v2-label mb-4">
            <span className="text-[var(--v2-accent-deep)]">§03</span> — Two
            verticals
          </p>
          <h2 className="v2-display v2-display--relaxed max-w-[14ch] text-[clamp(2.4rem,6vw,5rem)]">
            Where the{" "}
            <span className="v2-serif-accent font-normal normal-case">
              forging
            </span>{" "}
            happens
          </h2>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* SaaS panel */}
        <motion.article
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="group flex flex-col justify-between border border-[var(--v2-ink)] bg-[var(--v2-paper)] p-8 md:p-12 lg:col-span-7"
        >
          <div>
            <div className="mb-10 flex items-center justify-between">
              <span className="v2-label">V.01</span>
              <span className="v2-pill">
                <span className="v2-pill__dot" aria-hidden="true" />
                Revenue engine
              </span>
            </div>
            <h3 className="v2-display mb-6 text-[clamp(2rem,4.5vw,3.8rem)]">
              B2B SaaS
            </h3>
            <p className="max-w-[46ch] text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.65] text-[var(--v2-ink-60)]">
              Industry-grade tools for operators who don&apos;t have time for
              tools that break. Built alongside the people who use them —
              restaurants, tour operators, finance desks.
            </p>
          </div>

          <ul className="mt-12">
            {SAAS_ITEMS.map((item) => (
              <li key={item.name} className="border-t border-[var(--v2-line)] last:border-b">
                <Link
                  href={item.href}
                  data-cursor-label="open"
                  className="group/item flex items-center justify-between py-4 transition-colors"
                >
                  <span className="font-[family-name:var(--v2-font-display)] text-[clamp(1.05rem,1.6vw,1.4rem)] font-bold tracking-[-0.01em] uppercase [font-stretch:115%] transition-transform duration-300 group-hover/item:translate-x-2">
                    {item.name}
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="v2-label">{item.tag}</span>
                    <span
                      aria-hidden="true"
                      className="opacity-0 transition-all duration-300 group-hover/item:translate-x-1 group-hover/item:opacity-100"
                    >
                      ↗
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.article>

        {/* Aitlas panel — dark */}
        <motion.article
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
          className="v2-blueprint-dark relative flex flex-col justify-between overflow-hidden bg-[var(--v2-dark)] p-8 text-[var(--v2-cream-on-dark)] md:p-12 lg:col-span-5 lg:mt-20"
        >
          <div className="relative z-10">
            <div className="mb-10 flex items-center justify-between">
              <span className="v2-label v2-label--cream">V.02</span>
              <span className="v2-sticker text-[10px]">Flagship</span>
            </div>
            <h3 className="v2-display mb-6 text-[clamp(2rem,4.5vw,3.8rem)]">
              Aitlas
              <span className="text-[var(--v2-accent)]">.</span>
            </h3>
            <p className="max-w-[40ch] text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.65] text-[var(--v2-cream-60)]">
              The sovereign AI ecosystem. Your models, your data, your
              infrastructure — no black boxes, no lock-in.
            </p>
          </div>

          <ul className="relative z-10 mt-12">
            {AITLAS_ITEMS.map((item) => (
              <li
                key={item.name}
                className="border-t border-[oklch(1_0_0/0.12)] last:border-b"
              >
                <Link
                  href={item.href}
                  data-cursor-label="open"
                  className="group/item flex items-center justify-between py-4"
                >
                  <span className="font-[family-name:var(--v2-font-display)] text-[clamp(1.05rem,1.6vw,1.4rem)] font-bold tracking-[-0.01em] uppercase [font-stretch:115%] transition-transform duration-300 group-hover/item:translate-x-2">
                    {item.name}
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="v2-label v2-label--cream">{item.tag}</span>
                    <span
                      aria-hidden="true"
                      className="text-[var(--v2-accent)] opacity-0 transition-all duration-300 group-hover/item:translate-x-1 group-hover/item:opacity-100"
                    >
                      ↗
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -bottom-8 select-none"
          >
            <span className="v2-display-outline--cream v2-display text-[10rem] leading-none opacity-30">
              Ai
            </span>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
