import type { Metadata } from "next";
import { CalendarDays, ShoppingCart, Users } from "lucide-react";
import { FuddyHero } from "@/components/heroes/FuddyHero";
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
  alternates: { canonical: "/portfolio/fuddy" },
  title: "FUDDY — Furma.tech",
  description:
    "A shared meal-planning app for households: a calendar of meals, a dish library and an auto-merged shopping list, synced live with everyone at the table.",
  openGraph: {
    title: "FUDDY",
    description:
      "Plan the week together — meals on a shared calendar, one shopping list for the table.",
    images: [
      getOgImageUrl({
        title: "FUDDY",
        subtitle: "The week, planned together",
        variant: "product",
      }),
    ],
  },
};

const features = [
  {
    icon: CalendarDays,
    title: "The week on one calendar",
    desc: "Meals are planned on a shared calendar and everyone at the table sees the same week — no more \"what's for dinner\" group chat.",
  },
  {
    icon: ShoppingCart,
    title: "Dishes become the list",
    desc: "Ingredients from the planned dishes merge into a single shopping list automatically. Nobody writes it twice, and nothing planned is forgotten.",
  },
  {
    icon: Users,
    title: "Households, not accounts",
    desc: "The household is the account: members share the calendar, the dishes and the list in real time.",
  },
];

export default function FuddyPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Food"
        title="FUDDY"
        description="A shared meal-planning app for households: a calendar of meals, a dish library and an auto-merged shopping list — synced live with everyone at the table."
        status={{ label: "In Development", variant: "soon" }}
        visual={
          <figure className="m-0">
            <FuddyHero className="w-full h-full max-h-[min(100%,420px)] object-contain" />
            <figcaption className="plastic-label mt-2 opacity-80">
              Concept visual — illustrative mock, not a product screenshot
            </figcaption>
          </figure>
        }
      />

      <ProjectSection>
        <ProjectFeatures
          label="How it works"
          title="Plan once, eat all week"
          features={features}
        />
      </ProjectSection>

      <ProjectSection variant="muted">
        <ProjectSectionHeader
          label="State"
          title="Pre-demo"
          description="Auth, billing and email are wired and green locally; the app is not yet public. The release gate — Stripe, OAuth and SES smoke — is the checklist before anyone outside the household sees it."
        />
        <p className="plastic-paragraph max-w-[62ch]">
          The honest demo slice is deliberately small: a household plans a
          week, cooks from it, and the list writes itself. Everything else
          waits behind that.
        </p>
      </ProjectSection>

      <ProjectCTA
        title="Not open yet"
        description="FUDDY is in pre-demo. Write if you want to be told when it opens."
        primaryHref="/#contact"
        primaryLabel="Get updates"
        secondaryHref="/portfolio"
        secondaryLabel="Back to Portfolio"
      />
    </ProjectLayout>
  );
}
