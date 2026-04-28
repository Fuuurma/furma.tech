import { Metadata } from 'next';
import { Building2, Vote, MessageSquare } from 'lucide-react';
import { ProjectLayout, ProjectHero, ProjectStatusPlaceholder } from '@/components/ui/ProjectLayout';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'OpenGovern — Furma.tech',
  description: 'Decentralized governance via polls, forums (Agora), and discussions. Community decision-making made transparent.',
  openGraph: {
    title: 'OpenGovern',
    description: 'Decentralized governance via polls, forums, and discussions.',
    images: [getOgImageUrl({ title: 'OpenGovern', subtitle: 'Direct Democracy', variant: 'product' })],
  },
};

const highlights = [
  { icon: MessageSquare, title: 'Agora Forums', desc: 'Structured discussions that lead to actionable outcomes, not just hot takes.' },
  { icon: Vote, title: 'Community Polls', desc: 'Transparent voting with real outcomes. Every voice weighted, every decision tracked.' },
  { icon: Building2, title: 'Municipal Ready', desc: 'Designed for real civic engagement. From neighborhood to city-wide governance.' },
];

export default function OpenGovernPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Civic Tech"
        title="OpenGovern"
        description="A governance platform where communities make decisions together through polls, forums (Agora), and meaningful discussions — unlike traditional social media's hot takes."
        status={{ label: 'Roadmap', variant: 'roadmap' }}
      />
      <ProjectStatusPlaceholder status="roadmap" highlights={highlights} />
    </ProjectLayout>
  );
}
