import { ReactNode } from "react";

export interface HeroVisualProps {
  className?: string;
}

export type HeroVisual = React.FC<HeroVisualProps>;

export interface ProjectHeroConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  visual: HeroVisual;
  accentColor?: string;
}
