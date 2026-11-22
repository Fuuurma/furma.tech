/**
 * v2 — "The Workshop" project data: the advertised HOME_PROJECTS
 * catalogue, extended with signature colors, monograms and one-line
 * workshop notes. Parity is pinned by tests/v2-catalogue.test.ts.
 */

export type V2Status = "in-dev" | "beta" | "prototype" | "soon" | "roadmap" | "paused";

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
  beta: "Beta",
  prototype: "Prototype",
  soon: "Soon",
  roadmap: "Roadmap",
  paused: "Paused",
};

export const V2_PROJECTS: V2Project[] = [
  {
    id: "tic-tac-toe",
    index: "01",
    name: "Tic-Tac-Toe",
    monogram: "TT",
    category: "Games",
    note: "3 pieces per player — your oldest vanishes when you place a 4th. A disappearing-move mechanic that changes everything.",
    status: "beta",
    statusLabel: V2_STATUS_LABELS.beta,
    href: "/portfolio/tic-tac-toe-disappear",
    color: "oklch(0.58 0.2 25)",
    onColor: "oklch(0.97 0.01 90)",
  },
  {
    id: "gambit-deck",
    index: "02",
    name: "Gambit Deck",
    monogram: "GA",
    category: "Games",
    note: "Guest-first card game — open the deck, play a hand, no account required.",
    status: "beta",
    statusLabel: V2_STATUS_LABELS.beta,
    href: "/portfolio/gambit-deck",
    color: "oklch(0.5 0.12 155)",
    onColor: "oklch(0.97 0.01 90)",
  },
  {
    id: "pond",
    index: "03",
    name: "Pond",
    monogram: "Po",
    category: "Productivity",
    note: "Capture-first library and planner — whatever you save becomes scheduled work.",
    status: "in-dev",
    statusLabel: V2_STATUS_LABELS["in-dev"],
    href: "/portfolio/pond",
    color: "oklch(0.56 0.13 250)",
    onColor: "oklch(0.97 0.01 90)",
  },
  {
    id: "qart",
    index: "04",
    name: "QArt",
    monogram: "Q",
    category: "Marketing",
    note: "AI-generated QR codes that look like art — scannable, beautiful, customizable.",
    status: "in-dev",
    statusLabel: V2_STATUS_LABELS["in-dev"],
    href: "/portfolio/qart",
    color: "oklch(0.6 0.17 340)",
    onColor: "oklch(0.97 0.01 90)",
  },
  {
    id: "bloxs",
    index: "05",
    name: "Bloxs",
    monogram: "B",
    category: "Design Tools",
    note: "Component library rebuilt from named sources — every piece ships with its provenance.",
    status: "prototype",
    statusLabel: V2_STATUS_LABELS.prototype,
    href: "/portfolio/bloxs",
    color: "oklch(0.72 0.15 80)",
    onColor: "oklch(0.2 0.02 70)",
  },
  {
    id: "putarenfe",
    index: "06",
    name: "Renfe",
    monogram: "R",
    category: "Civic Tech",
    note: "Civic dashboard measuring Renfe service from the operator's own open feeds.",
    status: "in-dev",
    statusLabel: V2_STATUS_LABELS["in-dev"],
    href: "/portfolio/putarenfe",
    color: "oklch(0.56 0.1 200)",
    onColor: "oklch(0.97 0.01 90)",
  },
];

export const V2_STATS = [
  { value: V2_PROJECTS.length, suffix: "", label: "Products in the workshop" },
  {
    value: V2_PROJECTS.filter((p) => p.status === "in-dev").length,
    suffix: "",
    label: "Actively in development",
  },
  { value: 0, suffix: "%", label: "Venture capital taken" },
  { value: 100, suffix: "%", label: "Independent & bootstrapped" },
] as const;
