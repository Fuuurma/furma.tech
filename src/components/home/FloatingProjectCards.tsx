"use client";

/**
 * Five project windows float on the index panel's wave.
 *
 * Each window answers the pointer on its own: the distance from the pointer to
 * that card's centre decides how much it tilts toward it, how far it lifts, and
 * how strongly its edge lights. No two cards share a spring, so they never move
 * as one block — the near card answers first and strongest, the far ones trail.
 *
 * The windows are the way into the work: each one is a button that walks the
 * tour to its project, and the card says so with an "Open" line once it is
 * lifted. They take no wheel or touch gesture — the tour keeps those, and the
 * wave keeps the plate around them. The tilt mechanic is the one studied in
 * `furma.bloxs` `3d-card`: an offset from the centre is a degree of rotation
 * per 25px under a 1000px perspective.
 */

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import type { HomeProject } from "@/lib/home-projects";
import { useStableReducedMotion } from "@/lib/use-reduced-motion";

/** Offscreen, so a field with no pointer has every card at rest. */
const NO_POINTER = -10_000;
/** Degrees of tilt a card takes at the far edge of its reach. */
const TILT = 30;
/** How far a card drifts toward the pointer, in px, at its centre. */
const MAGNET = 44;
/** How far a card rises out of the plate when the pointer is on it, in px. */
const LIFT = 260;

type Placement = {
  /** Centre of the card, in % of the stage. */
  x: number;
  y: number;
  /** translateZ in px; negative is further away and reads smaller. */
  depth: number;
  /** Resting tilt, in degrees. */
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  /** How far the card breathes, in px, and how long one breath takes. */
  lift: number;
  breath: number;
  delay: number;
  /** Reach of the pointer's pull, in px, and how hard this card answers. */
  reach: number;
  answer: number;
  /** Cards past the second stay off a narrow screen. */
  narrow: boolean;
  /** Where the card sits when the stage is a phone: inside the frame, not bled. */
  compact?: { x: number; y: number };
};

const PLACEMENTS: readonly Placement[] = [
  { x: 20, y: 33, depth: 0, rotateX: 9, rotateY: 22, rotateZ: -5, lift: 14, breath: 11, delay: 0, reach: 620, answer: 1, narrow: true, compact: { x: 30, y: 31 } },
  { x: 81, y: 26, depth: -120, rotateX: -8, rotateY: -24, rotateZ: 4, lift: 11, breath: 13, delay: 1.4, reach: 560, answer: 0.85, narrow: true, compact: { x: 72, y: 25 } },
  { x: 13, y: 72, depth: -200, rotateX: 7, rotateY: 17, rotateZ: 5, lift: 10, breath: 15, delay: 2.6, reach: 500, answer: 0.72, narrow: true, compact: { x: 26, y: 73 } },
  { x: 88, y: 71, depth: -280, rotateX: -6, rotateY: -19, rotateZ: -4, lift: 9, breath: 12, delay: 0.8, reach: 470, answer: 0.62, narrow: false },
  { x: 50, y: 86, depth: -160, rotateX: 8, rotateY: 11, rotateZ: 2, lift: 12, breath: 14, delay: 2, reach: 440, answer: 0.78, narrow: false },
  { x: 60, y: 19, depth: -90, rotateX: -4, rotateY: -18, rotateZ: -3, lift: 9, breath: 16, delay: 1.1, reach: 480, answer: 0.7, narrow: false },
];

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

type Size = { width: number; height: number };

/** True on a phone-width stage, where the field shows fewer windows. */
function useCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 760px)");
    const sync = () => setCompact(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return compact;
}

