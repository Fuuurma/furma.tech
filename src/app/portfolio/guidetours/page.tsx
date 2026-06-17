import { Metadata } from 'next';
import { Globe, Calendar, MapPin, Target, TrendingUp, Shield, CheckCircle2 } from 'lucide-react';
import { ProjectLayout, ProjectHero, ProjectSection, ProjectSectionHeader, ProjectCTA } from '@/components/ui/ProjectLayout';
import { getProjectCoverTint } from '@/lib/home-projects';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'GuideTours — Tour Operator Platform | Furma.tech',
  description: 'Multi-tenant SaaS for tour operators. CRM, staff scheduling, real-time availability, Viator & GetYourGuide sync.',
  openGraph: {
    title: 'GuideTours',
    description: 'Multi-tenant SaaS for tour operators with CRM and OTA integrations.',
    images: [getOgImageUrl({ title: 'GuideTours', subtitle: 'Tour Operator Platform', variant: 'product' })],
  },
};

const features = [
  {
    icon: Globe,
    title: 'Multi-Platform Sync',
    desc: 'Connect with Viator, GetYourGuide, Airbnb Experiences, TripAdvisor, Klook, Booking.com, Expedia. Real-time availability across all.',
  },
  {
    icon: Calendar,
    title: 'Smart Calendar',
    desc: 'Never double-book again. Day/week/month views with real-time availability updates across all connected platforms.',
  },
  {
    icon: MapPin,
    title: 'Route Management',
    desc: 'Plan routes, manage stops, and optimize logistics. Fleet/vehicle assignments and real-time tracking.',
  },
  {
    icon: Target,
    title: 'CRM & Guest Profiles',
    desc: 'Customer lifecycle management with loyalty programs, VIP auto-upgrade, segmentation, and Excel export.',
  },
  {
    icon: TrendingUp,
    title: 'Staff Scheduling',
    desc: 'Guide management, tour scheduling, vacation approval workflow, and shift management.',
  },
  {
    icon: Shield,
    title: 'Stripe Payments',
    desc: 'Factory pattern for multiple payment providers. Secure checkout with automatic reconciliation.',
  },
];

const integrations = [
  { name: 'Viator', desc: 'Millions of travelers worldwide' },
  { name: 'GetYourGuide', desc: "Europe's largest tour marketplace" },
  { name: 'Airbnb', desc: 'Experiences & guest reach' },
  { name: 'TripAdvisor', desc: 'Vast audience & reviews' },
  { name: 'Klook', desc: 'Asia-Pacific travel activities' },
  { name: 'Booking.com', desc: 'Global accommodation & tours' },
];

export default function GuideToursPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Tourism"
        title="GuideTours"
        description="Multi-tenant SaaS platform for tour operators. CRM, staff scheduling, real-time availability, and OTA integrations. Built for Catalonia, designed to scale worldwide."
        status={{ label: 'In Development', variant: 'beta' }}
        coverTint={getProjectCoverTint('guidetours')}
      >
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-foreground/40" strokeWidth={1.5} />
            <span className="font-mono text-[11px] text-muted-foreground">Viator ready</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-foreground/40" strokeWidth={1.5} />
            <span className="font-mono text-[11px] text-muted-foreground">EU based</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-foreground/40" strokeWidth={1.5} />
            <span className="font-mono text-[11px] text-muted-foreground">GDPR compliant</span>
          </div>
        </div>
      </ProjectHero>

      <ProjectSection>
        <ProjectSectionHeader
          label="Features"
          title="Everything you need"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div key={feature.title} className="border border-border p-6 group hover:border-foreground/30 transition-colors">
              <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center mb-5">
                <feature.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-[15px] font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection variant="muted">
        <ProjectSectionHeader
          label="Integrations"
          title="Connect everywhere"
          description="Sync with the world's biggest tour marketplaces in real-time."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {integrations.map((integration) => (
            <div key={integration.name} className="border border-border p-6 group hover:border-foreground/30 transition-colors">
              <h3 className="text-[14px] font-bold text-foreground mb-2">{integration.name}</h3>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{integration.desc}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectCTA
        title="Ready to unify your tours?"
        description="Book a personalized demo. See how GuideTours can save you 8+ hours per week and increase your bookings."
        primaryHref="/#contact"
        primaryLabel="Book Your Demo"
        secondaryHref="/portfolio"
        secondaryLabel="Back to Portfolio"
      />
    </ProjectLayout>
  );
}
