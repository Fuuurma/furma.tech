import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { ProjectCTA } from "@/components/ui/project/ProjectCTA";
import { ProjectHero as ProjectHeroMotion } from "@/components/ui/project/ProjectHero";
import { ProjectLayoutFooter } from "@/components/ui/project/ProjectLayoutFooter";
import { ProjectSection } from "@/components/ui/project/ProjectSection";
import { ProjectSectionHeader } from "@/components/ui/project/ProjectSectionHeader";
import { cn } from "@/lib/utils";

interface ProjectLayoutProps {
  children: ReactNode;
}

export function ProjectLayout({ children }: ProjectLayoutProps) {
  return (
    <div className="portfolio-page min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      {children}
      <ProjectLayoutFooter />
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
  visual?: ReactNode;
  coverTint?: string;
}

function ProjectStatusBadge({
  variant,
}: {
  variant: "live" | "beta" | "soon" | "roadmap" | "paused";
}) {
  const labels = {
    live: "Live",
    beta: "Beta",
    soon: "Soon",
    roadmap: "Roadmap",
    paused: "Paused",
  };
  return <span className="text-foreground">{labels[variant]}</span>;
}

export function ProjectHeroSection({
  label,
  title,
  description,
  status,
  children,
  visual,
  coverTint,
}: ProjectHeroProps) {
  return (
    <ProjectHeroMotion
      label={label}
      title={title}
      description={description}
      coverTint={coverTint}
      visual={visual}
      statusBadge={
        status ? (
          <>
            <ProjectStatusBadge variant={status.variant} />
            <span className="sr-only">{status.label}</span>
          </>
        ) : undefined
      }
    >
      {children}
    </ProjectHeroMotion>
  );
}

/** @deprecated Use ProjectHeroSection — kept for existing imports */
export const ProjectHero = ProjectHeroSection;

export { ProjectSection, ProjectSectionHeader, ProjectCTA };

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

export function ProjectFeatures({
  label,
  title,
  features,
  columns = 3,
}: ProjectFeaturesProps) {
  const columnStyles = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div>
      {(label || title) && (
        <ProjectSectionHeader label={label} title={title ?? ""} />
      )}
      <StaggerReveal
        className={cn(
          "grid grid-cols-1 gap-px bg-foreground/10 border border-foreground/10",
          columnStyles[columns],
        )}
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            className="motion-card bg-background p-6 md:p-8 group hover:bg-foreground/[0.02] transition-colors"
          >
            {feature.icon && (
              <feature.icon
                className="w-5 h-5 mb-5 text-foreground/40 group-hover:text-foreground transition-colors"
                strokeWidth={1.5}
              />
            )}
            <h3 className="font-sans text-[15px] font-semibold tracking-tight mb-2">
              {feature.title}
            </h3>
            <p className="font-mono text-[11px] leading-relaxed text-foreground/55">
              {feature.desc}
            </p>
          </div>
        ))}
      </StaggerReveal>
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
    <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 mt-10 border-t border-foreground/10">
      {stats.map((stat) => (
        <div key={stat.label}>
          <div className="font-sans text-[clamp(28px,4vw,40px)] font-medium tracking-[-0.03em] leading-none mb-2">
            {stat.value}
          </div>
          <div className="plastic-label">{stat.label}</div>
        </div>
      ))}
    </StaggerReveal>
  );
}

interface ProjectStatusPlaceholderProps {
  status: "paused" | "roadmap" | "soon";
  highlights?: { icon: LucideIcon; title: string; desc: string }[];
}

export function ProjectStatusPlaceholder({
  status,
  highlights,
}: ProjectStatusPlaceholderProps) {
  const statusMessages = {
    paused: {
      label: "Paused",
      message:
        "This project is on hold while we focus on active products. Development will resume when the time is right.",
    },
    roadmap: {
      label: "On the Roadmap",
      message:
        "We're planning this product carefully. It will be built when the market and our resources align.",
    },
    soon: {
      label: "Coming Soon",
      message: "We're actively working on this. Stay tuned for updates.",
    },
  };

  const { label, message } = statusMessages[status];

  return (
    <ProjectSection>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-8 md:col-start-4 lg:col-start-5">
          <p className="plastic-label mb-6">{label}</p>
          <p className="plastic-paragraph text-foreground/70 mb-12">{message}</p>

          {highlights && highlights.length > 0 && (
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10 mb-12">
              {highlights.map((highlight) => (
                <div key={highlight.title} className="motion-card bg-background p-6">
                  <highlight.icon
                    className="w-5 h-5 text-foreground/40 mb-4"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-sans text-[14px] font-semibold mb-2">
                    {highlight.title}
                  </h3>
                  <p className="font-mono text-[11px] text-foreground/55 leading-relaxed">
                    {highlight.desc}
                  </p>
                </div>
              ))}
            </StaggerReveal>
          )}

          <Link href="/#contact" className="plastic-cta motion-link">
            Notify me
            <ArrowRight className="w-3 h-3" aria-hidden />
          </Link>
        </div>
      </div>
    </ProjectSection>
  );
}
