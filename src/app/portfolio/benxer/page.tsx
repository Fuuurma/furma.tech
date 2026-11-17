import type { Metadata } from "next";
import { BarChart3, HardDrive, Scale } from "lucide-react";
import { BenxerHero } from "@/components/heroes/BenxerHero";
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
  alternates: { canonical: "/portfolio/benxer" },
  title: "Benxer — Furma.tech",
  description:
    "A local-first model intelligence explorer: compare published model and effort profiles inside named benchmark cohorts, with sources and uncertainty kept visible.",
  openGraph: {
    title: "Benxer",
    description:
      "Local-first model intelligence — benchmark cohorts, exact profiles, visible sources.",
    images: [
      getOgImageUrl({
        title: "Benxer",
        subtitle: "Model intelligence, locally",
        variant: "product",
      }),
    ],
  },
};

const features = [
  {
    icon: BarChart3,
    title: "Cohorts, not leaderboards",
    desc: "Rankings stay inside one named benchmark and one publication snapshot. Overlapping intervals never pretend to be a verdict.",
  },
  {
    icon: Scale,
    title: "Exact profiles",
    desc: "Model and effort variants are compared as published — including the profiles that carry no score at all.",
  },
  {
    icon: HardDrive,
    title: "Local first",
    desc: "The app binds to loopback, needs no credentials and writes nothing externally. Public capability evidence stays separate from local routing and usage.",
  },
];

export default function BenxerPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="AI Tools"
        title="Benxer"
        description="A local-first model intelligence explorer: compare published model and effort profiles inside named benchmark cohorts — with sources, dates and uncertainty kept visible."
        status={{ label: "In Development", variant: "soon" }}
        visual={
          <figure className="m-0">
            <BenxerHero className="w-full h-full max-h-[min(100%,420px)] object-contain" />
            <figcaption className="plastic-label mt-2 opacity-80">
              Concept visual — illustrative mock, not a product screenshot
            </figcaption>
          </figure>
        }
      />

      <ProjectSection>
        <ProjectFeatures
          label="Method"
          title="Evidence before ranking"
          features={features}
        />
      </ProjectSection>

      <ProjectSection variant="muted">
        <ProjectSectionHeader
          label="State"
          title="In development"
          description="Benxer runs locally today — a static app on loopback with no accounts, no deployment and no external writes. The benchmark sources it reads are public snapshots with their lineage shown."
        />
        <p className="plastic-paragraph max-w-[62ch]">
          The discipline is the product: a number without its cohort, its
          date and its source is not intelligence, it is noise with a chart.
        </p>
      </ProjectSection>

      <ProjectCTA
        title="Still local"
        description="Benxer is in development and runs on your machine. Write if you want to be told when there is more to see."
        primaryHref="/#contact"
        primaryLabel="Get updates"
        secondaryHref="/portfolio"
        secondaryLabel="Back to Portfolio"
      />
    </ProjectLayout>
  );
}
