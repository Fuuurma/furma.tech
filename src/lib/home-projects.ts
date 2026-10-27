/** Editorial layout variant for landing project slides */
export type HomeProjectLayout =
  | "editorial-right"
  | "editorial-left"
  | "visual-heavy"
  | "stacked";

export interface HomeProject {
  id: string;
  name: string;
  category: string;
  description: string;
  status: string;
  href: string;
  layout: HomeProjectLayout;
  /** Set only when the project is reachable by a stranger today. */
  live?: string;
}

/**
 * What the studio shows. This is the honest list, not the whole history: the
 * home tour, the portfolio index, the footers and the sitemap all read from
 * here, so a project that is paused or still a roadmap line does not advertise
 * itself as current work.
 *
 * Furma's 2026-10-27 call: keep the projects that are real today — two in
 * public beta, three being built, one prototype — and stop carrying the shelf
 * of paused ideas as if they were products.
 */
export const HOME_PROJECTS: HomeProject[] = [
  {
    id: "tic-tac-toe",
    name: "Tic-Tac-Toe",
    category: "Games",
    description:
      "Strategy game with a 3-piece rule: your oldest piece vanishes when you place a 4th — a disappearing-move mechanic that changes everything.",
    status: "Beta",
    href: "/portfolio/tic-tac-toe-disappear",
    layout: "visual-heavy",
    live: "https://tic-tac-toe-1ou.pages.dev",
  },
  {
    id: "gambit-deck",
    name: "Gambit Deck",
    category: "Games",
    description:
      "Guest-first card game you can take a turn in without an account — open the deck, play a hand, leave when you like.",
    status: "Beta",
    href: "/portfolio/gambit-deck",
    layout: "editorial-right",
    live: "https://gambit-deck.pages.dev",
  },
  {
    id: "pond",
    name: "Pond",
    category: "Productivity",
    description:
      "Capture-first library and planner: whatever you save becomes scheduled work, without a filing system to maintain first.",
    status: "In Development",
    href: "/portfolio/pond",
    layout: "editorial-left",
  },
  {
    id: "qart",
    name: "QArt",
    category: "Marketing",
    description:
      "AI-generated QR codes that look like art — scannable, beautiful, and fully customizable.",
    status: "In Development",
    href: "/portfolio/qart",
    layout: "stacked",
  },
  {
    id: "bloxs",
    name: "Bloxs",
    category: "Design Tools",
    description:
      "A component library built the other way round: every piece is studied from a named source, rebuilt from scratch, and shipped with its provenance.",
    status: "Prototype",
    href: "/portfolio/bloxs",
    layout: "stacked",
  },
  {
    id: "putarenfe",
    name: "Renfe",
    category: "Civic Tech",
    description:
      "A civic dashboard that measures Renfe service from the operator's own feeds — cancellations, delays and the routes that quietly stop running.",
    status: "In Development",
    href: "/portfolio/putarenfe",
    layout: "editorial-right",
  },
];

/**
 * Pages that stay reachable but are no longer advertised: paused, retired, or
 * still a roadmap line. They keep their routes for anyone holding a link; the
 * lists, the footers and the sitemap read `HOME_PROJECTS` and leave them out.
 */
export const ARCHIVED_PROJECTS: HomeProject[] = [
  {
    id: "aitlas",
    name: "Aitlas",
    category: "AI Infrastructure",
    description:
      "Sovereign AI ecosystem — Nova workspace, Nexus runtime, and an agents marketplace for teams building with MCP.",
    status: "In Development",
    href: "/portfolio/aitlas",
    layout: "visual-heavy",
  },
  {
    id: "restauramanager",
    name: "restauManager",
    category: "Hospitality SaaS",
    description:
      "Restaurant operations with real-time tables, TheFork integration, and a kitchen display built for busy service.",
    status: "In Development",
    href: "/portfolio/restauramanager",
    layout: "editorial-left",
  },
  {
    id: "guidetours",
    name: "GuideTours",
    category: "Tourism",
    description:
      "Tour operator platform with live GPS routes, multi-language guides, and Viator / GetYourGuide sync.",
    status: "Paused",
    href: "/portfolio/guidetours",
    layout: "editorial-right",
  },
  {
    id: "financehub",
    name: "FinanceHub",
    category: "Finance",
    description:
      "Portfolio monitoring and market data with real-time alerts across crypto, equities, and custom assets.",
    status: "Paused",
    href: "/portfolio/financehub",
    layout: "editorial-right",
  },
  {
    id: "pickstracker",
    name: "PicksTracker",
    category: "Sports",
    description:
      "Sports prediction market with social leaderboards, community voting, and win-rate tracking.",
    status: "Roadmap",
    href: "/portfolio/pickstracker",
    layout: "editorial-left",
  },
  {
    id: "linkup",
    name: "LinkUp",
    category: "Social",
    description:
      "Short-video professional matching — swipe, connect, and collaborate with verified peers.",
    status: "Paused",
    href: "/portfolio/linkup",
    layout: "visual-heavy",
  },
  {
    id: "onetomany",
    name: "OneToMany",
    category: "Productivity",
    description:
      "Goal-setting and habit tracking with community validation and evidence-based accountability.",
    status: "Paused",
    href: "/portfolio/onetomany",
    layout: "stacked",
  },
  {
    id: "opengovern",
    name: "OpenGovern",
    category: "Civic Tech",
    description:
      "Direct democracy tooling for municipalities — citizen proposals, transparent voting, open governance.",
    status: "Paused",
    href: "/portfolio/opengovern",
    layout: "editorial-right",
  },
];

/** Every project that still has a page, advertised or not. */
export const ALL_PROJECTS: HomeProject[] = [
  ...HOME_PROJECTS,
  ...ARCHIVED_PROJECTS,
];
