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
  restauramanager: film("restauramanager", "restauManager"),
  guidetours: film("guidetours", "GuideTours"),
  "tic-tac-toe": film("tictactoe", "Tic-Tac-Toe Disappear"),
  qart: film("qart", "QArt"),
  financehub: film("financehub", "FinanceHub"),
  pickstracker: film("pickstracker", "PicksTracker"),
  linkup: film("linkup", "LinkUp"),
  onetomany: film("onetomany", "OneToMany"),
  opengovern: film("opengovern", "OpenGovern"),
};

export const STUDIO_REEL: ShowcaseFilm = film("studio-reel", "Furma.tech studio reel");

export function getShowcaseFilm(projectId: string): ShowcaseFilm | undefined {
  return SHOWCASE_FILMS[projectId];
}
