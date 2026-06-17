/** Shared motion tokens — agency-style easing (AQuest / Locomotive family) */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const motionDuration = {
  fast: 0.25,
  base: 0.45,
  slow: 0.7,
  reveal: 0.85,
} as const;

export const motionStagger = {
  tight: 0.04,
  base: 0.08,
  relaxed: 0.12,
} as const;
