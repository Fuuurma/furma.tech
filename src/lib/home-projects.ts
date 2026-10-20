/** Editorial layout variant for landing project slides */
export type HomeProjectLayout =
  | "editorial-right"
  | "editorial-left"
  | "visual-heavy"
  | "stacked"
  | "overlay";

export interface HomeProject {
  id: string;
  name: string;
  category: string;
  description: string;
  status: string;
  href: string;
  layout: HomeProjectLayout;
}

export const HOME_PROJECTS: HomeProject[] = [
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
    status: "In Development",
    href: "/portfolio/guidetours",
    layout: "overlay",
  },
  {
    id: "qart",
    name: "QArt",
    category: "Marketing",
    description:
      "AI-generated QR codes that look like art — scannable, beautiful, and fully customizable.",
    status: "Roadmap",
    href: "/portfolio/qart",
    layout: "stacked",
  },
  {
    id: "tic-tac-toe",
    name: "Tic-Tac-Toe",
    category: "Games",
    description:
      "Strategy game where pieces vanish after each turn — a disappearing-move mechanic that changes everything.",
    status: "In Development",
    href: "/portfolio/tic-tac-toe-disappear",
    layout: "visual-heavy",
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
    layout: "overlay",
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

export function getHomeProjectIndex(id: string): number {
  return HOME_PROJECTS.findIndex((p) => p.id === id);
}

