/**
 * The two lobes of the hero: the lights the wave is printed from.
 *
 * At rest the lobes sit in opposite corners, the top-right one lit and the
 * bottom-left one printing the mirrored field. The reader moves them without
 * ever landing on them:
 *
 * - **Lean.** The hand's hover pulls each lobe a little toward it.
 * - **Grab.** A press that starts inside a lobe takes it: the lobe follows the
 *   hand and swells while it is held.
 * - **Spring back.** On release the lobe is pulled home by an underdamped
 *   spring: it overshoots its corner a little, as if it had weight, and
 *   settles within a few seconds.
 * - **Kick.** A strike near a lobe knocks it away from the point and swells
 *   it, and the spring brings it back.
 *
 * Everything is pixels and seconds. The model has no DOM and no randomness, so
 * the same hand gives the same lobes, and it runs under `node --test`.
 */

export interface Lobe {
  /** Its centre, in px of the panel. */
  x: number;
  /** Its centre, in px of the panel. */
  y: number;
  /** Its reach, in px. Grows with its swell. */
  radius: number;
  /** How hard it lights, from 1 at rest up to its swell. */
  gain: number;
}

/** The hand as the lobes see it. `down` is a held press. */
export interface LobeHand {
  x: number;
  y: number;
  over: boolean;
  down: boolean;
  /**
   * How far the hand has travelled since it went down, in px. A press that
   * has not moved is a click, and a click kicks a lobe rather than taking it.
   * Omitted means the hand has moved.
   */
  travelled?: number;
}

/** The spring that follows a held hand: tight, and nearly critically damped. */
const HELD_STIFFNESS = 70;
const HELD_DAMPING = 15;
/** The spring that brings a lobe home: soft, and underdamped (ζ ≈ 0.45). */
const HOME_STIFFNESS = 22;
const HOME_DAMPING = 4.2;
/** How far a press must travel before the lobe it landed on is taken, in px. */
const GRAB_TRAVEL = 10;
/** The share of a lobe's reach inside which a press lands on it. */
const GRAB_ZONE = 0.55;
/** How far a lobe may swing past the panel's edge on its way home, as a share. */
const OVERSHOOT = 0.12;
/** The speed a strike gives a lobe at point-blank range, in px/s. */
const KICK_SPEED = 760;
/** How far a hover leans a lobe toward the hand, as a share of the distance. */
const LEAN = 0.05;
/** The most a held lobe swells, as a multiple of its rest reach and light. */
const SWELL = 1.35;
/** The longest step the model takes at once, in s. Longer steps are clamped. */
const MAX_STEP = 1 / 20;

interface Motion {
  vx: number;
  vy: number;
  vGain: number;
  grabbed: boolean;
}

export class Lobes {
  width = 1;
  height = 1;
  /** The top-right lobe: lit at rest, grows toward the page's top-right corner. */
  readonly topRight: Lobe = { x: 1, y: 0, radius: 1, gain: 1 };
  /** The bottom-left lobe: prints the mirrored field, from the opposite corner. */
  readonly bottomLeft: Lobe = { x: 0, y: 1, radius: 1, gain: 1 };

  private readonly motion: [Motion, Motion] = [
    { vx: 0, vy: 0, vGain: 0, grabbed: false },
    { vx: 0, vy: 0, vGain: 0, grabbed: false },
  ];
  private wasDown = false;
  private baseRadius = 1;

  constructor(width: number, height: number) {
    this.resize(width, height);
  }

  /** Resize the panel. The lobes go back to rest on the new corners. */
  resize(width: number, height: number): void {
    this.width = Math.max(1, width);
    this.height = Math.max(1, height);
    this.baseRadius = Math.max(1, Math.min(this.height * 0.7, this.width * 0.5));
    this.reset();
  }

  /** Put both lobes back in their corners, still. */
  reset(): void {
    this.topRight.x = this.width;
    this.topRight.y = 0;
    this.bottomLeft.x = 0;
    this.bottomLeft.y = this.height;
    this.topRight.gain = 1;
    this.bottomLeft.gain = 1;
    this.topRight.radius = this.baseRadius;
    this.bottomLeft.radius = this.baseRadius;
    for (const m of this.motion) {
      m.vx = 0;
      m.vy = 0;
      m.vGain = 0;
      m.grabbed = false;
    }
    this.wasDown = false;
  }

