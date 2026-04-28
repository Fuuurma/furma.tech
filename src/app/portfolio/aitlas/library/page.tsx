import { BookOpen, Search, Upload, Database, FileText, FileJson, BookMarked, Globe, Settings, ArrowRight } from 'lucide-react';
import { ProjectLayout, ProjectHero, ProjectSection, ProjectSectionHeader, ProjectCTA } from '@/components/ui/ProjectLayout';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { constructMetadata } from '@/lib/metadata';

export const metadata = constructMetadata({
  title: 'f.library — Vector Knowledge Base | Furma.tech',
  description: 'Vectorized personal knowledge base. Upload PDFs, docs, and let AI search across everything you\'ve saved.',
});

const features = [
  { title: 'Upload Anything', desc: 'PDFs, Word docs, text files, web pages. f.library ingests and vectorizes all your documents automatically.' },
  { title: 'Vector Embeddings', desc: 'Every document is converted to vector embeddings. Search by meaning, not just keyword matching.' },
  { title: 'Semantic Search', desc: 'Find documents by concept. Ask questions in natural language and get relevant passages back.' },
  { title: 'Smart Organization', desc: 'Auto-tagging and categorization. Your library organizes itself as you add more documents.' },
  { title: 'Export Anytime', desc: 'Download your entire library or specific collections. Full data portability, always.' },
  { title: 'Private by Design', desc: 'Your documents are encrypted at rest. Only you can access your knowledge base.' },
];

const useCases = [
  { icon: FileText, title: 'Research Library', desc: 'Store and search academic papers, articles, and reports. Find relevant citations instantly.' },
  { icon: BookOpen, title: 'Personal Wiki', desc: 'Build your second brain. Connect ideas across documents. Never lose a valuable insight again.' },
  { icon: Database, title: 'Team Knowledge Base', desc: 'Centralize team documentation. Onboard new members faster with instant knowledge access.' },
];

const supportedFormats = [
  { format: 'PDF', icon: FileText },
  { format: 'DOCX', icon: FileText },
  { format: 'TXT', icon: FileJson },
  { format: 'MD', icon: BookMarked },
  { format: 'HTML', icon: Globe },
  { format: 'JSON', icon: Settings },
];

export default function LibraryPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Aitlas Action"
        title="f.library"
        description="Vectorized personal knowledge base. Upload PDFs, documents, and notes. Search across everything with AI-powered semantic search. Never lose a valuable insight again."
        status={{ label: 'In Development', variant: 'beta' }}
      />

      <ProjectSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] text-foreground mb-8">
                Your second<br />brain.
              </h2>
              <p className="text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-10 max-w-md">
                Turn your static documents into an interactive knowledge base. f.library indexes your data so your AI can find exactly what you need.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/#contact" size="lg">
                  Start Building Library
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button href="/portfolio/aitlas" variant="outline" size="lg">
                  Read Docs
                </Button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="relative">
              <div className="border border-border p-6 -rotate-1 shadow-2xl bg-background">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <span className="font-mono text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Aitlas Knowledge</span>
                </div>
                <div className="p-8 space-y-6">
                  <div className="border-2 border-dashed border-border p-6 text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-[12px] text-muted-foreground">Drop to index</p>
                  </div>
                  <div className="space-y-3">
                    <div className="h-10 bg-muted/30 border border-border flex items-center px-4">
                      <FileText className="w-4 h-4 text-muted-foreground mr-3" />
                      <div className="h-2 bg-border w-1/2" />
                    </div>
                    <div className="h-10 bg-muted/30 border border-border flex items-center px-4">
                      <FileText className="w-4 h-4 text-muted-foreground mr-3" />
                      <div className="h-2 bg-border w-1/3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </ProjectSection>

      <ProjectSection variant="muted">
        <div className="flex flex-wrap justify-center gap-4">
          {supportedFormats.map((f) => (
            <div key={f.format} className="p-3 px-4 bg-background border border-border hover:border-foreground/30 transition-colors">
              <div className="flex items-center gap-3">
                <f.icon className="w-4 h-4 text-muted-foreground" />
                <span className="font-mono text-[12px] font-bold text-muted-foreground">{f.format}</span>
              </div>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionHeader label="Features" title="Knowledge, amplified." />
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
        <ProjectSectionHeader label="Use Cases" title="Build your library" description="Semantic search changes how you interact with your information." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map((useCase) => (
            <div key={useCase.title} className="border border-border p-6 bg-background text-center hover:border-foreground/30 transition-colors">
              <div className="w-14 h-14 bg-foreground text-background flex items-center justify-center mx-auto mb-6">
                <useCase.icon className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <h3 className="text-[16px] font-bold text-foreground mb-3">{useCase.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{useCase.desc}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection>
        <div className="max-w-2xl mx-auto text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Pricing</span>
          <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-semibold text-foreground mb-4">Pay per document</h2>
          <p className="text-[14px] text-muted-foreground mb-10">Ingest once, search forever. No monthly lock-in.</p>
          <div className="border border-border p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-[14px]">Ingest</h3>
                <p className="text-[32px] font-serif font-bold text-foreground mb-1">2¢</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">per document</p>
              </div>
              <div>
                <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center mx-auto mb-4">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-[14px]">Search</h3>
                <p className="text-[32px] font-serif font-bold text-foreground mb-1">1¢</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">per query</p>
              </div>
              <div>
                <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center mx-auto mb-4">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-[14px]">Storage</h3>
                <p className="text-[32px] font-serif font-bold text-foreground mb-1">Free</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">unlimited</p>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      <ProjectCTA
        title="Build your knowledge base"
        description="Upload your first documents and experience the power of semantic memory. Connect f.library to your Nova workspace today."
        primaryHref="/#contact"
        primaryLabel="Try f.library"
        secondaryHref="/portfolio/aitlas"
        secondaryLabel="Back to Aitlas"
      />
    </ProjectLayout>
  );
}
