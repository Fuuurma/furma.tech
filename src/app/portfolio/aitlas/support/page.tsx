import { Metadata } from 'next';
import { Headset } from 'lucide-react';
import { ProjectLayout, ProjectHero, ProjectSection, ProjectFeatures, ProjectCTA } from '@/components/ui/ProjectLayout';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'f.support — Autonomous Helpdesk | Aitlas | Furma.tech',
  description: 'AI-powered helpdesk that resolves tickets autonomously via MCP. No more templated responses.',
  openGraph: {
    title: 'f.support — Autonomous Helpdesk',
    description: 'AI-powered helpdesk that resolves tickets autonomously.',
    images: [getOgImageUrl({ title: 'f.support', subtitle: 'Autonomous Helpdesk', variant: 'aitlas' })],
  },
};

const features = [
  { title: 'Autonomous Resolution', desc: 'Understands tickets, executes fixes, and closes issues without human handoff for common scenarios.' },
  { title: 'Knowledge Base Sync', desc: 'Learns from f.library to answer questions with your actual documentation, not hallucinations.' },
  { title: 'Multi-Channel', desc: 'Email, Slack, Discord, web widgets — one agent, every channel.' },
  { title: 'Escalation Rules', desc: 'When to loop in a human — configurable thresholds and smart detection.' },
  { title: 'Ticket Analytics', desc: 'Resolution rates, common issues, sentiment trends — understand what your users actually need.' },
  { title: 'Nexus Integration', desc: 'Long-running support sessions survive restarts via Nexus durable execution.' },
];

export default function SupportPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Aitlas Action"
        title="f.support"
        description="AI-powered helpdesk that resolves tickets autonomously via MCP. No more templated responses — actual solutions."
        status={{ label: 'Roadmap', variant: 'roadmap' }}
      >
        <div className="flex items-center justify-center lg:justify-start">
          <div className="w-16 h-16 border border-foreground flex items-center justify-center">
            <Headset className="w-8 h-8" strokeWidth={1.5} />
          </div>
        </div>
      </ProjectHero>

      <ProjectSection>
        <ProjectFeatures
          title="Support that scales."
          features={features}
        />
      </ProjectSection>

      <ProjectCTA
        variant="light"
        title="Helpdesk, reimagined."
        description="Join the waitlist for f.support — autonomous helpdesk that actually helps."
        primaryHref="/#contact"
        primaryLabel="Get Notified"
        secondaryHref="/portfolio/aitlas"
        secondaryLabel="Back to Aitlas"
      />
    </ProjectLayout>
  );
}
