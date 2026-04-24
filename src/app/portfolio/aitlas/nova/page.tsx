import { Metadata } from "next";
import Link from "next/link";
import { Hexagon, Brain, Zap, Shield, ArrowRight, CheckCircle2, AlertCircle, Monitor, Smartphone, Globe, Sparkles, Key, Cloud, MessageSquare, Code, FileText, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { getOgImageUrl } from "@/lib/metadata";
import Breadcrumbs from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Nova — AI Workspace | Aitlas | Furma.tech",
  description: "Your AI command center. Bring your own API keys and access multiple LLM providers without vendor lock-in.",
  openGraph: {
    title: "Nova — AI Workspace",
    description: "Your AI command center. Bring your own API keys and access multiple LLM providers.",
    images: [getOgImageUrl({ title: "Nova", subtitle: "AI Workspace", variant: "aitlas" })],
  },
};

const features = [
  {
    icon: Key,
    title: "Bring Your Own Keys",
    desc: "Connect your OpenAI, Anthropic, or DeepSeek API keys directly. We never store or profit from your tokens.",
  },
  {
    icon: Cloud,
    title: "Multi-Provider Support",
    desc: "Switch between GPT-4, Claude, and other models seamlessly. One interface, all your preferred AI providers.",
  },
  {
    icon: Zap,
    title: "MCP Tool Integration",
    desc: "Connect to 34+ Actions via Model Context Protocol. Extend Nova's capabilities with specialized AI tools.",
  },
  {
    icon: MessageSquare,
    title: "Persistent Threads",
    desc: "Your conversations are saved and organized. Pick up right where you left off, anytime.",
  },
  {
    icon: Brain,
    title: "Agentic Mode",
    desc: "Enable autonomous AI behavior. Set tasks, define goals, and watch Nova execute complex workflows.",
  },
  {
    icon: Shield,
    title: "Zero Token Liability",
    desc: "You pay your provider directly. Furma never marks up API costs or profits from your usage.",
  },
];

const providers = [
  { name: "GPT-4 / Codex", provider: "OpenAI", status: "Available", icon: CheckCircle2 },
  { name: "Claude 3", provider: "Anthropic", status: "Available", icon: CheckCircle2 },
  { name: "DeepSeek Coder", provider: "DeepSeek", status: "Available", icon: CheckCircle2 },
  { name: "Llama 3", provider: "Meta", status: "Coming Soon", icon: AlertCircle },
];

const useCases = [
  {
    icon: Code,
    title: "Code Assistant",
    desc: "Debug, refactor, and write code with Claude Code or GPT-4. Full repository context support.",
  },
  {
    icon: FileText,
    title: "Research & Writing",
    desc: "Analyze documents, summarize papers, and draft content with your preferred model and tone.",
  },
  {
    icon: Settings,
    title: "Agent Workflows",
    desc: "Delegate multi-step tasks to autonomous agents. Connect tools, define goals, execute.",
  },
];

