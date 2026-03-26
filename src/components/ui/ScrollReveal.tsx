"use client";

import { useInView } from "@/hooks/useScroll";
import { ReactNode, RefObject } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function ScrollReveal({ children, delay = 0, className = "", direction = "up" }: ScrollRevealProps) {
  const [ref, isInView] = useInView(0.1);

  const directionClasses = {
    up: "reveal-up",
    down: "reveal-down",
    left: "reveal-left",
    right: "reveal-right",
    none: "reveal-fade",
  };

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={`${directionClasses[direction]} ${isInView ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function StaggerChildren({ children, staggerDelay = 100, className = "", direction = "up" }: StaggerChildrenProps) {
  const [ref, isInView] = useInView(0.1);

  const directionClasses = {
    up: "reveal-up",
    down: "reveal-down",
    left: "reveal-left",
    right: "reveal-right",
    none: "reveal-fade",
  };

  return (
    <div ref={ref as RefObject<HTMLDivElement>} className={className}>
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <div
            key={index}
            className={`${directionClasses[direction]} ${isInView ? "visible" : ""}`}
            style={{ transitionDelay: `${index * staggerDelay}ms` }}
          >
            {child}
          </div>
        ))
      ) : (
        <div className={`${directionClasses[direction]} ${isInView ? "visible" : ""}`}>{children}</div>
      )}
    </div>
  );
}
