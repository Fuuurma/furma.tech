import type { ComponentType } from "react";
import { AitlasHero, QArtHero, TicTacToeHero } from "@/components/heroes";

export type ProjectHeroVisual = ComponentType<{ className?: string }>;

import { GambitDeckHero } from "@/components/heroes/GambitDeckHero";
import { BloxsHero } from "@/components/heroes/BloxsHero";
import { RenfeHero } from "@/components/heroes/RenfeHero";
import { SoftwareFactoryHero } from "@/components/heroes/SoftwareFactoryHero";
import { FuddyHero } from "@/components/heroes/FuddyHero";
import { BenxerHero } from "@/components/heroes/BenxerHero";
export const PROJECT_HERO_MAP: Record<string, ProjectHeroVisual> = {
  "tic-tac-toe": TicTacToeHero,
  "gambit-deck": GambitDeckHero,
  bloxs: BloxsHero,
  putarenfe: RenfeHero,
  aitlas: AitlasHero,
  "software-factory": SoftwareFactoryHero,
  fuddy: FuddyHero,
  qart: QArtHero,
  benxer: BenxerHero,
};
