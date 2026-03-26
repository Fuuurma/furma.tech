import { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { Section, Container } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StaggerChildren, ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = constructMetadata({
  title: "Documentation — Furma.tech",
  description: "Developer documentation for Aitlas ecosystem, MCP integrations, and Actions API.",
});

const docs = [
  {
    category: "Quick Start",
    items: [
      { title: "Introduction to Aitlas", href: "/projects/aitlas", description: "Learn about the sovereign AI ecosystem" },
      { title: "Your first action", href: "/projects/aitlas/twyt", description: "Use f.twyt for Twitter intelligence in 5 minutes" },
      { title: "MCP integration guide", href: "#mcp-integration", description: "Connect Actions to Claude, Cursor, or your own agent" },
    ],
  },
  {
    category: "Core Products",
    items: [
      { title: "Nova - AI Workspace", href: "/projects/aitlas/nova", description: "BYOK AI workspace with multi-provider support" },
      { title: "Nexus - Agent Runtime", href: "/projects/aitlas/nexus", description: "Durable execution for long-running agent tasks" },
      { title: "GWagents Store", href: "/projects/aitlas/agents", description: "Marketplace for pre-built AI agents" },
    ],
  },
  {
    category: "Actions (f.xyz)",
    items: [
      { title: "f.twyt - Twitter Intelligence", href: "/projects/aitlas/twyt", description: "Semantic search and ingestion for X/Twitter" },
      { title: "f.library - Vector Knowledge", href: "/projects/aitlas/library", description: "Upload and search your documents with AI" },
      { title: "f.pay - Credit Payments", href: "/projects/aitlas/pay", description: "Manage compute credits and payment history" },
    ],
  },
  {
    category: "Industry SaaS",
    items: [
      { title: "restauManager Sync", href: "/projects/saas/restauramanager", description: "Real-time synchronization with TheFork API" },
      { title: "GuideTours Viator", href: "/projects/saas/guidetours", description: "Automated booking ingestion from Viator" },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <ProjectHero 
        label="Developer Portal"
        title="Documentation"
        description="Complete documentation for the Aitlas ecosystem. Learn to integrate Actions, build MCP servers, and create autonomous agents with full data sovereignty."
        status="Live"
        tags={["API Reference", "MCP Guide", "SDKs"]}
      />

      {/* Getting Started */}
      <Section variant="grey" id="quick-start">
        <Container size="full">
          <ScrollReveal>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-foreground mb-12">
              Quick Start Guide
            </h2>
          </ScrollReveal>
          
          <Card padding="lg" className="bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800 shadow-xl">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h3 className="text-[20px] font-bold text-foreground mb-6">Get Started in 3 Steps</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold">1</div>
                  <strong className="text-foreground block">Bring your own key</strong>
                  <p className="text-[14px] text-grey-600 dark:text-grey-400">
                    Sign up for Nova and add your OpenAI, Anthropic, or DeepSeek API key.
                    We never store keys in plain text.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold">2</div>
                  <strong className="text-foreground block">Connect an Action</strong>
                  <p className="text-[14px] text-grey-600 dark:text-grey-400">
                    Enable f.twyt or f.library. Actions are MCP-compatible and work with any AI client.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold">3</div>
                  <strong className="text-foreground block">Run your agent</strong>
                  <p className="text-[14px] text-grey-600 dark:text-grey-400">
                    Hire from GWagents Store or build your own using Nexus for long-running tasks.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Documentation Sections */}
      <Section>
        <Container size="full">
          <ScrollReveal>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-foreground mb-16">
              Core Documentation
            </h2>
          </ScrollReveal>

          <div className="space-y-20">
            {docs.map((section) => (
              <div key={section.category}>
                <ScrollReveal>
                  <h3 className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-8">
                    {section.category}
                  </h3>
                </ScrollReveal>
                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="no-underline block group h-full"
                    >
                      <Card 
                        padding="lg" 
                        className="h-full group-hover:border-fg transition-all duration-300 bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800"
                        hover
                      >
                        <h4 className="text-[17px] font-bold text-foreground mb-3 group-hover:text-amber-600 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">
                          {item.description}
                        </p>
                      </Card>
                    </Link>
                  ))}
                </StaggerChildren>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="dark" className="text-center py-32">
        <Container size="md">
          <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.1] tracking-tight mb-8">
            Ready to build?
          </h2>
          <p className="text-[18px] text-white/60 mb-12 max-w-xl mx-auto">
            Join our developer community and start building sovereign AI applications.
            Get access to documentation, MCP examples, and early product updates.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              href="/contact"
              variant="premium"
              size="lg"
              glow
            >
              Get API access →
            </Button>
            <Button
              href="https://github.com/Fuuurma"
              variant="dark"
              size="lg"
              className="border-white/10"
            >
              View on GitHub ↗
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
