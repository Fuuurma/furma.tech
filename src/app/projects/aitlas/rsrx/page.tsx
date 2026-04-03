import { constructMetadata } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { FeaturesGrid } from "@/components/ui/FeaturesGrid";
import { PricingSection } from "@/components/ui/PricingSection";
import { Section, Container } from "@/components/ui/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CheckCircle2 } from "lucide-react";

export const metadata = constructMetadata({
  title: "f.rsrx — Deep Research | Furma.tech",
  description: "AI-powered research assistant. Search, scrape, and synthesize information from across the web.",
});

const features = [
  {
    title: "Web Search",
    desc: "Comprehensive web search powered by Brave API. Find relevant sources across the entire internet.",
  },
  {
    title: "Content Extraction",
    desc: "Scrape and extract content from any URL. Get clean, structured data from articles, docs, and websites.",
  },
  {
    title: "AI Synthesis",
    desc: "Let AI synthesize findings into coherent reports. From multiple sources to a single structured output.",
  },
  {
    title: "Continuous Monitoring",
    desc: "Set up research tasks that run in the background. Get notified when new information emerges.",
  },
  {
    title: "Academic Sources",
    desc: "Access academic papers and research. Perfect for literature reviews and deep dives.",
  },
  {
    title: "Nexus Integration",
    desc: "Connect f.rsrx to Nexus for long-running research tasks. Agents can run research while you sleep.",
  },
];

const pricing = [
  {
    name: "Explorer",
    price: "€19",
    period: "/mo",
    desc: "For researchers",
    features: ["200 credits/month", "20 searches", "10 reports", "Email support"],
  },
  {
    name: "Pro",
    price: "€49",
    period: "/mo",
    desc: "For professionals",
    popular: true,
    features: ["1,000 credits/month", "100 searches", "50 reports", "Priority support", "Academic sources"],
  },
  {
    name: "Team",
    price: "€149",
    period: "/mo",
    desc: "For teams",
    features: ["5,000 credits/month", "Unlimited searches", "200 reports", "API access", "Team collaboration"],
  },
];

const creditSystem = [
  { action: "Web search", cost: "2 credits" },
  { action: "Content extraction", cost: "3 credits" },
  { action: "AI synthesis (short)", cost: "5 credits" },
  { action: "AI synthesis (full report)", cost: "12 credits" },
];

export default function RsrxPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProjectHero 
        label="Aitlas — Action"
        title="f.rsrx"
        description="AI-powered research assistant. Search, scrape, and synthesize information from across the web. Deep dives on any topic, automated."
        status="In Development"
        tags={["Deep Research", "Data Extraction", "AI Synthesis"]}
      />

      {/* Task Preview */}
      <Section variant="default" className="py-0 md:py-0 overflow-hidden">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="py-20">
                <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] mb-8">
                  Research at<br />
                  <span className="gradient-text italic">lightspeed.</span>
                </h2>
                <p className="text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-10 max-w-md">
                  Stop manually reading dozens of tabs. Define your research goal and let 
                  f.rsrx handle the searching, scraping, and synthesis.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button href="/contact" variant="premium" size="lg" glow>
                    Join Waitlist →
                  </Button>
                  <Button href="/docs" variant="outline" size="lg">
                    API Docs
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative py-20 lg:py-32">
                <Card className="bg-foreground text-background border-foreground shadow-2xl rotate-1 p-6 sm:p-8">
                  <div className="font-mono text-[10px] text-white/30 mb-6 uppercase tracking-widest font-bold">Research Agent Active</div>
                  <div className="space-y-6">
                    <div>
                      <div className="text-[13px] text-white/50 mb-2">Objective:</div>
                      <div className="text-[15px] font-medium text-white italic">&quot;Analyze Solana DeFi yields and identify arbitrage opportunities.&quot;</div>
                    </div>
                    <div className="space-y-3 pt-6 border-t border-white/5">
                      <div className="flex items-center gap-3 text-[13px]">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="text-white/70">search_web: Found 47 relevant sources</span>
                      </div>
                      <div className="flex items-center gap-3 text-[13px]">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="text-white/70">scrape_url: Extracted from 12 domains</span>
                      </div>
                      <div className="flex items-center gap-3 text-[13px]">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="text-white/70">synthesize: Generating 8-page report</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      <FeaturesGrid features={features} title="Research capabilities." />

      <PricingSection plans={pricing} />

      {/* Credit System */}
      <Section variant="grey" className="border-t border-grey-200 dark:border-grey-800">
        <Container size="md">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <span className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase text-blue-600">Unit Costs</span>
              </div>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold mb-4">Simple credits</h2>
              <p className="text-grey-600 dark:text-grey-400">f.rsrx consumes credits based on the complexity of the research task.</p>
            </div>
          </ScrollReveal>

          <Card className="bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800 p-6 sm:p-8">
            <div className="space-y-4">
              {creditSystem.map((item) => (
                <div key={item.action} className="flex justify-between items-center text-[14px] pb-4 border-b border-grey-50 dark:border-grey-800 last:border-0 last:pb-0">
                  <span className="text-grey-600 dark:text-grey-400">{item.action}</span>
                  <span className="font-mono font-bold">{item.cost}</span>
                </div>
              ))}
            </div>
          </Card>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section variant="dark" className="text-center py-32">
        <Container size="md">
          <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.1] mb-8">
            Ready to research smarter?
          </h2>
          <p className="text-[18px] text-white/60 mb-12 max-w-xl mx-auto">
            Join the waitlist and get 50 free credits when we launch. f.rsrx will be available 
            to Nova Pro users first.
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
