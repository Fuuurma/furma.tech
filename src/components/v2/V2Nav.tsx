"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const NAV_LINKS = [
  { href: "#workshop", label: "Workshop" },
  { href: "#index", label: "Index" },
  { href: "#verticals", label: "Verticals" },
  { href: "#contact", label: "Contact" },
] as const;

export function V2Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-[var(--v2-line)] bg-[color-mix(in_oklch,var(--v2-paper),transparent_4%)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-[var(--v2-gutter)]">
        <a
          href="#top"
          className="font-[family-name:var(--v2-font-display)] text-[15px] font-extrabold uppercase tracking-[-0.02em] [font-stretch:125%]"
          aria-label="Furma.tech v2 — back to top"
        >
          Furma<sup className="text-[0.6em] font-bold">®</sup>
          <span className="ml-2 hidden font-[family-name:var(--v2-font-mono)] text-[10px] font-normal tracking-[0.12em] text-[var(--v2-ink-60)] md:inline">
            / the workshop
          </span>
        </a>

        <nav aria-label="v2 sections" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="v2-link-line v2-label v2-navlink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href="/"
            data-cursor-label="v1"
            className="v2-pill border-[var(--v2-ink-35)] text-[var(--v2-ink)] transition-colors hover:bg-[var(--v2-ink)] hover:text-[var(--v2-paper)]"
            title="Compare with the current version"
          >
            v1 →
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
