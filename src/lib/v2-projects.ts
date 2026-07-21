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

export const V2_STATUS_LABELS: Record<V2Status, string> = {
  "in-dev": "In dev",
  soon: "Soon",
  roadmap: "Roadmap",
  paused: "Paused",
};

export const V2_PROJECTS: V2Project[] = [
  {
    id: "aitlas",
    index: "01",
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
    id: "restauramanager",
    index: "02",
    name: "restauManager",
    monogram: "rM",
    category: "Hospitality SaaS",
    note: "Real-time tables, TheFork integration and a kitchen display built for service.",
    status: "in-dev",
    statusLabel: V2_STATUS_LABELS["in-dev"],
    href: "/portfolio/restauramanager",
    color: "oklch(0.62 0.16 55)",
    onColor: "oklch(0.16 0.02 65)",
  },
  {
    id: "guidetours",
    index: "03",
    name: "GuideTours",
    monogram: "GT",
    category: "Tourism Ops",
    note: "Tour operator platform with GPS routes and Viator / GetYourGuide sync.",
    status: "in-dev",
    statusLabel: V2_STATUS_LABELS["in-dev"],
    href: "/portfolio/guidetours",
    color: "oklch(0.62 0.13 165)",
    onColor: "oklch(0.14 0.02 165)",
  },
  {
    id: "tic-tac-toe",
    index: "04",
    name: "Tic-Tac-Toe Disappear",
    monogram: "TT",
    category: "Games",
    note: "Pieces vanish after each turn. A disappearing-move mechanic that changes everything.",
    status: "in-dev",
    statusLabel: V2_STATUS_LABELS["in-dev"],
    href: "/portfolio/tic-tac-toe-disappear",
    color: "oklch(0.58 0.2 25)",
    onColor: "oklch(0.97 0.01 90)",
  },
  {
    id: "qart",
    index: "05",
    name: "QArt",
    monogram: "Q",
    category: "Marketing Tools",
    note: "AI-generated QR codes that look like art — scannable, beautiful, customizable.",
    status: "soon",
    statusLabel: V2_STATUS_LABELS.soon,
    href: "/portfolio/qart",
    color: "oklch(0.6 0.17 340)",
    onColor: "oklch(0.97 0.01 90)",
  },
  {
    id: "opengovern",
    index: "06",
    name: "OpenGovern",
    monogram: "OG",
    category: "Civic Tech",
    note: "Direct democracy tooling for municipalities — proposals, transparent voting.",
    status: "roadmap",
    statusLabel: V2_STATUS_LABELS.roadmap,
    href: "/portfolio/opengovern",
    color: "oklch(0.58 0.13 230)",
    onColor: "oklch(0.97 0.01 90)",
  },
  {
    id: "pickstracker",
    index: "07",
    name: "PicksTracker",
    monogram: "PT",
    category: "Sports",
    note: "Prediction tracking with social leaderboards and win-rate accountability.",
    status: "roadmap",
    statusLabel: V2_STATUS_LABELS.roadmap,
    href: "/portfolio/pickstracker",
    color: "oklch(0.66 0.15 130)",
    onColor: "oklch(0.14 0.03 130)",
  },
  {
    id: "financehub",
    index: "08",
    name: "FinanceHub",
    monogram: "FH",
    category: "Finance",
    note: "Portfolio monitoring and market data with real-time alerts across assets.",
    status: "paused",
    statusLabel: V2_STATUS_LABELS.paused,
    href: "/portfolio/financehub",
    color: "oklch(0.55 0.1 200)",
    onColor: "oklch(0.97 0.01 90)",
  },
  {
    id: "onetomany",
    index: "09",
    name: "OneToMany",
    monogram: "1N",
    category: "Productivity",
    note: "Goal-setting and habit tracking with community validation and accountability.",
    status: "paused",
    statusLabel: V2_STATUS_LABELS.paused,
    href: "/portfolio/onetomany",
    color: "oklch(0.62 0.14 95)",
    onColor: "oklch(0.16 0.03 95)",
  },
  {
    id: "linkup",
    index: "10",
    name: "LinkUp",
    monogram: "LU",
    category: "Social",
    note: "Short-video professional matching — swipe, connect, collaborate.",
    status: "paused",
    statusLabel: V2_STATUS_LABELS.paused,
    href: "/portfolio/linkup",
    color: "oklch(0.55 0.16 310)",
    onColor: "oklch(0.97 0.01 90)",
  },
];

export const V2_STATS = [
  { value: 11, suffix: "", label: "Products in the workshop" },
  { value: 4, suffix: "", label: "Actively in development" },
  { value: 0, suffix: "%", label: "Venture capital taken" },
  { value: 100, suffix: "%", label: "Independent & bootstrapped" },
] as const;
