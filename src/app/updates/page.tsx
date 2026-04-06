import { constructMetadata } from "@/lib/metadata"
import { ProjectHero } from "@/components/ui/ProjectHero"
import { Section, Container } from "@/components/ui/Section"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react"
import Link from "next/link"

export const metadata = constructMetadata({
  title: "Studio Updates — Furma.tech",
  description: "News, updates, and insights from the Furma.tech team. Follow our journey building sovereign AI.",
});

const categories = ["All", "In Dev", "Product", "Company", "Technical"]

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
    title: "Introducing f.twyt: Twitter Intelligence",
    excerpt: "Our first Action in development. Search, ingest, and semantically search Twitter without rate limits.",
    date: "Feb 2026",
    category: "In Dev",
    readTime: "5 min read",
  },
  {
    slug: "restauManager-alpha",
    title: "restauManager: Development Update",
    excerpt: "Building restaurant management software for Catalonia. TheFork integration and floor plan management.",
    date: "Jan 2026",
    category: "In Dev",
    readTime: "4 min read",
  },
  {
    slug: "why-bootstrapped",
    title: "Why We Chose to Stay Bootstrapped",
    excerpt: "The case for independence: why we believe sustainable growth beats hypergrowth every time.",
    date: "Dec 2025",
    category: "Company",
    readTime: "6 min read",
  },
  {
    slug: "mcp-first-design",
    title: "MCP-First: Our Design Philosophy",
    excerpt: "Why we're building all Aitlas products with Model Context Protocol at the core.",
    date: "Nov 2025",
    category: "Technical",
    readTime: "8 min read",
  },
  {
    slug: "aitlas-launch",
    title: "Introducing Aitlas: Sovereign AI",
    excerpt: "Announcing our AI ecosystem: Nova workspace, Nexus runtime, and 34+ specialized Actions.",
    date: "Oct 2025",
    category: "Product",
    readTime: "5 min read",
  },
];

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProjectHero
        label="Updates & Insights"
        title="The Studio Journal."
        description="Follow our journey building sovereign AI tools and practical SaaS products. News, technical deep-dives, and studio updates."
        status="Active"
        tags={["News", "Technical", "Company"]}
      />

      {/* Categories */}
      <Section variant="default">
        <Container size="full">
          <ScrollReveal>
            <div className="mb-10">
              <div className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-4">
                Browse by Topic
              </div>
              <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                All Updates
              </h2>
            </div>
          </ScrollReveal>

          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <Badge key={cat} variant={cat === "All" ? "default" : "outline"} className="text-[11px] uppercase tracking-wider">
                {cat}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <ScrollReveal key={post.slug}>
                <Link href={`/updates/${post.slug}`} className="group no-underline block h-full">
                  <Card className="h-full flex flex-col bg-background border-grey-200 dark:border-grey-800 p-6 sm:p-8 hover:border-foreground/30 hover:shadow-2xl hover:shadow-foreground/5 transition-all duration-500">
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
                      <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-grey-400 uppercase tracking-widest">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                      <ArrowRight className="w-4 h-4 text-grey-400 group-hover:text-foreground transition-colors -translate-x-1 group-hover:translate-x-0" />
                    </div>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Newsletter CTA */}
      <Section variant="grey" className="border-t border-grey-100 dark:border-grey-800">
        <Container size="md">
          <ScrollReveal>
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex flex-col gap-4">
                <Badge variant="outline" className="w-fit mx-auto">Newsletter</Badge>
                <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold text-foreground">
                  Stay in the loop.
                </h2>
                <p className="text-grey-600 dark:text-grey-400">
                  Get the latest studio updates and technical deep-dives delivered to your inbox.
                  No spam, just signal.
                </p>
              </div>
              <Button href="/contact" variant="premium" size="lg">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </div>
  );
}
