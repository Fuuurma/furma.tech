import { Metadata } from "next";
import { Bot, Link2, MonitorPlay, Radio, ShieldCheck, Swords } from "lucide-react";
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
    "Three pieces each. Place a fourth and your oldest vanishes. A finished, live tic-tac-toe variant with quick match, private rooms, local play and three AI levels. No account needed.",
  openGraph: {
    title: "Tic-Tac-Toe Disappear",
    description:
      "Three pieces each, the oldest vanishes on your fourth. Quick match, private rooms, local play and three AI levels.",
    images: [
      getOgImageUrl({
        title: "Tic-Tac-Toe",
        subtitle: "Disappear",
        variant: "product",
      }),
    ],
  },
};

const modes = [
  {
    icon: Radio,
    title: "Quick match",
    desc: "A shared relay pairs you with the next player who asks for a game. No account, no lobby screen, no friend list to build first.",
  },
  {
    icon: Link2,
    title: "Private room",
    desc: "Host-first: one player opens a room, the other joins with the link. The host holds the rules, so a room cannot drift from the game.",
  },
  {
    icon: MonitorPlay,
    title: "Two on one device",
    desc: "Pass the same screen back and forth. The fastest way to learn the vanish rule, and the only mode that needs no network at all.",
  },
  {
    icon: Bot,
    title: "Three opponents",
    desc: "Easy plays a weighted random with a centre-and-corner lean; Normal is a depth-4 eviction-aware minimax; Hard is depth-8 with cycle protection, so it does not lose to a repeat loop.",
  },
];

const underneath = [
  {
    icon: Swords,
    title: "The rule is the strategy",
    desc: "Three pieces, always. Your fourth move deletes your first — so every threat you build is also a piece you are about to lose. Wins come from forks the vanish reopens, not from holding a line.",
  },
  {
    icon: ShieldCheck,
    title: "A guest is a player",
    desc: "Identity is generated on the device and kept there. Nothing asks for an email before the first move, and playing as a guest is the whole product, not a trial of it.",
  },
];

export default function TicTacToePage() {
  return (
    <ProjectLayout
      live={{ href: "https://tic-tac-toe-1ou.pages.dev", label: "Play" }}
    >
      <ProjectHero
        label="Games"
        title="Tic-Tac-Toe Disappear"
        description="Three pieces each. Place a fourth and your oldest one vanishes. The board you build is the board you lose — a finished, live variant of the game you already know, playable in the browser without an account."
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
            <span>Play a game</span>
            <span aria-hidden className="plastic-open__arrow">
              ↗
            </span>
          </a>
        </p>
        <ProjectTrustRow items={["React 19", "Vite", "Cloudflare"]} />
      </ProjectHero>

      {/* The mechanic, drawn: three marks held, a fourth placed, the first gone. */}
      <ProjectSection>
        <ProjectSectionHeader
          label="The rule"
          title="Hold three. Lose one to place another."
          description="Nothing else changes: same board, same lines, same win. What changes is that a threat has a lifetime — and the countdown starts the moment you make it."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start mt-10">
          {[
            {
              step: "01",
              title: "Three marks each",
              body: "You are never stronger than three. The board can never fill up with your own shapes.",
            },
            {
              step: "02",
              title: "The fourth evicts",
              body: "Your oldest mark disappears the moment the next one lands. There is no choice and no warning sound.",
            },
            {
              step: "03",
              title: "The line reopens",
              body: "An eviction reopens the square you had already closed — which is where the game is won and lost.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="border-t border-foreground/20 pt-5"
            >
              <p className="plastic-label">{item.step}</p>
              <p className="plastic-headline text-[clamp(20px,2.2vw,26px)] mt-3 mb-2">
                {item.title}
              </p>
              <p className="plastic-paragraph text-[clamp(15px,1.6vw,17px)] text-foreground/70">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection variant="muted">
        <ProjectSectionHeader
          label="Modes"
          title="Four ways to play"
          description="Every one of them works in the browser, on a phone, with nothing to install and no account to make first."
        />
        <div className="mt-10">
          <ProjectFeatures features={modes} columns={2} />
        </div>
      </ProjectSection>

      <ProjectSection>
        <ProjectFeatures
          label="Design"
          title="Why it is built this way"
          features={underneath}
          columns={2}
        />
      </ProjectSection>

      <ProjectSection variant="muted">
        <ProjectSectionHeader
          label="Under the hood"
          title="A small game, built properly"
          description="The engine is pure TypeScript with no React in it, so the rules and the AI are tested without a browser; the online room is a Durable Object relay; the whole thing is a static build on Cloudflare Pages."
        />
        <ProjectTrustRow
          items={[
            "React 19 · Vite 8 · TypeScript",
            "Cloudflare Workers + Durable Objects",
            "Self-play tested AI",
            "No account, no tracking",
          ]}
        />
      </ProjectSection>

      <ProjectCTA
        title="Three pieces. Make them count."
        description="It is live and free to play: quick match against a stranger, a private room with a friend, or the Hard AI if you want to be told the truth about your forks."
        primaryHref="https://tic-tac-toe-1ou.pages.dev"
        primaryLabel="Play Tic-Tac-Toe Disappear"
        secondaryHref="/portfolio"
        secondaryLabel="Back to Portfolio"
      />
    </ProjectLayout>
  );
}
