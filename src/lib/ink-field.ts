/**
 * The hand's ink: what the reader leaves on a screen, and how it ages.
 *
 * The house screens print a tone field as marks — dots in the hero, characters
 * in the footer — and until now the reader could only watch. This is the
 * field the reader writes into. It is a tone field like the others, so it goes
 * through the same ordered threshold and the same ink ceiling, which is what
 * keeps a hand-drawn mark in the house's print vocabulary: it is printed, not
 * glowed.
 *
 * Four gestures, four things the screen does with them:
 *
 * - **Hover** leaves a faint wake. The ink is light and fades in under a
 *   second, and the field leans a little the way the hand went.
 * - **Drag** paints. The ink is full strength, it is carried along by the
 *   hand's own motion (it swirls rather than smears), and it lingers.
 * - **Hold** swells a blob under the hand — a metaball with satellites — that
 *   keeps charging as long as the hand rests.
 * - **Release** throws the charge as an abstract form (a ring, a square, a
 *   diamond, a plus, a lens, a triangle) that expands from the hand, echoed
 *   inside itself, and fades. A click is a hold of zero length: a small form.
 *   The form cycles with every throw, so the screen has a repertoire and no
 *   randomness: the same hand on the same screen prints the same thing.
 *
 * The field also keeps a **displacement**: the hand pushes the picture
 * underneath it (the hero's waves lean with the hand and relax back), and
 * `fillWarp` hands that push to whichever sampler draws the picture.
 *
 * Everything here is pixels, seconds, and a coarse grid. It has no DOM, no
 * canvas, and no randomness, so it runs under `node --test`. `bindPointer` at
 * the foot of the file is the one piece that touches the page.
 */

/** The repertoire of forms the screen throws, in the order it throws them. */
export const FORMS = [
  "ring",
  "square",
  "diamond",
  "plus",
  "lens",
  "triangle",
] as const;

export type FormKind = (typeof FORMS)[number];

/** Signed distance to a box of half-size `bx` × `by`. */
function box(x: number, y: number, bx: number, by: number): number {
  const qx = Math.abs(x) - bx;
  const qy = Math.abs(y) - by;
  return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0);
}

/**
 * The signed distance from a point to the outline of a form of unit size,
 * negative inside. Distances are in the same unit as the point, so a caller
 * scales the point down by the form's size and the distance back up.
 */
export function formDistance(kind: FormKind, x: number, y: number): number {
  switch (kind) {
    case "ring":
      return Math.hypot(x, y) - 1;
    case "square":
      return box(x, y, 0.8, 0.8);
    case "diamond":
      return (Math.abs(x) + Math.abs(y)) * Math.SQRT1_2 - 0.95;
    case "plus":
      return Math.min(box(x, y, 1, 0.3), box(x, y, 0.3, 1));
    case "lens": {
      // Two discs, intersected: a vesica, taller than it is wide.
      const a = Math.hypot(x - 0.5, y) - 1;
      const b = Math.hypot(x + 0.5, y) - 1;
      return Math.max(a, b) * 1.1;
    }
    case "triangle": {
      const k = Math.sqrt(3);
      let px = Math.abs(x) - 1;
      let py = y + 1 / k;
      if (px + k * py > 0) {
        const nx = (px - k * py) / 2;
        const ny = (-k * px - py) / 2;
        px = nx;
        py = ny;
      }
      px -= Math.max(-2, Math.min(0, px));
      return -Math.hypot(px, py) * Math.sign(py || 1);
    }
  }
}

/** The concentric echoes a form carries inside itself: [scale, weight]. */
const ECHOES: readonly (readonly [number, number])[] = [
  [1, 1],
  [0.62, 0.5],
  [0.3, 0.28],
];

