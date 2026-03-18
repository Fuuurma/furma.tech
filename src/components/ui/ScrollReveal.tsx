"use client";

import { useInView } from "@/hooks/useScroll";
import { ReactNode, RefObject } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function ScrollReveal({ children, delay = 0, className = "" }: ScrollRevealProps) {
  const [ref, isInView] = useInView(0.1);

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={`reveal ${isInView ? "visible" : ""} ${className}`}
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
}

export function StaggerChildren({ children, staggerDelay = 100, className = "" }: StaggerChildrenProps) {
  const [ref, isInView] = useInView(0.1);

  return (
    <div ref={ref as RefObject<HTMLDivElement>} className={className}>
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <div
            key={index}
            className={`reveal ${isInView ? "visible" : ""}`}
            style={{ transitionDelay: `${index * staggerDelay}ms` }}
          >
            {child}
          </div>
        ))
      ) : (
        <div className={`reveal ${isInView ? "visible" : ""}`}>{children}</div>
      )}
    </div>
  );
}
