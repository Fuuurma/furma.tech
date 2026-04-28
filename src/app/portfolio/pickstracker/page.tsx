import { Metadata } from 'next';
import { Trophy, Users, TrendingUp } from 'lucide-react';
import { ProjectLayout, ProjectHero, ProjectStatusPlaceholder } from '@/components/ui/ProjectLayout';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'PicksTracker — Furma.tech',
  description: 'Track your sports predictions, compete with friends, and build your track record with social prediction features.',
  openGraph: {
    title: 'PicksTracker',
    description: 'Sports pick tracking with social predictions and competition.',
    images: [getOgImageUrl({ title: 'PicksTracker', subtitle: 'Sports Predictions', variant: 'product' })],
  },
};

const highlights = [
  { icon: Trophy, title: 'Pick Tracking', desc: 'Track predictions across NFL, NBA, football, and more with a detailed accuracy dashboard.' },
  { icon: Users, title: 'Social Competition', desc: 'Compete with friends on prediction accuracy. Leaderboards, streaks, and bragging rights.' },
  { icon: TrendingUp, title: 'Analytics Engine', desc: 'Detailed stats on your prediction history, win rate, and best-performing sports.' },
];

export default function PicksTrackerPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Sports"
        title="PicksTracker"
        description="Track your sports predictions across multiple sports, compete with friends, and build your track record with detailed analytics and social prediction features."
        status={{ label: 'Roadmap', variant: 'roadmap' }}
      />
      <ProjectStatusPlaceholder status="roadmap" highlights={highlights} />
    </ProjectLayout>
  );
}
