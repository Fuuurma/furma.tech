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
 * Furma's 2026-11-16 ruling: the catalogue is the active set and nothing
 * else — the projects the studio is actually working on. Everything else was
 * removed from the listing, the pages and the data sources rather than kept
 * on a shelf.
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
    id: "software-factory",
    name: "Software Factory",
    category: "Agent Infrastructure",
    description:
      "The studio's own control plane for agentic work — portfolio state, work queues, machine policy and verification gates in one private system.",
    status: "In Development",
    href: "/portfolio/software-factory",
    layout: "editorial-left",
  },
  {
    id: "fuddy",
    name: "FUDDY",
    category: "Food",
    description:
      "A shared meal-planning app for households — a calendar of meals, a dish library and an auto-merged shopping list, synced live with everyone at the table.",
    status: "In Development",
    href: "/portfolio/fuddy",
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
    id: "benxer",
    name: "Benxer",
    category: "AI Tools",
    description:
      "A local-first model intelligence explorer — compare published model and effort profiles inside named benchmark cohorts, with sources and uncertainty kept visible.",
    status: "In Development",
    href: "/portfolio/benxer",
    layout: "visual-heavy",
  },
];
