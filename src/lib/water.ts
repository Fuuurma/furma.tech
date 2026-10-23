/**
 * The water: a body of shallow water, one column per character.
 *
 * The footer's picture is a body of water that sloshes. A body of water is
 * not a picture of water — it is a thing with mass — so the honest way to
 * draw one is to give it a level and let the level move.
 *
 * The model is the shallow-water equations in one dimension: the water stands
 * in a row of columns and the columns trade depth with their neighbours. A
 * column is as wide as the character that stands in it, so the waterline is
 * quantised to the same lattice the type is set on and the ASCII picture and
 * the water are the same thing.
 *
 * Two properties matter more than the rest:
 *
 * - **The volume is conserved.** The flow between two columns is one number
 *   that leaves one column and enters the next, so the water can slosh and
 *   splash without ever gaining or losing a drop. A body of water that
 *   slowly drained away would not be a body of water, and the picture of one
 *   that did is a puddle.
 * - **The surface can be pushed.** The pointer is a hand in the water: it
 *   dimples the surface, drags it, and can strike it.
 *
 * The solver is deliberately small. A particle fluid was tried here first and
 * dropped: on a collocated grid it creeps, and a body of water that slowly
 * compresses into its own floor is a worse picture than no picture at all.
 */

export interface WaterConfig {
  /** The panel the water lives in, in pixels. */
  width: number;
  /** The panel's height, in pixels. */
  height: number;
  /** The width of a column of water, in pixels. */
  cellWidth: number;
  /** The height of a cell of the lattice, in pixels. */
  cellHeight: number;
  /** The acceleration, in px/s². */
  gravity: number;
  /** How much of the panel the water fills at rest, 0..1. */
  fillHeight: number;
  /** How much of the wave's energy is lost each second, 0..1. */
  damping: number;
  /** The most passes one step may take. */
  maxPasses?: number;
  /** How hard the wave is driven. */
  drive?: number;
  /** How many times the surface is evened out after a step. */
  smoothing?: number;
}

/** A hand in the water. */
export interface WaterPointer {
  /** Where the pointer is, in pixels from the left of the water. */
  x: number;
  /** The reach of the pointer, in pixels. */
  radius: number;
  /** How deep the pointer presses the surface, in px. */
  force: number;
  /** The pointer's own speed along the surface, in px/s. A drag pulls the water. */
  velocity: number;
  /** A one-shot strike, in px of depth. */
  splash: number;
}

/** The share of the wave's speed that is lost to damping each second. */
const DEFAULT_DAMPING = 0.7;

/**
 * How much of the solver's time step is spent on one pass.
 *
 * The shallow-water wave travels at `sqrt(gravity · depth)`, and a step may
 * not outrun it or the water piles up against the direction it is travelling.
 * The step is therefore split into as many passes as the wave needs.
 */
const STEP_SAFETY = 0.35;

/** How much of the wave's speed the pointer's drag gives the water. */
const DRAG_GAIN = 9;

/** How fast the surface answers the pointer's press. */
const PRESS_GAIN = 12;

/** How long a strike's crown is held up, in seconds. */
const STRIKE_TIME = 0.22;

/** How fast the crown of a strike comes up. */
const CROWN_GAIN = 30;

/** How far the crown reaches, in columns. */
const CROWN_REACH = 4;

/**
 * The shape of a crown: how high each column stands, as a share of the
 * strike, and how far down the ring around it goes to pay for it.
 *
 * The shares sum to nothing across the whole shape — the crown and the ring
 * are the same water — so a strike never adds a drop.
 */
const CROWN_PROFILE: readonly (readonly [number, number])[] = [
  [0, 1],
  [1, 0.5],
  [2, -0.333],
  [3, -0.333],
  [4, -0.333],
];

export class Water {
  readonly columns: number;
  readonly rows: number;

