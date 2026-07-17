import { Metadata } from "next";
import {
  Calendar,
  MapPin,
  Users,
  BarChart3,
  Clock,
  Shield,
} from "lucide-react";
import {
  ProjectLayout,
  ProjectHero,
  ProjectSection,
  ProjectSectionHeader,
  ProjectFeatures,
  ProjectPricing,
  ProjectTrustRow,
  ProjectCTA,
} from "@/components/ui/ProjectLayout";
import { getProjectCoverTint } from "@/lib/home-projects";
import { getOgImageUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "restauManager — Restaurant Management | Furma.tech",
  description:
    "Complete restaurant management platform with TheFork integration. Floor plans, reservations, and staff coordination.",
  openGraph: {
    title: "restauManager",
    description:
      "Complete restaurant management platform with TheFork integration.",
    images: [
      getOgImageUrl({
        title: "restauManager",
        subtitle: "Restaurant Management",
        variant: "product",
      }),
    ],
  },
};

const features = [
  {
    icon: Calendar,
    title: "TheFork Integration",
    desc: "Real-time sync with TheFork. Reservations appear instantly. No more double bookings or manual entry.",
  },
  {
    icon: MapPin,
    title: "Floor Plan Editor",
    desc: "Interactive drag-and-drop floor plan. Assign tables, track occupancy, and optimize seating in real-time.",
  },
  {
    icon: Users,
    title: "Staff Coordination",
    desc: "Assign sections, track service progress, and communicate with your team. Everyone stays in sync.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Track covers, revenue, peak hours, and customer preferences. Data-driven decisions for your restaurant.",
  },
  {
    icon: Clock,
    title: "Reservation Management",
    desc: "View all reservations in one place. Filter by date, time, or party size. Send confirmations automatically.",
  },
  {
    icon: Shield,
    title: "Customer Database",
    desc: "Build your customer profile database. Track preferences, allergies, and visit history for personalized service.",
  },
];

const tiers = [
  {
    name: "restauManager",
    subtitle: "For restaurants",
    price: "€99",
    period: "/mo",
    annual: "€990/year (2 months free)",
    features: [
      "Unlimited reservations",
      "TheFork integration",
      "Floor plan editor",
      "Staff management",
    ],
  },
  {
    name: "Professional",
    subtitle: "For multi-location",
    price: "€149",
    period: "/mo",
    annual: "€1,490/year (2 months free)",
    features: [
      "Everything in Standard",
      "Multi-location support",
      "Advanced analytics",
      "Priority support",
    ],
  },
];

export default function RestauManagerPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Hospitality"
        title="restauManager"
        description="Complete restaurant management platform with TheFork integration. Floor plans, reservations, staff coordination, and analytics. Built for Catalonia, designed to scale."
        status={{ label: "In Development", variant: "beta" }}
        projectId="restauramanager"
        coverTint={getProjectCoverTint("restauramanager")}
      >
        <ProjectTrustRow items={["TheFork ready", "EU based", "GDPR compliant"]} />
      </ProjectHero>

      <ProjectSection>
        <ProjectFeatures label="Features" title="Everything you need" features={features} />
      </ProjectSection>

      <ProjectSection variant="muted">
        <ProjectSectionHeader
          label="Pricing"
          title="Simple, transparent"
          description="No setup fees. No hidden costs. Cancel anytime."
        />
        <ProjectPricing tiers={tiers} />
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
