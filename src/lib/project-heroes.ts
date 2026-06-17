import type { ComponentType } from "react";
import {
  AitlasHero,
  FinanceHubHero,
  GuideToursHero,
  LinkUpHero,
  OneToManyHero,
  OpenGovernHero,
  PicksTrackerHero,
  QArtHero,
  RestauManagerHero,
  TicTacToeHero,
} from "@/components/heroes";

export type ProjectHeroVisual = ComponentType<{ className?: string }>;

export const PROJECT_HERO_MAP: Record<string, ProjectHeroVisual> = {
  aitlas: AitlasHero,
  restauramanager: RestauManagerHero,
  guidetours: GuideToursHero,
  "tic-tac-toe": TicTacToeHero,
  qart: QArtHero,
  financehub: FinanceHubHero,
  pickstracker: PicksTrackerHero,
  linkup: LinkUpHero,
  onetomany: OneToManyHero,
  opengovern: OpenGovernHero,
};

export function getProjectHero(id: string): ProjectHeroVisual | undefined {
  return PROJECT_HERO_MAP[id];
}
