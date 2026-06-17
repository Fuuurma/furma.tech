"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";

export interface ProductPageData {
  name: string;
  icon: string;
  category: string;
  status: "live" | "beta" | "soon" | "roadmap" | "paused";
  tagline: string;
  description: string;
  features: { title: string; desc: string }[];
  href: string;
}

const statusConfig = {
  live: {
    label: "Live",
    color:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  beta: {
    label: "Beta",
    color:
      "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  },
  soon: {
    label: "Soon",
    color:
      "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
  },
  roadmap: {
    label: "Roadmap",
    color:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  paused: {
    label: "Paused",
    color:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
};

interface ProductPageContentProps {
  product: ProductPageData;
}

export function ProductPageContent({ product }: ProductPageContentProps) {
  const status = statusConfig[product.status];
  const ctaTitle =
    product.status === "live"
      ? "Launching soon"
      : product.status === "paused"
        ? "Coming eventually"
        : "Join the waitlist";

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <section className="relative flex items-end min-h-[70vh] pb-20 pt-32 px-6 md:px-12">
        <div className="w-full max-w-[1280px] mx-auto">
          <ScrollReveal>
            <Link
              href={product.href}
              className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[.12em] text-muted-foreground hover:text-foreground transition-colors mb-12 motion-link-subtle"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <div>
              <ScrollReveal delay={80}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center text-3xl border border-border">
                    {product.icon}
                  </div>
                  <Badge
                    className={`font-mono text-[10px] uppercase tracking-[.1em] border ${status.color}`}
                  >
                    {status.label}
                  </Badge>
                </div>
              </ScrollReveal>

              <SplitReveal
                as="h1"
                text={product.name}
                className="font-serif text-[clamp(48px,8vw,96px)] font-light leading-[.92] tracking-[-0.03em] text-foreground mb-6 block"
                delay={120}
              />

              <ScrollReveal delay={220}>
                <p className="font-mono text-[14px] text-muted-foreground leading-relaxed max-w-lg">
                  {product.description}
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={160} className="flex flex-col gap-4 lg:items-end">
              <div className="font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground mb-2">
                Category
              </div>
              <div className="font-mono text-[14px] text-foreground">
                {product.category}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 border-t border-border">
        <div className="max-w-[1280px] mx-auto">
          <ScrollReveal>
            <span className="font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground mb-4 block">
              Features
            </span>
            <SplitReveal
              as="h2"
              text="What it offers"
              className="font-serif text-[clamp(32px,5vw,56px)] font-light tracking-[-0.02em] text-foreground block mb-12"
              delay={60}
            />
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
            {product.features.map((feature) => (
              <div
                key={feature.title}
                className="motion-card bg-card border border-border p-8 group hover:border-foreground/20 transition-colors"
              >
                <h3 className="font-serif text-[22px] font-light text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="font-mono text-[12px] text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 border-t border-border">
        <div className="max-w-[1280px] mx-auto text-center">
          <ScrollReveal>
            <SplitReveal
              as="h2"
              text={ctaTitle}
              className="font-serif text-[clamp(32px,5vw,56px)] font-light text-foreground mb-8 block"
              delay={40}
            />
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-mono text-[11px] uppercase tracking-[.1em] px-8 h-14 hover:opacity-90 transition-opacity motion-link"
            >
              Get Updates
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <footer className="px-6 md:px-12 py-8 border-t border-border">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <span className="font-mono text-[11px] text-muted-foreground">
            © 2026 Furma.tech
          </span>
          <Link
            href={product.href}
            className="font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors motion-link-subtle"
          >
            ← Back to Products
          </Link>
        </div>
      </footer>
    </div>
  );
}
