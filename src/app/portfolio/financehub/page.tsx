import { Metadata } from 'next';
import { TrendingUp, Zap, BarChart3 } from 'lucide-react';
import { ProjectLayout, ProjectHero, ProjectStatusPlaceholder } from '@/components/ui/ProjectLayout';
import { getProjectCoverTint } from '@/lib/home-projects';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'FinanceHub — Furma.tech',
  description: 'Track stocks, crypto, ETFs with 18 data providers, real-time WebSocket streaming, technical analytics, and custom alerts.',
  openGraph: {
    title: 'FinanceHub',
    description: 'Track stocks, crypto, ETFs. 18 data providers, real-time streaming, technical analytics.',
    images: [getOgImageUrl({ title: 'FinanceHub', subtitle: 'Market Data', variant: 'product' })],
  },
};

const highlights = [
  { icon: TrendingUp, title: '18 Data Providers', desc: 'Aggregate stocks, crypto, ETFs, and indices from multiple data sources in one dashboard.' },
  { icon: Zap, title: 'Real-time Streaming', desc: 'WebSocket-powered live data with multi-tier caching achieving 85-95% hit rate.' },
  { icon: BarChart3, title: 'Technical Analytics', desc: '10+ technical indicators with custom alerting and portfolio tracking.' },
];

export default function FinanceHubPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Finance"
        title="FinanceHub"
        description="Track stocks, crypto, ETFs and more with 18 data providers integrated. Real-time WebSocket streaming, multi-tier caching with 85-95% hit rate, and 10+ technical indicators."
        status={{ label: 'Paused', variant: 'paused' }}
        projectId="financehub"
        coverTint={getProjectCoverTint('financehub')}
      />
      <ProjectStatusPlaceholder status="paused" highlights={highlights} />
    </ProjectLayout>
  );
}
