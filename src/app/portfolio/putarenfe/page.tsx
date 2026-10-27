import { Metadata } from "next";
import { Activity, Clock, Radio } from "lucide-react";
import { RenfeHero } from "@/components/heroes/RenfeHero";
import {
  ProjectLayout,
  ProjectHero,
  ProjectSection,
  ProjectSectionHeader,
  ProjectFeatures,
  ProjectCTA,
} from "@/components/ui/ProjectLayout";
import { getOgImageUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  alternates: { canonical: "/portfolio/putarenfe" },
  title: "Renfe — Furma.tech",
  description:
    "A public Renfe reliability dashboard: delays, cancellations and skipped stops measured every day from the operator&apos;s own open-data feeds.",
  openGraph: {
    title: "Renfe",
    description:
      "Public Renfe reliability dashboard. Official data, measured every day.",
    images: [
      getOgImageUrl({
        title: "Renfe",
        subtitle: "Measured, not complained about",
        variant: "product",
      }),
    ],
  },
};

const features = [
  {
    icon: Activity,
    title: "Measured daily",
    desc: "Delays, cancellations, skipped stops and late minutes are collected from Renfe's own open-data feeds every day — not typed in from anecdotes.",
  },
  {
    icon: Clock,
    title: "Lines and stations",
    desc: "The dashboard answers which lines and stations hurt the most, and how many minutes passengers are actually losing.",
  },
  {
    icon: Radio,
    title: "The source is visible",
    desc: "When a feed is missing or unhealthy, the dashboard says so. A number nobody can trace is worse than no number.",
  },
];

export default function RenfePage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Civic Tech"
        title="Renfe"
        description="A public dashboard for Renfe reliability: delays, cancellations and skipped stops, measured every day from the operator&apos;s own open-data feeds and Adif infrastructure data."
        status={{ label: "In Development", variant: "soon" }}
        visual={
          <figure className="m-0">
            <RenfeHero className="w-full h-full max-h-[min(100%,420px)] object-contain" />
            <figcaption className="plastic-label mt-2 opacity-80">
              Concept visual — illustrative mock, not a product screenshot
            </figcaption>
          </figure>
        }
      />

      <ProjectSection>
        <ProjectFeatures
          label="Method"
          title="Numbers that can be defended"
          features={features}
        />
      </ProjectSection>

      <ProjectSection variant="muted">
        <ProjectSectionHeader
          label="State"
          title="In development"
          description="The collection and the measurement are being built now; the dashboard is not public yet. The tone can be blunt — the numbers have to hold."
        />
        <p className="plastic-paragraph max-w-[62ch]">
          This is a civic instrument before it is a product: its value is that a
          passenger can check a claim about their line and find the measurement
          behind it.
        </p>
      </ProjectSection>

      <ProjectCTA
        title="Not public yet"
        description="The Renfe dashboard is in development. Write if you want to be told when it opens."
        primaryHref="/#contact"
        primaryLabel="Get updates"
        secondaryHref="/portfolio"
        secondaryLabel="Back to Portfolio"
      />
    </ProjectLayout>
  );
}
