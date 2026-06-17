import { Metadata } from 'next';
import { Calendar, MapPin, Users, BarChart3, Clock, Shield, CheckCircle2 } from 'lucide-react';
import { ProjectLayout, ProjectHero, ProjectSection, ProjectSectionHeader, ProjectCTA } from '@/components/ui/ProjectLayout';
import { getProjectCoverTint } from '@/lib/home-projects';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'restauManager — Restaurant Management | Furma.tech',
  description: 'Complete restaurant management platform with TheFork integration. Floor plans, reservations, and staff coordination.',
  openGraph: {
    title: 'restauManager',
    description: 'Complete restaurant management platform with TheFork integration.',
    images: [getOgImageUrl({ title: 'restauManager', subtitle: 'Restaurant Management', variant: 'product' })],
  },
};

const features = [
  {
    icon: Calendar,
    title: 'TheFork Integration',
    desc: 'Real-time sync with TheFork. Reservations appear instantly. No more double bookings or manual entry.',
  },
  {
    icon: MapPin,
    title: 'Floor Plan Editor',
    desc: 'Interactive drag-and-drop floor plan. Assign tables, track occupancy, and optimize seating in real-time.',
  },
  {
    icon: Users,
    title: 'Staff Coordination',
    desc: 'Assign sections, track service progress, and communicate with your team. Everyone stays in sync.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    desc: 'Track covers, revenue, peak hours, and customer preferences. Data-driven decisions for your restaurant.',
  },
  {
    icon: Clock,
    title: 'Reservation Management',
    desc: 'View all reservations in one place. Filter by date, time, or party size. Send confirmations automatically.',
  },
  {
    icon: Shield,
    title: 'Customer Database',
    desc: 'Build your customer profile database. Track preferences, allergies, and visit history for personalized service.',
  },
];

const tiers = [
  {
    name: 'restauManager',
    subtitle: 'For restaurants',
    price: '€99',
    period: '/mo',
    annual: '€990/year (2 months free)',
    features: ['Unlimited reservations', 'TheFork integration', 'Floor plan editor', 'Staff management'],
  },
  {
    name: 'Professional',
    subtitle: 'For multi-location',
    price: '€149',
    period: '/mo',
    annual: '€1,490/year (2 months free)',
    features: ['Everything in Standard', 'Multi-location support', 'Advanced analytics', 'Priority support'],
  },
];

export default function RestauManagerPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Hospitality"
        title="restauManager"
        description="Complete restaurant management platform with TheFork integration. Floor plans, reservations, staff coordination, and analytics. Built for Catalonia, designed to scale."
        status={{ label: 'In Development', variant: 'beta' }}
        coverTint={getProjectCoverTint('restauramanager')}
      >
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-foreground/40" strokeWidth={1.5} />
            <span className="font-mono text-[11px] text-muted-foreground">TheFork ready</span>
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
          label="Pricing"
          title="Simple, transparent"
          description="No setup fees. No hidden costs. Cancel anytime."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          {tiers.map((tier) => (
            <div key={tier.name} className="border border-border p-8">
              <h3 className="text-[15px] font-bold text-foreground">{tier.name}</h3>
              <p className="font-mono text-[11px] text-muted-foreground mb-6">{tier.subtitle}</p>
              <div className="font-serif text-[36px] font-bold text-foreground leading-none mb-1">
                {tier.price}<span className="text-[14px] font-sans text-muted-foreground font-normal">{tier.period}</span>
              </div>
              <p className="font-mono text-[11px] text-muted-foreground mb-6">{tier.annual}</p>
              <ul className="space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[13px] text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-foreground/30" strokeWidth={1.5} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectCTA
        title="Ready to optimize your restaurant?"
        description="Book a personalized demo. See how restauManager can save you 10+ hours per week and increase your revenue."
        primaryHref="/#contact"
        primaryLabel="Book Your Demo"
        secondaryHref="/portfolio"
        secondaryLabel="Back to Portfolio"
      />
    </ProjectLayout>
  );
}
