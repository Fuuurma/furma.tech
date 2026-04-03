import { constructMetadata } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Introducing Aitlas: A Sovereign AI Ecosystem | Furma.tech",
  description: "Nova, Agents Store, Actions, and Nexus runtime. Building a new kind of AI platform.",
});

export default function AitlasLaunchPost() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <ProjectHero 
        label="In Development"
        title="Introducing Aitlas"
        description="Nova, Agents Store, Actions, and Nexus runtime. Building a new kind of AI platform."
        status="In Dev"
        tags={["2026", "5 min read"]}
      />

      <Section variant="default" className="py-24">
        <Container size="sm">
          <Link href="/updates" className="inline-flex items-center gap-2 text-[13px] font-bold text-grey-500 hover:text-amber-600 transition-colors mb-12 no-underline">
            <ArrowLeft className="w-4 h-4" /> Back to updates
          </Link>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-[17px] leading-[1.8] mb-6">
              We&apos;re building Aitlas — a new kind of AI platform built around three principles:
              your keys, your data, and your agents.
            </p>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">The Problem with AI Today</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              Every AI platform locks you in. They store your data, control your API access, and take a cut of
              every token. We think there&apos;s a better way.
            </p>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">Aitlas Components</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              Aitlas is a modular AI operating system with four core components:
            </p>
            <ul className="space-y-4 mb-6 list-none pl-0">
              <li className="flex gap-4">
                <span className="text-amber-600 font-mono font-bold">→</span>
                <span><strong className="text-fg">Nova</strong> — AI workspace where you bring your own API keys</span>
              </li>
              <li className="flex gap-4">
                <span className="text-amber-600 font-mono font-bold">→</span>
                <span><strong className="text-fg">Nexus runtime</strong> — Background execution for long-running agent tasks</span>
              </li>
              <li className="flex gap-4">
                <span className="text-amber-600 font-mono font-bold">→</span>
                <span><strong className="text-fg">Agents Store</strong> — Marketplace for pre-built AI agents</span>
              </li>
              <li className="flex gap-4">
                <span className="text-amber-600 font-mono font-bold">→</span>
                <span><strong className="text-fg">Actions</strong> — MCP-powered micro-tools (f.twyt, f.library, f.rsrx)</span>
              </li>
            </ul>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">Zero Token Liability</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              With Aitlas, you bring your own API keys. You pay OpenAI or Anthropic directly. We&apos;ll never
              touch your tokens and never profit from your API spend. We make money on compute credits
              for Actions, not on markups.
            </p>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">What&apos;s Next</h2>
            <p className="text-[17px] leading-[1.8] mb-8">
              All components are currently in development. Join the waitlist to get early access when ready.
            </p>

            <Button href="/projects/aitlas" variant="outline">Discover Aitlas →</Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
