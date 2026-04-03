import { constructMetadata } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { FeaturesGrid } from "@/components/ui/FeaturesGrid";
import { Section, Container } from "@/components/ui/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { Globe, Search, BarChart3, CheckCircle2 } from "lucide-react";

export const metadata = constructMetadata({
  title: "f.twyt — Twitter Intelligence | Furma.tech",
  description: "Twitter search, ingestion, and semantic search. Build your own feed AI with sovereign Twitter intelligence.",
});

const features = [
  {
    title: "Advanced Search",
    desc: "Query Twitter with precision. Filter by date, engagement, author, and keywords. Build complex queries with boolean operators.",
  },
  {
    title: "Feed Ingestion",
    desc: "Continuously ingest tweets from specific accounts, hashtags, or search terms. Your personal Twitter firehose.",
  },
  {
    title: "Semantic Search",
    desc: "Search by meaning, not just keywords. Find tweets about concepts even when exact words don't match.",
  },
  {
    title: "Noise Filtering",
    desc: "AI-powered filtering removes spam, bots, and low-quality content. See only signal, not noise.",
  },
  {
    title: "Export Data",
    desc: "Download your ingested tweets as JSON or CSV. Full ownership of your data for analysis or archival.",
  },
  {
    title: "Sovereign Access",
    desc: "Your Twitter data, your control. No tracking, no profiling. Pure API access without the corporate overhead.",
  },
];

const useCases = [
  {
    icon: BarChart3,
    title: "Market Research",
    desc: "Track sentiment around products, brands, or trends. Real-time market intelligence from Twitter conversations.",
  },
  {
    icon: Search,
    title: "Competitor Monitoring",
    desc: "Watch competitor announcements, customer complaints, and product launches as they happen.",
  },
  {
    icon: Globe,
    title: "Personal Feed Curation",
    desc: "Build your own algorithm-free Twitter feed. See tweets that matter to you, in your preferred order.",
  },
];

const creditExamples = [
  { action: "Simple search", cost: "1 credit" },
  { action: "Advanced search", cost: "1 credit" },
  { action: "Semantic search", cost: "2 credits" },
  { action: "Feed sync (per 100 tweets)", cost: "1 credit" },
];

export default function TwytPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProjectHero 
        label="Aitlas — Action"
        title="f.twyt"
        description="Advanced Twitter search, feed ingestion, and semantic search. Build your own algorithm-free feed. Track trends, monitor competitors, and curate your personal Twitter intelligence."
        status="In Development"
        tags={["Twitter Intelligence", "MCP Action", "Data Export"]}
      />

      {/* Showcase */}
      <Section variant="default" className="py-0 md:py-0 overflow-hidden">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="py-20">
                <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] mb-8">
                  Twitter,<br />
                  <span className="gradient-text italic">sovereign.</span>
                </h2>
                <p className="text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-10 max-w-md">
                  Stop fighting the algorithm. Get direct, programmatic access to the 
                  global conversation. Build your own intelligence feed.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button href="/contact" variant="premium" size="lg" glow>
                    Try f.twyt →
                  </Button>
                  <Button href="/docs" variant="outline" size="lg">
                    API Docs
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative py-20 lg:py-32">
                <Card className="bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800 shadow-2xl overflow-hidden rotate-1">
                  <div className="flex items-center gap-2 px-4 py-3 bg-blue-500/5 border-b border-blue-500/10">
                    <Globe className="w-4 h-4 text-blue-500" />
                    <span className="font-mono text-[10px] text-blue-600/60 uppercase font-bold tracking-widest">Query: Semantic</span>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="p-4 bg-grey-50 dark:bg-grey-800 rounded-lg border border-grey-100 dark:border-grey-700">
                      <div className="h-3 bg-grey-200 dark:bg-grey-700 rounded w-1/3 mb-3"></div>
                      <div className="h-2 bg-grey-100 dark:bg-grey-800 rounded w-full mb-2"></div>
                      <div className="h-2 bg-grey-100 dark:bg-grey-800 rounded w-5/6"></div>
                    </div>
                    <div className="p-4 bg-grey-50 dark:bg-grey-800 rounded-lg border border-grey-100 dark:border-grey-700">
                      <div className="h-3 bg-grey-200 dark:bg-grey-700 rounded w-1/4 mb-3"></div>
                      <div className="h-2 bg-grey-100 dark:bg-grey-800 rounded w-full mb-2"></div>
                    </div>
                  </div>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      <FeaturesGrid features={features} title="Twitter intelligence." />

      {/* Use Cases */}
      <Section variant="grey" className="border-y border-grey-200 dark:border-grey-800">
        <Container size="full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold mb-4">What you can do</h2>
              <p className="text-grey-600 dark:text-grey-400">f.twyt empowers researchers, marketers, and power users.</p>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase) => (
              <Card key={useCase.title} className="bg-white dark:bg-grey-900 text-center p-6 sm:p-8 hover:border-foreground/30 hover:shadow-2xl hover:shadow-foreground/5 transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mx-auto mb-6">
                  <useCase.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-[18px] font-bold text-foreground mb-3">{useCase.title}</h3>
                <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{useCase.desc}</p>
              </Card>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      {/* Pricing/Credits */}
      <Section>
        <Container size="md">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                <span className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase text-green-600">Simple Credits</span>
              </div>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold mb-4">Pay per use</h2>
              <p className="text-grey-600 dark:text-grey-400">No subscriptions. Pay for exactly what you search.</p>
            </div>
          </ScrollReveal>

          <Card className="bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800 p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-[18px] font-bold mb-6">Credit Costs</h3>
                <div className="space-y-4">
                  {creditExamples.map((ex) => (
                    <div key={ex.action} className="flex justify-between items-center text-[14px] pb-4 border-b border-grey-50 dark:border-grey-800 last:border-0 last:pb-0">
                      <span className="text-grey-600 dark:text-grey-400">{ex.action}</span>
                      <span className="font-mono font-bold">{ex.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-grey-50 dark:bg-grey-800/50 p-8 rounded-xl border border-grey-100 dark:border-grey-700">
                <h3 className="text-[18px] font-bold mb-4">Why f.twyt?</h3>
                <ul className="space-y-3">
                  {["Zero algorithm bias", "Full JSON exports", "MCP ready", "BYOK compatible"].map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[14px]">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-grey-600 dark:text-grey-400">{p}</span>
                    </li>
                  ))}
                </ul>
                <Button href="/contact" variant="dark" className="w-full mt-8">Purchase Credits →</Button>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section variant="dark" className="text-center py-32">
        <Container size="md">
          <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.1] mb-8">
            Ready to own your feed?
          </h2>
          <p className="text-[18px] text-white/60 mb-12 max-w-xl mx-auto">
            Start searching Twitter with f.twyt. Join the waitlist for private beta access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="premium" size="lg" glow>
              Join the waitlist →
            </Button>
            <Button href="/projects/aitlas" variant="dark" size="lg" className="border-white/10 bg-white/5">
              Back to Aitlas
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
