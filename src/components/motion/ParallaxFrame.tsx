"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxFrameProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  enabled?: boolean;
  intensity?: number;
}

export function ParallaxFrame({
  children,
  className,
  innerClassName,
  enabled = true,
  intensity = 1,
}: ParallaxFrameProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 140, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 140, damping: 22, mass: 0.4 });

  const active = enabled && !reduceMotion;

  const handleMove = (clientX: number, clientY: number) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (clientX - rect.left) / rect.width - 0.5;
    const py = (clientY - rect.top) / rect.height - 0.5;
    x.set(px * 14 * intensity);
    y.set(py * 10 * intensity);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      className={cn("parallax-frame", className)}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseLeave={reset}
    >
      <motion.div
        className={cn("parallax-frame__inner", innerClassName)}
        style={active ? { x: springX, y: springY } : undefined}
      >
        {children}
      </motion.div>
    </div>
  );
}
