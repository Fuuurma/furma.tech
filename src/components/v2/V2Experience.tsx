"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import Lenis from "lenis";

function V2Cursor() {
  const reduceMotion = useReducedMotion();
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const ringX = useSpring(rawX, { stiffness: 260, damping: 26, mass: 0.6 });
  const ringY = useSpring(rawY, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (reduceMotion) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor-label]",
      );
      setLabel(target?.dataset.cursorLabel ?? null);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [rawX, rawY, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div
      className="v2-cursor"
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
    >
      <motion.div
        className={`v2-cursor__ring ${label ? "v2-cursor__ring--active" : ""}`}
        style={{ x: ringX, y: ringY }}
      >
        {label ? <span>{label}</span> : null}
      </motion.div>
      <motion.div className="v2-cursor__dot" style={{ x: rawX, y: rawY }} />
    </div>
  );
}

function V2Progress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-[110] h-[3px] origin-left bg-[var(--v2-accent)]"
      style={{ scaleX }}
    />
  );
}

interface V2ExperienceProps {
  children: ReactNode;
}

export function V2Experience({ children }: V2ExperienceProps) {
  const reduceMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      lerp: 0.11,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Route in-page anchors through Lenis
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -72 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduceMotion]);

  return (
    <MotionConfig reducedMotion="user">
      <V2Progress />
      {children}
      <div className="v2-noise" aria-hidden="true" />
      <V2Cursor />
    </MotionConfig>
  );
}
