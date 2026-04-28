import { Activity, Apple, Zap, Moon, TrendingUp } from 'lucide-react';
import { ProjectLayout, ProjectHero, ProjectSection, ProjectSectionHeader, ProjectCTA } from '@/components/ui/ProjectLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { PricingSection } from '@/components/ui/PricingSection';
import { constructMetadata } from '@/lib/metadata';

export const metadata = constructMetadata({
  title: 'f.health — Wearable Data | Furma.tech',
  description: 'Aggregate health data from Whoop, Oura, and Apple Health. Get AI insights and correlations.',
});

const features = [
  { title: 'Multi-Source Sync', desc: 'Connect Whoop, Oura, and import Apple Health data. All your wearables in one place.' },
  { title: 'Correlation Analysis', desc: 'Discover patterns. See how sleep affects performance, or how training impacts recovery.' },
  { title: 'AI Insights', desc: 'Get personalized recommendations powered by AI. Understand what drives your metrics.' },
  { title: 'Vector Search', desc: 'Semantic search across your health data. Find patterns across months of measurements.' },
  { title: 'Privacy First', desc: 'Your health data stays yours. Encrypted at rest. You provide your own OpenAI key for embeddings.' },
  { title: 'Manual Entry', desc: 'Add data that wearables miss. Log mood, energy, stress, and custom metrics.' },
];

const sources = [
  { name: 'Whoop', icon: Activity, status: 'Live', desc: 'Strain, recovery, sleep, HRV' },
  { name: 'Oura', icon: Moon, status: 'Live', desc: 'Readiness, sleep, temperature' },
  { name: 'Apple Health', icon: Apple, status: 'Live', desc: 'Import XML/JSON exports' },
];

const pricing = [
  { name: 'Basic', price: '€0', period: '/mo', desc: 'For curious users', features: ['1 source', 'Basic metrics', 'Manual entry', 'Community support'] },
  { name: 'Pro', price: '€19', period: '/mo', desc: 'For optimizers', popular: true, features: ['3 sources', 'Full metrics', 'AI insights', 'Correlation analysis', 'Priority support'] },
  { name: 'Team', price: '€59', period: '/mo', desc: 'For coaches', features: ['Unlimited sources', 'Team management', 'API access', 'Custom metrics', 'Dedicated support'] },
];

export default function HealthPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Aitlas Action"
        title="f.health"
        description="Unified health data infrastructure. Aggregate metrics from Whoop, Oura, and Apple Health into a single sovereign knowledge base for AI insights."
        status={{ label: 'In Development', variant: 'beta' }}
      />

      <ProjectSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] text-foreground mb-8">
                Understand your body,<br />optimized.
              </h2>
              <p className="text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-10 max-w-md">
                Stop looking at raw numbers. f.health correlates your behavior with your results, providing actionable AI insights.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/#contact" variant="default" size="lg">
                  Get Access
                </Button>
                <Button href="/portfolio/aitlas" variant="outline" size="lg">
                  Integration Docs
                </Button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative">
              <Card className="border-border shadow-2xl rotate-1 p-6 sm:p-8 bg-background">
                <div className="font-mono text-[10px] text-muted-foreground mb-6 uppercase tracking-widest font-bold">AI Correlation Found</div>
                <div className="space-y-6">
                  <div className="p-4 border border-foreground/10">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="w-4 h-4 text-foreground" />
                      <span className="text-[14px] font-bold text-foreground">Recovery Optimization</span>
                    </div>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">
                      Your recovery score is <span className="text-foreground font-bold">23% higher</span> on days following sleep durations over 7.5 hours.
                    </p>
                  </div>
                  <div className="p-4 border border-foreground/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="w-4 h-4 text-foreground" />
                      <span className="text-[14px] font-bold text-foreground">HRV Warning</span>
                    </div>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">
                      HRV drops 15% when alcohol is consumed within 4 hours of sleep.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </ProjectSection>

      <ProjectSection variant="muted">
        <div className="text-center mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Supported Sources</span>
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold text-foreground">Connect your wearables</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sources.map((s) => (
            <Card key={s.name} className="border-border p-6 bg-background text-center hover:border-foreground/30 transition-colors">
              <div className="w-10 h-10 bg-muted/50 flex items-center justify-center mx-auto mb-6">
                <s.icon className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="text-[16px] font-bold text-foreground mb-2">{s.name}</h3>
              <p className="text-[13px] text-muted-foreground mb-4">{s.desc}</p>
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 border border-foreground/20">Live</span>
            </Card>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionHeader label="Features" title="Understand your body." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div key={feature.title} className="border border-border p-6 hover:border-foreground/30 transition-colors">
              <h3 className="text-[15px] font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection variant="muted">
        <PricingSection plans={pricing} />
      </ProjectSection>

      <ProjectCTA
        title="Know yourself better"
        description="Connect your wearables and discover what drives your performance. Privacy-first health intelligence."
        primaryHref="/#contact"
        primaryLabel="Join Waitlist"
        secondaryHref="/portfolio/aitlas"
        secondaryLabel="Back to Aitlas"
      />
    </ProjectLayout>
  );
}
