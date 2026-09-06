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
import { getProjectCoverTint } from "@/lib/home-projects";
import { getOgImageUrl } from "@/lib/metadata";

export const metadata: Metadata = {
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
    <ProjectLayout>
      <ProjectHero
        label="Games"
        title="Tic-Tac-Toe Disappear"
        description="A strategic twist on the classic game where moves vanish after a set number of turns. Think ahead, adapt fast, and outmaneuver your opponent in this dynamic battlefield."
        status={{ label: "In Dev", variant: "soon" }}
        projectId="tic-tac-toe"
        coverTint={getProjectCoverTint("tic-tac-toe")}
      >
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
          <p className="font-sans text-[clamp(64px,12vw,120px)] font-medium tracking-[-0.04em] leading-none text-foreground/15">
            3×3
          </p>
          <p className="plastic-label">Vanishing grid</p>
        </div>
      </ProjectSection>

      <ProjectCTA
        title="Ready to think ahead?"
        description="Play the vanishing-move variant — online or against AI."
        primaryHref="/#contact"
        primaryLabel="Get updates"
        secondaryHref="/portfolio"
        secondaryLabel="Back to Portfolio"
      />
    </ProjectLayout>
  );
}
