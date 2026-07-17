"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export type GoToOptions = {
  /** Move focus to the destination section panel after the index updates */
  focus?: boolean;
  /** Bypass the transition lock (CTAs, reel, hash jumps) */
  force?: boolean;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (target.isContentEditable) return true;
  return Boolean(target.closest("[contenteditable='true']"));
}

function isSpaceActivator(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "BUTTON" || tag === "A" || tag === "SUMMARY") return true;
  const role = target.getAttribute("role");
  if (
    role === "button" ||
    role === "link" ||
    role === "menuitem" ||
    role === "tab" ||
    role === "checkbox" ||
    role === "switch"
  ) {
    return true;
  }
  return Boolean(target.closest("button, a, [role='button'], [role='link']"));
}

/**
 * Fullscreen section snap for the plastic home.
 * Wheel/touch advance sections; keyboard supports arrows, space, page keys, home/end.
 */
export function useSmoothSectionScroll(total: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrolling = useRef(false);
  const lockTimer = useRef<number | null>(null);
  const touchStart = useRef(0);
  const activeRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const focusTargetRef = useRef<((index: number) => void) | null>(null);

  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  const setFocusHandler = useCallback((handler: ((index: number) => void) | null) => {
    focusTargetRef.current = handler;
  }, []);

  const goTo = useCallback(
    (index: number, options: GoToOptions = {}) => {
      const { focus = false, force = false } = options;
      const clamped = Math.max(0, Math.min(total - 1, index));
      if (clamped === activeRef.current) {
        if (focus) focusTargetRef.current?.(clamped);
        return;
      }
      if (isScrolling.current && !force) return;

      if (lockTimer.current !== null) {
        window.clearTimeout(lockTimer.current);
        lockTimer.current = null;
      }

      isScrolling.current = true;
      setActiveIndex(clamped);

      const lockMs = reduceMotion || prefersReducedMotion() ? 50 : 850;
      lockTimer.current = window.setTimeout(() => {
        isScrolling.current = false;
        lockTimer.current = null;
      }, lockMs);

      if (focus) {
        // Wait a frame so inert/aria-hidden flip before focus moves.
        requestAnimationFrame(() => {
          focusTargetRef.current?.(clamped);
        });
      }
    },
    [total, reduceMotion],
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target;
      if (target instanceof Element) {
        const scrollable = target.closest("[data-section-scroll]");
        if (scrollable instanceof HTMLElement) {
          const { scrollTop, scrollHeight, clientHeight } = scrollable;
          const atTop = scrollTop <= 0;
          const atBottom = scrollTop + clientHeight >= scrollHeight - 2;
          if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) return;
        }
      }

      e.preventDefault();
      if (isScrolling.current) return;
      goTo(activeRef.current + (e.deltaY > 0 ? 1 : -1));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;

      if (e.key === "Escape") {
        const chrome = document.querySelector<HTMLElement>("[data-studio-chrome]");
        const focusable = chrome?.querySelector<HTMLElement>(
          "a, button, [tabindex]:not([tabindex='-1'])",
        );
        if (focusable) {
          e.preventDefault();
          focusable.focus();
        }
        return;
      }

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goTo(activeRef.current + 1, { focus: true });
        return;
      }

      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(activeRef.current - 1, { focus: true });
        return;
      }

      if (e.key === " " || e.key === "Spacebar") {
        if (isSpaceActivator(e.target)) return;
        e.preventDefault();
        goTo(activeRef.current + 1, { focus: true });
        return;
      }

      if (e.key === "Home") {
        e.preventDefault();
        goTo(0, { focus: true, force: true });
        return;
      }

      if (e.key === "End") {
        e.preventDefault();
        goTo(total - 1, { focus: true, force: true });
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStart.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) {
        goTo(activeRef.current + (diff > 0 ? 1 : -1));
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      if (lockTimer.current !== null) window.clearTimeout(lockTimer.current);
    };
  }, [goTo, total]);

  return { activeIndex, goTo, setFocusHandler };
}
