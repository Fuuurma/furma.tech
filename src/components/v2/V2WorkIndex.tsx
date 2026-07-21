"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { V2_PROJECTS, type V2Project } from "@/lib/v2-projects";

function FloatingPreview({ project }: { project: V2Project | null }) {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 180, damping: 22, mass: 0.55 });
  const y = useSpring(mouseY, { stiffness: 180, damping: 22, mass: 0.55 });
  const velocity = useVelocity(x);
  const rotate = useTransform(velocity, [-1200, 1200], [-7, 7], {
    clamp: true,
  });
  const smoothRotate = useSpring(rotate, { stiffness: 120, damping: 18 });

  // Track globally so the preview never jumps between rows.
  // Clamp so the card never leaves the viewport.
  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: MouseEvent) => {
      const x = Math.min(e.clientX + 28, window.innerWidth - 372);
      const y = Math.min(Math.max(e.clientY - 120, 16), window.innerHeight - 290);
      mouseX.set(Math.max(x, 16));
      mouseY.set(y);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[95] hidden lg:block"
      style={{ x, y, rotate: smoothRotate }}
    >
      <AnimatePresence mode="wait">
        {project ? (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 5 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="v2-preview"
            style={{ background: project.color }}
          >
            <div className="v2-blueprint-dark relative flex h-full flex-col justify-between p-5">
              <div className="flex items-start justify-between">
                <span
                  className="font-[family-name:var(--v2-font-mono)] text-[10px] tracking-[0.14em] uppercase"
                  style={{ color: project.onColor, opacity: 0.75 }}
                >
                  {project.index} — {project.category}
                </span>
                <span
                  className="font-[family-name:var(--v2-font-mono)] text-[10px] tracking-[0.14em] uppercase"
                  style={{ color: project.onColor, opacity: 0.75 }}
                >
                  {project.statusLabel}
                </span>
              </div>
              <span
                className="v2-display text-[clamp(4rem,7vw,6.5rem)]"
                style={{ color: project.onColor }}
              >
                {project.monogram}
              </span>
              <p
                className="max-w-[30ch] text-[0.72rem] leading-[1.5] font-medium"
                style={{ color: project.onColor, opacity: 0.85 }}
              >
                {project.note}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

function WorkRow({
  project,
  itemIndex,
  onHover,
}: {
  project: V2Project;
  itemIndex: number;
  onHover: (p: V2Project | null) => void;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.min(itemIndex * 0.04, 0.3),
      }}
      className="v2-work-row border-t border-[var(--v2-line)] last:border-b"
      style={
        {
          "--row-color": project.color,
          "--row-on": project.onColor,
        } as React.CSSProperties
      }
      onMouseEnter={() => onHover(project)}
      onMouseLeave={() => onHover(null)}
    >
      <Link
        href={project.href}
        data-cursor-label="open"
        className="group grid grid-cols-[2.75rem_1fr_auto] items-center gap-x-4 px-1 py-6 md:grid-cols-[4rem_1fr_auto_auto_2rem] md:gap-x-8 md:py-8"
        aria-label={`${project.name} — ${project.category}, ${project.statusLabel}. View project.`}
      >
        <span className="v2-label tabular-nums">{project.index}</span>

        <span className="min-w-0">
          <span className="v2-work-row__name block font-[family-name:var(--v2-font-display)] text-[clamp(1.35rem,5.6vw,3rem)] leading-[1.02] font-extrabold tracking-[-0.02em] uppercase [font-stretch:120%] md:truncate">
            {project.name}
          </span>
          {/* touch devices get the note inline, hover users get the preview */}
          <span className="v2-work-row__note mt-2 block max-w-[52ch] text-[0.82rem] leading-[1.5] text-[var(--v2-ink-60)] lg:hidden">
            {project.note}
          </span>
        </span>

        <span className="v2-label hidden md:block">{project.category}</span>

        <span
          className={`v2-pill v2-pill--row ${project.status === "in-dev" ? "v2-pill--live" : ""}`}
        >
          <span className="v2-pill__dot" aria-hidden="true" />
          {project.statusLabel}
        </span>

        <span
          aria-hidden="true"
          className="hidden text-xl opacity-30 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 md:block"
        >
          ↗
        </span>
      </Link>
    </motion.li>
  );
}

export function V2WorkIndex() {
  const [active, setActive] = useState<V2Project | null>(null);

  return (
    <section
      id="index"
      className="relative px-[var(--v2-gutter)] py-[var(--v2-section)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 flex flex-wrap items-end justify-between gap-6"
      >
        <div>
          <p className="v2-label mb-4">
            <span className="text-[var(--v2-accent-deep)]">§02</span> — The index
          </p>
          <h2 className="v2-display text-[clamp(2.6rem,7vw,6rem)]">
            10 products<span className="text-[var(--v2-accent)]">,</span>
            <br />
            one workshop
          </h2>
        </div>
        <p className="v2-label hidden pb-2 md:block">
          Hover a row to preview —<br />
          click to open the case file
        </p>
      </motion.div>

      <ul onMouseLeave={() => setActive(null)}>
        {V2_PROJECTS.map((p, i) => (
          <WorkRow key={p.id} project={p} itemIndex={i} onHover={setActive} />
        ))}
      </ul>

      <FloatingPreview project={active} />
    </section>
  );
}