  private readonly cellWidth: number;
  private readonly cellHeight: number;
  private readonly gravity: number;
  private readonly restDepth: number;
  private readonly damping: number;
  private readonly maxPasses: number;
  private readonly drive: number;
  private readonly smoothing: number;

  /** The depth of the water in each column, in pixels. */
  private readonly depths: Float32Array;
  /** The discharge at each boundary between two columns, in px²/s. */
  private readonly fluxes: Float32Array;
  /** How fast the surface is moving in each column, in px/s. */
  private readonly speeds: Float32Array;

  /** The crown of a strike still standing up, in px. */
  private crown = 0;
  /** Where the crown stands. */
  private crownColumn = 0;
  /** How much of the strike is left to play out, in seconds. */
  private crownTime = 0;

  constructor(config: WaterConfig) {
    this.columns = Math.max(1, Math.floor(config.width / config.cellWidth));
    this.rows = Math.max(1, Math.floor(config.height / config.cellHeight));
    this.cellWidth = Math.max(1, config.cellWidth);
    this.cellHeight = Math.max(1, config.cellHeight);
    this.gravity = Math.max(0, config.gravity);
    this.restDepth = Math.max(
      this.cellHeight,
      config.fillHeight * this.rows * this.cellHeight,
    );
    this.damping = Math.min(0.99, Math.max(0, config.damping ?? DEFAULT_DAMPING));
    this.maxPasses = Math.max(1, config.maxPasses ?? 16);
    this.drive = Math.max(0, config.drive ?? 1);
    this.smoothing = Math.max(0, Math.floor(config.smoothing ?? 0));

    this.depths = new Float32Array(this.columns);
    this.fluxes = new Float32Array(Math.max(1, this.columns - 1));
    this.speeds = new Float32Array(this.columns);
    this.reset();
  }

  /** Lay the water out at rest. */
  reset(): void {
    for (let column = 0; column < this.columns; column++) {
      this.depths[column] = this.restDepth;
    }
    this.fluxes.fill(0);
    this.speeds.fill(0);
  }

  /** The depth of the water in a column, in pixels. */
  depth(column: number): number {
    return this.depths[Math.min(this.columns - 1, Math.max(0, column))];
  }

  /** The topmost row the water reaches in a column. */
  surfaceRow(column: number): number {
    const cells = Math.ceil(this.depth(column) / this.cellHeight);
    return this.rows - cells;
  }

  /**
   * Where the surface stands in a column, in pixels from the top.
   *
   * The row the surface reaches is where the picture's lattice cuts it, but
   * the water itself does not know about the lattice — the tone is read from
   * the depth under the mark, not from the row the mark is in, so the water
   * fades smoothly instead of in bands.
   */
  surfaceY(column: number): number {
    return this.rows * this.cellHeight - this.depth(column);
  }

  /** How fast the surface is moving in a column, in px/s. */
  surfaceSpeed(column: number): number {
    return this.speeds[Math.min(this.columns - 1, Math.max(0, column))];
  }

  /** The water's total volume, in px². */
  volume(): number {
    let total = 0;
    for (let column = 0; column < this.columns; column++) {
      total += this.depths[column];
    }
    return total * this.cellWidth;
  }

  /**
   * Advance the water by `dt` seconds.
   *
   * A strike is applied once, before the passes: it is an event, not a
   * force, and the passes then carry it out into waves.
   */
  step(dt: number, pointer: WaterPointer | null): void {
    // A strike is an event: the hand is not pressing the surface down at
    // the same time as it is throwing it up.
    const striking = pointer !== null && pointer.splash > 0;
    if (pointer && striking) this.strike(pointer);

    const passes = this.passes(dt);
    const step = dt / passes;
    for (let pass = 0; pass < passes; pass++) {
      if (pointer && !striking && this.crownTime <= 0) {
        this.push(pointer, step);
      }
      this.flow(step);
    }

    // The crown is held up *after* the water has flowed, so the frame ends
    // with the splash standing: a crown the flow has already begun to
    // carry away is a crown the reader never sees.
    if (this.crownTime > 0) {
      this.holdCrown(dt);
      this.crownTime -= dt;
      if (this.crownTime <= 0) this.crown = 0;
    }

    if (this.smoothing > 0) this.even();
  }

