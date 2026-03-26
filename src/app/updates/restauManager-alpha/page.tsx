import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "restauManager Alpha: First Beta Users Onboarded",
  description: "We welcomed our first restaurant partners in Catalonia. Early feedback shows strong product-market fit.",
};

export default function RestauManagerAlphaPost() {
  return (
    <div className="min-h-screen bg-background">
      <section className="section">
        <div className="px-6 md:px-12 max-w-3xl">
          <Link href="/updates" className="inline-flex items-center gap-2 text-[13px] text-grey-600 hover:text-foreground mb-8 no-underline">
            ← Back to updates
          </Link>
          
          <div className="mb-8">
            <div className="font-mono text-[11px] text-grey-400 mb-2">January 15, 2026</div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-fg/10 text-foreground">
                Product
              </span>
              <span className="font-mono text-[11px] text-grey-400">4 min read</span>
            </div>
          </div>

          <h1 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-foreground mb-8">
            restauManager Alpha: First Beta Users Onboarded
          </h1>

          <div className="prose prose-lg text-grey-600">
            <p className="text-[17px] leading-[1.8] mb-6">
              Two weeks ago, we invited our first five restaurant partners in Sitges to try restauManager.
              The goal: validate the core workflow before scaling to more users.
            </p>

            <h2 className="font-serif text-[28px] font-semibold text-foreground mt-12 mb-4">What We Learned</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              The TheFork integration was the primary draw. All five restaurants manage bookings through
              TheFork and were frustrated by the lack of real-time sync with their floor plans.
              That pain point is real and validated.
            </p>

            <h2 className="font-serif text-[28px] font-semibold text-foreground mt-12 mb-4">What Worked</h2>
            <ul className="space-y-3 mb-6">
              <li><strong className="text-foreground">Floor plan editor</strong> — Intuitive enough that no training was needed</li>
              <li><strong className="text-foreground">TheFork sync</strong> — Bookings appear in real-time, no more double-bookings</li>
              <li><strong className="text-foreground">Mobile view</strong> — Staff loved being able to see the floor plan on phones</li>
            </ul>

            <h2 className="font-serif text-[28px] font-semibold text-foreground mt-12 mb-4">What Needs Work</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              Staff scheduling confused everyone initially. We&apos;ll simplify the UI and add a
              &quot;quick assign&quot; mode for same-day shift changes. Also, table analytics need
              better visualization — raw numbers aren&apos;t actionable.
            </p>

            <h2 className="font-serif text-[28px] font-semibold text-foreground mt-12 mb-4">Next Steps</h2>
            <p className="text-[17px] leading-[1.8]">
              We&apos;re onboarding 10 more restaurants this month and targeting 40 by end of Q1.
              If you know a restaurant in Catalonia that needs better reservation management,
              send them our way.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
