import { Metadata } from "next";
import {
  Globe,
  Calendar,
  MapPin,
  Target,
  TrendingUp,
  Shield,
} from "lucide-react";
import {
  ProjectLayout,
  ProjectHero,
  ProjectSection,
  ProjectSectionHeader,
  ProjectFeatures,
  ProjectTrustRow,
  ProjectCTA,
} from "@/components/ui/ProjectLayout";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { getProjectCoverTint } from "@/lib/home-projects";
import { getOgImageUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "GuideTours — Tour Operator Platform | Furma.tech",
  description:
    "Multi-tenant SaaS for tour operators. CRM, staff scheduling, real-time availability, Viator & GetYourGuide sync.",
  openGraph: {
    title: "GuideTours",
    description:
      "Multi-tenant SaaS for tour operators with CRM and OTA integrations.",
    images: [
      getOgImageUrl({
        title: "GuideTours",
        subtitle: "Tour Operator Platform",
        variant: "product",
      }),
    ],
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

const integrations = [
  { name: "Viator", desc: "Millions of travelers worldwide" },
  { name: "GetYourGuide", desc: "Europe's largest tour marketplace" },
  { name: "Airbnb", desc: "Experiences & guest reach" },
  { name: "TripAdvisor", desc: "Vast audience & reviews" },
  { name: "Klook", desc: "Asia-Pacific travel activities" },
  { name: "Booking.com", desc: "Global accommodation & tours" },
];

export default function GuideToursPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Tourism"
        title="GuideTours"
        description="Multi-tenant SaaS platform for tour operators. CRM, staff scheduling, real-time availability, and OTA integrations. Built for Catalonia, designed to scale worldwide."
        status={{ label: "In Development", variant: "beta" }}
        projectId="guidetours"
        coverTint={getProjectCoverTint("guidetours")}
      >
        <ProjectTrustRow items={["Viator ready", "EU based", "GDPR compliant"]} />
      </ProjectHero>

      <ProjectSection>
        <ProjectFeatures label="Features" title="Everything you need" features={features} />
      </ProjectSection>

      <ProjectSection variant="muted">
        <ProjectSectionHeader
          label="Integrations"
          title="Connect everywhere"
          description="Sync with the world's biggest tour marketplaces in real-time."
        />
        <StaggerReveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-foreground/10 border border-foreground/10">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="motion-card bg-background p-6"
            >
              <h3 className="font-sans text-[14px] font-semibold tracking-tight mb-2">
                {integration.name}
              </h3>
              <p className="font-mono text-[11px] text-foreground/60 leading-relaxed">
                {integration.desc}
              </p>
            </div>
          ))}
        </StaggerReveal>
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
