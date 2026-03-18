import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Introducing Aitlas: A Sovereign AI Ecosystem",
  description: "Nova, GWagents Store, Actions, and Nexus runtime. The pieces are coming together for a new kind of AI platform.",
};

export default function AitlasLaunchPost() {
  return (
    <div className="min-h-screen bg-bg">
      <section className="section">
        <div className="px-6 md:px-12 max-w-3xl">
          <Link href="/updates" className="inline-flex items-center gap-2 text-[13px] text-grey-600 hover:text-fg mb-8 no-underline">
            ← Back to updates
          </Link>
          
          <div className="mb-8">
            <div className="font-mono text-[11px] text-grey-400 mb-2">October 30, 2025</div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-purple-500/10 text-purple-600">
                Announcement
              </span>
              <span className="font-mono text-[11px] text-grey-400">5 min read</span>
            </div>
          </div>

          <h1 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-fg mb-8">
            Introducing Aitlas: A Sovereign AI Ecosystem
          </h1>

          <div className="prose prose-lg text-grey-600">
            <p className="text-[17px] leading-[1.8] mb-6">
              Today we&apos;re launching Aitlas — a new kind of AI platform built around three principles:
              your keys, your data, and your agents.
            </p>

            <h2 className="font-serif text-[28px] font-semibold text-fg mt-12 mb-4">The Problem with AI Today</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              Every AI platform locks you in. They store your data, control your API access, and take a cut of
              every token. We think there&apos;s a better way.
            </p>

            <h2 className="font-serif text-[28px] font-semibold text-fg mt-12 mb-4">Introducing Aitlas</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              Aitlas is a modular AI operating system with four core components:
            </p>
            <ul className="space-y-3 mb-6">
              <li><strong className="text-fg">Nova</strong> — AI workspace where you bring your own API keys</li>
              <li><strong className="text-fg">Nexus runtime</strong> — Background execution for long-running agent tasks</li>
              <li><strong className="text-fg">GWagents Store</strong> — Marketplace for pre-built AI agents</li>
              <li><strong className="text-fg">Actions</strong> — MCP-powered micro-tools (f.twyt, f.library, f.rsrx)</li>
            </ul>

            <h2 className="font-serif text-[28px] font-semibold text-fg mt-12 mb-4">Zero Token Liability</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              With Aitlas, you bring your own API keys. You pay OpenAI or Anthropic directly. We never
              touch your tokens and never profit from your API spend. We make money on compute credits
              for Actions, not on markups.
            </p>

            <h2 className="font-serif text-[28px] font-semibold text-fg mt-12 mb-4">What&apos;s Next</h2>
            <p className="text-[17px] leading-[1.8]">
              f.twyt and f.library are live today. Nexus runtime and the GWagents Store are coming soon.
              Join the waitlist to get early access.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
