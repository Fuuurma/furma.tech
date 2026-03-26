import { constructMetadata } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "restauManager Alpha: First Beta Users Onboarded | Furma.tech",
  description: "We welcomed our first restaurant partners in Catalonia. Early feedback shows strong product-market fit.",
});

export default function RestauManagerAlphaPost() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <ProjectHero 
        label="Product Update"
        title="restauManager Alpha"
        description="We welcomed our first restaurant partners in Catalonia. Early feedback shows strong product-market fit."
        status="Product"
        tags={["January 15, 2026", "4 min read"]}
      />

      <Section variant="default" className="py-24">
        <Container size="sm">
          <Link href="/updates" className="inline-flex items-center gap-2 text-[13px] font-bold text-grey-500 hover:text-amber-600 transition-colors mb-12 no-underline">
            <ArrowLeft className="w-4 h-4" /> Back to updates
          </Link>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-[17px] leading-[1.8] mb-6">
              Two weeks ago, we invited our first five restaurant partners in Sitges to try restauManager.
              The goal: validate the core workflow before scaling to more users.
            </p>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">What We Learned</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              The TheFork integration was the primary draw. All five restaurants manage bookings through
              TheFork and were frustrated by the lack of real-time sync with their floor plans.
              That pain point is real and validated.
            </p>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">What Worked</h2>
            <ul className="space-y-4 mb-6 list-none pl-0">
              <li className="flex gap-4">
                <span className="text-amber-600 font-mono font-bold">→</span>
                <span><strong className="text-fg">Floor plan editor</strong> — Intuitive enough that no training was needed</span>
              </li>
              <li className="flex gap-4">
                <span className="text-amber-600 font-mono font-bold">→</span>
                <span><strong className="text-fg">TheFork sync</strong> — Bookings appear in real-time, no more double-bookings</span>
              </li>
              <li className="flex gap-4">
                <span className="text-amber-600 font-mono font-bold">→</span>
                <span><strong className="text-fg">Mobile view</strong> — Staff loved being able to see the floor plan on phones</span>
              </li>
            </ul>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">What Needs Work</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              Staff scheduling confused everyone initially. We&apos;ll simplify the UI and add a
              &quot;quick assign&quot; mode for same-day shift changes. Also, table analytics need
              better visualization — raw numbers aren&apos;t actionable.
            </p>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">Next Steps</h2>
            <p className="text-[17px] leading-[1.8] mb-8">
              We&apos;re onboarding 10 more restaurants this month and targeting 40 by end of Q1.
              If you know a restaurant in Catalonia that needs better reservation management,
              send them our way.
            </p>

            <Button href="/projects/saas/restauramanager" variant="premium">Learn about restauManager →</Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
