import { constructMetadata } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Why We Chose Bootstrapping Over VC | Furma.tech",
  description: "0% funding. 100% control. Here's our reasoning and what it means for our product roadmap.",
});

export default function WhyBootstrappedPost() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <ProjectHero 
        label="Company Culture"
        title="Why We Chose Bootstrapping"
        description="0% funding. 100% control. Here's our reasoning and what it means for our product roadmap."
        status="Culture"
        tags={["December 10, 2025", "6 min read"]}
      />

      <Section variant="default" className="py-24">
        <Container size="sm">
          <Link href="/updates" className="inline-flex items-center gap-2 text-[13px] font-bold text-grey-500 hover:text-amber-600 transition-colors mb-12 no-underline">
            <ArrowLeft className="w-4 h-4" /> Back to updates
          </Link>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-[17px] leading-[1.8] mb-6">
              When we started Furma.tech, we had a choice: seek venture capital or build with our own money.
              We chose bootstrapping. Here&apos;s why.
            </p>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">The VC Math Doesn&apos;t Work for Us</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              VCs need 10x+ returns. That means a $1M investment needs to become $10M+. For that to happen,
              we need to either exit big or raise at a massive valuation. Both create pressure we don&apos;t want.
            </p>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">Control Matters More Than Capital</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              Every hour we spend on investor relations is an hour not spent building. Every pivot demanded
              by a board is a pivot away from our vision. We want to build what we believe in, not what
              a VC thinks will exit fastest.
            </p>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">Sustainable &gt; Unstoppable</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              The startup narrative pushes &quot;go big or go home.&quot; But a business that earns €3k MRR and grows
              10% monthly is more valuable to us than a unicorn that might never profitability. We can
              run this forever.
            </p>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">What This Means for You</h2>
            <p className="text-[17px] leading-[1.8] mb-8">
              We&apos;re not optimizing for an exit. We&apos;re building tools we believe in and a business that
              can sustain itself. That means our incentives are aligned with yours — we succeed when
              you succeed.
            </p>

            <Button href="/about" variant="premium">Read about our principles →</Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
