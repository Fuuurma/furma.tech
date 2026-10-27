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

import { GambitDeckHero } from "@/components/heroes/GambitDeckHero";
import { PondHero } from "@/components/heroes/PondHero";
import { BloxsHero } from "@/components/heroes/BloxsHero";
import { RenfeHero } from "@/components/heroes/RenfeHero";
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
  "gambit-deck": GambitDeckHero,
  pond: PondHero,
  bloxs: BloxsHero,
  putarenfe: RenfeHero,
};
