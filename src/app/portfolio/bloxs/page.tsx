import { Metadata } from "next";
import { BookOpen, Boxes, ShieldCheck } from "lucide-react";
import { BloxsHero } from "@/components/heroes/BloxsHero";
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
  alternates: { canonical: "/portfolio/bloxs" },
  title: "Bloxs — Furma.tech",
  description:
    "A component library built the other way round: every piece is studied from a named source, rebuilt from scratch, and shipped with its provenance.",
  openGraph: {
    title: "Bloxs",
    description:
      "Components studied from a named source, rebuilt from scratch, shipped with provenance.",
    images: [
      getOgImageUrl({
        title: "Bloxs",
        subtitle: "A studied component library",
        variant: "product",
      }),
    ],
  },
};

const features = [
  {
    icon: BookOpen,
    title: "Studied, then rebuilt",
    desc: "Every piece starts from a named source with its licence recorded. Nothing is copied wholesale; the mechanics are learned and the code is written again.",
  },
  {
    icon: Boxes,
    title: "Provenance is part of the piece",
    desc: "A component without its source is a component nobody can trust. The record travels with the code, including what was deliberately not taken.",
  },
  {
    icon: ShieldCheck,
    title: "One authored moment",
    desc: "Each piece carries one motion idea rather than a pile of effects — the same discipline the rest of the studio's work is held to.",
  },
];

export default function BloxsPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Design Tools"
        title="Bloxs"
        description="A component library built the other way round: every piece is studied from a named source, rebuilt from scratch, and shipped with its provenance. A prototype, running locally."
        status={{ label: "Prototype", variant: "soon" }}
        visual={
          <figure className="m-0">
            <BloxsHero className="w-full h-full max-h-[min(100%,420px)] object-contain" />
            <figcaption className="plastic-label mt-2 opacity-80">
              Concept visual — illustrative mock, not a product screenshot
            </figcaption>
          </figure>
        }
      />

      <ProjectSection>
        <ProjectFeatures
          label="Method"
          title="How a blox is made"
          features={features}
        />
      </ProjectSection>

      <ProjectSection variant="muted">
        <ProjectSectionHeader
          label="State"
          title="Prototype"
          description="The library runs and the catalogue is real; it is not published yet. The pieces that are ready are the ones that survived being rebuilt rather than copied."
        />
        <p className="plastic-paragraph max-w-[62ch]">
          The catalogue is deliberately private while the provenance and rights
          work is unfinished: a public library has to be able to say where every
          line came from.
        </p>
      </ProjectSection>

      <ProjectCTA
        title="Not published yet"
        description="Bloxs is a prototype. Write if you want to see the catalogue when it opens."
        primaryHref="/#contact"
        primaryLabel="Get updates"
        secondaryHref="/portfolio"
        secondaryLabel="Back to Portfolio"
      />
    </ProjectLayout>
  );
}