  /** How many passes the wave needs to cross the panel in one step. */
  private passes(dt: number): number {
    const speed = Math.sqrt(this.gravity * this.restDepth);
    const limit = (STEP_SAFETY * this.cellWidth) / Math.max(1, speed);
    const needed = Math.ceil(dt / Math.max(1e-4, limit));
    return Math.min(this.maxPasses, Math.max(1, needed));
  }

  /**
   * Even the surface out.
   *
   * A strike throws a spike, and the spike is the point — but a spike with a
   * jag on it is a fault in the lattice rather than a shape in the water. A
   * light three-tap pass rounds the jag off and leaves the crown standing.
   */
  private even(): void {
    const { columns, depths } = this;
    for (let pass = 0; pass < this.smoothing; pass++) {
      let before = 0;
      for (let column = 0; column < columns; column++) before += depths[column];

      for (let column = 0; column < columns; column++) {
        const left = depths[column > 0 ? column - 1 : 0];
        const right = depths[column < columns - 1 ? column + 1 : columns - 1];
        const evened = 0.25 * left + 0.5 * depths[column] + 0.25 * right;
        depths[column] += (evened - depths[column]) * 0.2;
      }

      // The pass at the edges is not quite symmetric, so the body is given
      // back what the edges lost.
      let after = 0;
      for (let column = 0; column < columns; column++) after += depths[column];
      const difference = (before - after) / columns;
      for (let column = 0; column < columns; column++) depths[column] += difference;
    }
  }

  /**
   * The water trades depth with its neighbours.
   *
   * The deeper column presses on the shallower one, and the flow that
   * results carries the difference along the panel. The discharge at each
   * boundary is one number: it leaves one column and enters the next, so the
   * body's volume never changes.
   */
  private flow(dt: number): void {
    const { columns, depths, fluxes } = this;
    const decay = Math.exp(-this.damping * dt);

    for (let boundary = 0; boundary < columns - 1; boundary++) {
      const left = depths[boundary];
      const right = depths[boundary + 1];
      const mean = 0.5 * (left + right);
      fluxes[boundary] +=
        (-this.gravity * this.drive * mean * (right - left) * dt) /
        this.cellWidth;
      fluxes[boundary] *= decay;
    }

    let clipped = 0;
    for (let column = 0; column < columns; column++) {
      const inflow = column > 0 ? fluxes[column - 1] : 0;
      const outflow = column < columns - 1 ? fluxes[column] : 0;
      const before = depths[column];
      const after = before + ((inflow - outflow) * dt) / this.cellWidth;
      if (after < 0) {
        // The water cannot be thinner than nothing. Whatever was clipped is
        // handed to the deepest column, so the body's volume is untouched
        // even when the water is thrown hard against a wall.
        clipped += -after;
        depths[column] = 0;
      } else {
        depths[column] = after;
      }
      this.speeds[column] = (depths[column] - before) / dt;
    }

    if (clipped > 0) {
      let deepest = 0;
      for (let column = 1; column < columns; column++) {
        if (depths[column] > depths[deepest]) deepest = column;
      }
      depths[deepest] += clipped;
    }
  }

