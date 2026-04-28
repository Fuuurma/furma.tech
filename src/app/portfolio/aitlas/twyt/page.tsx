import { Globe, Search, BarChart3, CheckCircle2 } from 'lucide-react';
import { ProjectLayout, ProjectHero, ProjectSection, ProjectSectionHeader, ProjectCTA } from '@/components/ui/ProjectLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { constructMetadata } from '@/lib/metadata';

export const metadata = constructMetadata({
  title: 'f.twyt — Twitter Intelligence | Furma.tech',
  description: 'Twitter search, ingestion, and semantic search. Build your own feed AI with sovereign Twitter intelligence.',
});

const features = [
  { title: 'Advanced Search', desc: 'Query Twitter with precision. Filter by date, engagement, author, and keywords. Build complex queries with boolean operators.' },
  { title: 'Feed Ingestion', desc: 'Continuously ingest tweets from specific accounts, hashtags, or search terms. Your personal Twitter firehose.' },
  { title: 'Semantic Search', desc: 'Search by meaning, not just keywords. Find tweets about concepts even when exact words don\'t match.' },
  { title: 'Noise Filtering', desc: 'AI-powered filtering removes spam, bots, and low-quality content. See only signal, not noise.' },
  { title: 'Export Data', desc: 'Download your ingested tweets as JSON or CSV. Full ownership of your data for analysis or archival.' },
  { title: 'Sovereign Access', desc: 'Your Twitter data, your control. No tracking, no profiling. Pure API access without the corporate overhead.' },
];

const useCases = [
  { icon: BarChart3, title: 'Market Research', desc: 'Track sentiment around products, brands, or trends. Real-time market intelligence from Twitter conversations.' },
  { icon: Search, title: 'Competitor Monitoring', desc: 'Watch competitor announcements, customer complaints, and product launches as they happen.' },
  { icon: Globe, title: 'Personal Feed Curation', desc: 'Build your own algorithm-free Twitter feed. See tweets that matter to you, in your preferred order.' },
];

const creditExamples = [
  { action: 'Simple search', cost: '1 credit' },
  { action: 'Advanced search', cost: '1 credit' },
  { action: 'Semantic search', cost: '2 credits' },
  { action: 'Feed sync (per 100 tweets)', cost: '1 credit' },
];

export default function TwytPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Aitlas Action"
        title="f.twyt"
        description="Advanced Twitter search, feed ingestion, and semantic search. Build your own algorithm-free feed. Track trends, monitor competitors, and curate your personal Twitter intelligence."
        status={{ label: 'In Development', variant: 'beta' }}
      />

      <ProjectSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] text-foreground mb-8">
                Twitter,<br />sovereign.
              </h2>
              <p className="text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-10 max-w-md">
                Stop fighting the algorithm. Get direct, programmatic access to the global conversation. Build your own intelligence feed.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/#contact" variant="default" size="lg">
                  Try f.twyt
                </Button>
                <Button href="/portfolio/aitlas" variant="outline" size="lg">
                  API Docs
                </Button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative">
              <Card className="bg-background border-border shadow-2xl overflow-hidden rotate-1">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="font-mono text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Query: Semantic</span>
                </div>
                <div className="p-6 space-y-4">
                  <div className="p-4 bg-muted/30 border border-border">
                    <div className="h-3 bg-border w-1/3 mb-3" />
                    <div className="h-2 bg-muted w-full mb-2" />
                    <div className="h-2 bg-muted w-5/6" />
                  </div>
                  <div className="p-4 bg-muted/30 border border-border">
                    <div className="h-3 bg-border w-1/4 mb-3" />
                    <div className="h-2 bg-muted w-full mb-2" />
                  </div>
                </div>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </ProjectSection>

      <ProjectSection variant="muted">
        <ProjectSectionHeader label="Features" title="Twitter intelligence." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div key={feature.title} className="border border-border p-6 hover:border-foreground/30 transition-colors bg-background">
              <h3 className="text-[15px] font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionHeader label="Use Cases" title="What you can do" description="f.twyt empowers researchers, marketers, and power users." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map((useCase) => (
            <div key={useCase.title} className="border border-border p-6 text-center hover:border-foreground/30 transition-colors">
              <div className="w-14 h-14 bg-foreground text-background flex items-center justify-center mx-auto mb-6">
                <useCase.icon className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <h3 className="text-[16px] font-bold text-foreground mb-3">{useCase.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{useCase.desc}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection variant="muted">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Pricing</span>
            <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-semibold text-foreground">Pay per use</h2>
          </div>
          <Card className="border-border p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-[16px] font-bold mb-6 text-foreground">Credit Costs</h3>
                <div className="space-y-4">
                  {creditExamples.map((ex) => (
                    <div key={ex.action} className="flex justify-between items-center text-[13px] pb-4 border-b border-border last:border-0 last:pb-0">
                      <span className="text-muted-foreground">{ex.action}</span>
                      <span className="font-mono font-bold text-foreground">{ex.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-muted/30 p-8 border border-border">
                <h3 className="text-[16px] font-bold mb-4 text-foreground">Why f.twyt?</h3>
                <ul className="space-y-3">
                  {['Zero algorithm bias', 'Full JSON exports', 'MCP ready', 'BYOK compatible'].map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[13px]">
                      <CheckCircle2 className="w-4 h-4 text-foreground/40" />
                      <span className="text-muted-foreground">{p}</span>
                    </li>
                  ))}
                </ul>
                <Button href="/#contact" variant="default" className="w-full mt-8">Purchase Credits</Button>
              </div>
            </div>
          </Card>
        </div>
      </ProjectSection>

      <ProjectCTA
        title="Ready to own your feed?"
        description="Start searching Twitter with f.twyt. Join the waitlist for private beta access."
        primaryHref="/#contact"
        primaryLabel="Join the Waitlist"
        secondaryHref="/portfolio/aitlas"
        secondaryLabel="Back to Aitlas"
      />
    </ProjectLayout>
  );
}