export default function NovaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-6">
        <div className="absolute inset-0 bg-gradient-radial pointer-events-none"></div>
        <div className="absolute top-20 right-[-5%] w-[700px] h-[700px] bg-gradient-radial pointer-events-none opacity-40 blur-[120px] animate-pulse-glow dark:opacity-20"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-foreground/10 pointer-events-none blur-[80px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <Breadcrumbs className="mb-4" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-amber-500/20 mb-8 bg-amber-500/10">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-amber-600">Public Beta</span>
              </div>

              <h1 className="font-serif text-[clamp(42px,7vw,64px)] font-semibold leading-[0.95] tracking-tight text-foreground mb-6">
                Nova Workspace
              </h1>

              <p className="text-[40px] md:text-[56px] font-serif font-bold text-foreground leading-[0.95] mb-8">
                Your AI,<br />
                <span className="text-grey-400 italic">your rules.</span>
              </p>

              <p className="text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 max-w-[540px] mb-10">
                The unified AI workspace where you bring your own API keys and access multiple
                LLM providers without vendor lock-in. One interface, infinite possibilities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contact" size="lg" className="inline-flex items-center gap-2 min-w-[200px]">
                  Try Nova Free
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button href="#features" variant="outline" size="lg" className="min-w-[200px]">
                  See Features
                </Button>
              </div>

              <div className="flex items-center gap-6 mt-12 pt-8 border-t border-grey-200 dark:border-grey-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-[13px] text-grey-600 dark:text-grey-400">No credit card</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-[13px] text-grey-600 dark:text-grey-400">Free tier</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-[13px] text-grey-600 dark:text-grey-400">Your keys</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Right side - UI Mockup */}
            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="absolute -inset-8 bg-foreground/10 blur-3xl rounded-full pointer-events-none"></div>

                <div className="relative bg-background border border-grey-200 dark:border-grey-800 shadow-2xl overflow-hidden p-8">
                  <div className="flex items-center gap-2 px-4 py-3 bg-grey-50 dark:bg-grey-800 border-b border-grey-200 dark:border-grey-700 -mx-8 -mt-8 mb-6">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-grey-700 text-[11px] text-grey-500">
                        <Shield className="w-3 h-3" />
                        nova.aitlas.xyz
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center shadow-lg">
                        <Hexagon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-foreground">Nova</div>
                        <div className="text-[11px] text-grey-500">AI Workspace</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-500/10 text-green-600 text-[10px] font-mono">Online</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-foreground flex-shrink-0"></div>
                      <div className="flex-1 bg-grey-50 dark:bg-grey-800 p-3">
                        <div className="h-3 bg-grey-200 dark:bg-grey-700 w-3/4 mb-2"></div>
                        <div className="h-3 bg-grey-200 dark:bg-grey-700 w-1/2"></div>
                      </div>
                    </div>
                    <div className="flex gap-3 flex-row-reverse">
                      <div className="w-8 h-8 bg-foreground flex-shrink-0"></div>
                      <div className="flex-1 bg-amber-500/10 p-3">
                        <div className="h-3 bg-amber-200/50 dark:bg-amber-800/30 w-full mb-2"></div>
                        <div className="h-3 bg-amber-200/50 dark:bg-amber-800/30 w-5/6"></div>
                        <div className="h-3 bg-amber-200/50 dark:bg-amber-800/30 w-2/3"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-grey-50 dark:bg-grey-800 border border-grey-200 dark:border-grey-700">
                    <div className="flex-1 h-10 bg-white dark:bg-grey-700"></div>
                    <div className="w-10 h-10 bg-amber-500 flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-background" />
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 mt-6 pt-4 border-t border-grey-100 dark:border-grey-800">
                    <span className="px-2 py-1 bg-grey-100 dark:bg-grey-800 text-[10px] font-mono text-grey-500">GPT-4</span>
                    <span className="px-2 py-1 bg-grey-100 dark:bg-grey-800 text-[10px] font-mono text-grey-500">Claude</span>
                    <span className="px-2 py-1 bg-grey-100 dark:bg-grey-800 text-[10px] font-mono text-grey-500">DeepSeek</span>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 w-16 h-16 bg-foreground text-background flex items-center justify-center shadow-xl animate-float">
                  <Brain className="w-8 h-8" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-foreground text-background flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                  <Zap className="w-7 h-7" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Supported Providers */}
      <section className="py-24 bg-grey-50 dark:bg-grey-900/20 border-y border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-500 mb-4">Supported Providers</p>
              <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-tight text-foreground">Connect your favorite AI</h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {providers.map((provider) => (
              <ScrollReveal key={provider.name}>
                <div className="p-6 border border-foreground/10 hover:border-foreground/30 transition-all text-center bg-background">
                  <div className="w-8 h-8 mx-auto mb-2">
                    <provider.icon className={`w-full h-full ${provider.status === "Available" ? "text-green-500" : "text-yellow-500"}`} />
                  </div>
                  <div className="text-[14px] font-bold text-foreground mb-1">{provider.name}</div>
                  <div className="text-[11px] text-grey-500 mb-2">{provider.provider}</div>
                  <span className={`inline-block px-2 py-0.5 text-[9px] font-mono font-bold uppercase border ${provider.status === "Available" ? "bg-green-500/10 text-green-600 border-green-500/20" : "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"}`}>
                    {provider.status}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-amber-500/20 mb-6 bg-amber-500/10">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-amber-600">Features</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-foreground">Everything you need</h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 50}>
                <div className="p-6 border border-foreground/10 hover:border-foreground/30 transition-all h-full bg-background">
                  <div className="w-12 h-12 bg-foreground text-background flex items-center justify-center mb-6 shadow-lg">
                    <feature.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[17px] font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-32 bg-grey-50 dark:bg-grey-900/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-grey-200 dark:border-grey-700 mb-6 bg-grey-100 dark:bg-grey-800">
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-grey-600 dark:text-grey-400">Use Cases</span>
              </div>
              <h2 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.08] tracking-tight text-foreground">Built for every workflow</h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <ScrollReveal key={useCase.title} delay={index * 100}>
                <div className="p-6 border border-foreground/10 hover:border-foreground/30 transition-all text-center group bg-background">
                  <div className="w-16 h-16 bg-foreground text-background flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:-translate-y-1 transition-transform duration-300">
                    <useCase.icon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[18px] font-bold text-foreground mb-3">{useCase.title}</h3>
                  <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{useCase.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Device Support */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-foreground mb-4">Works everywhere</h2>
              <p className="text-[16px] text-grey-600 dark:text-grey-400">Access Nova from any device, anywhere.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0}>
              <div className="text-center p-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-foreground text-background flex items-center justify-center shadow-xl">
                  <Monitor className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Desktop</h3>
                <p className="text-sm text-grey-500">Full-featured web app</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="text-center p-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-foreground text-background flex items-center justify-center shadow-xl">
                  <Smartphone className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Mobile</h3>
                <p className="text-sm text-grey-500">Responsive design</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="text-center p-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-foreground text-background flex items-center justify-center shadow-xl">
                  <Globe className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Any Browser</h3>
                <p className="text-sm text-grey-500">Chrome, Safari, Firefox</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden bg-foreground text-background text-center">
        <div className="absolute inset-0 bg-dots opacity-10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-gradient-radial pointer-events-none opacity-60 animate-pulse-glow"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-background/20 mb-10 bg-background/5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="font-mono text-[11px] font-bold tracking-[0.12em] uppercase text-grey-400">Free to start</span>
            </div>

            <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1] tracking-tight mb-8">Ready to own your AI?</h2>

            <p className="text-[18px] text-background/60 leading-relaxed mb-10 max-w-2xl mx-auto">Join the beta and start using Nova today. No credit card required.</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" size="lg" className="inline-flex items-center gap-2 bg-background text-foreground hover:bg-background/90 min-w-[200px]">
                Start Free
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Link href="/portfolio/aitlas" className="inline-flex items-center justify-center gap-2 text-[14px] font-semibold no-underline px-6 py-3 border border-background/20 text-background hover:bg-background/10 transition-all min-w-[200px]">
                Back to Aitlas
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
