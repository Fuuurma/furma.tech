"use client";

import type { CSSProperties, ComponentType } from "react";
import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { HomeProject } from "@/lib/home-projects";
import { PROJECT_HERO_MAP } from "@/lib/project-heroes";
import {
  expandChildVariants,
  indexVariants,
  listRowVariants,
  previewVisualVariants,
} from "@/components/portfolio/portfolio-list-motion";
import { cn } from "@/lib/utils";

interface PortfolioListItemProps {
  project: HomeProject;
  index: number;
  itemIndex: number;
}

function statusTone(status: string): string {
  if (status === "In Development") return "portfolio-list-page__status--dev";
  if (status === "Roadmap") return "portfolio-list-page__status--roadmap";
  return "portfolio-list-page__status--paused";
}

function PreviewVisual({
  name,
  HeroVisual,
}: {
  name: string;
  HeroVisual: ComponentType<{ className?: string }> | undefined;
}) {
  if (!HeroVisual) {
    return (
      <span className="portfolio-list-page__preview-fallback">{name}</span>
    );
  }
  return <HeroVisual className="portfolio-list-page__preview-visual" />;
}

function StaticRowContent({
  project,
  index,
  HeroVisual,
}: {
  project: HomeProject;
  index: number;
  HeroVisual: ComponentType<{ className?: string }> | undefined;
}) {
  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <>
      <div className="portfolio-list-page__row-main">
        <span className="portfolio-list-page__index" aria-hidden="true">
          {indexLabel}
        </span>
        <span className="portfolio-list-page__name">{project.name}</span>
        <span className="portfolio-list-page__tags portfolio-list-page__tags--collapsed">
          {project.category}
          <span className="portfolio-list-page__tag-sep" aria-hidden>
            ·
          </span>
          {project.status}
        </span>
        <span className="portfolio-list-page__arrow" aria-hidden="true">
          →
        </span>
      </div>

      <div className="portfolio-list-page__mobile-meta">
        <span>{project.category}</span>
        <span className="portfolio-list-page__tag-sep" aria-hidden>
          ·
        </span>
        <span>{project.status}</span>
      </div>
      <p className="portfolio-list-page__mobile-desc">{project.description}</p>

      <div className="portfolio-list-page__expand" aria-hidden="true">
        <div className="portfolio-list-page__expand-inner">
          <div
            className="portfolio-list-page__preview"
            style={{ "--preview-tint": project.coverTint } as CSSProperties}
          >
            <div className="portfolio-list-page__preview-frame">
              <PreviewVisual name={project.name} HeroVisual={HeroVisual} />
            </div>
          </div>
          <div className="portfolio-list-page__detail">
            <div className="portfolio-list-page__detail-meta">
              <span className="plastic-label">{project.category}</span>
              <span
                className={cn(
                  "portfolio-list-page__status",
                  statusTone(project.status),
                )}
              >
                {project.status}
              </span>
            </div>
            <p className="portfolio-list-page__description">
              {project.description}
            </p>
            <span className="portfolio-list-page__cta">
              View project
              <span>→</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function AnimatedRowContent({
  project,
  index,
  HeroVisual,
}: {
  project: HomeProject;
  index: number;
  HeroVisual: ComponentType<{ className?: string }> | undefined;
}) {
  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <>
      <div className="portfolio-list-page__row-main">
        <motion.span
          className="portfolio-list-page__index"
          variants={indexVariants}
          aria-hidden="true"
        >
          {indexLabel}
        </motion.span>
        <span className="portfolio-list-page__name">{project.name}</span>
        <span className="portfolio-list-page__tags portfolio-list-page__tags--collapsed">
          {project.category}
          <span className="portfolio-list-page__tag-sep" aria-hidden>
            ·
          </span>
          {project.status}
        </span>
        <span className="portfolio-list-page__arrow" aria-hidden="true">
          →
        </span>
      </div>

      <div className="portfolio-list-page__mobile-meta">
        <span>{project.category}</span>
        <span className="portfolio-list-page__tag-sep" aria-hidden>
          ·
        </span>
        <span>{project.status}</span>
      </div>
      <p className="portfolio-list-page__mobile-desc">{project.description}</p>

      <div className="portfolio-list-page__expand" aria-hidden="true">
        <div className="portfolio-list-page__expand-inner">
          <motion.div
            className="portfolio-list-page__preview"
            style={{ "--preview-tint": project.coverTint } as CSSProperties}
            variants={expandChildVariants}
          >
            <motion.div
              className="portfolio-list-page__preview-frame"
              variants={previewVisualVariants}
            >
              <PreviewVisual name={project.name} HeroVisual={HeroVisual} />
            </motion.div>
          </motion.div>

          <motion.div
            className="portfolio-list-page__detail"
            variants={expandChildVariants}
          >
            <div className="portfolio-list-page__detail-meta">
              <span className="plastic-label">{project.category}</span>
              <span
                className={cn(
                  "portfolio-list-page__status",
                  statusTone(project.status),
                )}
              >
                {project.status}
              </span>
            </div>
            <p className="portfolio-list-page__description">
              {project.description}
            </p>
            <span className="portfolio-list-page__cta">
              View project
              <span>→</span>
            </span>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export function PortfolioListItem({
  project,
  index,
  itemIndex,
}: PortfolioListItemProps) {
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const HeroVisual = PROJECT_HERO_MAP[project.id];

  const open = () => setExpanded(true);
  const close = () => setExpanded(false);

  return (
    <li
      className={cn(
        "portfolio-list-page__item",
        expanded && "portfolio-list-page__item--expanded",
      )}
      style={{ "--item-index": itemIndex } as CSSProperties}
    >
      <Link
        href={project.href}
        className={cn(
          "portfolio-list-page__row group",
          expanded && "portfolio-list-page__row--expanded",
        )}
        onMouseEnter={open}
        onMouseLeave={close}
        onFocus={open}
        onBlur={close}
      >
        {reduceMotion ? (
          <StaticRowContent
            project={project}
            index={index}
            HeroVisual={HeroVisual}
          />
        ) : (
          <motion.div
            className="portfolio-list-page__row-body"
            initial="rest"
            animate={expanded ? "hover" : "rest"}
            variants={listRowVariants}
          >
            <AnimatedRowContent
              project={project}
              index={index}
              HeroVisual={HeroVisual}
            />
          </motion.div>
        )}
      </Link>
    </li>
  );
}
