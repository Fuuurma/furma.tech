"use client";

import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

interface ProjectSectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "muted" | "dark";
  id?: string;
}

export function ProjectSection({
  children,
  className = "",
  variant = "default",
  id,
}: ProjectSectionProps) {
  const variantStyles = {
    default: "bg-background",
    muted: "bg-foreground/[0.02]",
    dark: "bg-foreground text-background",
  };

  return (
    <section
      id={id}
      className={cn(
        "portfolio-page__section px-6 md:px-12 py-16 md:py-20 border-b border-foreground/10",
        variantStyles[variant],
        className,
      )}
    >
      <ScrollReveal>
        <div className="max-w-[1280px] mx-auto">{children}</div>
      </ScrollReveal>
    </section>
  );
}
