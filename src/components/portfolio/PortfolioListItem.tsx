"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { HomeProject } from "@/lib/home-projects";
import { getProjectHero } from "@/lib/project-heroes";
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

function StaticRowContent({
  project,
  index,
}: {
  project: HomeProject;
  index: number;
}) {
  const HeroVisual = getProjectHero(project.id);
  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <>
      <div className="portfolio-list-page__row-main">
        <span className="portfolio-list-page__index">{indexLabel}</span>
        <span className="portfolio-list-page__name">{project.name}</span>
        <span className="portfolio-list-page__tags portfolio-list-page__tags--collapsed">
          {project.category}
          <span className="portfolio-list-page__tag-sep" aria-hidden>
            ·
          </span>
          {project.status}
        </span>
        <span className="portfolio-list-page__arrow" aria-hidden>
          →
        </span>
      </div>
      <p className="portfolio-list-page__mobile-desc">{project.description}</p>
      <div className="portfolio-list-page__expand">
        <div className="portfolio-list-page__expand-inner">
          <div
            className="portfolio-list-page__preview"
            style={{ "--preview-tint": project.coverTint } as CSSProperties}
          >
            <div className="portfolio-list-page__preview-frame">
              {HeroVisual ? (
                <HeroVisual className="portfolio-list-page__preview-visual" />
              ) : (
                <span className="portfolio-list-page__preview-fallback">
                  {project.name}
                </span>
              )}
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
              <span aria-hidden>→</span>
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
}: {
  project: HomeProject;
  index: number;
}) {
  const HeroVisual = getProjectHero(project.id);
  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <>
      <div className="portfolio-list-page__row-main">
        <motion.span
          className="portfolio-list-page__index"
          variants={indexVariants}
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
        <span className="portfolio-list-page__arrow" aria-hidden>
          →
        </span>
      </div>

      <p className="portfolio-list-page__mobile-desc">{project.description}</p>

      <div className="portfolio-list-page__expand">
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
              {HeroVisual ? (
                <HeroVisual className="portfolio-list-page__preview-visual" />
              ) : (
                <span className="portfolio-list-page__preview-fallback">
                  {project.name}
                </span>
              )}
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
              <span aria-hidden>→</span>
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

  return (
    <li
      className="portfolio-list-page__item"
      style={{ "--item-index": itemIndex } as CSSProperties}
    >
      <Link href={project.href} className="portfolio-list-page__row group">
        {reduceMotion ? (
          <StaticRowContent project={project} index={index} />
        ) : (
          <motion.div
            className="portfolio-list-page__row-body"
            initial="rest"
            whileHover="hover"
            variants={listRowVariants}
          >
            <AnimatedRowContent project={project} index={index} />
          </motion.div>
        )}
      </Link>
    </li>
  );
}
