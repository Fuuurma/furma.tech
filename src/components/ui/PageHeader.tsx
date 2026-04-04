import { ReactNode } from "react";
import { ScrollReveal } from "./ScrollReveal";
import Breadcrumbs from "./breadcrumb";

interface PageHeaderProps {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumb?: boolean;
  children?: ReactNode;
  variant?: "default" | "minimal" | "centered";
  className?: string;
}

export function PageHeader({
  label,
  title,
  description,
  breadcrumb = true,
  children,
  variant = "default",
  className = "",
}: PageHeaderProps) {
  if (variant === "minimal") {
    return (
      <section className={`px-4 sm:px-6 md:px-12 py-16 sm:py-24 ${className}`}>
        <div className="max-w-4xl">
          {breadcrumb && <Breadcrumbs className="mb-8" />}
          <ScrollReveal>
            {label && (
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-grey-400"></div>
                <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-500">
                  {label}
                </span>
              </div>
            )}
            <h1 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-tight text-foreground">
              {title}
            </h1>
            {description && (
              <p className="text-[16px] sm:text-[18px] leading-[1.6] text-grey-600 dark:text-grey-400 max-w-[600px] mt-6">
                {description}
              </p>
            )}
          </ScrollReveal>
        </div>
      </section>
    );
  }

  if (variant === "centered") {
    return (
      <section className={`px-4 sm:px-6 md:px-12 py-20 sm:py-28 ${className}`}>
        <div className="max-w-3xl mx-auto text-center">
          {breadcrumb && <Breadcrumbs className="mb-8 inline-block" />}
          <ScrollReveal>
            {label && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-foreground/10 mb-8">
                <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-grey-500">
                  {label}
                </span>
              </div>
            )}
            <h1 className="font-serif text-[clamp(40px,6vw,72px)] font-semibold leading-[0.95] tracking-tight text-foreground mb-6">
              {title}
            </h1>
            {description && (
              <p className="text-[18px] sm:text-[20px] leading-[1.6] text-grey-600 dark:text-grey-400">
                {description}
              </p>
            )}
            {children && <div className="mt-10">{children}</div>}
          </ScrollReveal>
        </div>
      </section>
    );
  }

  // Default variant
  return (
    <section className={`px-4 sm:px-6 md:px-12 py-20 sm:py-28 ${className}`}>
      <div className="max-w-4xl">
        {breadcrumb && <Breadcrumbs className="mb-10" />}
        <ScrollReveal>
          {label && (
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-px bg-grey-400"></div>
              <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-500">
                {label}
              </span>
            </div>
          )}
          <h1 className="font-serif text-[clamp(42px,5vw,72px)] font-semibold leading-[1.02] tracking-tight text-foreground mb-6">
            {title}
          </h1>
          {description && (
            <p className="text-[17px] sm:text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 max-w-[650px]">
              {description}
            </p>
          )}
          {children && <div className="mt-10">{children}</div>}
        </ScrollReveal>
      </div>
    </section>
  );
}
