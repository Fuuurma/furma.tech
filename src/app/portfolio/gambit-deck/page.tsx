import { Metadata } from "next";
import { Layers, Swords, UserCheck } from "lucide-react";
import { GambitDeckHero } from "@/components/heroes/GambitDeckHero";
import {
  ProjectLayout,
  ProjectHero,
  ProjectSection,
  ProjectSectionHeader,
  ProjectFeatures,
  ProjectCTA,
} from "@/components/ui/ProjectLayout";
import { getOgImageUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  alternates: { canonical: "/portfolio/gambit-deck" },
  title: "Gambit Deck — Furma.tech",
  description:
    "Chess meets cards: each turn draws a card, plays it, and makes chess moves from the card's effect. Guest-first — no account to take a turn.",
  openGraph: {
    title: "Gambit Deck",
    description:
      "Chess meets cards. Draw a card, play it, move by its effect. Play a hand without an account.",
    images: [
      getOgImageUrl({
        title: "Gambit Deck",
        subtitle: "Chess, with cards",
        variant: "product",
      }),
    ],
  },
};

const features = [
  {
    icon: Layers,
    title: "A card for every turn",
    desc: "Each turn draws a card and plays it; the card decides what the board allows. The deck is the rules.",
  },
  {
    icon: Swords,
    title: "Chess underneath",
    desc: "The board is a chessboard and the pieces move like chess pieces — the cards change what a move is worth.",
  },
  {
    icon: UserCheck,
    title: "Guest first",
    desc: "Open the deck and take a turn without signing up. An account is for keeping your history, not for starting.",
  },
];

export default function GambitDeckPage() {
  return (
    <ProjectLayout live={{ href: "https://gambit-deck.pages.dev", label: "Play" }}>
      <ProjectHero
        label="Games"
        title="Gambit Deck"
        description="Chess meets cards: each turn draws a card, plays it, and makes chess moves based on the card's effect. Live in public beta and free to try as a guest — no account, no download."
        status={{ label: "Beta", variant: "beta" }}
        visual={
          <figure className="m-0">
            <GambitDeckHero className="w-full h-full max-h-[min(100%,420px)] object-contain" />
            <figcaption className="plastic-label mt-2 opacity-80">
              Concept visual — illustrative mock, not a product screenshot
            </figcaption>
          </figure>
        }
      >
        <p className="mt-6">
          <a
            href="https://gambit-deck.pages.dev"
            target="_blank"
            rel="noreferrer"
            className="plastic-open"
          >
            <span>Play it — beta</span>
            <span aria-hidden className="plastic-open__arrow">
              ↗
            </span>
          </a>
        </p>
      </ProjectHero>

      <ProjectSection>
        <ProjectFeatures label="Rules" title="How a turn works" features={features} />
      </ProjectSection>

      <ProjectSection variant="muted">
        <ProjectSectionHeader
          label="State"
          title="Public beta"
          description="The game is live and playable. Balance, the deck and the matchmaking relay are still moving; the rules are the part that is settled."
        />
        <p className="plastic-paragraph max-w-[62ch]">
          Being a beta means exactly this: the game works and is open, and it can
          change between sessions. If a hand behaves differently than it did last
          week, that is the deck being tuned, not your browser.
        </p>
      </ProjectSection>

      <ProjectCTA
        title="Take a hand"
        description="Open the deck in the browser and play a turn — no account needed."
        primaryHref="https://gambit-deck.pages.dev"
        primaryLabel="Play Gambit Deck"
        secondaryHref="/portfolio"
        secondaryLabel="Back to Portfolio"
      />
    </ProjectLayout>
  );
}
