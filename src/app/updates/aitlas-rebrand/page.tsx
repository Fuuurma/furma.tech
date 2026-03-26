import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aitlas Rebrand: Nexus → Nova, f.loop → Nexus runtime",
  description: "We updated our product naming to better reflect the ecosystem architecture. Here's what changed and why.",
};

export default function AitlasRebrandPost() {
  return (
    <div className="min-h-screen bg-background">
      <section className="section">
        <div className="px-6 md:px-12 max-w-3xl">
          <Link href="/updates" className="inline-flex items-center gap-2 text-[13px] text-grey-600 hover:text-foreground mb-8 no-underline">
            ← Back to updates
          </Link>
          
          <div className="mb-8">
            <div className="font-mono text-[11px] text-grey-400 mb-2">March 9, 2026</div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-fg/10 text-foreground">
                Product
              </span>
              <span className="font-mono text-[11px] text-grey-400">5 min read</span>
            </div>
          </div>

          <h1 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-foreground mb-8">
            Aitlas Rebrand: Nexus → Nova, f.loop → Nexus runtime
          </h1>

          <div className="prose prose-lg text-grey-600">
            <p className="text-[17px] leading-[1.8] mb-6">
              When we first built our agentic stack, the naming was functional but didn&apos;t reflect the
              architecture clearly. After user feedback and internal discussions, we&apos;ve updated the
              product names to better communicate what each piece does.
            </p>

            <h2 className="font-serif text-[28px] font-semibold text-foreground mt-12 mb-4">What Changed</h2>
            <ul className="space-y-3 mb-6">
              <li><strong className="text-foreground">Nexus</strong> is now <strong className="text-foreground">Nova</strong> — our AI workspace where users bring their own keys and chat with agents</li>
              <li><strong className="text-foreground">f.loop</strong> is now <strong className="text-foreground">Nexus runtime</strong> — the durable execution engine behind the scenes</li>
              <li><strong className="text-foreground">f.xyz Actions</strong> remain the same — our suite of MCP-powered micro-tools</li>
            </ul>

            <h2 className="font-serif text-[28px] font-semibold text-foreground mt-12 mb-4">Why the Change</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              Users kept confusing &quot;Nexus&quot; (the hub) with &quot;Nexus runtime&quot; (the worker). By renaming
              the hub to Nova, we create a clear distinction: Nova is where you interact, Nexus is
              where your tasks run.
            </p>

            <p className="text-[17px] leading-[1.8] mb-6">
              The &quot;f.loop → Nexus runtime&quot; rename reflects that f.loop was never just a loop — it
              includes the worker process, state persistence, and the entire durable execution model.
            </p>

            <h2 className="font-serif text-[28px] font-semibold text-foreground mt-12 mb-4">What This Means for You</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              If you&apos;re already using our tools, nothing changes operationally. The APIs remain the
              same, the credit system is unchanged, and all your existing integrations will continue
              to work.
            </p>

            <p className="text-[17px] leading-[1.8]">
              The rebrand is cosmetic — it helps us communicate the architecture more clearly as we
              prepare for public launch.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
