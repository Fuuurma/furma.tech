import { constructMetadata } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "MCP-First Design | Furma.tech",
  description: "MCP changes everything about AI integrations. Here's how we're building our entire ecosystem on top of it.",
});

export default function McpFirstDesignPost() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <ProjectHero 
        label="Technical Deep-Dive"
        title="MCP-First Design"
        description="MCP changes everything about AI integrations. Here's how we're building our entire ecosystem on top of it."
        status="Technical"
        tags={["November 22, 2025", "8 min read"]}
      />

      <Section variant="default" className="py-24">
        <Container size="sm">
          <Link href="/updates" className="inline-flex items-center gap-2 text-[13px] font-bold text-grey-500 hover:text-amber-600 transition-colors mb-12 no-underline">
            <ArrowLeft className="w-4 h-4" /> Back to updates
          </Link>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-[17px] leading-[1.8] mb-6">
              When Anthropic released the Model Context Protocol, we knew it would change how we built AI products.
              Six months later, our entire ecosystem is built on MCP. Here&apos;s what we learned.
            </p>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">What is MCP?</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              MCP is an open protocol for connecting AI models to external tools and data sources. Instead of
              hardcoding integrations, MCP creates a standardized way for AI systems to discover and use tools.
            </p>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">Why We Built on MCP</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              Before MCP, every AI integration was custom work. Connect to Twitter? Write a custom integration.
              Connect to a vector DB? Write another custom integration. MCP turns these into plug-and-play modules.
            </p>
            <ul className="space-y-4 mb-6 list-none pl-0">
              <li className="flex gap-4">
                <span className="text-amber-600 font-mono font-bold">→</span>
                <span><strong className="text-fg">Composability</strong> — Mix and match tools from different providers</span>
              </li>
              <li className="flex gap-4">
                <span className="text-amber-600 font-mono font-bold">→</span>
                <span><strong className="text-fg">Standardization</strong> — One integration works across all MCP clients</span>
              </li>
              <li className="flex gap-4">
                <span className="text-amber-600 font-mono font-bold">→</span>
                <span><strong className="text-fg">Future-proofing</strong> — New tools automatically work with existing integrations</span>
              </li>
            </ul>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">The Aitlas Stack</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              Nova is an MCP client. Nexus runtime executes MCP calls. Every Action (f.twyt, f.library, f.rsrx)
              is an MCP server. This means any MCP-compatible AI can use any of our tools without custom code.
            </p>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">The Future is Interoperable</h2>
            <p className="text-[17px] leading-[1.8] mb-8">
              We believe the AI ecosystem will converge on protocols like MCP. The days of custom integrations
              are numbered. By building on MCP now, we&apos;re ready for whatever comes next.
            </p>

            <Button href="/projects/aitlas" variant="premium">Discover Aitlas →</Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
