import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentation — Furma.tech",
  description: "Developer documentation for Aitlas ecosystem, MCP integrations, and Actions API.",
};

const docs = [
  {
    category: "Quick Start",
    items: [
      { title: "Introduction to Aitlas", href: "#introduction", description: "Learn about the sovereign AI ecosystem" },
      { title: "Your first action", href: "#first-action", description: "Use f.twyt for Twitter intelligence in 5 minutes" },
      { title: "MCP integration guide", href: "#mcp-integration", description: "Connect Actions to Claude, Cursor, or your own agent" },
    ],
  },
  {
    category: "Core Products",
    items: [
      { title: "Nova - AI Workspace", href: "/nova", description: "BYOK AI workspace with multi-provider support" },
      { title: "Nexus - Agent Runtime", href: "/nexus", description: "Durable execution for long-running agent tasks" },
      { title: "GWagents Store", href: "/agents", description: "Marketplace for pre-built AI agents" },
    ],
  },
  {
    category: "Actions (f.xyz)",
    items: [
      { title: "f.twyt - Twitter Intelligence", href: "/twyt", description: "Semantic search and ingestion for X/Twitter" },
      { title: "f.library - Vector Knowledge", href: "/library", description: "Upload and search your documents with AI" },
      { title: "Actions API reference", href: "#api-reference", description: "REST API for Actions and credit management" },
    ],
  },
  {
    category: "For Developers",
    items: [
      { title: "Building with MCP", href: "#building-mcp", description: "Create your own MCP server for Aitlas" },
      { title: "Contributing", href: "#contributing", description: "Open source contribution guidelines" },
      { title: "API keys and security", href: "#security", description: "How we encrypt your API keys" },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="section">
        <div className="px-6 md:px-12 max-w-4xl">
          <div className="flex items-center gap-3 mb-8 animate-fade-up">
            <div className="w-10 h-px bg-grey-400"></div>
            <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-600">
              Developer Documentation
            </span>
          </div>
          <h1 className="font-serif text-[clamp(42px,5vw,72px)] font-semibold leading-[1.02] tracking-tight text-fg mb-7 animate-fade-up delay-1">
            Build with<br />
            <em className="italic font-normal text-grey-600">sovereign AI.</em>
          </h1>
          <p className="text-[17px] font-normal leading-[1.7] text-grey-600 max-w-[600px] animate-fade-up delay-2">
            Complete documentation for the Aitlas ecosystem. Learn to integrate Actions,
            build MCP servers, and create autonomous agents with full data sovereignty.
          </p>
          <div className="flex flex-wrap gap-3 mt-8 animate-fade-up delay-3">
            <Link href="#quick-start" className="inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded bg-fg text-bg hover:bg-grey-800 transition-all">
              Quick start →
            </Link>
            <a
              href="https://github.com/Fuuurma"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded border border-grey-200 text-fg hover:border-fg hover:bg-grey-50 transition-all"
            >
              View on GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="section bg-grey-50" id="quick-start">
        <div className="px-6 md:px-12 max-w-4xl">
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-fg mb-8">
            Quick Start Guide
          </h2>
          <div className="bg-white border border-grey-200 p-8 rounded-lg">
            <div className="prose prose-lg max-w-none">
              <h3 className="text-[20px] font-bold text-fg mb-4">Get Started in 3 Steps</h3>
              <ol className="space-y-4">
                <li>
                  <strong className="text-fg">1. Bring your own API key</strong><br />
                  Sign up for Nova (coming soon) and add your OpenAI, Anthropic, or DeepSeek API key.
                  We encrypt it with AES-256-GCM and never store it in plain text.
                </li>
                <li>
                  <strong className="text-fg">2. Connect your first Action</strong><br />
                  Enable f.twyt for Twitter intelligence or f.library for document search.
                  Actions are MCP-compatible and work with any AI client.
                </li>
                <li>
                  <strong className="text-fg">3. Run your first agent</strong><br />
                  Hire a pre-built agent from the GWagents Store or build your own using
                  Nexus runtime for durable, long-running tasks.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="section">
        <div className="px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-fg mb-12">
                Documentation
              </h2>
            </div>
          </div>

          {docs.map((section) => (
            <div key={section.category} className="mb-16">
              <h3 className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-400 mb-6">
                {section.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group block p-6 bg-white border border-grey-200 hover:border-fg hover:bg-grey-50 transition-all no-underline"
                  >
                    <h4 className="text-[16px] font-bold text-fg mb-2 group-hover:text-grey-800 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[13px] text-grey-600 leading-relaxed">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-fg text-bg">
        <div className="px-6 md:px-12 max-w-2xl text-center">
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight mb-6">
            Ready to build?
          </h2>
          <p className="text-[15px] leading-[1.7] opacity-55 mb-8">
            Join our developer community and start building sovereign AI applications.
            Get access to documentation, MCP examples, and early product updates.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded bg-bg text-fg hover:bg-grey-100 transition-all"
            >
              Get API access →
            </Link>
            <a
              href="https://github.com/Fuuurma"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded border border-bg/20 text-bg hover:bg-bg/20 transition-all"
            >
              View on GitHub ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
