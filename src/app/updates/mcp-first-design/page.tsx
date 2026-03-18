import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MCP-First Design: Why We Bet on Model Context Protocol",
  description: "MCP changes everything about AI integrations. Here's how we're building our entire ecosystem on top of it.",
};

export default function McpFirstDesignPost() {
  return (
    <div className="min-h-screen bg-bg">
      <section className="section">
        <div className="px-6 md:px-12 max-w-3xl">
          <Link href="/updates" className="inline-flex items-center gap-2 text-[13px] text-grey-600 hover:text-fg mb-8 no-underline">
            ← Back to updates
          </Link>
          
          <div className="mb-8">
            <div className="font-mono text-[11px] text-grey-400 mb-2">November 22, 2025</div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-blue-500/10 text-blue-600">
                Technical
              </span>
              <span className="font-mono text-[11px] text-grey-400">8 min read</span>
            </div>
          </div>

          <h1 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-fg mb-8">
            MCP-First Design: Why We Bet on Model Context Protocol
          </h1>

          <div className="prose prose-lg text-grey-600">
            <p className="text-[17px] leading-[1.8] mb-6">
              When Anthropic released the Model Context Protocol, we knew it would change how we built AI products.
              Six months later, our entire ecosystem is built on MCP. Here&apos;s what we learned.
            </p>

            <h2 className="font-serif text-[28px] font-semibold text-fg mt-12 mb-4">What is MCP?</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              MCP is an open protocol for connecting AI models to external tools and data sources. Instead of
              hardcoding integrations, MCP creates a standardized way for AI systems to discover and use tools.
            </p>

            <h2 className="font-serif text-[28px] font-semibold text-fg mt-12 mb-4">Why We Built on MCP</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              Before MCP, every AI integration was custom work. Connect to Twitter? Write a custom integration.
              Connect to a vector DB? Write another custom integration. MCP turns these into plug-and-play modules.
            </p>
            <ul className="space-y-3 mb-6">
              <li><strong className="text-fg">Composability</strong> — Mix and match tools from different providers</li>
              <li><strong className="text-fg">Standardization</strong> — One integration works across all MCP clients</li>
              <li><strong className="text-fg">Future-proofing</strong> — New tools automatically work with existing integrations</li>
            </ul>

            <h2 className="font-serif text-[28px] font-semibold text-fg mt-12 mb-4">The Aitlas Stack</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              Nova is an MCP client. Nexus runtime executes MCP calls. Every Action (f.twyt, f.library, f.rsrx)
              is an MCP server. This means any MCP-compatible AI can use any of our tools without custom code.
            </p>

            <h2 className="font-serif text-[28px] font-semibold text-fg mt-12 mb-4">The Future is Interoperable</h2>
            <p className="text-[17px] leading-[1.8]">
              We believe the AI ecosystem will converge on protocols like MCP. The days of custom integrations
              are numbered. By building on MCP now, we&apos;re ready for whatever comes next.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
