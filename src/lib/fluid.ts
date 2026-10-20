/**
 * The water: a particle fluid on a collocated grid.
 *
 * The footer's picture is a body of water that sloshes. A body of water is
 * not a picture of water — it is a thing with mass, so the honest way to draw
 * one is to simulate it and let the picture fall out of the simulation.
 *
 * This is a small PIC/FLIP solver: particles carry the water, a grid carries
 * the pressure, and the two trade velocity between them every step.
 *
 * - **PIC** takes the particle's new velocity from the grid, which is calm
 *   and loses detail.
 * - **FLIP** adds the grid's *change* in velocity to the particle's own,
 *   which keeps the detail and lets the water splash.
 * - `flipRatio` is the share of the answer that comes from FLIP.
 *
 * The grid is collocated — the velocity lives at the centre of a cell rather
 * than on its faces — which is a little coarser than a staggered grid and a
 * lot less code. The cells are the character's own cell, so the water's
 * surface is quantised to the same lattice the type is set on, and the ASCII
 * picture is the water itself rather than a picture of the water.
 */

export interface FluidConfig {
  /** The panel the water lives in, in pixels. */
  width: number;
  height: number;
  /** The size of a cell of the lattice, in pixels. */
  cellWidth: number;
  cellHeight: number;
  /** The acceleration, in px/s². Negative pulls the water down. */
  gravity: number;
  /** The share of the velocity that comes from FLIP. 0 is all PIC. */
  flipRatio: number;
  /** How many times the pressure is relaxed per step. */
  pressureIters: number;
  /** How many times the particles are pushed apart per step. */
  separationIters: number;
  /** The over-relaxation factor of the pressure solve. */
  overRelaxation: number;
  /** How much of the panel the water fills at rest, 0..1. */
  fillHeight: number;
  /** How many particles share a cell. */
  particlesPerCell: number;
}

/** A pointer pressing on the water. */
export interface FluidCursor {
  x: number;
  y: number;
  radius: number;
  force: number;
}

const MIN_SEPARATION = 0.42;

/** A small deterministic offset, so the water never starts on a lattice. */
function jitter(seed: number): number {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return (value - Math.floor(value) - 0.5) * 0.6;
}

export class Fluid {
  readonly columns: number;
  readonly rows: number;

  /** How many particles share each cell. The renderer reads this as the
   *  water's density: one particle is a mist, four are a body. */
  readonly density: Float32Array;

  /** The topmost row that holds water. The air above it is not solved. */
  private topRow = 0;

  private readonly cellWidth: number;
  private readonly cellHeight: number;

  private readonly gravity: number;
  private readonly flipRatio: number;
  private readonly pressureIters: number;
  private readonly separationIters: number;
  private readonly overRelaxation: number;
  private readonly fillHeight: number;
  private readonly particlesPerCell: number;

  private readonly px: Float32Array;
  private readonly py: Float32Array;
  private readonly pvx: Float32Array;
  private readonly pvy: Float32Array;
  private readonly particleCount: number;

  private readonly u: Float32Array;
  private readonly v: Float32Array;
  private readonly uPrevious: Float32Array;
  private readonly vPrevious: Float32Array;
  private readonly pressure: Float32Array;
  private readonly counts: Float32Array;

  /** Buffers the renderer reads, so a frame allocates nothing. */
  private readonly densityBuffer: Float32Array;
  private readonly motionBuffer: Float32Array;

  /** Neighbour buckets for the separation pass. */
  private readonly buckets: Int32Array;
  private readonly bucketStart: Int32Array;
  private readonly bucketCursor: Int32Array;

  constructor(config: FluidConfig) {
    this.columns = Math.max(1, Math.floor(config.width / config.cellWidth));
    this.rows = Math.max(1, Math.floor(config.height / config.cellHeight));
    this.cellWidth = config.cellWidth;
    this.cellHeight = config.cellHeight;

    this.gravity = config.gravity;
    this.flipRatio = config.flipRatio;
    this.pressureIters = Math.max(1, config.pressureIters);
    this.separationIters = Math.max(0, config.separationIters);
    this.overRelaxation = config.overRelaxation;
    this.fillHeight = config.fillHeight;
    this.particlesPerCell = Math.max(1, config.particlesPerCell);

    const cells = this.columns * this.rows;
    this.density = new Float32Array(cells);
    this.densityBuffer = new Float32Array(cells);
    this.motionBuffer = new Float32Array(cells);
    this.counts = new Float32Array(cells);
    this.u = new Float32Array(cells);
    this.v = new Float32Array(cells);
    this.uPrevious = new Float32Array(cells);
    this.vPrevious = new Float32Array(cells);
    this.pressure = new Float32Array(cells);

    // The water fills the bottom of the panel at rest.
    const filled = Math.max(1, Math.round(this.rows * config.fillHeight));
    const perCell = this.particlesPerCell;
    const count = Math.min(
      24000,
      Math.max(1, Math.round(filled * this.columns * perCell)),
    );
    this.particleCount = count;

    this.px = new Float32Array(count);
    this.py = new Float32Array(count);
    this.pvx = new Float32Array(count);
    this.pvy = new Float32Array(count);

    this.buckets = new Int32Array(count);
    this.bucketStart = new Int32Array(cells + 1);
    this.bucketCursor = new Int32Array(cells);

    this.lay();
  }

