import { constructMetadata } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { FeaturesGrid } from "@/components/ui/FeaturesGrid";
import { PricingSection } from "@/components/ui/PricingSection";
import { Section, Container } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { Activity, Apple, Zap, Shield, Heart, Moon, TrendingUp, CheckCircle2 } from "lucide-react";

export const metadata = constructMetadata({
  title: "f.health — Wearable Data | Furma.tech",
  description: "Aggregate health data from Whoop, Oura, and Apple Health. Get AI insights and correlations.",
});

const features = [
  {
    title: "Multi-Source Sync",
    desc: "Connect Whoop, Oura, and import Apple Health data. All your wearables in one place.",
  },
  {
    title: "Correlation Analysis",
    desc: "Discover patterns. See how sleep affects performance, or how training impacts recovery.",
  },
  {
    title: "AI Insights",
    desc: "Get personalized recommendations powered by AI. Understand what drives your metrics.",
  },
  {
    title: "Vector Search",
    desc: "Semantic search across your health data. Find patterns across months of measurements.",
  },
  {
    title: "Privacy First",
    desc: "Your health data stays yours. Encrypted at rest. You provide your own OpenAI key for embeddings.",
  },
  {
    title: "Manual Entry",
    desc: "Add data that wearables miss. Log mood, energy, stress, and custom metrics.",
  },
];

const sources = [
  {
    name: "Whoop",
    icon: Activity,
    status: "Live",
    desc: "Strain, recovery, sleep, HRV",
  },
  {
    name: "Oura",
    icon: Moon,
    status: "Live",
    desc: "Readiness, sleep, temperature",
  },
  {
    name: "Apple Health",
    icon: Apple,
    status: "Live",
    desc: "Import XML/JSON exports",
  },
];

const pricing = [
  {
    name: "Basic",
    price: "€0",
    period: "/mo",
    desc: "For curious users",
    features: ["1 source", "Basic metrics", "Manual entry", "Community support"],
  },
  {
    name: "Pro",
    price: "€19",
    period: "/mo",
    desc: "For optimizers",
    features: ["3 sources", "Full metrics", "AI insights", "Correlation analysis", "Priority support"],
    popular: true,
  },
  {
    name: "Team",
    price: "€59",
    period: "/mo",
    desc: "For coaches",
    features: ["Unlimited sources", "Team management", "API access", "Custom metrics", "Dedicated support"],
  },
];

export default function HealthPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProjectHero 
        label="Aitlas — Action"
        title="f.health"
        description="Unified health data infrastructure. Aggregate metrics from Whoop, Oura, and Apple Health into a single sovereign knowledge base for AI insights."
        status="Live"
        tags={["Health Tech", "Quantified Self", "Data Privacy"]}
      />

      {/* Insight Preview */}
      <Section variant="default" className="py-0 md:py-0 overflow-hidden">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="py-20">
                <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] mb-8">
                  Understand your body,<br />
                  <span className="gradient-text italic">optimized.</span>
                </h2>
                <p className="text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-10 max-w-md">
                  Stop looking at raw numbers. f.health correlates your behavior with your 
                  results, providing actionable AI insights.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button href="/contact" variant="premium" size="lg" glow>
                    Get Access →
                  </Button>
                  <Button href="/docs" variant="outline" size="lg">
                    Integration Docs
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative py-20 lg:py-32">
                <Card padding="lg" className="bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800 shadow-2xl rotate-1">
                  <div className="font-mono text-[10px] text-grey-400 mb-6 uppercase tracking-widest font-bold">AI Correlation Found</div>
                  <div className="space-y-6">
                    <div className="p-4 bg-green-500/5 rounded-xl border border-green-500/10">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-[14px] font-bold text-foreground">Recovery Optimization</span>
                      </div>
                      <p className="text-[13px] text-grey-600 dark:text-grey-400 leading-relaxed">
                        Your recovery score is <span className="text-green-600 font-bold">23% higher</span> on days following 
                        sleep durations over 7.5 hours.
                      </p>
                    </div>
                    <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/10">
                      <div className="flex items-center gap-3 mb-2">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span className="text-[14px] font-bold text-foreground">HRV Warning</span>
                      </div>
                      <p className="text-[13px] text-grey-600 dark:text-grey-400 leading-relaxed">
                        HRV drops 15% when alcohol is consumed within 4 hours of sleep.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Sources */}
      <Section variant="grey" className="border-y border-grey-200 dark:border-grey-800">
        <Container size="full">
          <div className="text-center mb-16">
            <p className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-4">Supported Sources</p>
            <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold">Connect your wearables</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sources.map((s) => (
              <Card key={s.name} padding="lg" hover className="bg-white dark:bg-grey-900 text-center">
                <div className="w-12 h-12 rounded-xl bg-grey-50 dark:bg-grey-800 flex items-center justify-center mx-auto mb-6">
                  <s.icon className="w-6 h-6 text-foreground dark:text-white" />
                </div>
                <h3 className="text-[18px] font-bold mb-2">{s.name}</h3>
                <p className="text-[14px] text-grey-600 dark:text-grey-400 mb-4">{s.desc}</p>
                <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-green-500/10 text-green-600">
                  {s.status}
                </span>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <FeaturesGrid features={features} title="Understand your body." />

      <PricingSection plans={pricing} />

      {/* Final CTA */}
      <Section variant="dark" className="text-center py-32">
        <Container size="md">
          <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.1] mb-8">
            Know yourself better
          </h2>
          <p className="text-[18px] text-white/60 mb-12 max-w-xl mx-auto">
            Connect your wearables and discover what drives your performance. 
            Privacy-first health intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="premium" size="lg" glow>
              Join waitlist →
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
