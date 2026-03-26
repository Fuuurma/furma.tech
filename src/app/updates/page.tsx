import { constructMetadata } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { Section, Container } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Studio Updates — Furma.tech",
  description: "News, updates, and insights from the Furma.tech team. Follow our journey building sovereign AI.",
});

const posts = [
  {
    slug: "aitlas-rebrand",
    title: "Aitlas Rebrand: Nexus → Nova, f.loop → Nexus runtime",
    excerpt: "We updated our product naming to better reflect the ecosystem architecture. Here's what changed and why.",
    date: "Mar 9, 2026",
    category: "Product",
    readTime: "3 min read",
  },
  {
    slug: "f-twyt-production",
    title: "f.twyt is Now Live: Twitter Intelligence for 1 Credit",
    excerpt: "Our first Action is production-ready. Search, ingest, and semantically search Twitter without rate limits.",
    date: "Feb 28, 2026",
    category: "Release",
    readTime: "5 min read",
  },
  {
    slug: "restauManager-alpha",
    title: "restauManager Alpha: First Beta Users Onboarded",
    excerpt: "We welcomed our first restaurant partners in Catalonia. Early feedback shows strong product-market fit.",
    date: "Jan 15, 2026",
    category: "Product",
    readTime: "4 min read",
  },
  {
    slug: "why-bootstrapped",
    title: "Why We Chose Bootstrapping Over VC",
    excerpt: "0% funding. 100% control. Here's our reasoning and what it means for our product roadmap.",
    date: "Dec 10, 2025",
    category: "Company",
    readTime: "6 min read",
  },
  {
    slug: "mcp-first-design",
    title: "MCP-First Design: Why We Bet on Model Context Protocol",
    excerpt: "MCP changes everything about AI integrations. Here's how we're building our entire ecosystem on top of it.",
    date: "Nov 22, 2025",
    category: "Technical",
    readTime: "8 min read",
  },
  {
    slug: "aitlas-launch",
    title: "Introducing Aitlas: A Sovereign AI Ecosystem",
    excerpt: "Nova, GWagents Store, Actions, and Nexus runtime. The pieces are coming together for a new kind of AI platform.",
    date: "Oct 30, 2025",
    category: "Announcement",
    readTime: "5 min read",
  },
];

const categories = ["All", "Product", "Release", "Company", "Technical"];

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProjectHero 
        label="Updates & Insights"
        title="The Studio Journal."
        description="Follow our journey building sovereign AI tools and practical SaaS products. News, technical deep-dives, and studio updates."
        status="Active"
        tags={["Changelog", "Engineering", "Strategy"]}
      />

      {/* Category Filter */}
      <section className="py-8 border-y border-grey-100 dark:border-grey-800 bg-grey-50/50 dark:bg-grey-900/50">
        <Container size="full">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button 
                key={c}
                className={`px-4 py-2 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider transition-all ${
                  c === "All" 
                    ? "bg-fg text-bg dark:bg-white dark:text-black" 
                    : "bg-white dark:bg-grey-800 border border-grey-200 dark:border-grey-700 text-grey-500 hover:border-fg dark:hover:border-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Posts Grid */}
      <Section variant="default">
        <Container size="full">
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/updates/${post.slug}`} className="group no-underline block h-full">
                <Card padding="lg" hover className="h-full flex flex-col bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-amber-600 uppercase tracking-widest">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                    <div className="w-1 h-1 rounded-full bg-grey-200"></div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-grey-400 uppercase tracking-widest">
                      <Tag className="w-3 h-3" />
                      {post.category}
                    </div>
                  </div>
                  <h3 className="text-[20px] font-bold leading-tight mb-4 group-hover:text-amber-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed mb-8 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-grey-50 dark:border-grey-800">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-grey-400 uppercase">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                    <ArrowRight className="w-4 h-4 text-grey-300 group-hover:text-amber-600 transition-all group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            ))}
          </StaggerChildren>

          <div className="mt-20 text-center">
            <Button variant="outline" size="lg">Load more posts</Button>
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      <Section variant="grey" className="border-t border-grey-100 dark:border-grey-800">
        <Container size="md" className="text-center">
          <ScrollReveal>
            <div className="mb-12">
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold mb-4 text-fg">Stay in the loop.</h2>
              <p className="text-grey-600 dark:text-grey-400">
                Get the latest studio updates and technical deep-dives delivered to your inbox. 
                No spam, just signal.
              </p>
            </div>
            <div className="flex justify-center">
              <Button href="/contact" variant="premium" size="lg">
                Join Waitlist →
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </div>
  );
}
