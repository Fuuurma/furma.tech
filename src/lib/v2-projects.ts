/**
 * v2 — "The Workshop" project data.
 * Derived from HOME_PROJECTS, extended with signature colors,
 * monograms and one-line workshop notes for the index + previews.
 */

export type V2Status = "in-dev" | "soon" | "roadmap" | "paused";

export interface V2Project {
  id: string;
  index: string;
  name: string;
  monogram: string;
  category: string;
  note: string;
  status: V2Status;
  statusLabel: string;
  href: string;
  /** Signature color (oklch) — used for swatch, row fill, preview */
  color: string;
  /** Ink color that stays readable on the signature color */
  onColor: string;
}

const V2_STATUS_LABELS: Record<V2Status, string> = {
  "in-dev": "In dev",
  soon: "Soon",
  roadmap: "Roadmap",
  paused: "Paused",
};

/** The active catalogue, in the same order as the v1 index. */
export const V2_PROJECTS: V2Project[] = [
  {
    id: "tic-tac-toe",
    index: "01",
    name: "Tic-Tac-Toe Disappear",
    monogram: "TT",
    category: "Games",
    note: "3 pieces per player — your oldest vanishes when you place a 4th. A disappearing-move mechanic that changes everything.",
    status: "in-dev",
    statusLabel: V2_STATUS_LABELS["in-dev"],
    href: "/portfolio/tic-tac-toe-disappear",
    color: "oklch(0.58 0.2 25)",
    onColor: "oklch(0.97 0.01 90)",
  },
  {
    id: "gambit-deck",
    index: "02",
    name: "Gambit Deck",
    monogram: "GD",
    category: "Games",
    note: "Chess meets cards: draw a card, play it, move by its effect. Guest-first — no account to take a turn.",
    status: "in-dev",
    statusLabel: V2_STATUS_LABELS["in-dev"],
    href: "/portfolio/gambit-deck",
    color: "oklch(0.6 0.18 80)",
    onColor: "oklch(0.16 0.02 80)",
  },
  {
    id: "bloxs",
    index: "03",
    name: "Bloxs",
    monogram: "BX",
    category: "Design Tools",
    note: "A component library built the other way round: studied from a named source, rebuilt, shipped with provenance.",
    status: "in-dev",
    statusLabel: V2_STATUS_LABELS["in-dev"],
    href: "/portfolio/bloxs",
    color: "oklch(0.62 0.12 220)",
    onColor: "oklch(0.97 0.01 90)",
  },
  {
    id: "putarenfe",
    index: "04",
    name: "Renfe",
    monogram: "RN",
    category: "Civic Tech",
    note: "Renfe reliability from official open data: delays, cancellations, skipped stops, per route.",
    status: "in-dev",
    statusLabel: V2_STATUS_LABELS["in-dev"],
    href: "/portfolio/putarenfe",
    color: "oklch(0.62 0.13 165)",
    onColor: "oklch(0.14 0.02 165)",
  },
  {
    id: "aitlas",
    index: "05",
    name: "Aitlas",
    monogram: "Ai",
    category: "AI Infrastructure",
    note: "Sovereign AI ecosystem — Nova workspace, Nexus runtime, agents marketplace.",
    status: "in-dev",
    statusLabel: V2_STATUS_LABELS["in-dev"],
    href: "/portfolio/aitlas",
    color: "oklch(0.52 0.19 285)",
    onColor: "oklch(0.97 0.01 90)",
  },
  {
    id: "software-factory",
    index: "06",
    name: "Software Factory",
    monogram: "SF",
    category: "Agent Infrastructure",
    note: "The studio's control plane for agentic work — queues, policy and gates in one private system.",
    status: "in-dev",
    statusLabel: V2_STATUS_LABELS["in-dev"],
    href: "/portfolio/software-factory",
    color: "oklch(0.55 0.1 200)",
    onColor: "oklch(0.97 0.01 90)",
  },
  {
    id: "fuddy",
    index: "07",
    name: "FUDDY",
    monogram: "FU",
    category: "Food",
    note: "Shared meal planning for households — the week's dishes become one shopping list.",
    status: "in-dev",
    statusLabel: V2_STATUS_LABELS["in-dev"],
    href: "/portfolio/fuddy",
    color: "oklch(0.62 0.16 55)",
    onColor: "oklch(0.16 0.02 65)",
  },
  {
    id: "qart",
    index: "08",
    name: "QArt",
    monogram: "Q",
    category: "Marketing Tools",
    note: "AI-generated QR codes that look like art — scannable, beautiful, customizable.",
    status: "in-dev",
    statusLabel: V2_STATUS_LABELS["in-dev"],
    href: "/portfolio/qart",
    color: "oklch(0.6 0.17 340)",
    onColor: "oklch(0.97 0.01 90)",
  },
  {
    id: "benxer",
    index: "09",
    name: "Benxer",
    monogram: "Be",
    category: "AI Tools",
    note: "Local-first model intelligence — benchmark cohorts, exact profiles, visible sources.",
    status: "in-dev",
    statusLabel: V2_STATUS_LABELS["in-dev"],
    href: "/portfolio/benxer",
    color: "oklch(0.66 0.15 130)",
    onColor: "oklch(0.14 0.03 130)",
  },
];

export const V2_STATS = [
  { value: 9, suffix: "", label: "Products in the workshop" },
  { value: 9, suffix: "", label: "Actively in development" },
  { value: 0, suffix: "%", label: "Venture capital taken" },
  { value: 100, suffix: "%", label: "Independent & bootstrapped" },
] as const;
