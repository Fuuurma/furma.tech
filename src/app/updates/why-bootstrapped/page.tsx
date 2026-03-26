import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why We Chose Bootstrapping Over VC",
  description: "0% funding. 100% control. Here's our reasoning and what it means for our product roadmap.",
};

export default function WhyBootstrappedPost() {
  return (
    <div className="min-h-screen bg-background">
      <section className="section">
        <div className="px-6 md:px-12 max-w-3xl">
          <Link href="/updates" className="inline-flex items-center gap-2 text-[13px] text-grey-600 hover:text-foreground mb-8 no-underline dark:text-grey-400 dark:hover:text-grey-300">
            ← Back to updates
          </Link>

          <div className="mb-8">
            <div className="font-mono text-[11px] text-grey-400 mb-2">December 10, 2025</div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-foreground/10 text-foreground">
                Company
              </span>
              <span className="font-mono text-[11px] text-grey-400">6 min read</span>
            </div>
          </div>

          <h1 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-foreground mb-8">
            Why We Chose Bootstrapping Over VC
          </h1>

          <div className="prose prose-lg text-grey-600">
            <p className="text-[17px] leading-[1.8] mb-6">
              When we started Furma.tech, we had a choice: seek venture capital or build with our own money.
              We chose bootstrapping. Here&apos;s why.
            </p>

            <h2 className="font-serif text-[28px] font-semibold text-foreground mt-12 mb-4">The VC Math Doesn&apos;t Work for Us</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              VCs need 10x+ returns. That means a $1M investment needs to become $10M+. For that to happen,
              we need to either exit big or raise at a massive valuation. Both create pressure we don&apos;t want.
            </p>

            <h2 className="font-serif text-[28px] font-semibold text-foreground mt-12 mb-4">Control Matters More Than Capital</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              Every hour we spend on investor relations is an hour not spent building. Every pivot demanded
              by a board is a pivot away from our vision. We want to build what we believe in, not what
              a VC thinks will exit fastest.
            </p>

            <h2 className="font-serif text-[28px] font-semibold text-foreground mt-12 mb-4">Sustainable &gt; Unstoppable</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              The startup narrative pushes &quot;go big or go home.&quot; But a business that earns €3k MRR and grows
              10% monthly is more valuable to us than a unicorn that might never profitability. We can
              run this forever.
            </p>

            <h2 className="font-serif text-[28px] font-semibold text-foreground mt-12 mb-4">What This Means for You</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              We&apos;re not optimizing for an exit. We&apos;re building tools we believe in and a business that
              can sustain itself. That means our incentives are aligned with yours — we succeed when
              you succeed.
            </p>

            <p className="text-[17px] leading-[1.8]">
              No VC pressure. No growth-at-all-costs mentality. Just software that works and a business
              that lasts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
