"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { cn } from "@/lib/utils";

interface ProjectCTAProps {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  variant?: "dark" | "light";
}

export function ProjectCTA({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  variant = "dark",
}: ProjectCTAProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={cn(
        "portfolio-page__section px-6 md:px-12 py-20 md:py-24 border-b border-foreground/10",
        isDark ? "bg-foreground text-background" : "bg-foreground/[0.02]",
      )}
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-12 gap-8 items-end">
        <ScrollReveal className="col-span-12 md:col-span-8 md:col-start-4 lg:col-start-5">
          <p className={cn("plastic-label mb-6", isDark && "text-background/55")}>
            Get started
          </p>
          <SplitReveal
            as="h2"
            text={title}
            className={cn(
              "plastic-headline mb-6 block",
              isDark ? "text-background" : "text-foreground",
            )}
            delay={50}
          />
          <p
            className={cn(
              "plastic-paragraph text-[clamp(16px,2vw,22px)] max-w-xl mb-10",
              isDark ? "text-background/70" : "text-foreground/70",
            )}
          >
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <Link
              href={primaryHref}
              className={cn(
                "plastic-cta motion-link",
                isDark && "plastic-cta--inverse",
              )}
            >
              {primaryLabel}
              <ArrowRight className="w-3 h-3" aria-hidden />
            </Link>
            {secondaryHref && secondaryLabel && (
              <Link
                href={secondaryHref}
                className={cn(
                  "plastic-label motion-link-subtle hover:opacity-100 transition-opacity",
                  isDark ? "text-background/55 hover:text-background" : "",
                )}
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
