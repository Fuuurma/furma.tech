import { constructMetadata } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "restauManager: Development Update | Furma.tech",
  description: "Building restaurant management software for Catalonia. TheFork integration and floor plan management in development.",
});

export default function RestauManagerAlphaPost() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProjectHero 
        label="In Development"
        title="restauManager Development"
        description="Building restaurant management software for Catalonia. TheFork integration and floor plan management in development."
        status="In Dev"
        tags={["January 2026", "4 min read"]}
      />

      <Section variant="default" className="py-24">
        <Container size="sm">
          <Link href="/updates" className="inline-flex items-center gap-2 text-[13px] font-bold text-grey-500 hover:text-amber-600 transition-colors mb-12 no-underline">
            <ArrowLeft className="w-4 h-4" /> Back to updates
          </Link>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-[17px] leading-[1.8] mb-6">
              We&apos;re building restauManager for restaurants in Catalonia. The goal: solve the 
              reservation management problem with TheFork integration.
            </p>

            <h2 className="text-[28px] font-bold text-foreground mt-12 mb-6">What We&apos;re Building</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              The TheFork integration is the core focus. Restaurants manage bookings through
              TheFork and need real-time sync with their floor plans. That&apos;s the pain point we&apos;re solving.
            </p>

            <h2 className="text-[28px] font-bold text-foreground mt-12 mb-6">Planned Features</h2>
            <ul className="space-y-4 mb-6 list-none pl-0">
              <li className="flex gap-4">
                <span className="text-amber-600 font-mono font-bold">→</span>
                <span><strong className="text-foreground">Floor plan editor</strong> — Intuitive visual editor</span>
              </li>
              <li className="flex gap-4">
                <span className="text-amber-600 font-mono font-bold">→</span>
                <span><strong className="text-foreground">TheFork sync</strong> — Real-time booking sync</span>
              </li>
              <li className="flex gap-4">
                <span className="text-amber-600 font-mono font-bold">→</span>
                <span><strong className="text-foreground">Mobile view</strong> — Floor plan access on phones</span>
              </li>
            </ul>

            <h2 className="text-[28px] font-bold text-foreground mt-12 mb-6">Timeline</h2>
            <p className="text-[17px] leading-[1.8] mb-8">
              Currently in active development. Targeting initial release for restaurants in Catalonia.
              If you know a restaurant that needs better reservation management, get in touch.
            </p>

            <Button href="/portfolio/restauramanager" variant="outline">Learn about restauManager →</Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
