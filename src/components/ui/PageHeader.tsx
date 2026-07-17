"use client";

import type { ReactNode } from "react";
import { ScrollReveal } from "./ScrollReveal";
import Breadcrumbs from "./breadcrumb";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumb?: boolean;
  children?: ReactNode;
  variant?: "default" | "minimal" | "centered";
  className?: string;
}

function PageTitle({
  title,
  className,
}: {
  title: ReactNode;
  className: string;
}) {
  if (typeof title === "string") {
    return (
      <SplitReveal as="h1" text={title} className={className} delay={80} />
    );
  }
  return <h1 className={className}>{title}</h1>;
}

export function PageHeader({
  label,
  title,
  description,
  breadcrumb = false,
  children,
  variant = "default",
  className = "",
}: PageHeaderProps) {
  if (variant === "centered") {
    return (
      <section
        className={cn(
          "border-b border-foreground/10 px-6 md:px-12 py-16 md:py-24",
          className,
        )}
      >
        <div className="max-w-[1280px] mx-auto text-center">
          {breadcrumb && <Breadcrumbs className="mb-8 inline-block" />}
          <ScrollReveal>
            {label && <p className="plastic-label mb-6">{label}</p>}
            <PageTitle
              title={title}
              className="plastic-headline text-[clamp(36px,5vw,56px)] mb-6 block"
            />
            {description && (
              <ScrollReveal delay={160}>
                <p className="plastic-paragraph text-foreground/65 max-w-2xl mx-auto">
                  {description}
                </p>
              </ScrollReveal>
            )}
            {children && <div className="mt-10">{children}</div>}
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "border-b border-foreground/10 px-6 md:px-12 py-14 md:py-20",
        className,
      )}
    >
      <div className="max-w-[1280px] mx-auto">
        {breadcrumb && <Breadcrumbs className="mb-10" />}
        <div className="grid grid-cols-12 gap-6">
          <ScrollReveal className="col-span-12 md:col-span-2">
            {label && <p className="plastic-label">{label}</p>}
          </ScrollReveal>
          <div className="col-span-12 md:col-span-8 md:col-start-4 lg:col-start-5">
            <PageTitle
              title={title}
              className="plastic-headline text-[clamp(32px,5vw,52px)] mb-6 block"
            />
            {description && (
              <ScrollReveal delay={160}>
                <p className="plastic-paragraph text-foreground/65 max-w-xl">
                  {description}
                </p>
              </ScrollReveal>
            )}
            {children && <div className="mt-10">{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
