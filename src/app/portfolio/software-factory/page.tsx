import type { Metadata } from "next";
import { ListChecks, LockKeyhole, Workflow } from "lucide-react";
import { SoftwareFactoryHero } from "@/components/heroes/SoftwareFactoryHero";
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
  alternates: { canonical: "/portfolio/software-factory" },
  title: "Software Factory — Furma.tech",
  description:
    "The studio's own control plane for agentic work: portfolio state, work queues, machine policy and verification gates in one private system.",
  openGraph: {
    title: "Software Factory",
    description:
      "One private system runs the studio's agentic work — queues, policy and gates included.",
    images: [
      getOgImageUrl({
        title: "Software Factory",
        subtitle: "The studio's agentic control plane",
        variant: "product",
      }),
    ],
  },
};

const features = [
  {
    icon: Workflow,
    title: "One queue, many workers",
    desc: "Work is claimed, heartbeated and landed through a single ledger, so lanes cannot silently overlap and nothing is lost when a session ends.",
  },
  {
    icon: ListChecks,
    title: "Policy as code",
    desc: "Machine policy, the project registry and agent profiles live in the repository — every worker reads the same rules on every machine.",
  },
  {
    icon: LockKeyhole,
    title: "Gates before landing",
    desc: "Lint, tests, builds and review evidence are required before work reaches the main line. A red gate is reported, never hidden.",
  },
];

export default function SoftwareFactoryPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Agent Infrastructure"
        title="Software Factory"
        description="The system the studio's agents run on: one private repository holding portfolio state, work queues, machine policy and the verification gates every change passes through."
        status={{ label: "In Development", variant: "soon" }}
        visual={
          <figure className="m-0">
            <SoftwareFactoryHero className="w-full h-full max-h-[min(100%,420px)] object-contain" />
            <figcaption className="plastic-label mt-2 opacity-80">
              Concept visual — illustrative mock, not a product screenshot
            </figcaption>
          </figure>
        }
      />

      <ProjectSection>
        <ProjectFeatures
          label="Method"
          title="How work moves"
          features={features}
        />
      </ProjectSection>

      <ProjectSection variant="muted">
        <ProjectSectionHeader
          label="State"
          title="Private by design"
          description="Software Factory coordinates the studio's own work — there is no public surface and nothing to sign up for. It is listed here because it is what the rest of the catalogue is built with."
        />
        <p className="plastic-paragraph max-w-[62ch]">
          Every other project on this page was planned, claimed and verified
          through it. Its value is measured in landed work, not in users.
        </p>
      </ProjectSection>

      <ProjectCTA
        title="Built with it, every day"
        description="The factory is how the studio ships — ask how it works."
        primaryHref="/#contact"
        primaryLabel="Get in touch"
        secondaryHref="/portfolio"
        secondaryLabel="Back to Portfolio"
      />
    </ProjectLayout>
  );
}
