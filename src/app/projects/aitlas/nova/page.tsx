import { constructMetadata, getOgImageUrl } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { FeaturesGrid } from "@/components/ui/FeaturesGrid";
import { PricingSection } from "@/components/ui/PricingSection";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { Hexagon, Brain, Zap, Shield, ArrowRight, CheckCircle2, Monitor, Smartphone, Globe } from "lucide-react";

export const metadata = constructMetadata({
  title: "Nova — AI Workspace | Furma.tech",
  description: "Your AI command center. Bring your own API keys and access multiple LLM providers without vendor lock-in.",
  image: getOgImageUrl({ title: "Nova", subtitle: "AI Workspace", variant: "aitlas" }),
});

const features = [
  {
    title: "Bring Your Own Keys",
    desc: "Connect your OpenAI, Anthropic, or DeepSeek API keys directly. We never store or profit from your tokens.",
  },
  {
    title: "Multi-Provider Support",
    desc: "Switch between GPT-4, Claude, and other models seamlessly. One interface, all your preferred AI providers.",
  },
  {
    title: "MCP Tool Integration",
    desc: "Connect to 34+ Actions via Model Context Protocol. Extend Nova's capabilities with specialized AI tools.",
  },
  {
    title: "Persistent Threads",
    desc: "Your conversations are saved and organized. Pick up right where you left off, anytime.",
  },
  {
    title: "Agentic Mode",
    desc: "Enable autonomous AI behavior. Set tasks, define goals, and watch Nova execute complex workflows.",
  },
  {
    title: "Zero Token Liability",
    desc: "You pay your provider directly. Furma never marks up API costs or profits from your usage.",
  },
];

const providers = [
  { name: "GPT-4 / Codex", provider: "OpenAI", status: "Available" },
  { name: "Claude 3", provider: "Anthropic", status: "Available" },
  { name: "DeepSeek Coder", provider: "DeepSeek", status: "Available" },
  { name: "Llama 3", provider: "Meta", status: "Coming Soon" },
];

const pricing = [
  {
    name: "Free",
    price: "€0",
    desc: "For individuals exploring AI",
    features: [
      "BYOK integration",
      "Basic chat mode",
      "5 conversation threads",
      "Community support",
      "Standard response time",
    ],
    buttonText: "Get Started",
  },
  {
    name: "Pro",
    price: "€19",
    period: "/mo",
    desc: "For power users & developers",
    popular: true,
    features: [
      "Everything in Free",
      "Agentic mode",
      "Unlimited threads",
      "Priority support",
      "MCP Actions integration",
      "100 Action credits/month",
    ],
    buttonText: "Start Free Trial",
  },
  {
    name: "Team",
    price: "€49",
    period: "/mo",
    desc: "For small teams",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Shared threads",
      "Admin dashboard",
      "500 Action credits/month",
      "API access",
    ],
    buttonText: "Start Free Trial",
  },
];

export default function NovaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProjectHero 
        label="Aitlas — The AI Ecosystem"
        title="Nova Workspace"
        description="The unified AI workspace where you bring your own API keys and access multiple LLM providers without vendor lock-in. One interface, infinite possibilities."
        status="Public Beta"
        tags={["AI Workspace", "BYOK", "MCP"]}
      />

      {/* Mockup Section */}
      <Section variant="default" className="overflow-hidden py-0 md:py-0">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="py-20">
                <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] mb-8">
                  Your AI,<br />
                  <span className="gradient-text italic">your rules.</span>
                </h2>
                <p className="text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-10 max-w-md">
                  Tired of switching tabs? Nova brings all your models and tools into one 
                  command center. Full data sovereignty, zero markup.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button href="#pricing" variant="premium" size="lg" glow>
                    Try Nova Free
                  </Button>
                  <Button href="/docs" variant="outline" size="lg">
                    Read Docs
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative py-20 lg:py-32">
                <div className="absolute -inset-8 bg-gradient-to-br from-amber-500/20 to-purple-500/20 blur-3xl rounded-full pointer-events-none"></div>
                
                <Card padding="none" className="relative bg-white dark:bg-grey-900 overflow-hidden shadow-2xl border-grey-200 dark:border-grey-800">
                  <div className="flex items-center gap-2 px-4 py-3 bg-grey-50 dark:bg-grey-800 border-b border-grey-200 dark:border-grey-700">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/50"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400/50"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/50"></div>
                    </div>
                    <div className="flex-1 text-center font-mono text-[10px] text-grey-400">nova.aitlas.xyz</div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white">
                        <Hexagon className="w-6 h-6" />
                      </div>
                      <div className="px-2 py-1 rounded bg-green-500/10 text-green-600 text-[9px] font-bold uppercase tracking-wider">Ready</div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-3 bg-grey-100 dark:bg-grey-800 rounded w-3/4"></div>
                      <div className="h-3 bg-grey-100 dark:bg-grey-800 rounded w-1/2"></div>
                      <div className="h-10 bg-grey-50 dark:bg-grey-800 rounded-lg border border-grey-100 dark:border-grey-700 mt-8"></div>
                    </div>
                  </div>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Providers */}
      <Section variant="grey" className="border-y border-grey-200 dark:border-grey-800">
        <Container size="full">
          <div className="text-center mb-16">
            <p className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-4">Supported Providers</p>
            <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold">Connect your favorite AI</h2>
          </div>
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {providers.map((p) => (
              <Card key={p.name} padding="md" className="text-center" hover>
                <div className="text-[15px] font-bold mb-1">{p.name}</div>
                <div className="text-[12px] text-grey-400 mb-3">{p.provider}</div>
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                  p.status === "Available" ? "bg-green-500/10 text-green-600" : "bg-grey-100 text-grey-400"
                }`}>
                  {p.status}
                </span>
              </Card>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      <FeaturesGrid features={features} />

      <PricingSection plans={pricing} />

      {/* Device Support */}
      <Section variant="grey" className="border-t border-grey-200 dark:border-grey-800">
        <Container size="full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <Monitor className="w-10 h-10 mx-auto mb-6 text-grey-400" />
              <h3 className="font-bold mb-2">Desktop</h3>
              <p className="text-sm text-grey-500">Full-featured web app</p>
            </div>
            <div>
              <Smartphone className="w-10 h-10 mx-auto mb-6 text-grey-400" />
              <h3 className="font-bold mb-2">Mobile</h3>
              <p className="text-sm text-grey-500">Responsive design</p>
            </div>
            <div>
              <Globe className="w-10 h-10 mx-auto mb-6 text-grey-400" />
              <h3 className="font-bold mb-2">Cloud</h3>
              <p className="text-sm text-grey-500">Sync everywhere</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section variant="dark" className="text-center py-32">
        <Container size="md">
          <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.1] mb-8">
            Ready to own your AI?
          </h2>
          <p className="text-[18px] text-white/60 mb-12 max-w-xl mx-auto">
            Join the founding community building sovereign AI workflows with Nova.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="premium" size="lg" glow>
              Start Free →
            </Button>
            <Button href="https://github.com/Fuuurma" variant="dark" size="lg" className="border-white/10">
              View on GitHub
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
