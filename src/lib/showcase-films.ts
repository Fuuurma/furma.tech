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
  entry("aitlas", "Aitlas", "AI infrastructure", "In Development", "A bring-your-own key wires Nova, Nexus and Agents; a task survives a server restart.", "/portfolio/aitlas"),
  entry("restauramanager", "restauManager", "Hospitality SaaS", "In Development", "Bookings from four channels land on an illustrative floor plan, then the pass rail.", "/portfolio/restauramanager"),
  entry("guidetours", "GuideTours", "Tourism ops", "In Development", "The week board staffs itself until the last gap turns green.", "/portfolio/guidetours"),
  entry("tictactoe", "Tic-Tac-Toe Disappear", "Games", "In Development", "Three marks each; X's expired mark opens O's winning line.", "/portfolio/tic-tac-toe-disappear"),
  entry("qart", "QArt", "Marketing tools", "In Development", "A plain QR code is painted into art, then scanned.", "/portfolio/qart"),
  entry("opengovern", "OpenGovern", "Civic tech", "In Development", "A poll runs Scheduled, Open, Closing soon, Closed.", "/portfolio/opengovern"),
  entry("unochess", "Crown Cards", "Games", "In Development", "Chess meets cards: the card you draw sets how many moves you make."),
  entry("fuddy", "FUDDY", "Family meal planner", "In Development", "Dishes fill the week; their ingredients become the shopping list."),
  entry("discoverout", "DiscoverOut", "Location game", "In Development", "A 500 m lantern clears the fogged map as you walk."),
  entry("puta-renfe", "puta.renfe", "Civic data", "In Development", "Renfe reliability from official open data: delays, cancellations, skipped stops."),
  entry("turno-llaves", "ElNoi Llaves", "Restaurant ops", "In Development", "Key custody and opening/closing handoffs between kitchen and dining room."),
  entry("meetthemet", "Meet the Met", "Collection explorer", "In Development", "An independent explorer for The Met's Open Access collection."),
  entry("bloxs", "furma.bloxs", "UI kit", "In Development", "One kit, many different websites: each block is its own guest site."),
  entry("unsame", "UNSAME", "Streetwear commerce", "In Development", "Limited-edition releases, raffles and a queue."),
  entry("brascelona", "Brascelona", "Uniform storefront", "In Development", "Configure professional clothing and send one enquiry."),
  entry("matchmaking", "Matchmaking", "Realtime infrastructure", "In Development", "The relay that pairs players for Tic-Tac-Toe Disappear and Crown Cards."),
  entry("financehub", "FinanceHub", "Finance", "Paused", "18 provider streams merge into one chart; an alert rule rings the bell.", "/portfolio/financehub"),
  entry("onetomany", "OneToMany", "Productivity", "Paused", "One goal, many people moving it.", "/portfolio/onetomany"),
  entry("linkup", "LinkUp", "Social", "Paused", "Random or contact connections, then chat, video or voice.", "/portfolio/linkup"),
  entry("pickstracker", "PicksTracker", "Sports", "Roadmap", "Filter tipsters by sport across seven per-sport APIs.", "/portfolio/pickstracker"),
];
