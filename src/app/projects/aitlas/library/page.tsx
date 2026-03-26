import { constructMetadata } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { FeaturesGrid } from "@/components/ui/FeaturesGrid";
import { Section, Container } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { BookOpen, Search, Upload, Database, Brain, FolderOpen, Download, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "f.library — Vector Knowledge Base | Furma.tech",
  description: "Vectorized personal knowledge base. Upload PDFs, docs, and let AI search across everything you've saved.",
});

const features = [
  {
    title: "Upload Anything",
    desc: "PDFs, Word docs, text files, web pages. f.library ingests and vectorizes all your documents automatically.",
  },
  {
    title: "Vector Embeddings",
    desc: "Every document is converted to vector embeddings. Search by meaning, not just keyword matching.",
  },
  {
    title: "Semantic Search",
    desc: "Find documents by concept. Ask questions in natural language and get relevant passages back.",
  },
  {
    title: "Smart Organization",
    desc: "Auto-tagging and categorization. Your library organizes itself as you add more documents.",
  },
  {
    title: "Export Anytime",
    desc: "Download your entire library or specific collections. Full data portability, always.",
  },
  {
    title: "Private by Design",
    desc: "Your documents are encrypted at rest. Only you can access your knowledge base.",
  },
];

const useCases = [
  {
    icon: FileText,
    title: "Research Library",
    desc: "Store and search academic papers, articles, and reports. Find relevant citations instantly.",
  },
  {
    icon: BookOpen,
    title: "Personal Wiki",
    desc: "Build your second brain. Connect ideas across documents. Never lose a valuable insight again.",
  },
  {
    icon: Database,
    title: "Team Knowledge Base",
    desc: "Centralize team documentation. Onboard new members faster with instant knowledge access.",
  },
];

const supportedFormats = [
  { format: "PDF", icon: "📄" },
  { format: "DOCX", icon: "📝" },
  { format: "TXT", icon: "📃" },
  { format: "MD", icon: "📑" },
  { format: "HTML", icon: "🌐" },
  { format: "JSON", icon: "⚙️" },
];

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProjectHero 
        label="Aitlas — Action"
        title="f.library"
        description="Vectorized personal knowledge base. Upload PDFs, documents, and notes. Search across everything with AI-powered semantic search. Never lose a valuable insight again."
        status="Live"
        tags={["Vector DB", "Semantic Search", "Personal Knowledge"]}
      />

      {/* Showcase */}
      <Section variant="default" className="py-0 md:py-0 overflow-hidden">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="py-20">
                <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] mb-8">
                  Your second<br />
                  <span className="gradient-text italic">brain.</span>
                </h2>
                <p className="text-[18px] leading-[1.7] text-grey-600 dark:text-grey-400 mb-10 max-w-md">
                  Turn your static documents into an interactive knowledge base. 
                  f.library indexes your data so your AI can find exactly what you need.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button href="/contact" variant="premium" size="lg" glow>
                    Start Building Library →
                  </Button>
                  <Button href="/docs" variant="outline" size="lg">
                    Read Docs
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative py-20 lg:py-32">
                <Card padding="none" className="bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800 shadow-2xl overflow-hidden -rotate-1">
                  <div className="flex items-center gap-2 px-4 py-3 bg-purple-500/5 border-b border-purple-500/10">
                    <BookOpen className="w-4 h-4 text-purple-500" />
                    <span className="font-mono text-[10px] text-purple-600/60 uppercase font-bold tracking-widest">Aitlas Knowledge</span>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="border-2 border-dashed border-grey-100 dark:border-grey-800 rounded-xl p-6 text-center">
                      <Upload className="w-8 h-8 text-grey-300 mx-auto mb-2" />
                      <p className="text-[12px] text-grey-400 font-medium">Drop to index</p>
                    </div>
                    <div className="space-y-3">
                      <div className="h-10 bg-grey-50 dark:bg-grey-800 rounded-lg border border-grey-100 dark:border-grey-700 flex items-center px-4">
                        <FileText className="w-4 h-4 text-purple-400 mr-3" />
                        <div className="h-2 bg-grey-200 dark:bg-grey-700 rounded w-1/2"></div>
                      </div>
                      <div className="h-10 bg-grey-50 dark:bg-grey-800 rounded-lg border border-grey-100 dark:border-grey-700 flex items-center px-4">
                        <FileText className="w-4 h-4 text-purple-400 mr-3" />
                        <div className="h-2 bg-grey-200 dark:bg-grey-700 rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Supported Formats */}
      <Section variant="grey" className="border-y border-grey-200 dark:border-grey-800 py-12">
        <Container size="full">
          <StaggerChildren className="flex flex-wrap justify-center gap-4">
            {supportedFormats.map((f) => (
              <Card key={f.format} padding="sm" className="bg-white dark:bg-grey-900" hover>
                <div className="flex items-center gap-3 px-2">
                  <span>{f.icon}</span>
                  <span className="font-mono text-[12px] font-bold text-grey-600 dark:text-grey-400">{f.format}</span>
                </div>
              </Card>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      <FeaturesGrid features={features} title="Knowledge, amplified." />

      {/* Use Cases */}
      <Section variant="grey" className="border-y border-grey-200 dark:border-grey-800">
        <Container size="full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold mb-4">Build your library</h2>
              <p className="text-grey-600 dark:text-grey-400">Semantic search changes how you interact with your information.</p>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase) => (
              <Card key={useCase.title} padding="lg" hover className="bg-white dark:bg-grey-900 text-center">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 mx-auto mb-6">
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
                <span className="font-mono text-[11px] font-bold tracking-[0.1em] uppercase text-green-600">Pure Utility</span>
              </div>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold mb-4">Pay per document</h2>
              <p className="text-grey-600 dark:text-grey-400">Ingest once, search forever. No monthly lock-in.</p>
            </div>
          </ScrollReveal>

          <Card padding="lg" className="bg-white dark:bg-grey-900 border-grey-200 dark:border-grey-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 mx-auto mb-4">
                  <Upload className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-[15px]">Ingest</h3>
                <p className="text-[32px] font-serif font-bold text-foreground mb-1">2¢</p>
                <p className="text-[12px] text-grey-400 uppercase font-bold tracking-wider">per document</p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mx-auto mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-[15px]">Search</h3>
                <p className="text-[32px] font-serif font-bold text-foreground mb-1">1¢</p>
                <p className="text-[12px] text-grey-400 uppercase font-bold tracking-wider">per query</p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 mx-auto mb-4">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-[15px]">Storage</h3>
                <p className="text-[32px] font-serif font-bold text-foreground mb-1">Free</p>
                <p className="text-[12px] text-grey-400 uppercase font-bold tracking-wider">unlimited</p>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section variant="dark" className="text-center py-32">
        <Container size="md">
          <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.1] mb-8">
            Build your knowledge base
          </h2>
          <p className="text-[18px] text-white/60 mb-12 max-w-xl mx-auto">
            Upload your first documents and experience the power of semantic memory. 
            Connect f.library to your Nova workspace today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="premium" size="lg" glow>
              Try f.library →
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