  /**
   * Advance the lobes by `seconds`. `hand` is null when the hand is not on
   * the panel. Steps longer than a twentieth of a second are split, so a
   * stalled frame cannot fling a lobe.
   */
  step(seconds: number, hand: LobeHand | null): void {
    let remaining = seconds;
    if (!(remaining > 0)) remaining = 0;
    while (remaining > 0) {
      const dt = Math.min(remaining, MAX_STEP);
      remaining -= dt;
      this.advance(dt, hand);
    }
  }

  private advance(dt: number, hand: LobeHand | null): void {
    const grabbing = hand !== null && hand.down && !this.wasDown;
    this.wasDown = hand !== null && hand.down;

    // A press takes the nearest lobe it lands in. A release lets go of all.
    if (grabbing && hand) {
      this.grab(hand);
    } else if (!this.wasDown) {
      for (const m of this.motion) m.grabbed = false;
    }

    this.spring(this.topRight, this.motion[0], dt, hand);
    this.spring(this.bottomLeft, this.motion[1], dt, hand);
  }

  private grab(hand: LobeHand): void {
    const reach = (lobe: Lobe) =>
      Math.hypot(hand.x - lobe.x, hand.y - lobe.y) - lobe.radius * GRAB_ZONE;
    const a = reach(this.topRight);
    const b = reach(this.bottomLeft);
    const taken = a <= 0 || b <= 0 ? (a <= b ? 0 : 1) : -1;
    for (let i = 0; i < 2; i++) this.motion[i].grabbed = i === taken;
  }

  /**
   * A strike at (x, y): every lobe within reach is knocked away from the
   * point and swells for a moment. The spring brings it back.
   */
  kick(x: number, y: number): void {
    const lobes: [Lobe, Motion][] = [
      [this.topRight, this.motion[0]],
      [this.bottomLeft, this.motion[1]],
    ];
    for (const [lobe, m] of lobes) {
      const dx = lobe.x - x;
      const dy = lobe.y - y;
      const d = Math.hypot(dx, dy);
      const reach = lobe.radius * 1.2;
      if (d >= reach || m.grabbed) continue;
      const falloff = 1 - d / reach;
      const ux = d > 0.001 ? dx / d : 1;
      const uy = d > 0.001 ? dy / d : 0;
      m.vx += ux * KICK_SPEED * falloff;
      m.vy += uy * KICK_SPEED * falloff;
      m.vGain += 3.2 * falloff;
    }
  }

  private spring(lobe: Lobe, m: Motion, dt: number, hand: LobeHand | null): void {
    const restX = lobe === this.topRight ? this.width : 0;
    const restY = lobe === this.topRight ? 0 : this.height;

    // A press that has not yet moved is a click: the lobe waits for it to
    // become a drag before it is taken.
    const taken =
      hand !== null && m.grabbed && (hand.travelled ?? Infinity) > GRAB_TRAVEL;

    let targetX = restX;
    let targetY = restY;
    let targetGain = 1;

    if (hand && taken) {
      targetX = clamp(hand.x, 0, this.width);
      targetY = clamp(hand.y, 0, this.height);
      targetGain = SWELL;
    } else if (hand && hand.over) {
      targetX = restX + (hand.x - restX) * LEAN;
      targetY = restY + (hand.y - restY) * LEAN;
    }

    const stiffness = taken ? HELD_STIFFNESS : HOME_STIFFNESS;
    const damping = taken ? HELD_DAMPING : HOME_DAMPING;
    const marginX = this.width * OVERSHOOT;
    const marginY = this.height * OVERSHOOT;

    m.vx += (stiffness * (targetX - lobe.x) - damping * m.vx) * dt;
    m.vy += (stiffness * (targetY - lobe.y) - damping * m.vy) * dt;
    lobe.x = clamp(lobe.x + m.vx * dt, -marginX, this.width + marginX);
    lobe.y = clamp(lobe.y + m.vy * dt, -marginY, this.height + marginY);

    m.vGain += (stiffness * (targetGain - lobe.gain) - damping * m.vGain) * dt;
    lobe.gain = clamp(lobe.gain + m.vGain * dt, 0.85, SWELL + 0.25);
    lobe.radius = this.baseRadius * lobe.gain;
  }
}

function clamp(value: number, low: number, high: number): number {
  return value < low ? low : value > high ? high : value;
}