/** Ease-out cubic: fast out of the hand, slow to the edge. */
function easeOut(t: number): number {
  const u = 1 - t;
  return 1 - u * u * u;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** A form in flight. */
interface Throw {
  kind: FormKind;
  x: number;
  y: number;
  angle: number;
  /** The size the form reaches, in px. */
  reach: number;
  /** How long it has been out, and how long it lives, in seconds. */
  age: number;
  life: number;
}

export interface InkFieldOptions {
  /** The pitch of the field's own grid, in px. Coarser is cheaper. */
  cell?: number;
  /** The weight of a printed line, in px: the thickness of a form's outline. */
  line?: number;
  /** The reach of the hand on the field, in px. */
  reach?: number;
  /** How long a dragged mark lingers, in seconds. */
  linger?: number;
}

const MAX_THROWS = 10;
const DYE_CAP = 1.5;
const BLOB_MIN = 22;
const BLOB_MAX = 150;
/** How long the hand must rest before the blob begins to charge, in s. */
const HOLD_DELAY = 0.12;
/** How long a full charge takes, in s. */
const CHARGE_TIME = 1.1;
/** How far the hand may travel in a press and still count as a hold, in px. */
const DRAG_SLOP = 18;
/** The most the field may push the picture, in px. */
const MAX_PUSH = 110;

export class InkField {
  width = 0;
  height = 0;
  readonly cell: number;
  readonly line: number;
  readonly reach: number;
  readonly linger: number;

  columns = 1;
  rows = 1;
  /** The ink, per grid cell. */
  dye = new Float32Array(1);
  /** The flow that carries it, in px/s. */
  vx = new Float32Array(1);
  vy = new Float32Array(1);
  /** The push the hand has put into the picture, in px. */
  ox = new Float32Array(1);
  oy = new Float32Array(1);

  /** The forms in flight. */
  throws: Throw[] = [];
  /** How many forms have been thrown: picks the next one, and its tilt. */
  thrown = 0;

  /** The hand. */
  pointer = {
    x: 0,
    y: 0,
    /** Smoothed speed, in px/s. */
    vx: 0,
    vy: 0,
    over: false,
    down: false,
    /** Where the press began, and how far the hand has travelled since. */
    originX: 0,
    originY: 0,
    travelled: 0,
    /** How long the press has lasted, in s. */
    heldFor: 0,
    /** Where the last splat was laid, so a fast hand leaves a line. */
    lastX: 0,
    lastY: 0,
    hasLast: false,
    touch: false,
  };

  /** The blob under a resting hand: 0 when none, up to 1 when charged. */
  charge = 0;
  /** A clock for the blob's satellites. */
  private clock = 0;
  /** The largest ink value in the grid after the last step. */
  dyeMax = 0;

  private scratch = new Float32Array(1);
  private scratchX = new Float32Array(1);
  private scratchY = new Float32Array(1);

  constructor(width: number, height: number, options: InkFieldOptions = {}) {
    this.cell = options.cell ?? 12;
    this.line = options.line ?? 9;
    this.reach = options.reach ?? 56;
    this.linger = options.linger ?? 1.8;
    this.resize(width, height);
  }

  /** Resize the field. Ink does not survive a resize: the page changed shape. */
  resize(width: number, height: number): void {
    const w = Math.max(1, width);
    const h = Math.max(1, height);
    if (w === this.width && h === this.height) return;
    this.width = w;
    this.height = h;
    this.columns = Math.max(2, Math.ceil(w / this.cell));
    this.rows = Math.max(2, Math.ceil(h / this.cell));
    const size = this.columns * this.rows;
    this.dye = new Float32Array(size);
    this.vx = new Float32Array(size);
    this.vy = new Float32Array(size);
    this.ox = new Float32Array(size);
    this.oy = new Float32Array(size);
    this.scratch = new Float32Array(size);
    this.scratchX = new Float32Array(size);
    this.scratchY = new Float32Array(size);
    this.throws = [];
    this.dyeMax = 0;
  }

  /** Forget everything the hand has written. */
  clear(): void {
    this.dye.fill(0);
    this.vx.fill(0);
    this.vy.fill(0);
    this.ox.fill(0);
    this.oy.fill(0);
    this.throws = [];
    this.charge = 0;
    this.dyeMax = 0;
  }

  /** Whether the field holds anything the screen would print. */
  get active(): boolean {
    return (
      this.dyeMax > 0.004 ||
      this.throws.length > 0 ||
      this.charge > 0 ||
      this.pointer.over
    );
  }

  // --- The hand -----------------------------------------------------------

  /** The hand moved. `seconds` is the time since the last move, if known. */
  move(x: number, y: number, seconds = 0, touch = false): void {
    const p = this.pointer;
    if (seconds > 0.0005) {
      // The hand's speed is remembered for a moment, so a flick keeps
      // pulling after the hand has stopped.
      const blend = Math.min(1, seconds / 0.09);
      p.vx += ((x - p.x) / seconds - p.vx) * blend;
      p.vy += ((y - p.y) / seconds - p.vy) * blend;
      const speed = Math.hypot(p.vx, p.vy);
      if (speed > 2400) {
        p.vx *= 2400 / speed;
        p.vy *= 2400 / speed;
      }
    }
    if (p.down) p.travelled += Math.hypot(x - p.x, y - p.y);
    p.x = x;
    p.y = y;
    p.over = true;
    p.touch = touch;
  }

  /** The hand went down. */
  press(x: number, y: number, touch = false): void {
    const p = this.pointer;
    p.x = x;
    p.y = y;
    p.over = true;
    p.down = true;
    p.touch = touch;
    p.originX = x;
    p.originY = y;
    p.travelled = 0;
    p.heldFor = 0;
    p.hasLast = false;
    this.charge = 0;
  }

  /**
   * The hand came up. A hold, or a click, throws a form sized by the charge; a
   * drag does not — the ink it laid is already its mark.
   */
  release(): void {
    const p = this.pointer;
    if (!p.down) return;
    p.down = false;
    if (p.travelled <= DRAG_SLOP) {
      this.strike(p.x, p.y, this.charge);
    }
    this.charge = 0;
  }

  /** The hand left the screen. */
  leave(): void {
    const p = this.pointer;
    p.over = false;
    p.down = false;
    p.vx = 0;
    p.vy = 0;
    p.hasLast = false;
    this.charge = 0;
  }

  /**
   * Throw a form from a point. `charge` (0..1) is how long the hand held it:
   * a click throws a small one, a full hold throws the largest.
   */
  strike(x: number, y: number, charge = 0): void {
    const longest = Math.hypot(this.width, this.height);
    const size = 70 + (0.18 + 0.34 * Math.min(1, longest / 1600)) * longest * easeOut(charge);
    const kind = FORMS[this.thrown % FORMS.length];
    // The tilt is a function of the throw's number, not a random draw, so the
    // screen's repertoire is the same every time.
    const angle = ((this.thrown * 0.71) % Math.PI) - Math.PI / 2;
    this.thrown += 1;

    this.throws.push({
      kind,
      x,
      y,
      angle,
      reach: size,
      age: 0,
      life: 1.5 + 1.1 * charge,
    });
    if (this.throws.length > MAX_THROWS) this.throws.shift();

    // The strike shoves the picture outward from the point.
    this.shove(x, y, size * 0.9, 520 + 520 * charge);
  }

  /** Push the flow radially away from a point, within a radius. */
  shove(x: number, y: number, radius: number, speed: number): void {
    const c0 = Math.max(0, Math.floor((x - radius) / this.cell));
    const c1 = Math.min(this.columns - 1, Math.ceil((x + radius) / this.cell));
    const r0 = Math.max(0, Math.floor((y - radius) / this.cell));
    const r1 = Math.min(this.rows - 1, Math.ceil((y + radius) / this.cell));
    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        const dx = (c + 0.5) * this.cell - x;
        const dy = (r + 0.5) * this.cell - y;
        const d = Math.hypot(dx, dy);
        if (d >= radius || d < 0.001) continue;
        const falloff = 1 - d / radius;
        const w = falloff * falloff;
        const i = r * this.columns + c;
        this.vx[i] += (dx / d) * speed * w;
        this.vy[i] += (dy / d) * speed * w;
      }
    }
  }

  // --- The step -----------------------------------------------------------

  /** Lay ink and flow at a point. */
  private splat(
    x: number,
    y: number,
    radius: number,
    ink: number,
    follow: number,
    dt: number,
  ): void {
    const p = this.pointer;
    const c0 = Math.max(0, Math.floor((x - radius) / this.cell));
    const c1 = Math.min(this.columns - 1, Math.ceil((x + radius) / this.cell));
    const r0 = Math.max(0, Math.floor((y - radius) / this.cell));
    const r1 = Math.min(this.rows - 1, Math.ceil((y + radius) / this.cell));
    const pull = Math.min(1, dt * 10) * follow;

    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        const dx = (c + 0.5) * this.cell - x;
        const dy = (r + 0.5) * this.cell - y;
        const d2 = (dx * dx + dy * dy) / (radius * radius);
        if (d2 >= 1) continue;
        const w = Math.exp(-d2 * 3.2);
        const i = r * this.columns + c;
        this.dye[i] = Math.min(DYE_CAP, this.dye[i] + ink * w);
        // The flow inside the stamp relaxes toward the hand's own velocity.
        this.vx[i] += (p.vx - this.vx[i]) * w * pull;
        this.vy[i] += (p.vy - this.vy[i]) * w * pull;
      }
    }
  }

  /** Advance the field by `dt` seconds. */
  step(dt: number): void {
    if (dt <= 0) return;
    // A long frame is cut in pieces, so a stalled tab does not tear the flow.
    const pieces = Math.min(4, Math.ceil(dt / (1 / 30)));
    const slice = Math.min(dt, 0.1) / pieces;
    for (let i = 0; i < pieces; i++) this.tick(slice);
  }

  private tick(dt: number): void {
    const p = this.pointer;
    this.clock += dt;

    // The hand lays ink along the line it travelled since the last tick.
    const handActive = p.over && (!p.touch || p.down);
    if (handActive) {
      const dragging = p.down && p.travelled > DRAG_SLOP * 0.35;
      const speed = Math.hypot(p.vx, p.vy);
      const radius = this.reach * (dragging ? 0.95 : 0.8);
      // A resting hand leaves a pinpoint of ink; a moving one a line.
      const rate = dragging ? 16 : p.down ? 3 : 0.9 + Math.min(2.2, speed / 400);
      const follow = dragging ? 1 : p.down ? 0.2 : 0.35;

      if (!p.hasLast) {
        p.lastX = p.x;
        p.lastY = p.y;
        p.hasLast = true;
      }
      const dx = p.x - p.lastX;
      const dy = p.y - p.lastY;
      const length = Math.hypot(dx, dy);
      const stepLength = Math.max(2, radius * 0.45);
      const stamps = Math.max(1, Math.min(24, Math.ceil(length / stepLength)));
      for (let s = 1; s <= stamps; s++) {
        const t = s / stamps;
        this.splat(
          p.lastX + dx * t,
          p.lastY + dy * t,
          radius,
          (rate * dt) / stamps ** 0.5,
          follow,
          dt,
        );
      }
      p.lastX = p.x;
      p.lastY = p.y;

      // A held hand charges the blob once it has rested a moment.
      if (p.down) {
        p.heldFor += dt;
        if (p.travelled <= DRAG_SLOP && p.heldFor > HOLD_DELAY) {
          this.charge = Math.min(1, this.charge + dt / CHARGE_TIME);
        } else if (p.travelled > DRAG_SLOP) {
          this.charge = Math.max(0, this.charge - dt * 4);
        }
      }
    }

    // The hand's remembered speed bleeds away when it is not moving.
    p.vx *= Math.exp(-dt * 6);
    p.vy *= Math.exp(-dt * 6);

    this.advect(dt);

    // The forms in flight.
    for (const form of this.throws) form.age += dt;
    this.throws = this.throws.filter((form) => form.age < form.life);
  }

  /** Carry the ink and the flow along the flow, then let them go a little. */
  private advect(dt: number): void {
    const { columns, rows, cell } = this;
    const dyeDecay = Math.exp(-dt / this.linger);
    const flowDecay = Math.exp(-dt / 0.55);
    const pushDecay = Math.exp(-dt / 0.85);
    const next = this.scratch;
    const nextX = this.scratchX;
    const nextY = this.scratchY;
    let max = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        const i = r * columns + c;
        const vx = this.vx[i];
        const vy = this.vy[i];

        // Semi-Lagrangian: read the field where this cell's contents came from.
        const fx = Math.min(columns - 1.001, Math.max(0, c - (vx * dt) / cell));
        const fy = Math.min(rows - 1.001, Math.max(0, r - (vy * dt) / cell));
        const x0 = Math.floor(fx);
        const y0 = Math.floor(fy);
        const tx = fx - x0;
        const ty = fy - y0;
        const a = y0 * columns + x0;
        const b = a + 1;
        const d = a + columns;
        const e = d + 1;

        const mix = (field: Float32Array): number =>
          (field[a] * (1 - tx) + field[b] * tx) * (1 - ty) +
          (field[d] * (1 - tx) + field[e] * tx) * ty;

        // A touch of diffusion keeps a thin stroke from aliasing on the grid.
        const left = c > 0 ? this.dye[i - 1] : this.dye[i];
        const right = c < columns - 1 ? this.dye[i + 1] : this.dye[i];
        const up = r > 0 ? this.dye[i - columns] : this.dye[i];
        const down = r < rows - 1 ? this.dye[i + columns] : this.dye[i];
        const blur = (left + right + up + down - 4 * this.dye[i]) * 0.055;

        const value = Math.max(0, (mix(this.dye) + blur) * dyeDecay);
        next[i] = value < 0.0015 ? 0 : value;
        if (next[i] > max) max = next[i];

        nextX[i] = mix(this.vx) * flowDecay;
        nextY[i] = mix(this.vy) * flowDecay;
      }
    }

    this.dye.set(next);
    this.vx.set(nextX);
    this.vy.set(nextY);
    this.dyeMax = max;

    // The push is the flow, integrated, and it relaxes back to nothing.
    for (let i = 0; i < this.ox.length; i++) {
      let px = (this.ox[i] + this.vx[i] * dt * 0.9) * pushDecay;
      let py = (this.oy[i] + this.vy[i] * dt * 0.9) * pushDecay;
      px = Math.max(-MAX_PUSH, Math.min(MAX_PUSH, px));
      py = Math.max(-MAX_PUSH, Math.min(MAX_PUSH, py));
      this.ox[i] = Math.abs(px) < 0.01 ? 0 : px;
      this.oy[i] = Math.abs(py) < 0.01 ? 0 : py;
    }
  }

  // --- The reading --------------------------------------------------------

  /** The ink at a point, bilinear off the grid. */
  dyeAt(x: number, y: number): number {
    const fx = Math.min(this.columns - 1.001, Math.max(0, x / this.cell - 0.5));
    const fy = Math.min(this.rows - 1.001, Math.max(0, y / this.cell - 0.5));
    const x0 = Math.floor(fx);
    const y0 = Math.floor(fy);
    const tx = fx - x0;
    const ty = fy - y0;
    const a = y0 * this.columns + x0;
    const f = this.dye;
    return (
      (f[a] * (1 - tx) + f[a + 1] * tx) * (1 - ty) +
      (f[a + this.columns] * (1 - tx) + f[a + this.columns + 1] * tx) * ty
    );
  }

  /**
   * Write the hand's tone onto a lattice of `columns` × `rows` cells of
   * `lattice` px, in 0..1. The lattice is the screen's, not the field's, so
   * the dots and the characters each read the field at their own pitch.
   */
  fillTone(
    out: Float32Array,
    columns: number,
    rows: number,
    lattice: number,
  ): void {
    out.fill(0, 0, columns * rows);

    if (this.dyeMax > 0.004) {
      for (let r = 0; r < rows; r++) {
        const y = (r + 0.5) * lattice;
        for (let c = 0; c < columns; c++) {
          const dye = this.dyeAt((c + 0.5) * lattice, y);
          // A curve, not a ramp: the ink has an edge, so a stroke prints as a
          // stroke and a whisper as a stipple, never as a haze.
          if (dye > 0.004) out[r * columns + c] = smoothstep(0.04, 0.72, dye);
        }
      }
    }

    for (const form of this.throws) this.paintForm(out, columns, rows, lattice, form);
    if (this.charge > 0 || (this.pointer.down && this.pointer.heldFor > HOLD_DELAY)) {
      this.paintBlob(out, columns, rows, lattice);
    }
  }

  /** Print a form in flight as an outline, and its echoes. */
  private paintForm(
    out: Float32Array,
    columns: number,
    rows: number,
    lattice: number,
    form: Throw,
  ): void {
    const progress = form.age / form.life;
    const size = Math.max(4, form.reach * easeOut(progress));
    const fade = Math.pow(1 - progress, 1.4);
    // The line thins as the form opens, so a large form is a drawn line.
    const line = this.line * (1.15 - 0.45 * progress);
    const extent = size * 1.08 + line * 2.5;
    const cos = Math.cos(-form.angle);
    const sin = Math.sin(-form.angle);

    const c0 = Math.max(0, Math.floor((form.x - extent) / lattice));
    const c1 = Math.min(columns - 1, Math.ceil((form.x + extent) / lattice));
    const r0 = Math.max(0, Math.floor((form.y - extent) / lattice));
    const r1 = Math.min(rows - 1, Math.ceil((form.y + extent) / lattice));

    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        const dx = (c + 0.5) * lattice - form.x;
        const dy = (r + 0.5) * lattice - form.y;
        const lx = dx * cos - dy * sin;
        const ly = dx * sin + dy * cos;

        let tone = 0;
        for (const [scale, weight] of ECHOES) {
          const unit = size * scale;
          if (unit < 3) continue;
          const d = formDistance(form.kind, lx / unit, ly / unit) * unit;
          const reachOfLine = line * (0.6 + 0.4 * scale);
          if (Math.abs(d) > reachOfLine * 2.6) continue;
          tone = Math.max(tone, weight * Math.exp(-((d / reachOfLine) ** 2)));
        }
        if (tone <= 0) continue;
        const i = r * columns + c;
        out[i] = Math.min(1, Math.max(out[i], tone * fade));
      }
    }
  }

  /** Print the blob that swells under a resting hand. */
  private paintBlob(
    out: Float32Array,
    columns: number,
    rows: number,
    lattice: number,
  ): void {
    const p = this.pointer;
    const charge = Math.max(0.0001, this.charge);
    const radius = BLOB_MIN + (BLOB_MAX - BLOB_MIN) * easeOut(charge);
    const wobble = 1 + 0.06 * Math.sin(this.clock * 7);
    const body = radius * wobble;

    // Three satellites orbit the body: a metaball that is never quite a disc.
    const orbit = radius * 0.95;
    const parts: [number, number, number][] = [[p.x, p.y, body]];
    for (let k = 0; k < 3; k++) {
      const a = this.clock * (1.3 + k * 0.4) + k * 2.094;
      parts.push([
        p.x + Math.cos(a) * orbit,
        p.y + Math.sin(a) * orbit * 0.8,
        body * (0.34 + 0.06 * k),
      ]);
    }

    const extent = orbit + body * 0.6 + radius * 0.6;
    const c0 = Math.max(0, Math.floor((p.x - extent) / lattice));
    const c1 = Math.min(columns - 1, Math.ceil((p.x + extent) / lattice));
    const r0 = Math.max(0, Math.floor((p.y - extent) / lattice));
    const r1 = Math.min(rows - 1, Math.ceil((p.y + extent) / lattice));
    const amount = 0.5 + 0.5 * charge;

    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        const x = (c + 0.5) * lattice;
        const y = (r + 0.5) * lattice;
        // The sum of the parts' influence: where it passes a threshold, the
        // parts have merged into one body.
        let field = 0;
        for (const [px, py, pr] of parts) {
          const d2 = ((x - px) ** 2 + (y - py) ** 2) / (pr * pr);
          field += 1 / (1 + d2 * 2.2);
        }
        const tone = smoothstep(0.55, 1.05, field) * amount;
        if (tone <= 0) continue;
        const i = r * columns + c;
        out[i] = Math.min(1, Math.max(out[i], tone));
      }
    }
  }

  /**
   * The push the hand has put into the picture, sampled on a grid of
   * `columns` × `rows` cells that spans the whole field, in px. A sampler
   * adds it to its coordinates to lean the picture with the hand.
   */
  fillWarp(
    outX: Float32Array,
    outY: Float32Array,
    columns: number,
    rows: number,
  ): boolean {
    let any = false;
    for (let r = 0; r < rows; r++) {
      const fy = Math.min(this.rows - 1.001, ((r + 0.5) / rows) * this.rows - 0.5);
      const y0 = Math.max(0, Math.floor(fy));
      const ty = Math.max(0, fy - y0);
      for (let c = 0; c < columns; c++) {
        const fx = Math.min(this.columns - 1.001, ((c + 0.5) / columns) * this.columns - 0.5);
        const x0 = Math.max(0, Math.floor(fx));
        const tx = Math.max(0, fx - x0);
        const a = y0 * this.columns + x0;
        const d = a + this.columns;
        const mix = (f: Float32Array): number =>
          (f[a] * (1 - tx) + f[a + 1] * tx) * (1 - ty) +
          (f[d] * (1 - tx) + f[d + 1] * tx) * ty;
        const i = r * columns + c;
        outX[i] = mix(this.ox);
        outY[i] = mix(this.oy);
        if (outX[i] !== 0 || outY[i] !== 0) any = true;
      }
    }
    return any;
  }
}

