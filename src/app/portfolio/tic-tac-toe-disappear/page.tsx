import { Metadata } from 'next';
import { ProjectLayout, ProjectHero, ProjectSection, ProjectSectionHeader, ProjectCTA } from '@/components/ui/ProjectLayout';
import { getProjectCoverTint } from '@/lib/home-projects';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe Disappear — Furma.tech',
  description: 'Strategic 3-piece variant TicTacToe. Your oldest piece auto-removes when you place a 4th. Online multiplayer & AI opponent.',
  openGraph: {
    title: 'Tic-Tac-Toe Disappear',
    description: 'Strategic 3-piece variant. Oldest piece auto-removes on 4th move. Online multiplayer & AI.',
    images: [getOgImageUrl({ title: 'Tic-Tac-Toe', subtitle: 'Disappear', variant: 'product' })],
  },
};

const features = [
  {
    num: '01',
    title: '3-Piece Rule',
    desc: 'Maximum 3 pieces per player. When you place your 4th, your oldest piece automatically vanishes.',
  },
  {
    num: '02',
    title: 'Dynamic Strategy',
    desc: 'The board evolves each turn. Adapt your strategy as pieces disappear and new opportunities emerge.',
  },
  {
    num: '03',
    title: 'Multiplayer & AI',
    desc: 'Play online with friends via real-time matchmaking or challenge the AI with 4 difficulty levels.',
  },
];

export default function TicTacToePage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Games"
        title="Tic-Tac-Toe Disappear"
        description="A strategic twist on the classic game where moves vanish after a set number of turns. Think ahead, adapt fast, and outmaneuver your opponent in this dynamic battlefield."
        status={{ label: 'Live', variant: 'live' }}
        coverTint={getProjectCoverTint('tic-tac-toe')}
      >
        <div className="flex items-center gap-3">
          <div className="font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground">Stack</div>
          <div className="flex gap-2">
            {['React', 'Canvas API', 'TypeScript'].map((tech) => (
              <span key={tech} className="font-mono text-[11px] px-3 py-1.5 bg-muted/50 border border-border text-muted-foreground">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </ProjectHero>

      <ProjectSection>
        <ProjectSectionHeader
          title="How it works"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div key={feature.num} className="bg-muted/30 border border-border p-8 group hover:bg-muted/50 transition-colors">
              <span className="font-serif text-[64px] font-light text-muted-foreground/10 mb-6 block">{feature.num}</span>
              <h3 className="font-serif text-[24px] font-light text-foreground mb-3">{feature.title}</h3>
              <p className="font-mono text-[12px] text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection variant="muted">
        <div className="text-center">
          <div className="font-serif text-[120px] font-light text-muted-foreground/20 mb-4">3×3</div>
          <p className="font-mono text-[12px] text-muted-foreground">Vanishing grid preview</p>
        </div>
      </ProjectSection>

      <ProjectCTA
        title="Ready to think ahead?"
        description="A strategic twist on the classic game where moves vanish. Think ahead, adapt fast, and outmaneuver your opponent."
        primaryHref="/portfolio/tic-tac-toe-disappear"
        primaryLabel="Launch Game"
        secondaryHref="/portfolio"
        secondaryLabel="Back to Portfolio"
      />
    </ProjectLayout>
  );
}