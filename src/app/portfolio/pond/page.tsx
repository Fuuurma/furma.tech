import { Metadata } from "next";
import { CalendarCheck, Inbox, WifiOff } from "lucide-react";
import { PondHero } from "@/components/heroes/PondHero";
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
  alternates: { canonical: "/portfolio/pond" },
  title: "Pond — Furma.tech",
  description:
    "Capture-first personal library and planner: save anything from the internet, keep it readable, pull it into a day.",
  openGraph: {
    title: "Pond",
    description:
      "A capture-first library and planner. Saved things become scheduled work.",
    images: [
      getOgImageUrl({
        title: "Pond",
        subtitle: "Capture, then plan",
        variant: "product",
      }),
    ],
  },
};

const features = [
  {
    icon: CalendarCheck,
    title: "Capture first",
    desc: "Save the link, the post, the page. Nothing has to be filed before it is kept — the library is where thinking starts, not where it ends.",
  },
  {
    icon: Inbox,
    title: "Readable later",
    desc: "A saved thing is kept in a form you can actually read later, not a link that rots into a 404 behind a login.",
  },
  {
    icon: WifiOff,
    title: "Pulled into a day",
    desc: "The planner takes what you captured and gives it a slot. The library and the calendar are the same object seen twice.",
  },
];

export default function PondPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Productivity"
        title="Pond"
        description="A capture-first personal library and planner. Save anything from the internet, keep it readable, and pull it into a day when the time comes."
        status={{ label: "In Development", variant: "soon" }}
        visual={
          <figure className="m-0">
            <PondHero className="w-full h-full max-h-[min(100%,420px)] object-contain" />
            <figcaption className="plastic-label mt-2 opacity-80">
              Concept visual — illustrative mock, not a product screenshot
            </figcaption>
          </figure>
        }
      />

      <ProjectSection>
        <ProjectFeatures
          label="Shape"
          title="Three moves, one library"
          features={features}
        />
      </ProjectSection>

      <ProjectSection variant="muted">
        <ProjectSectionHeader
          label="State"
          title="In development"
          description="The capture half is built and in daily use; the planner half is being built now. It is not open to the public yet."
        />
        <p className="plastic-paragraph max-w-[62ch]">
          Pond is the studio&apos;s own tool first. It is being built against real use
          — the test is whether a captured week can be read back and planned from,
          not whether the feature list is long.
        </p>
      </ProjectSection>

      <ProjectCTA
        title="Not open yet"
        description="Pond is in development. Write if you want to be told when it opens."
        primaryHref="/#contact"
        primaryLabel="Get updates"
        secondaryHref="/portfolio"
        secondaryLabel="Back to Portfolio"
      />
    </ProjectLayout>
  );
}
