"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import { ParallaxFrame } from "@/components/motion/ParallaxFrame";
import { SlideReveal } from "@/components/motion/SlideReveal";
import type { HomeProject, HomeProjectLayout } from "@/lib/home-projects";
import { cn } from "@/lib/utils";

interface PlasticProjectSlideProps {
  project: HomeProject;
  index: number;
  total: number;
  HeroVisual: ComponentType<{ className?: string }> | undefined;
  isActive?: boolean;
}

type LayoutProps = PlasticProjectSlideProps & {
  indexLabel: string;
  isActive: boolean;
};

function ProjectCover({
  HeroVisual,
  className,
  isActive = false,
}: {
  HeroVisual: ComponentType<{ className?: string }> | undefined;
  className?: string;
  isActive?: boolean;
}) {
  return (
    <div className={cn("plastic-cover min-h-0 bg-black relative overflow-hidden", className)}>
      <ParallaxFrame
        enabled={isActive}
        className="absolute inset-0"
        innerClassName="w-full h-full"
        intensity={0.85}
      >
        {/* The plate is the picture's own box: 520:340, sized to the room the
            cover has, with one even margin of paper on all four sides. */}
        <div className="plastic-cover__stage">
          <figure
            className={cn(
              "plastic-cover__figure",
              !isActive && "plastic-cover__figure--rest",
            )}
          >
            <div className="plastic-cover__frame">
              {HeroVisual ? (
                <HeroVisual className="block w-full h-full" />
              ) : (
                <div className="w-full h-full bg-foreground/5" />
              )}
            </div>
            {HeroVisual && (
              <figcaption className="plastic-label plastic-label--inverse plastic-cover__caption">
                Concept visual
              </figcaption>
            )}
          </figure>
        </div>
      </ParallaxFrame>
    </div>
  );
}

function ProjectMeta({
  project,
  indexLabel,
  total,
  className,
}: {
  project: HomeProject;
  indexLabel: string;
  total: number;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div>
        <p className="plastic-label">{project.category}</p>
        <p className="plastic-label mt-3">
          Index <span className="text-foreground">{indexLabel}</span>
          <span className="text-foreground/60"> / {total}</span>
        </p>
      </div>
      <p className="plastic-label">{project.status}</p>
    </div>
  );
}