function FloatCard({
  project,
  placement,
  index,
  pointerX,
  pointerY,
  size,
  active,
  reduceMotion,
  compact,
  onOpen,
  highlight,
}: {
  project: HomeProject;
  placement: Placement;
  index: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  size: Size;
  active: boolean;
  reduceMotion: boolean;
  compact: boolean;
  onOpen: (index: number) => void;
  highlight: MotionValue<number>;
}) {
  const [focused, setFocused] = useState(false);
  const spot = compact && placement.compact ? placement.compact : placement;
  const still = reduceMotion || !active;
  // Every card smooths the pointer with its own spring, so a quick sweep leaves
  // them strung out behind one another instead of arriving together. The
  // springs run on unit-space values (−1…1 across the card's reach, 0…1 near),
  // never on raw pointer pixels: a spring over a coordinate that starts
  // offscreen would spend a second travelling in from 10,000px.
  const stiffness = 34 + index * 9;
  const damping = 13 + index * 2.5;
  const settle = { stiffness, damping, mass: 0.6 } as const;

  const centreX = (size.width * spot.x) / 100;
  const centreY = (size.height * spot.y) / 100;
  const reach = placement.reach;
  // The title owns the middle. A card whose home is close to it answers less,
  // so a lift never grows into the word.
  const fromTitle = Math.hypot(
    centreX - size.width / 2,
    centreY - size.height / 2,
  );
  const clearance = clamp((fromTitle - 180) / 260, 0.45, 1);
  const answer = placement.answer * clearance;

  const rawX = useTransform(pointerX, (px) => clamp((px - centreX) / reach, -1, 1));
  const rawY = useTransform(pointerY, (py) => clamp((py - centreY) / reach, -1, 1));
  const rawNear = useTransform([pointerX, pointerY], ([px, py]: number[]) => {
    const distance = Math.hypot(px - centreX, py - centreY);
    const falloff = clamp(1 - distance / reach, 0, 1);
    // Cubed, not squared: the nearest card wins clearly and the others trail
    // well behind it, so the field never has two of them shouting at once.
    return falloff * falloff * falloff;
  });

  const nx = useSpring(rawX, settle);
  const ny = useSpring(rawY, settle);
  const near = useSpring(rawNear, settle);

  // With no pointer (a touch screen, or a reader who has not moved yet) the
  // field offers one window at a time, so the interaction is discoverable.
  const offered = useTransform(highlight, (value): number => (value === index ? 0.72 : 0));
  // A focused window comes forward exactly as a hovered one does, so the
  // keyboard gets the same cue as the pointer.
  const pull = useTransform([near, offered], ([n, o]: number[]) =>
    Math.max(n, o, focused ? 0.8 : 0),
  );

  const rotateY = useTransform([nx, near], ([n, p]: number[]) => placement.rotateY + n * TILT * answer * p);
  const rotateX = useTransform([ny, near], ([n, p]: number[]) => placement.rotateX - n * TILT * answer * p);
  const z = useTransform(pull, [0, 1], [placement.depth, placement.depth + LIFT * answer]);
  const nudgeX = useTransform([nx, near], ([n, p]: number[]) => n * MAGNET * answer * p);
  const nudgeY = useTransform([ny, near], ([n, p]: number[]) => n * MAGNET * answer * p);
  // The edge lights before the card moves: the approach is legible even when
  // the pointer is only passing by.
  const glow = useTransform(pull, (p) => clamp(p * 1.6, 0, 1));
  // The invitation belongs to the card that has actually come forward: a card
  // merely within reach keeps the lit edge and nothing else.
  const invitation = useTransform(glow, [0.62, 0.92], [0, 1]);

  return (
    <motion.div
      className="plastic-float-slot"
      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
      data-narrow={placement.narrow ? "true" : "false"}
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : index * 0.06 }}
    >
      <motion.div
        className="plastic-float-drift"
        animate={still ? undefined : { y: [0, -placement.lift, 0] }}
        transition={
          still
            ? undefined
            : {
                duration: placement.breath,
                delay: placement.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      >
        <motion.button
          type="button"
          className="plastic-float-card"
          onClick={() => onOpen(index)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            // A window further back is printed lighter: the field reads as
            // depth at rest, before the pointer moves anything.
            opacity: 1 - Math.min(0.34, Math.abs(placement.depth) / 900),
            transformPerspective: 1000,
            x: nudgeX,
            y: nudgeY,
            z,
            rotateX,
            rotateY,
            rotateZ: placement.rotateZ,
          }}
        >
          <motion.span className="plastic-float-glow" style={{ opacity: glow }} aria-hidden />
          <span className="plastic-float-no" aria-hidden>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="plastic-float-name">{project.name}</span>
          <span className="plastic-float-meta">
            <span>{project.category}</span>
            <span>{project.status}</span>
          </span>
          <motion.span className="plastic-float-open" style={{ opacity: invitation }} aria-hidden>
            Open <span aria-hidden>→</span>
          </motion.span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export function FloatingProjectCards({
  projects,
  isActive,
  onOpen,
}: {
  projects: HomeProject[];
  isActive: boolean;
  /** Called with the project's place in the list; the home walks the tour to it. */
  onOpen: (index: number) => void;
}) {
  const reduceMotion = useStableReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const pointerX = useMotionValue(NO_POINTER);
  const pointerY = useMotionValue(NO_POINTER);
  const highlight = useMotionValue(-1);
  const compact = useCompact();
  const [wantsHelp, setWantsHelp] = useState(true);

  const still = reduceMotion || !isActive;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      const rect = stage.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  // Before the reader has moved a pointer — a touch screen, or simply a visitor
  // who has not moved yet — one window at a time is offered, then another.
  useEffect(() => {
    if (!wantsHelp || still) {
      highlight.set(-1);
      return;
    }
    let step = 0;
    highlight.set(0);
    const id = window.setInterval(() => {
      step = (step + 1) % PLACEMENTS.length;
      highlight.set(step);
    }, 3600);
    return () => window.clearInterval(id);
  }, [wantsHelp, still, highlight]);

  useEffect(() => {
    if (still) {
      pointerX.set(NO_POINTER);
      pointerY.set(NO_POINTER);
      return;
    }
    const onMove = (event: PointerEvent) => {
      const stage = stageRef.current;
      if (!stage) return;
      // Any real pointer takes over from the carousel of offers.
      setWantsHelp((help) => (help ? false : help));
      const rect = stage.getBoundingClientRect();
      pointerX.set(event.clientX - rect.left);
      pointerY.set(event.clientY - rect.top);
    };
    const onLeave = () => {
      pointerX.set(NO_POINTER);
      pointerY.set(NO_POINTER);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [still, pointerX, pointerY]);

  return (
    <div ref={stageRef} className="plastic-float-stage">
      <div className="plastic-float-field">
        {projects.slice(0, PLACEMENTS.length).map((project, index) => (
          <FloatCard
            key={project.id}
            project={project}
            placement={PLACEMENTS[index]}
            index={index}
            pointerX={pointerX}
            pointerY={pointerY}
            size={size}
            active={isActive}
            reduceMotion={reduceMotion}
            compact={compact}
            onOpen={onOpen}
            highlight={highlight}
          />
        ))}
      </div>
    </div>
  );
}
