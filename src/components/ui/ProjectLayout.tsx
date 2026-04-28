import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, LucideIcon } from "lucide-react";
import Breadcrumbs from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

interface ProjectLayoutProps {
  children: ReactNode;
}

export function ProjectLayout({ children }: ProjectLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      {children}
      <footer className="px-6 md:px-12 py-12 border-t border-border">
        <div className="max-w-[1280px] mx-auto">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-mono text-[11px] uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </footer>
    </div>
  );
}

interface ProjectHeroProps {
  label: string;
  title: string;
  description: string;
  status?: {
    label: string;
    variant: "live" | "beta" | "soon" | "roadmap" | "paused";
  };
  children?: ReactNode;
}

const statusStyles = {
  live: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
  beta: "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400",
  soon: "bg-zinc-500/10 border-zinc-500/30 text-zinc-600 dark:text-zinc-400",
  roadmap: "bg-violet-500/10 border-violet-500/30 text-violet-600 dark:text-violet-400",
  paused: "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400",
};

export function ProjectHero({ label, title, description, status, children }: ProjectHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-dots pointer-events-none opacity-[0.03]" />
      <div className="absolute top-0 right-[-20%] w-[600px] h-[600px] bg-gradient-radial pointer-events-none opacity-15 blur-[120px]" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 py-20 md:py-24">
        <Breadcrumbs className="mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {label}
              </span>
              {status && (
                <span className={`font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 border ${statusStyles[status.variant]}`}>
                  {status.label}
                </span>
              )}
            </div>

            <h1 className="font-serif text-[clamp(42px,7vw,72px)] font-semibold leading-[0.95] tracking-tight text-foreground mb-6">
              {title}
            </h1>

            <p className="text-[17px] sm:text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 max-w-[600px]">
              {description}
            </p>

            {children && <div className="mt-8">{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProjectSectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "muted" | "dark";
  id?: string;
}

export function ProjectSection({ children, className = "", variant = "default", id }: ProjectSectionProps) {
  const variantStyles = {
    default: "",
    muted: "bg-muted/30",
    dark: "bg-foreground text-background",
  };

  return (
    <section id={id} className={`px-6 md:px-12 py-20 md:py-24 border-b border-border ${variantStyles[variant]} ${className}`}>
      <div className="max-w-[1280px] mx-auto">
        {children}
      </div>
    </section>
  );
}

interface ProjectSectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
}

export function ProjectSectionHeader({ label, title, description }: ProjectSectionHeaderProps) {
  return (
    <div className="mb-12">
      {label && (
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">
          {label}
        </span>
      )}
      <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-[1.1] tracking-tight text-foreground mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-[15px] leading-[1.7] text-grey-600 dark:text-grey-400 max-w-[600px]">
          {description}
        </p>
      )}
    </div>
  );
}

interface Feature {
  icon?: LucideIcon;
  title: string;
  desc: string;
}

interface ProjectFeaturesProps {
  label?: string;
  title?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
}

export function ProjectFeatures({ label, title, features, columns = 3 }: ProjectFeaturesProps) {
  const columnStyles = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div>
      {(label || title) && (
        <div className="mb-12">
          {label && (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">
              {label}
            </span>
          )}
          {title && (
            <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-[1.1] tracking-tight text-foreground">
              {title}
            </h2>
          )}
        </div>
      )}
      <div className={`grid grid-cols-1 ${columnStyles[columns]} gap-4`}>
        {features.map((feature) => (
          <div
            key={feature.title}
            className="border border-border p-6 group hover:border-foreground/30 transition-colors"
          >
            {feature.icon && (
              <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center mb-5">
                <feature.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
            )}
            <h3 className="text-[15px] font-bold text-foreground mb-2">{feature.title}</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface Stat {
  value: string;
  label: string;
}

interface ProjectStatsProps {
  stats: Stat[];
}

export function ProjectStats({ stats }: ProjectStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 mt-8 border-t border-border">
      {stats.map((stat) => (
        <div key={stat.label}>
          <div className="font-serif text-[32px] sm:text-[40px] font-bold text-foreground leading-none mb-2">
            {stat.value}
          </div>
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

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
    <section className={`px-6 md:px-12 py-20 md:py-24 border-b border-border ${isDark ? "bg-foreground text-background" : "bg-muted/30"}`}>
      <div className="max-w-[1280px] mx-auto text-center">
        <h2 className={`font-serif text-[clamp(32px,5vw,56px)] font-semibold leading-[1] tracking-tight mb-6 ${isDark ? "" : "text-foreground"}`}>
          {title}
        </h2>
        <p className={`text-[15px] leading-[1.7] mb-10 max-w-xl mx-auto ${isDark ? "text-background/60" : "text-muted-foreground"}`}>
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            href={primaryHref}
            variant={isDark ? "outline" : "default"}
            size="lg"
            className={isDark ? "border-background text-background hover:bg-background hover:text-foreground min-w-[200px]" : "min-w-[200px]"}
          >
            {primaryLabel}
            <ArrowRight className="w-4 h-4" />
          </Button>
          {secondaryHref && secondaryLabel && (
            <Link
              href={secondaryHref}
              className={`inline-flex items-center justify-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 border transition-colors ${isDark ? "border-background/20 text-background hover:bg-background/10" : "border-border text-foreground hover:border-foreground/30"}`}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

interface ProjectStatusPlaceholderProps {
  status: "paused" | "roadmap" | "soon";
  highlights?: { icon: LucideIcon; title: string; desc: string }[];
}

export function ProjectStatusPlaceholder({ status, highlights }: ProjectStatusPlaceholderProps) {
  const statusMessages = {
    paused: {
      label: "Paused",
      message: "This project is on hold while we focus on active products. Development will resume when the time is right.",
    },
    roadmap: {
      label: "On the Roadmap",
      message: "We're planning this product carefully. It will be built when the market and our resources align.",
    },
    soon: {
      label: "Coming Soon",
      message: "We're actively working on this. Stay tuned for updates.",
    },
  };

  const { label, message } = statusMessages[status];

  return (
    <section className="px-6 md:px-12 py-20 md:py-24 border-b border-border">
      <div className="max-w-[1280px] mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground px-3 py-1.5 border border-border mb-6">
            {label}
          </span>
          <p className="text-[17px] leading-[1.7] text-muted-foreground mb-10">
            {message}
          </p>

          {highlights && highlights.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {highlights.map((highlight) => (
                <div key={highlight.title} className="border border-border p-6">
                  <highlight.icon className="w-5 h-5 text-muted-foreground mb-4" strokeWidth={1.5} />
                  <h3 className="text-[14px] font-bold text-foreground mb-2">{highlight.title}</h3>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{highlight.desc}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10">
            <Button href="/#contact" variant="outline" size="lg" className="min-w-[200px]">
              Notify Me
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
