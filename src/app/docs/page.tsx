import Link from "next/link";
import { constructMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Code, Zap, Server, FileText, ExternalLink, Copy } from "lucide-react";

export const metadata = constructMetadata({
  title: "Documentation — Furma.tech",
  description: "Developer documentation for Aitlas ecosystem, MCP integrations, and Actions API.",
});

const docSections = [
  {
    category: "Quick Start",
    icon: Zap,
    items: [
      { title: "Introduction to Aitlas", href: "/projects/aitlas", description: "Learn about the sovereign AI ecosystem" },
      { title: "Your first action", href: "/projects/aitlas/twyt", description: "Use f.twyt for Twitter intelligence in 5 minutes" },
      { title: "MCP integration guide", href: "#mcp-integration", description: "Connect Actions to Claude, Cursor, or your own agent" },
    ],
  },
  {
    category: "Core Products",
    icon: Server,
    items: [
      { title: "Nova - AI Workspace", href: "/projects/aitlas/nova", description: "BYOK AI workspace with multi-provider support" },
      { title: "Nexus - Agent Runtime", href: "/projects/aitlas/nexus", description: "Durable execution for long-running agent tasks" },
      { title: "Agents Store", href: "/projects/aitlas/agents", description: "Marketplace for pre-built AI agents" },
    ],
  },
  {
    category: "Actions (f.xyz)",
    icon: Code,
    items: [
      { title: "f.twyt - Twitter Intelligence", href: "/projects/aitlas/twyt", description: "Semantic search and ingestion for X/Twitter" },
      { title: "f.library - Vector Knowledge", href: "/projects/aitlas/library", description: "Upload and search your documents with AI" },
      { title: "f.pay - Credit Payments", href: "/projects/aitlas/pay", description: "Manage compute credits and payment history" },
    ],
  },
  {
    category: "Industry SaaS",
    icon: FileText,
    items: [
      { title: "restauManager Sync", href: "/projects/saas/restauramanager", description: "Real-time synchronization with TheFork API" },
      { title: "GuideTours Viator", href: "/projects/saas/guidetours", description: "Automated booking ingestion from Viator" },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <PageHeader
        label="Developer Portal"
        title="Documentation"
        description="Complete documentation for the Aitlas ecosystem. Learn to integrate Actions, build MCP servers, and create autonomous agents with full data sovereignty."
        variant="default"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-[12px] font-mono text-grey-500 uppercase tracking-wider">All systems operational</span>
        </div>
      </PageHeader>

      {/* Quick Start Steps */}
      <Section variant="grey">
        <Container size="full">
          <ScrollReveal>
            <div className="mb-10 flex flex-col gap-4">
              <Badge variant="outline" className="w-fit">Getting Started</Badge>
              <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                Get started in 3 steps
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                num: '01',
                title: 'Bring your own key',
                desc: 'Sign up for Nova and add your OpenAI, Anthropic, or DeepSeek API key. We never store keys in plain text.',
              },
              {
                num: '02',
                title: 'Connect an Action',
                desc: 'Enable f.twyt or f.library. Actions are MCP-compatible and work with any AI client.',
              },
              {
                num: '03',
                title: 'Run your agent',
                desc: 'Hire from Agents Store or build your own using Nexus for long-running tasks.',
              },
            ].map((step) => (
              <ScrollReveal key={step.title}>
                <Card className="flex flex-col gap-4 p-6 bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800 hover:border-foreground/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-lg bg-foreground text-background flex items-center justify-center font-mono text-sm font-bold shrink-0 group-hover:bg-background group-hover:text-foreground transition-colors border border-foreground">
                      {step.num}
                    </div>
                    <h3 className="text-[16px] font-bold text-foreground pt-1">{step.title}</h3>
                  </div>
                  <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{step.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Documentation Sections */}
      <Section variant="default">
        <Container size="full">
          <ScrollReveal>
            <div className="mb-10 flex flex-col gap-4">
              <Badge variant="outline" className="w-fit">Documentation</Badge>
              <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                Browse by topic
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-16">
            {docSections.map((section) => (
              <div key={section.category}>
                <ScrollReveal>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="size-8 rounded bg-grey-100 dark:bg-grey-800 flex items-center justify-center">
                      <section.icon className="size-4 text-foreground" strokeWidth={1.5} />
                    </div>
                    <Badge variant="secondary">{section.category}</Badge>
                  </div>
                </ScrollReveal>
                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {section.items.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="group block"
                    >
                      <Card className="flex flex-col gap-3 p-5 bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800 hover:border-foreground/40 hover:shadow-lg transition-all duration-300 h-full">
                        <CardHeader className="flex flex-row items-start justify-between p-0 mb-0">
                          <CardTitle className="text-[16px] group-hover:underline underline-offset-4">
                            {item.title}
                          </CardTitle>
                          <ExternalLink className="size-4 text-grey-400 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0" />
                        </CardHeader>
                        <CardContent className="p-0">
                          <CardDescription className="text-[13px] leading-relaxed">
                            {item.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </StaggerChildren>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Code Example */}
      <Section variant="grey">
        <Container size="md">
          <ScrollReveal>
            <div className="mb-10 flex flex-col gap-4">
              <Badge variant="outline" className="w-fit">API Example</Badge>
              <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                MCP Integration
              </h2>
            </div>
          </ScrollReveal>

          <div className="p-6 bg-grey-900 border border-grey-800 rounded-lg overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
              <Button variant="ghost" size="sm" className="text-[11px] font-mono">
                <Copy data-icon="inline-start" className="size-3.5" />
                Copy
              </Button>
            </div>
            <pre className="text-[13px] font-mono leading-relaxed">
              <code className="text-grey-300">
{`// Initialize Aitlas MCP client
import { AitlasClient } from '@aitlas/mcp';

const client = new AitlasClient({
  apiKey: process.env.AITLAS_KEY,
  actions: ['f.twyt', 'f.library']
});

// Execute Twitter search
const results = await client.twyt.search({
  query: 'sovereign AI',
  limit: 10
});`}
              </code>
            </pre>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="dark">
        <Container size="md">
          <ScrollReveal>
            <div className="flex flex-col items-center gap-6 text-center max-w-2xl mx-auto">
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight">
                Ready to build?
              </h2>
              <p className="text-[16px] text-white/60 leading-relaxed">
                Join our developer community and start building sovereign AI applications.
                Get access to documentation, MCP examples, and early product updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" variant="premium" size="lg">
                  Get API access
                  <ExternalLink data-icon="inline-end" />
                </Button>
                <Button href="https://github.com/Fuuurma" variant="dark" size="lg" className="border-white/10">
                  View on GitHub
                  <ExternalLink data-icon="inline-end" />
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </div>
  );
}
