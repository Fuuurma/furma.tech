/**
 * The wave: a tone field that flows.
 *
 * The hero's picture is a wave, and a wave is a picture that moves. The field
 * is built the way a photograph of moving water is built — a noise field,
 * warped by a second noise field, so the waves lean into each other instead
 * of running in parallel — and then ridged, so the crests catch the light
 * and the troughs stay dark.
 *
 * It is sampled on a coarse grid and interpolated, because the wave is
 * smooth: a field sampled at a quarter of the lattice's resolution and
 * stretched back up is indistinguishable from one sampled everywhere, and it
 * costs a quarter of the work.
 */

/** A deterministic hash of a lattice point, in 0..1. */
function hash(x: number, y: number): number {
  let h = Math.imul(x, 374761393) + Math.imul(y, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/** One octave of value noise, in -1..1. */
function valueNoise(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;

  // Smoothstep, so the octaves join without a crease.
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);

  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);

  const top = a + (b - a) * u;
  const bottom = c + (d - c) * u;
  return (top + (bottom - top) * v) * 2 - 1;
}

/** Summed octaves of value noise, in -1..1. */
function fbm(x: number, y: number, octaves: number): number {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  let total = 0;

  for (let octave = 0; octave < octaves; octave++) {
    value += amplitude * valueNoise(x * frequency, y * frequency);
    total += amplitude;
    amplitude *= 0.5;
    frequency *= 2.03;
  }

  return total > 0 ? value / total : 0;
}

export interface WaveFieldOptions {
  /** How many features the wave carries across the panel. */
  scale: number;
  /** How hard the crests bite. */
  intensity: number;
  /** How many octaves of noise the wave is built from. */
  octaves: number;
}

/**
 * A push laid over the wave: the hand's displacement, sampled on the same
 * `columns` × `rows` grid as the wave. `x` and `y` are in pixels of the panel;
 * `unitsX` and `unitsY` convert them into the wave's domain.
 */
export interface WaveWarp {
  x: Float32Array;
  y: Float32Array;
  unitsX: number;
  unitsY: number;
}

/**
 * Fill `out` with the wave, one sample per cell of a `columns` × `rows`
 * grid, in 0..1.
 *
 * The domain is `scale` features wide, so the wave's features keep their
 * size whatever the panel measures, and `time` walks the field sideways,
 * which is what makes the waves travel. A `warp` moves the sample points
 * before the noise is read, so the picture leans where the hand has pushed it.
 */
export function sampleWaveField(
  out: Float32Array,
  columns: number,
  rows: number,
  time: number,
  options: WaveFieldOptions,
  warp?: WaveWarp,
): void {
  const { scale, intensity, octaves } = options;
  const stepX = scale / Math.max(1, columns);
  const stepY = scale / Math.max(1, rows);

  for (let row = 0; row < rows; row++) {
    const y0 = row * stepY;
    for (let column = 0; column < columns; column++) {
      const x0 = column * stepX;
      const i = row * columns + column;
      const x = warp ? x0 + warp.x[i] * warp.unitsX : x0;
      const y = warp ? y0 + warp.y[i] * warp.unitsY : y0;

      // The warp: a second field, drifting against the first, so the waves
      // lean and braid instead of running in parallel.
      const warpX = fbm(x + 11.3, y - time * 0.55, octaves);
      const warpY = fbm(x - 7.1, y + time * 0.42, octaves);

      const n = fbm(x + warpX * 0.85, y + warpY * 0.85, octaves);

      // Ridged: the crests are the zero crossings of the field, so they
      // catch the light and the troughs stay dark.
      const ridge = 1 - Math.abs(n);
      const tone = Math.pow(ridge, 1.9) * intensity;

      out[i] = tone > 1 ? 1 : tone;
    }
  }
}

/**
 * Read a field back at an arbitrary point, bilinearly.
 *
 * The field is sampled on a coarse grid and stretched over the lattice, so
 * this is the step that puts a smooth wave back onto a hard screen.
 */
export function sampleField(
  field: Float32Array,
  columns: number,
  rows: number,
  u: number,
  v: number,
): number {
  if (columns <= 0 || rows <= 0) return 0;

  const fx = u * (columns - 1);
  const fy = v * (rows - 1);
  const x0 = Math.floor(fx);
  const y0 = Math.floor(fy);
  const x1 = Math.min(columns - 1, x0 + 1);
  const y1 = Math.min(rows - 1, y0 + 1);
  const tx = fx - x0;
  const ty = fy - y0;

  const topLeft = field[y0 * columns + x0];
  const topRight = field[y0 * columns + x1];
  const bottomLeft = field[y1 * columns + x0];
  const bottomRight = field[y1 * columns + x1];

  const top = topLeft + (topRight - topLeft) * tx;
  const bottom = bottomLeft + (bottomRight - bottomLeft) * tx;
  return top + (bottom - top) * ty;
}
