"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

interface SiteSmoothScrollProps {
  children: ReactNode;
}

/** Lenis inertia scroll — all routes except fullscreen home */
export function SiteSmoothScroll({ children }: SiteSmoothScrollProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return <>{children}</>;
}
