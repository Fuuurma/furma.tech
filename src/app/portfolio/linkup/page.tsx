import { Metadata } from 'next';
import { Video, Shuffle, Shield } from 'lucide-react';
import { ProjectLayout, ProjectHero, ProjectStatusPlaceholder } from '@/components/ui/ProjectLayout';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'LinkUp — Furma.tech',
  description: 'Random & contact-based professional matching via short video profiles. Chat, video, voice with privacy control.',
  openGraph: {
    title: 'LinkUp',
    description: 'Professional matching via short video. Chat, video, voice with privacy control.',
    images: [getOgImageUrl({ title: 'LinkUp', subtitle: 'Professional Network', variant: 'product' })],
  },
};

const highlights = [
  { icon: Video, title: 'Short Video Profiles', desc: 'Introduce yourself in 30 seconds. Let your personality do the talking.' },
  { icon: Shuffle, title: 'Random Matching', desc: 'Omegle-style professional connections. Meet someone new with every tap.' },
  { icon: Shield, title: 'Privacy Controls', desc: 'You choose who sees what. Chat, video, and voice with full privacy management.' },
];

export default function LinkUpPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Social"
        title="LinkUp"
        description="A social communication platform featuring random stranger connections (Omegle-style), contact-based connections, and multi-modal communication including chat, video, and voice with privacy controls."
        status={{ label: 'Paused', variant: 'paused' }}
      />
      <ProjectStatusPlaceholder status="paused" highlights={highlights} />
    </ProjectLayout>
  );
}