/** Elements the hand must be allowed to click, not draw on. */
const INTERACTIVE = "a, button, input, textarea, select, label, [data-ink-ignore]";

export interface BindOptions {
  /** Whether the surface listens at all. Reduced motion turns it off. */
  enabled?: boolean;
}

/**
 * Wire a surface's pointer to a field.
 *
 * Coordinates are the surface's own. A press that starts on a link or a
 * button is theirs, not the screen's, and is ignored; hover still reads, so
 * the screen answers as the hand crosses the type. Touch scrolls the page
 * vertically and draws horizontally. Returns the function that unwires it.
 */
export function bindPointer(
  surface: HTMLElement,
  ink: InkField,
  options: BindOptions = {},
): () => void {
  if (options.enabled === false) return () => {};

  const previousTouchAction = surface.style.touchAction;
  surface.style.touchAction = "pan-y";
  const previousSelect = surface.style.userSelect;

  let lastStamp = 0;
  let pressed = false;

  const local = (event: PointerEvent): [number, number] => {
    const rect = surface.getBoundingClientRect();
    return [event.clientX - rect.left, event.clientY - rect.top];
  };

  const onMove = (event: PointerEvent) => {
    const [x, y] = local(event);
    const seconds = lastStamp > 0 ? (event.timeStamp - lastStamp) / 1000 : 0;
    lastStamp = event.timeStamp;
    ink.move(x, y, seconds, event.pointerType === "touch");
  };

  const onDown = (event: PointerEvent) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const target = event.target as Element | null;
    if (target?.closest(INTERACTIVE)) return;
    const [x, y] = local(event);
    lastStamp = event.timeStamp;
    ink.move(x, y, 0, event.pointerType === "touch");
    ink.press(x, y, event.pointerType === "touch");
    pressed = true;
    // A drag draws; it must not also select the words it passes over.
    surface.style.userSelect = "none";
  };

  const onUp = () => {
    surface.style.userSelect = previousSelect;
    if (!pressed) return;
    pressed = false;
    ink.release();
  };

  const onLeave = () => {
    surface.style.userSelect = previousSelect;
    pressed = false;
    lastStamp = 0;
    ink.leave();
  };

  surface.addEventListener("pointermove", onMove, { passive: true });
  surface.addEventListener("pointerdown", onDown, { passive: true });
  surface.addEventListener("pointerup", onUp, { passive: true });
  surface.addEventListener("pointercancel", onLeave, { passive: true });
  surface.addEventListener("pointerleave", onLeave, { passive: true });

  return () => {
    surface.style.touchAction = previousTouchAction;
    surface.style.userSelect = previousSelect;
    surface.removeEventListener("pointermove", onMove);
    surface.removeEventListener("pointerdown", onDown);
    surface.removeEventListener("pointerup", onUp);
    surface.removeEventListener("pointercancel", onLeave);
    surface.removeEventListener("pointerleave", onLeave);
  };
}
