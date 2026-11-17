/**
 * Motion showcase films (rendered in the furma-motion Remotion repo).
 * Files live in public/showcase/<slug>.{mp4,jpg}; keys are the
 * `projectId` values the portfolio pages pass to ProjectHero.
 */

export interface ShowcaseFilm {
  mp4: string;
  poster: string;
  /** Accessible name for the video element. */
  label: string;
}

const film = (slug: string, name: string): ShowcaseFilm => ({
  mp4: `/showcase/${slug}.mp4`,
  poster: `/showcase/${slug}.jpg`,
  label: `${name} — motion showcase`,
});

export const SHOWCASE_FILMS: Record<string, ShowcaseFilm> = {
  aitlas: film("aitlas", "Aitlas"),
  "tic-tac-toe": film("tictactoe", "Tic-Tac-Toe Disappear"),
  qart: film("qart", "QArt"),
};

export const STUDIO_REEL: ShowcaseFilm = film("studio-reel", "Furma.tech studio reel");

export function getShowcaseFilm(projectId: string): ShowcaseFilm | undefined {
  return SHOWCASE_FILMS[projectId];
}

export interface ShowcaseEntry {
  film: ShowcaseFilm;
  name: string;
  kind: string;
  status: "In Development" | "Paused" | "Roadmap";
  /** What the film shows, in one line. */
  line: string;
  /** Case-study page, when the product has one. */
  href?: string;
}

const entry = (
  slug: string,
  name: string,
  kind: string,
  status: ShowcaseEntry["status"],
  line: string,
  href?: string,
): ShowcaseEntry => ({ film: film(slug, name), name, kind, status, line, href });

/** Every product film, in the order /showcase lists them. */
export const SHOWCASE_INDEX: ShowcaseEntry[] = [
  entry("tictactoe", "Tic-Tac-Toe Disappear", "Games", "In Development", "Three marks each; X's expired mark opens O's winning line.", "/portfolio/tic-tac-toe-disappear"),
  entry("bloxs", "furma.bloxs", "UI kit", "In Development", "One kit, many different websites: each block is its own guest site.", "/portfolio/bloxs"),
  entry("puta-renfe", "puta.renfe", "Civic data", "In Development", "Renfe reliability from official open data: delays, cancellations, skipped stops.", "/portfolio/putarenfe"),
  entry("aitlas", "Aitlas", "AI infrastructure", "In Development", "A bring-your-own key wires Nova, Nexus and Agents; a task survives a server restart.", "/portfolio/aitlas"),
  entry("fuddy", "FUDDY", "Family meal planner", "In Development", "Dishes fill the week; their ingredients become the shopping list.", "/portfolio/fuddy"),
  entry("qart", "QArt", "Marketing tools", "In Development", "A plain QR code is painted into art, then scanned.", "/portfolio/qart"),
];