function ProjectCopy({
  project,
  align = "left",
}: {
  project: HomeProject;
  align?: "left" | "center" | "right";
}) {
  const alignClass =
    align === "center"
      ? "text-center items-center"
      : align === "right"
        ? "text-right items-end"
        : "text-left items-start";

  return (
    <div className={cn("flex flex-col gap-4 md:gap-6", alignClass)}>
      <h2 className="plastic-headline text-[clamp(26px,4vw,44px)]">
        {project.name}
      </h2>
      <p className="plastic-paragraph max-w-[42rem] line-clamp-3 md:line-clamp-none">
        {project.description}
      </p>
      <div
        className={cn(
          "flex flex-wrap items-center gap-4 md:gap-6",
          align === "center" && "justify-center",
          align === "right" && "justify-end",
        )}
      >
        <Link href={project.href} className="plastic-cta">
          View project
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}

function EditorialIntro({
  project,
  indexLabel,
  total,
  side,
  isActive = false,
}: {
  project: HomeProject;
  indexLabel: string;
  total: number;
  side: "left" | "right";
  isActive?: boolean;
}) {
  const metaCol =
    side === "right"
      ? "md:col-span-2 md:col-start-1"
      : "md:col-span-2 md:col-start-11";
  const copyCol =
    side === "right"
      ? "md:col-span-8 md:col-start-4 lg:col-start-5"
      : "md:col-span-8 md:col-start-1 lg:col-start-2";

  return (
    <div
      className="plastic-intro shrink-0 border-t border-foreground/10 md:max-h-[42vh] md:overflow-y-auto"
      data-section-scroll
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-4 md:py-8">
        <div className="grid grid-cols-12 gap-x-6 gap-y-4 md:gap-y-6">
          <SlideReveal isActive={isActive} className={cn("col-span-12 flex md:flex-col justify-between gap-3 md:gap-4", metaCol)} delay={0.05}>
            <ProjectMeta project={project} indexLabel={indexLabel} total={total} />
          </SlideReveal>
          <SlideReveal isActive={isActive} className={cn("col-span-12", copyCol)} delay={0.14}>
            <ProjectCopy project={project} align={side === "left" ? "right" : "left"} />
          </SlideReveal>
        </div>
      </div>
    </div>
  );
}

function LayoutEditorialRight(props: LayoutProps) {
  const { project, total, HeroVisual, indexLabel, isActive } = props;
  return (
    <article className="plastic-project plastic-project--editorial-right h-full min-h-0 grid grid-rows-[1fr_auto]">
      <ProjectCover HeroVisual={HeroVisual} isActive={isActive} />
      <EditorialIntro
        project={project}
        indexLabel={indexLabel}
        total={total}
        side="right"
        isActive={isActive}
      />
    </article>
  );
}

function LayoutEditorialLeft(props: LayoutProps) {
  const { project, total, HeroVisual, indexLabel, isActive } = props;
  return (
    <article className="plastic-project plastic-project--editorial-left h-full min-h-0 grid grid-rows-[1fr_auto]">
      <ProjectCover HeroVisual={HeroVisual} isActive={isActive} />
      <EditorialIntro
        project={project}
        indexLabel={indexLabel}
        total={total}
        side="left"
        isActive={isActive}
      />
    </article>
  );
}

function LayoutVisualHeavy(props: LayoutProps) {
  const { project, total, HeroVisual, indexLabel, isActive } = props;
  return (
    <article className="plastic-project plastic-project--visual-heavy h-full min-h-0 grid grid-rows-[minmax(0,1fr)_auto]">
      <ProjectCover HeroVisual={HeroVisual} isActive={isActive} />
      <SlideReveal isActive={isActive} className="plastic-intro shrink-0 border-t border-foreground/10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-4 md:py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <h2 className="plastic-headline text-[clamp(26px,3.5vw,40px)] mb-2 md:mb-3">
                {project.name}
              </h2>
              <ProjectMeta
                project={project}
                indexLabel={indexLabel}
                total={total}
                className="max-md:hidden md:flex-row md:items-center md:gap-10"
              />
              <p className="plastic-label md:hidden mt-2">
                {project.category}
                <span className="text-foreground/60"> · </span>
                {project.status}
              </p>
            </div>
            <Link href={project.href} className="plastic-cta shrink-0 self-start md:self-auto">
              View project <span aria-hidden>→</span>
            </Link>
          </div>
          <p className="plastic-paragraph mt-3 md:mt-4 max-w-3xl line-clamp-3 md:line-clamp-none">
            {project.description}
          </p>
        </div>
      </SlideReveal>
    </article>
  );
}

function LayoutStacked(props: LayoutProps) {
  const { project, total, HeroVisual, indexLabel, isActive } = props;
  return (
    <article className="plastic-project plastic-project--stacked h-full min-h-0 flex flex-col bg-background">
      <SlideReveal isActive={isActive} className="shrink-0 px-6 md:px-12 pt-4 pb-2 flex justify-between items-start gap-4">
        <ProjectMeta project={project} indexLabel={indexLabel} total={total} />
      </SlideReveal>
      <ProjectCover
        HeroVisual={HeroVisual}
        className="flex-1 min-h-[28%]"
        isActive={isActive}
      />
      <SlideReveal isActive={isActive} className="shrink-0 px-6 md:px-12 py-6 md:py-8 border-t border-foreground/10" delay={0.12}>
        <ProjectCopy project={project} align="center" />
      </SlideReveal>
    </article>
  );
}

const LAYOUT_RENDERERS: Record<HomeProjectLayout, ComponentType<LayoutProps>> = {
  "editorial-right": LayoutEditorialRight,
  "editorial-left": LayoutEditorialLeft,
  "visual-heavy": LayoutVisualHeavy,
  stacked: LayoutStacked,
};

export function PlasticProjectSlide(props: PlasticProjectSlideProps) {
  const indexLabel = String(props.index + 1).padStart(2, "0");
  const Layout = LAYOUT_RENDERERS[props.project.layout] ?? LayoutEditorialRight;
  return <Layout {...props} isActive={props.isActive ?? false} indexLabel={indexLabel} />;
}
