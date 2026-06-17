"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { HOME_PROJECTS, type HomeProject } from "@/lib/home-projects";
import { EASE_OUT_EXPO, motionDuration } from "@/lib/motion";
import { cn } from "@/lib/utils";

function ProjectMenuCell({
  project,
  index,
  isActive,
  onNavigate,
}: {
  project: HomeProject;
  index: number;
  isActive: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={project.href}
      role="menuitem"
      className={cn(
        "studio-portfolio-panel__cell",
        isActive && "studio-portfolio-panel__cell--active",
      )}
      onClick={onNavigate}
    >
      <span
        className="studio-portfolio-panel__swatch"
        style={{ backgroundColor: project.coverTint }}
        aria-hidden
      />
      <span className="studio-portfolio-panel__index">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="studio-portfolio-panel__name">{project.name}</span>
      <span className="studio-portfolio-panel__arrow" aria-hidden>
        →
      </span>
    </Link>
  );
}

export function PortfolioNavDropdown() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [panelTop, setPanelTop] = useState(0);
  const [mounted, setMounted] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => setMounted(true), []);

  const syncPanelPosition = useCallback(() => {
    const chrome = wrapRef.current?.closest(".studio-chrome");
    if (chrome) {
      setPanelTop(chrome.getBoundingClientRect().bottom);
    }
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 200);
  }, [clearCloseTimer]);

  const handleOpen = useCallback(() => {
    clearCloseTimer();
    syncPanelPosition();
    setOpen(true);
  }, [clearCloseTimer, syncPanelPosition]);

  useEffect(() => {
    if (!open) return;
    syncPanelPosition();
    const onScrollOrResize = () => syncPanelPosition();
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("scroll", onScrollOrResize, true);
    return () => {
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize, true);
    };
  }, [open, syncPanelPosition]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const panel = mounted && (
    <AnimatePresence>
      {open && (
        <motion.div
          id="portfolio-nav-panel"
          role="menu"
          aria-label="Portfolio projects"
          className="studio-portfolio-panel"
          style={{ top: panelTop }}
          initial={reduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: motionDuration.base, ease: EASE_OUT_EXPO }}
          onMouseEnter={handleOpen}
          onMouseLeave={scheduleClose}
        >
          <header className="studio-portfolio-panel__head">
            <span className="studio-portfolio-panel__title">Portfolio</span>
            <Link
              href="/portfolio"
              role="menuitem"
              className="studio-portfolio-panel__list-link motion-link"
              onClick={() => setOpen(false)}
            >
              <span>View full list</span>
              <span aria-hidden>→</span>
            </Link>
          </header>

          <div className="studio-portfolio-panel__grid">
            <div className="studio-portfolio-panel__col">
              {HOME_PROJECTS.slice(0, 5).map((project, i) => (
                <ProjectMenuCell
                  key={project.id}
                  project={project}
                  index={i}
                  isActive={pathname === project.href}
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </div>
            <div className="studio-portfolio-panel__col">
              {HOME_PROJECTS.slice(5).map((project, i) => (
                <ProjectMenuCell
                  key={project.id}
                  project={project}
                  index={i + 5}
                  isActive={pathname === project.href}
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div
      ref={wrapRef}
      className="plastic-reel__portfolio-wrap"
      onMouseEnter={handleOpen}
      onMouseLeave={scheduleClose}
      onFocus={handleOpen}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          scheduleClose();
        }
      }}
    >
      <Link
        href="/portfolio"
        className={cn(
          "plastic-reel__portfolio",
          open && "plastic-reel__portfolio--open",
        )}
        aria-expanded={open}
        aria-controls="portfolio-nav-panel"
        aria-haspopup="true"
        onClick={(e) => {
          if (window.matchMedia("(hover: none)").matches) {
            e.preventDefault();
            if (open) {
              setOpen(false);
            } else {
              handleOpen();
            }
          }
        }}
      >
        <span>Portfolio</span>
        <span className="plastic-reel__portfolio-chevron" aria-hidden>
          ↓
        </span>
      </Link>

      {mounted && createPortal(panel, document.body)}
    </div>
  );
}
