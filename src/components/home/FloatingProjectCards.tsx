"use client";

/**
 * Five project windows float on the index panel's wave.
 *
 * Decoration, not navigation: the field is `aria-hidden`, takes no pointer
 * events, and listens for nothing a gesture needs — the tour keeps every wheel
 * and touch, and the wave keeps the hand. Tilt follows the mechanic studied in
 * `furma.bloxs` `3d-card`: the pointer's offset from the centre is a degree of
 * rotation per 25px under a 1000px perspective, so depth reads as parallax.
 */

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import type { HomeProject } from "@/lib/home-projects";
import { useStableReducedMotion } from "@/lib/use-reduced-motion";

/** Pointer falloff: px of offset from the centre per degree of tilt. */
const FALLOFF = 25;
/** How far the tilt may travel, in degrees. */
const TILT = 14;

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

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
  /** Cards past the third stay off a narrow screen. */
  narrow: boolean;
};

const PLACEMENTS: readonly Placement[] = [
  { x: 20, y: 33, depth: 0, rotateX: 6, rotateY: 14, rotateZ: -4, lift: 10, breath: 11, delay: 0, narrow: true },
  { x: 81, y: 26, depth: -120, rotateX: -5, rotateY: -16, rotateZ: 3, lift: 8, breath: 13, delay: 1.4, narrow: true },
  { x: 13, y: 72, depth: -200, rotateX: 4, rotateY: 10, rotateZ: 4, lift: 7, breath: 15, delay: 2.6, narrow: false },
  { x: 88, y: 71, depth: -280, rotateX: -3, rotateY: -12, rotateZ: -3, lift: 6, breath: 12, delay: 0.8, narrow: false },
  { x: 50, y: 86, depth: -160, rotateX: 5, rotateY: 6, rotateZ: 1, lift: 9, breath: 14, delay: 2, narrow: false },
];

function FloatCard({
  project,
  placement,
  index,
  pointX,
  pointY,
  still,
}: {
  project: HomeProject;
  placement: Placement;
  index: number;
  pointX: MotionValue<number>;
  pointY: MotionValue<number>;
  still: boolean;
}) {
  // The field turns with the pointer; every card's own depth turns that into
  // parallax without a per-card listener.
  const rotateY = useTransform(pointX, [-TILT, TILT], [placement.rotateY + 7, placement.rotateY - 7]);
  const rotateX = useTransform(pointY, [-TILT, TILT], [placement.rotateX - 5, placement.rotateX + 5]);

  return (
    <div
      className="plastic-float-slot"
      style={{ left: `${placement.x}%`, top: `${placement.y}%` }}
      data-narrow={placement.narrow ? "true" : "false"}
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
        <motion.div
          className="plastic-float-card"
          style={{
            transformPerspective: 1000,
            rotateX,
            rotateY,
            rotateZ: placement.rotateZ,
            z: placement.depth,
          }}
        >
          <span className="plastic-float-no" aria-hidden>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="plastic-float-name">{project.name}</span>
          <span className="plastic-float-meta">
            <span>{project.category}</span>
            <span>{project.status}</span>
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function FloatingProjectCards({
  projects,
  isActive,
}: {
  projects: HomeProject[];
  isActive: boolean;
}) {
  const reduceMotion = useStableReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const pointX = useSpring(x, { stiffness: 45, damping: 18, mass: 0.7 });
  const pointY = useSpring(y, { stiffness: 45, damping: 18, mass: 0.7 });

  const still = reduceMotion || !isActive;

  useEffect(() => {
    if (still) {
      x.set(0);
      y.set(0);
      return;
    }
    const stage = stageRef.current;
    if (!stage) return;

    const onMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      // Degrees, exactly as studied: the pointer's offset from the centre,
      // divided by the falloff, held inside the tilt budget.
      x.set(clamp((event.clientX - rect.left - rect.width / 2) / FALLOFF, -TILT, TILT));
      y.set(clamp((event.clientY - rect.top - rect.height / 2) / FALLOFF, -TILT, TILT));
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, [still, x, y]);

  const fieldRotateY = useTransform(pointX, [-TILT, TILT], [7, -7]);
  const fieldRotateX = useTransform(pointY, [-TILT, TILT], [-4.5, 4.5]);

  return (
    <div
      ref={stageRef}
      className="plastic-float-stage"
      aria-hidden="true"
    >
      <motion.div
        className="plastic-float-field"
        style={{ transformPerspective: 1400, rotateX: fieldRotateX, rotateY: fieldRotateY }}
      >
        {projects.slice(0, PLACEMENTS.length).map((project, index) => (
          <FloatCard
            key={project.id}
            project={project}
            placement={PLACEMENTS[index]}
            index={index}
            pointX={pointX}
            pointY={pointY}
            still={still}
          />
        ))}
      </motion.div>
    </div>
  );
}
