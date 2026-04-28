import { Metadata } from "next";
import { Globe, Target, Home, MapPin, Sparkles, Star, Shield, TrendingUp, CheckCircle2, Calendar } from "lucide-react";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { ProjectLayout, ProjectHero, ProjectSection, ProjectSectionHeader, ProjectCTA } from "@/components/ui/ProjectLayout";
import { getOgImageUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "GuideTours — Tour Operator Platform | Furma.tech",
  description: "Multi-tenant SaaS for tour operators. CRM, staff scheduling, real-time availability, Viator & GetYourGuide sync.",
  openGraph: {
    title: "GuideTours",
    description: "Multi-tenant SaaS for tour operators with CRM and OTA integrations.",
    images: [getOgImageUrl({ title: "GuideTours", subtitle: "Tour Operator Platform", variant: "product" })],
  },
};

const features = [
  {
    icon: Globe,
    title: "Multi-Platform Sync",
    desc: "Connect with Viator, GetYourGuide, Airbnb Experiences, TripAdvisor, Klook, Booking.com, Expedia. Real-time availability across all.",
  },
  {
    icon: Calendar,
    title: "Smart Calendar",
    desc: "Never double-book again. Day/week/month views with real-time availability updates across all connected platforms.",
  },
  {
    icon: MapPin,
    title: "Route Management",
    desc: "Plan routes, manage stops, and optimize logistics. Fleet/vehicle assignments and real-time tracking.",
  },
  {
    icon: Target,
    title: "CRM & Guest Profiles",
    desc: "Customer lifecycle management with loyalty programs, VIP auto-upgrade, segmentation, and Excel export.",
  },
  {
    icon: TrendingUp,
    title: "Staff Scheduling",
    desc: "Guide management, tour scheduling, vacation approval workflow, and shift management.",
  },
  {
    icon: Shield,
    title: "Stripe Payments",
    desc: "Factory pattern for multiple payment providers. Secure checkout with automatic reconciliation.",
  },
];

const benefits = [
  { icon: Calendar, stat: "8h+", title: "Time Savings", desc: "Save 8+ hours per week by eliminating manual booking entry across platforms." },
  { icon: TrendingUp, stat: "20%", title: "Revenue Growth", desc: "Increase bookings and reduce no-shows through unified calendar management." },
  { icon: Star, stat: "4.9★", title: "Better Service", desc: "Deliver unforgettable customer experiences with coordinated tour operations." },
  { icon: Shield, stat: "99.9%", title: "Reliability", desc: "Dependable infrastructure that keeps your tours synced across all platforms." },
];

const integrations = [
  { icon: Globe, name: "Viator", desc: "Access to millions of travelers worldwide" },
  { icon: Target, name: "GetYourGuide", desc: "Europe's largest online tour marketplace" },
  { icon: Home, name: "Airbnb", desc: "Reach Airbnb guests and experiences" },
  { icon: MapPin, name: "TripAdvisor", desc: "Connect with TripAdvisor's vast audience" },
];

export default function GuideToursPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Tourism"
        title="GuideTours"
        description="Multi-tenant SaaS platform for tour operators. CRM, staff scheduling, real-time availability, and OTA integrations. Built for Catalonia, designed to scale worldwide."
        status={{ label: 'In Development', variant: 'beta' }}
      >
        <div className="flex items-center gap-8 mt-4 pt-4 border-t border-grey-200 dark:border-grey-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-[13px] text-grey-600 dark:text-grey-400">Viator ready</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-[13px] text-grey-600 dark:text-grey-400">EU based</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-[13px] text-grey-600 dark:text-grey-400">GDPR compliant</span>
          </div>
        </div>
      </ProjectHero>

      <ProjectSection>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-grey-100 dark:bg-grey-800 border border-grey-200 dark:border-grey-700 mb-6">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-grey-600 dark:text-grey-400">Why Choose Us</span>
          </div>
          <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-[1.08] tracking-tight text-foreground">Built for impact</h2>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={benefit.title} delay={index * 50}>
              <div className="p-6 sm:p-8 border border-foreground/10 hover:border-foreground/30 rounded-lg transition-all text-center h-full group">
                <div className="text-[48px] font-serif font-bold text-purple-500 mb-4">{benefit.stat}</div>
                <div className="w-14 h-14 rounded-xl bg-foreground text-background flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-[16px] font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{benefit.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </StaggerChildren>
      </ProjectSection>

      <ProjectSection variant="muted">
        <ProjectSectionHeader
          label="Features"
          title="Everything you need"
        />

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 50}>
              <div className="p-6 border border-foreground/10 hover:border-foreground/30 transition-all h-full bg-background">
                <div className="w-12 h-12 rounded-xl bg-foreground text-background flex items-center justify-center mb-6 shadow-lg">
                  <feature.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-[15px] font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-[13px] text-grey-600 dark:text-grey-400 leading-relaxed">{feature.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </StaggerChildren>
      </ProjectSection>

      <ProjectSection>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-grey-100 dark:bg-grey-800 border border-grey-200 dark:border-grey-700 mb-6">
            <Globe className="w-4 h-4 text-purple-500" />
            <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-grey-600 dark:text-grey-400">Integrations</span>
          </div>
          <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-[1.08] tracking-tight text-foreground">Connect everywhere</h2>
          <p className="text-[14px] text-grey-600 dark:text-grey-400 mt-4">Sync with the world&apos;s biggest tour marketplaces.</p>
        </div>

        <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {integrations.map((integration, index) => (
            <ScrollReveal key={integration.name} delay={index * 50}>
              <div className="p-6 border border-foreground/10 hover:border-foreground/30 rounded-lg transition-all text-center bg-background">
                <div className="w-14 h-14 rounded-xl bg-foreground text-background flex items-center justify-center mx-auto mb-4">
                  <integration.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-[14px] font-bold text-foreground mb-2">{integration.name}</h3>
                <p className="text-[11px] text-grey-600 dark:text-grey-400">{integration.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </StaggerChildren>
      </ProjectSection>

      <ProjectCTA
        title="Ready to unify your tours?"
        description="Book a personalized demo. See how GuideTours can save you 8+ hours per week and increase your bookings by 20%."
        primaryHref="/#contact"
        primaryLabel="Book Your Demo"
        secondaryHref="/portfolio"
        secondaryLabel="Back to Portfolio"
      />
    </ProjectLayout>
  );
}