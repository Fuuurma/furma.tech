import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import { ProjectLayout, ProjectHero, ProjectSection, ProjectFeatures, ProjectCTA } from '@/components/ui/ProjectLayout';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'f.guard — AI Code Reviewer | Aitlas | Furma.tech',
  description: 'Autonomous AI code review via MCP. Security analysis, best practices, and quality checks.',
  openGraph: {
    title: 'f.guard — AI Code Reviewer',
    description: 'Autonomous AI code review via MCP.',
    images: [getOgImageUrl({ title: 'f.guard', subtitle: 'AI Code Reviewer', variant: 'aitlas' })],
  },
};

const features = [
  { title: 'Security Analysis', desc: 'Detect vulnerabilities, injection patterns, and unsafe dependencies before they ship.' },
  { title: 'Best Practices', desc: 'Enforce coding standards, naming conventions, and architectural patterns across your codebase.' },
  { title: 'PR Review', desc: 'Automated pull request reviews with contextual feedback — not generic linting.' },
  { title: 'Language Agnostic', desc: 'Works with TypeScript, Python, Go, Rust, and more via MCP protocol integration.' },
  { title: 'Risk Scoring', desc: 'Every change gets a risk score so you can triage reviews by impact.' },
  { title: 'Nexus Integration', desc: 'Long-running review jobs persist across restarts via Nexus durable execution.' },
];

export default function GuardPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Aitlas Action"
        title="f.guard"
        description="Autonomous AI code review via MCP. Security analysis, best practices, and quality checks — before you ship."
        status={{ label: 'In Development', variant: 'beta' }}
      >
        <div className="flex items-center justify-center lg:justify-start">
          <div className="w-16 h-16 border border-foreground flex items-center justify-center">
            <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />
          </div>
        </div>
      </ProjectHero>

      <ProjectSection>
        <ProjectFeatures
          title="Review that doesn't sleep."
          features={features}
        />
      </ProjectSection>

      <ProjectCTA
        variant="light"
        title="Ship with confidence."
        description="Join the waitlist for f.guard — autonomous code review that catches what humans miss."
        primaryHref="/#contact"
        primaryLabel="Get Early Access"
        secondaryHref="/portfolio/aitlas"
        secondaryLabel="Back to Aitlas"
      />
    </ProjectLayout>
  );
}