  /** Lay the water out at rest, jittered so it does not start on a lattice. */
  private lay(): void {
    const filled = Math.max(1, Math.round(this.rows * this.fillHeight));

    // The water fills the bottom of the panel, at the fill the panel asked
    // for: every cell of the filled band holds its share of the particles,
    // jittered inside the cell so the body does not start on a lattice.
    let index = 0;
    for (let row = this.rows - filled; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        for (let share = 0; share < this.particlesPerCell; share++) {
          if (index >= this.particleCount) break;
          const x = (column + 0.5 + jitter(index) * 0.8) * this.cellWidth;
          const y = (row + 0.5 + jitter(index + 7919) * 0.8) * this.cellHeight;
          this.px[index] = Math.min(
            this.columns * this.cellWidth - 0.01,
            Math.max(0.01, x),
          );
          this.py[index] = Math.min(
            this.rows * this.cellHeight - 0.01,
            Math.max(0.01, y),
          );
          this.pvx[index] = 0;
          this.pvy[index] = 0;
          index++;
        }
      }
    }

    // Any particles the lattice could not hold are stacked on the floor.
    for (; index < this.particleCount; index++) {
      const column = index % this.columns;
      this.px[index] = (column + 0.5) * this.cellWidth;
      this.py[index] = this.rows * this.cellHeight - 0.01;
      this.pvx[index] = 0;
      this.pvy[index] = 0;
    }
  }

  /** Advance the water by `dt` seconds. */
  step(dt: number, cursor: FluidCursor | null): void {
    this.applyForces(dt, cursor);
    this.move(dt);
    this.transferToGrid();
    this.solvePressure();
    this.project();
    this.transferToParticles();
    this.separate();
  }

  private applyForces(dt: number, cursor: FluidCursor | null): void {
    const gravity = -this.gravity * dt;
    const radius = cursor?.radius ?? 0;
    const radiusSquared = radius * radius;

    for (let i = 0; i < this.particleCount; i++) {
      this.pvy[i] += gravity;

      if (cursor && radiusSquared > 0) {
        const dx = this.px[i] - cursor.x;
        const dy = this.py[i] - cursor.y;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared < radiusSquared && distanceSquared > 0.0001) {
          const distance = Math.sqrt(distanceSquared);
          const falloff = 1 - distance / radius;
          const push = (cursor.force * falloff * dt) / distance;
          this.pvx[i] += dx * push;
          this.pvy[i] += dy * push;
        }
      }
    }
  }

  private move(dt: number): void {
    const maxX = this.columns * this.cellWidth;
    const maxY = this.rows * this.cellHeight;

    for (let i = 0; i < this.particleCount; i++) {
      let x = this.px[i] + this.pvx[i] * dt;
      let y = this.py[i] + this.pvy[i] * dt;

      if (x < 0) {
        x = 0;
        this.pvx[i] = 0;
      } else if (x > maxX) {
        x = maxX;
        this.pvx[i] = 0;
      }

      if (y < 0) {
        y = 0;
        this.pvy[i] = 0;
      } else if (y > maxY) {
        y = maxY;
        this.pvy[i] = 0;
      }

      this.px[i] = x;
      this.py[i] = y;
    }
  }

  /** The particles hand their velocity to the grid. */
  private transferToGrid(): void {
    this.u.fill(0);
    this.v.fill(0);
    this.counts.fill(0);

    this.topRow = this.rows;

    for (let i = 0; i < this.particleCount; i++) {
      const column = Math.min(
        this.columns - 1,
        Math.max(0, Math.floor(this.px[i] / this.cellWidth)),
      );
      const row = Math.min(
        this.rows - 1,
        Math.max(0, Math.floor(this.py[i] / this.cellHeight)),
      );
      if (row < this.topRow) this.topRow = row;
      const index = row * this.columns + column;
      this.u[index] += this.pvx[i];
      this.v[index] += this.pvy[i];
      this.counts[index] += 1;
    }

    for (let index = 0; index < this.u.length; index++) {
      const count = this.counts[index];
      if (count > 0) {
        this.u[index] /= count;
        this.v[index] /= count;
      }
    }

    this.uPrevious.set(this.u);
    this.vPrevious.set(this.v);
  }

  /**
   * Relax the pressure until the water is incompressible.
   *
   * Cells with no water are air, and air carries no pressure — that is what
   * lets the surface find its own level instead of being pinned to the top
   * of the panel.
   */
  private solvePressure(): void {
    const { columns, rows } = this;
    const hx = this.cellWidth;
    const hy = this.cellHeight;
    const hxSquared = hx * hx;
    const hySquared = hy * hy;
    const denominator = 2 * (hxSquared + hySquared);

    this.pressure.fill(0);

    for (let iteration = 0; iteration < this.pressureIters; iteration++) {
      // Only the water is solved: the air above it carries no pressure, and
      // there is nothing to relax up there.
      for (let row = this.topRow; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const index = row * columns + column;
          if (this.counts[index] === 0) {
            this.pressure[index] = 0;
            continue;
          }

          // The walls are solid: they mirror the pressure of the cell next
          // to them, so the water is held in rather than pressed against.
          const left =
            column > 0 ? this.pressure[index - 1] : this.pressure[index];
          const right =
            column < columns - 1
              ? this.pressure[index + 1]
              : this.pressure[index];
          const up = row > 0 ? this.pressure[index - columns] : 0;
          const down =
            row < rows - 1 ? this.pressure[index + columns] : this.pressure[index];

          const uLeft =
            column > 0 ? this.u[index - 1] : 0;
          const uRight =
            column < columns - 1 ? this.u[index + 1] : 0;
          const vUp = row > 0 ? this.v[index - columns] : 0;
          const vDown = row < rows - 1 ? this.v[index + columns] : 0;

          const divergence =
            (uRight - uLeft) / (2 * hx) + (vDown - vUp) / (2 * hy);

          const target =
            ((left + right) * hySquared +
              (up + down) * hxSquared -
              divergence * hxSquared * hySquared) /
            denominator;

          this.pressure[index] +=
            this.overRelaxation * (target - this.pressure[index]);
        }
      }
    }
  }

  /** Take the pressure gradient out of the grid's velocity. */
  private project(): void {
    const { columns, rows } = this;
    const hx = this.cellWidth;
    const hy = this.cellHeight;

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const index = row * columns + column;
        if (this.counts[index] === 0) continue;

        const left =
          column > 0 ? this.pressure[index - 1] : this.pressure[index];
        const right =
          column < columns - 1
            ? this.pressure[index + 1]
            : this.pressure[index];
        const up = row > 0 ? this.pressure[index - columns] : 0;
        const down =
          row < rows - 1 ? this.pressure[index + columns] : this.pressure[index];

        this.u[index] -= ((right - left) / (2 * hx)) * this.overRelaxation;
        this.v[index] -= ((down - up) / (2 * hy)) * this.overRelaxation;
      }
    }
  }

  /** The grid hands its velocity back to the particles. */
  private transferToParticles(): void {
    const { columns, rows } = this;

    for (let i = 0; i < this.particleCount; i++) {
      const x = this.px[i] / this.cellWidth - 0.5;
      const y = this.py[i] / this.cellHeight - 0.5;

      const x0 = Math.min(columns - 1, Math.max(0, Math.floor(x)));
      const y0 = Math.min(rows - 1, Math.max(0, Math.floor(y)));
      const x1 = Math.min(columns - 1, x0 + 1);
      const y1 = Math.min(rows - 1, y0 + 1);
      const tx = Math.min(1, Math.max(0, x - x0));
      const ty = Math.min(1, Math.max(0, y - y0));

      const sample = (field: Float32Array) => {
        const top = field[y0 * columns + x0] +
          (field[y0 * columns + x1] - field[y0 * columns + x0]) * tx;
        const bottom = field[y1 * columns + x0] +
          (field[y1 * columns + x1] - field[y1 * columns + x0]) * tx;
        return top + (bottom - top) * ty;
      };

      const gridU = sample(this.u);
      const gridV = sample(this.v);
      const previousU = sample(this.uPrevious);
      const previousV = sample(this.vPrevious);

      const picU = gridU;
      const picV = gridV;
      const flipU = this.pvx[i] + gridU - previousU;
      const flipV = this.pvy[i] + gridV - previousV;

      this.pvx[i] = picU + this.flipRatio * (flipU - picU);
      this.pvy[i] = picV + this.flipRatio * (flipV - picV);
    }
  }

  /**
   * Push the particles apart.
   *
   * A particle fluid clumps: without this, the water gathers into knots and
   * the surface goes lumpy. The particles are bucketed by cell and each one
   * is pushed away from its neighbours that are too close.
   */
  private separate(): void {
    if (this.separationIters <= 0) return;

    const { columns, rows } = this;
    const minimum = MIN_SEPARATION * Math.min(this.cellWidth, this.cellHeight);

    for (let iteration = 0; iteration < this.separationIters; iteration++) {
      this.buildBuckets();

      for (let i = 0; i < this.particleCount; i++) {
        const column = Math.min(
          columns - 1,
          Math.max(0, Math.floor(this.px[i] / this.cellWidth)),
        );
        const row = Math.min(
          rows - 1,
          Math.max(0, Math.floor(this.py[i] / this.cellHeight)),
        );

        let pushX = 0;
        let pushY = 0;

        for (let offsetRow = -1; offsetRow <= 1; offsetRow++) {
          const neighbourRow = row + offsetRow;
          if (neighbourRow < 0 || neighbourRow >= rows) continue;

          for (let offsetColumn = -1; offsetColumn <= 1; offsetColumn++) {
            const neighbourColumn = column + offsetColumn;
            if (neighbourColumn < 0 || neighbourColumn >= columns) continue;

            const bucket = neighbourRow * columns + neighbourColumn;
            const start = this.bucketStart[bucket];
            const end = this.bucketStart[bucket + 1];

            for (let k = start; k < end; k++) {
              const j = this.buckets[k];
              if (j === i) continue;

              const dx = this.px[i] - this.px[j];
              const dy = this.py[i] - this.py[j];
              const distanceSquared = dx * dx + dy * dy;

              if (distanceSquared > minimum * minimum || distanceSquared < 1e-8) {
                continue;
              }

              const distance = Math.sqrt(distanceSquared);
              const push = (minimum - distance) / distance;
              pushX += dx * push * 0.5;
              pushY += dy * push * 0.5;
            }
          }
        }

        this.px[i] += pushX;
        this.py[i] += pushY;
      }
    }
  }

  /** Group the particles by the cell they sit in. */
  private buildBuckets(): void {
    const { columns, rows } = this;
    this.bucketStart.fill(0);
    this.bucketCursor.fill(0);

    for (let i = 0; i < this.particleCount; i++) {
      const column = Math.min(
        columns - 1,
        Math.max(0, Math.floor(this.px[i] / this.cellWidth)),
      );
      const row = Math.min(
        rows - 1,
        Math.max(0, Math.floor(this.py[i] / this.cellHeight)),
      );
      this.buckets[i] = i;
      this.bucketStart[row * columns + column + 1] += 1;
    }

    for (let index = 0; index < this.bucketStart.length - 1; index++) {
      this.bucketStart[index + 1] += this.bucketStart[index];
    }

    for (let i = 0; i < this.particleCount; i++) {
      const column = Math.min(
        columns - 1,
        Math.max(0, Math.floor(this.px[i] / this.cellWidth)),
      );
      const row = Math.min(
        rows - 1,
        Math.max(0, Math.floor(this.py[i] / this.cellHeight)),
      );
      const bucket = row * columns + column;
      this.buckets[this.bucketCursor[bucket]] = i;
      this.bucketCursor[bucket] += 1;
    }
  }

  /**
   * The water's density, as a share of a full cell.
   *
   * This is the tone field the footer prints: one particle is a mist, a full
   * cell is a body of water, and everything between is the water thinning.
   * The share is measured against the cell's nominal fill rather than
   * against the fullest cell on the panel, so that a body of water reads as
   * a body of water however hard it has been squeezed.
   */
  densityShare(): Float32Array {
    const cells = this.columns * this.rows;
    const share = this.densityBuffer;
    const full = this.particlesPerCell;

    for (let index = 0; index < cells; index++) {
      const value = this.counts[index] / full;
      share[index] = value > 1 ? 1 : value;
    }

    return share;
  }

  /**
   * How fast the water is moving in each cell, in px/s.
   *
   * The renderer reads this to light the moving water and leave the still
   * water quiet, so it is the raw speed and not a share: a share would be
   * measured against the fastest cell of the frame, and the light would
   * breathe with it.
   */
  motion(): Float32Array {
    const cells = this.columns * this.rows;
    const speed = this.motionBuffer;

    for (let index = 0; index < cells; index++) {
      speed[index] = Math.hypot(this.u[index], this.v[index]);
    }

    return speed;
  }
}
