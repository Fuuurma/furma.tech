import { Metadata } from 'next';
import { Target, Users, Trophy } from 'lucide-react';
import { ProjectLayout, ProjectHero, ProjectStatusPlaceholder } from '@/components/ui/ProjectLayout';
import { getProjectCoverTint } from '@/lib/home-projects';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'OneToMany — Furma.tech',
  description: 'Goal-oriented social platform. Create missions with numeric targets, post evidence, community voting validates progress.',
  openGraph: {
    title: 'OneToMany',
    description: 'Goal-oriented social platform with numeric targets and community validation.',
    images: [getOgImageUrl({ title: 'OneToMany', subtitle: 'Goal Tracking', variant: 'product' })],
  },
};

const highlights = [
  { icon: Target, title: 'Numeric Goals', desc: 'Create missions with real targets — "Drink 100 Beers", "Complete 1000 Reps". Numbers don\'t lie.' },
  { icon: Users, title: 'Community Validation', desc: 'Members verify progress through evidence posts and community voting. Social accountability.' },
  { icon: Trophy, title: 'Achievement System', desc: 'Track milestones, earn badges, and celebrate reaching your targets together.' },
];

export default function OneToManyPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Productivity"
        title="OneToMany"
        description="A goal-oriented social platform where users create groups with numeric targets (e.g., 'Drink 100 Beers', 'Complete 1000 Reps'). Members contribute toward goals through validated posts with community voting and approval mechanisms."
        status={{ label: 'Paused', variant: 'paused' }}
        coverTint={getProjectCoverTint('onetomany')}
      />
      <ProjectStatusPlaceholder status="paused" highlights={highlights} />
    </ProjectLayout>
  );
}
