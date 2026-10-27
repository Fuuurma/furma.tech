import { Metadata } from "next";
import {
  ProjectLayout,
  ProjectHero,
  ProjectSection,
  ProjectSectionHeader,
  ProjectFeatures,
  ProjectTrustRow,
  ProjectCTA,
} from "@/components/ui/ProjectLayout";
import { getOgImageUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  alternates: { canonical: "/portfolio/tic-tac-toe-disappear" },
  title: "Tic-Tac-Toe Disappear — Furma.tech",
  description:
    "Strategic 3-piece variant TicTacToe. Your oldest piece auto-removes when you place a 4th. Online multiplayer & AI opponent.",
  openGraph: {
    title: "Tic-Tac-Toe Disappear",
    description:
      "Strategic 3-piece variant. Oldest piece auto-removes on 4th move. Online multiplayer & AI.",
    images: [
      getOgImageUrl({
        title: "Tic-Tac-Toe",
        subtitle: "Disappear",
        variant: "product",
      }),
    ],
  },
};

const features = [
  {
    title: "3-Piece Rule",
    desc: "Maximum 3 pieces per player. When you place your 4th, your oldest piece automatically vanishes.",
  },
  {
    title: "Dynamic Strategy",
    desc: "The board evolves each turn. Adapt your strategy as pieces disappear and new opportunities emerge.",
  },
  {
    title: "Multiplayer & AI",
    desc: "Play online with friends via real-time matchmaking or challenge the AI with 3 difficulty levels (Easy, Normal, Hard).",
  },
];

export default function TicTacToePage() {
  return (
    <ProjectLayout live={{ href: "https://tic-tac-toe-1ou.pages.dev", label: "Play" }}>
      <ProjectHero
        label="Games"
        title="Tic-Tac-Toe Disappear"
        description="A strategic twist on the classic game: only 3 pieces per player — place a 4th and your oldest vanishes. Think ahead, adapt fast, and outmaneuver your opponent in this dynamic battlefield."
        status={{ label: "Beta", variant: "beta" }}
        projectId="tic-tac-toe"
      >
        <p className="pt-5 m-0">
          <a
            href="https://tic-tac-toe-1ou.pages.dev"
            target="_blank"
            rel="noreferrer"
            className="plastic-open"
          >
            <span>Play it — early build</span>
            <span aria-hidden className="plastic-open__arrow">
              ↗
            </span>
          </a>
        </p>
        <ProjectTrustRow items={["React", "Canvas API", "TypeScript"]} />
      </ProjectHero>

      <ProjectSection>
        <ProjectFeatures
          label="Rules"
          title="How it works"
          features={features}
        />
      </ProjectSection>

      <ProjectSection variant="muted">
        <ProjectSectionHeader
          label="Board"
          title="3×3 vanishing grid"
          description="Place. Vanish. Adapt. The classic board with a strategic twist."
        />
        <div className="border border-foreground/10 bg-background p-12 md:p-16 flex flex-col items-center justify-center gap-4">
          <p
            className="font-sans text-[clamp(64px,12vw,120px)] font-medium tracking-[-0.04em] leading-none text-foreground/15"
            aria-hidden="true"
          >
            3×3
          </p>
          <p className="plastic-label">Vanishing grid</p>
        </div>
      </ProjectSection>

      <ProjectCTA
        title="Ready to think ahead?"
        description="The 3-piece variant is in development — online play and AI opponents are on the way."
        primaryHref="https://tic-tac-toe-1ou.pages.dev"
        primaryLabel="Play Tic-Tac-Toe"
        secondaryHref="/portfolio"
        secondaryLabel="Back to Portfolio"
      />
    </ProjectLayout>
  );
}