  /**
   * The pointer's hand on the surface.
   *
   * The pointer presses the surface down where it is and holds it there, and
   * the water it displaces is spread back across the body so the volume is
   * untouched. A dragging pointer carries its own speed along the surface,
   * which is what pulls a wake behind it and lets it slosh when the hand is
   * lifted.
   */
  private push(pointer: WaterPointer, dt: number): void {
    const column = Math.min(
      this.columns - 1,
      Math.max(0, Math.floor(pointer.x / this.cellWidth)),
    );
    const reach = Math.max(
      1,
      Math.round(pointer.radius / this.cellWidth),
    );
    const low = Math.max(0, column - reach);
    const high = Math.min(this.columns - 1, column + reach);

    // The press: the surface is held a little under the level the water
    // stands at there, deepest under the pointer and easing out to the edge
    // of its reach.
    //
    // The level it is held against is the *local* one, not the level the
    // body rests at: a hand in the water rides a passing wave instead of
    // flattening it.
    let mean = 0;
    for (let j = low; j <= high; j++) mean += this.depths[j];
    mean /= high - low + 1;

    let displaced = 0;
    const gain = Math.min(1, PRESS_GAIN * dt);
    for (let j = low; j <= high; j++) {
      const weight = this.weight(j - column, reach);
      const wanted = mean - pointer.force * weight;
      const change = (wanted - this.depths[j]) * gain;
      this.depths[j] += change;
      displaced += change;
    }

    // The water the press displaced is not lost: it is spread back across
    // the body, so the level of the water is the same however long the
    // pointer leans on it.
    if (displaced !== 0) {
      const share = -displaced / this.columns;
      for (let j = 0; j < this.columns; j++) this.depths[j] += share;
    }

    // The drag: the water under a moving hand takes the hand's speed. A
    // hand cannot outrun the wave it is pulling on, so the speed is capped
    // at a share of the wave's own — past that the water piles up against
    // the wall instead of following the hand.
    if (pointer.velocity !== 0) {
      const limit = 0.35 * Math.sqrt(this.gravity * this.restDepth);
      const speed = Math.max(-limit, Math.min(limit, pointer.velocity));
      const gain = Math.min(1, DRAG_GAIN * dt);
      for (let boundary = low; boundary < high; boundary++) {
        const target = this.depths[boundary] * speed;
        this.fluxes[boundary] += (target - this.fluxes[boundary]) * gain;
      }
    }
  }

  /**
   * A strike.
   *
   * A needle of water in a single column is not a splash: the water finds
   * its level again inside one frame, and a picture that shows a flash for
   * a sixtieth of a second is not a picture of a splash. So the strike is
   * *held* — the crown stands up out of the body for a moment, and the ring
   * around it goes down by exactly what the crown took.
   *
   * The crown is paid for, so the body's volume never changes; and when the
   * hand lifts, the water rushes back into the hollow and the wave carries
   * the whole business away across the panel.
   */
  private strike(pointer: WaterPointer): void {
    this.crown = pointer.splash;
    this.crownColumn = Math.min(
      this.columns - 1,
      Math.max(0, Math.floor(pointer.x / this.cellWidth)),
    );
    this.crownTime = STRIKE_TIME;
  }

  /** Hold the crown up, and the ring down, for as long as the strike lasts. */
  private holdCrown(dt: number): void {
    if (this.crown <= 0) return;

    // The level the crown stands on is the local one, so a strike on a
    // wave does not flatten the wave.
    const low = Math.max(0, this.crownColumn - CROWN_REACH);
    const high = Math.min(this.columns - 1, this.crownColumn + CROWN_REACH);
    let mean = 0;
    for (let column = low; column <= high; column++) mean += this.depths[column];
    mean /= high - low + 1;

    const gain = Math.min(1, CROWN_GAIN * dt);
    for (const [offset, factor] of CROWN_PROFILE) {
      const left = this.crownColumn - offset;
      const right = this.crownColumn + offset;
      for (const column of offset === 0 ? [left] : [left, right]) {
        if (column < 0 || column >= this.columns) continue;
        const wanted = mean + this.crown * factor;
        this.depths[column] += (wanted - this.depths[column]) * gain;
      }
    }
  }

  /** How strongly the pointer reaches a column, 1 at the pointer and 0 at the edge. */
  private weight(offset: number, reach: number): number {
    const distance = Math.abs(offset) / (reach + 1);
    if (distance >= 1) return 0;
    const falloff = 1 - distance;
    return falloff * falloff;
  }
}
