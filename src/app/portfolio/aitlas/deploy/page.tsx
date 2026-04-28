import { Metadata } from 'next';
import { Rocket } from 'lucide-react';
import { ProjectLayout, ProjectHero, ProjectSection, ProjectFeatures, ProjectCTA } from '@/components/ui/ProjectLayout';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'f.deploy — Infrastructure Deployer | Aitlas | Furma.tech',
  description: 'AI-driven infrastructure deployment via MCP. Describe your infra, get production-ready configs.',
  openGraph: {
    title: 'f.deploy — Infrastructure Deployer',
    description: 'AI-driven infrastructure deployment via MCP.',
    images: [getOgImageUrl({ title: 'f.deploy', subtitle: 'Infra Deployer', variant: 'aitlas' })],
  },
};

const features = [
  { title: 'Natural Language Infra', desc: 'Describe your architecture in plain English — get Terraform, Docker, and Kubernetes configs.' },
  { title: 'Multi-Cloud', desc: 'AWS, GCP, Azure, or bare metal. One agent, every provider.' },
  { title: 'Best Practices', desc: 'Security groups, IAM roles, networking — all following cloud provider recommendations.' },
  { title: 'Rollback Support', desc: 'Failed deployment? Nexus ensures you can roll back to the last known good state.' },
  { title: 'Cost Estimation', desc: 'Get cost projections before you deploy — no surprise bills.' },
  { title: 'Nexus Integration', desc: 'Long-running deployments survive restarts via Nexus durable execution.' },
];

export default function DeployPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Aitlas Action"
        title="f.deploy"
        description="AI-driven infrastructure deployment via MCP. Describe your infra in plain English, get production-ready Terraform, Docker, and Kubernetes configs."
        status={{ label: 'Roadmap', variant: 'roadmap' }}
      >
        <div className="flex items-center justify-center lg:justify-start">
          <div className="w-16 h-16 border border-foreground flex items-center justify-center">
            <Rocket className="w-8 h-8" strokeWidth={1.5} />
          </div>
        </div>
      </ProjectHero>

      <ProjectSection>
        <ProjectFeatures
          title="Deploy at the speed of thought."
          features={features}
        />
      </ProjectSection>

      <ProjectCTA
        variant="light"
        title="Infra that builds itself."
        description="Join the waitlist for f.deploy — autonomous infrastructure deployment via MCP."
        primaryHref="/#contact"
        primaryLabel="Get Notified"
        secondaryHref="/portfolio/aitlas"
        secondaryLabel="Back to Aitlas"
      />
    </ProjectLayout>
  );
}
