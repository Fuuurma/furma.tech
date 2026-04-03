import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Section, Container, SectionHeader } from "@/components/ui/Section";
import { ScrollReveal, StaggerChildren } from "@/components/ui/ScrollReveal";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Zap, Shield, Globe, Package, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Styleguide — Furma.tech",
  description: "Design system and UI components for Furma.tech.",
};

export default function StyleguidePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background pb-20">
      {/* Header */}
      <Section variant="dark" className="pt-32 pb-20">
        <Container size="full">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-background text-foreground mb-8">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em]">System v1.0</span>
            </div>
            <h1 className="font-serif text-[clamp(48px,8vw,96px)] font-semibold leading-[0.95] tracking-tight mb-8">
              Design<br />
              <span className="italic font-normal opacity-50">Styleguide.</span>
            </h1>
            <p className="text-[18px] sm:text-[20px] text-background/60 max-w-2xl leading-relaxed">
              A minimalist, high-end monochrome design system built for speed, 
              sovereignty, and professional-grade SaaS tools.
            </p>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Typography */}
      <Section id="typography">
        <Container size="full">
          <SectionHeader 
            label="01 / Foundation"
            title="Typography"
            description="Our type system uses Syne for UI, Cormorant for expressive headlines, and JetBrains Mono for data."
          />
          
          <div className="space-y-16 mt-12">
            {/* Serif Headlines */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Serif Headlines</div>
              <div className="md:col-span-3 space-y-8">
                <h1 className="font-serif text-6xl font-semibold tracking-tight">Headline H1 (60px)</h1>
                <h2 className="font-serif text-5xl font-semibold tracking-tight">Headline H2 (48px)</h2>
                <h3 className="font-serif text-4xl font-semibold tracking-tight">Headline H3 (36px)</h3>
                <h4 className="font-serif text-3xl font-semibold tracking-tight italic">Headline H4 (30px) - Italic</h4>
              </div>
            </div>

            <Separator />

            {/* Sans UI */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Sans UI Text</div>
              <div className="md:col-span-3 space-y-8">
                <div className="space-y-2">
                  <div className="text-xl font-bold tracking-tight">Bold UI Text (20px)</div>
                  <p className="text-grey-600 dark:text-grey-400 max-w-xl leading-relaxed">
                    The quick brown fox jumps over the lazy dog. This is our primary UI font (Syne).
                    It's designed to be clean, geometric, and modern.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium uppercase tracking-widest">Small Caps Label (14px)</div>
                  <p className="text-sm text-grey-500 leading-relaxed max-w-xl">
                    Secondary text and descriptive labels use a smaller scale with increased tracking 
                    for legibility in professional interfaces.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Mono Data */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest pt-2">Mono Data</div>
              <div className="md:col-span-3 space-y-4">
                <div className="font-mono text-sm bg-grey-50 dark:bg-grey-900 p-4 border border-border">
                  {"const system = \"Furma.tech\";"},<br />
                  {"console.log(`Welcome to ${system}`);"}
                </div>
                <p className="font-mono text-[11px] text-grey-500 uppercase tracking-tighter">
                  Monospace is used for technical data, status labels, and code blocks.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Colors */}
      <Section variant="grey">
        <Container size="full">
          <SectionHeader 
            label="02 / Foundation"
            title="Color Palette"
            description="Strictly monochrome. We use oklch color space for perfect perceptual balance between light and dark modes."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              { name: 'Background', class: 'bg-background border-border', text: 'text-foreground' },
              { name: 'Foreground', class: 'bg-foreground border-foreground', text: 'text-background' },
              { name: 'Secondary', class: 'bg-secondary border-border', text: 'text-foreground' },
              { name: 'Muted', class: 'bg-muted border-border', text: 'text-muted-foreground' },
            ].map(color => (
              <div key={color.name} className="space-y-4">
                <div className={`h-24 w-full border ${color.class} flex items-center justify-center font-bold text-xs uppercase tracking-widest ${color.text}`}>
                  {color.name}
                </div>
                <div className="font-mono text-[10px] text-grey-500 uppercase tracking-widest">{color.name}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mt-8">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(step => (
              <div key={step} className="space-y-2">
                <div className={`h-12 w-full bg-grey-${step} border border-border/50`}></div>
                <div className="font-mono text-[8px] text-grey-400 text-center">{step}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Buttons */}
      <Section>
        <Container size="full">
          <SectionHeader 
            label="03 / Components"
            title="Buttons"
            description="Highly interactive, tracked components with multiple variants for hierarchy."
          />

          <div className="space-y-12 mt-12">
            {/* Variants */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest">Variants</div>
              <div className="md:col-span-3 flex flex-wrap gap-4">
                <Button variant="default">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="premium">Premium</Button>
                <Button variant="dark">Dark</Button>
              </div>
            </div>

            {/* Sizes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest">Sizes</div>
              <div className="md:col-span-3 flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium (Default)</Button>
                <Button size="lg">Large Scale</Button>
              </div>
            </div>

            {/* States */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest">States & Icons</div>
              <div className="md:col-span-3 flex flex-wrap gap-4">
                <Button glow>Glowing Button</Button>
                <Button disabled>Disabled State</Button>
                <Button variant="default">
                  Next Step <ArrowRight className="w-3 h-3" />
                </Button>
                <Button variant="outline">
                  <Zap className="w-3 h-3" /> Action
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Badges */}
      <Section variant="grey">
        <Container size="full">
          <SectionHeader 
            label="04 / Components"
            title="Badges"
            description="Status indicators and categorical labels."
          />

          <div className="flex flex-wrap gap-4 mt-12">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="inverted">Inverted</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </Container>
      </Section>

      {/* Cards */}
      <Section>
        <Container size="full">
          <SectionHeader 
            label="05 / Components"
            title="Cards"
            description="Versatile containers for grouping related information."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <Card className="hover:border-foreground/30 hover:shadow-2xl hover:shadow-foreground/5 transition-all duration-500">
              <CardHeader>
                <CardTitle>Standard Card</CardTitle>
                <CardDescription>With hover effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-grey-600 dark:text-grey-400">
                  The base card component used across the application.
                </p>
              </CardContent>
            </Card>

            <Card className="border-foreground/20 p-6 sm:p-8">
              <CardHeader>
                <CardTitle>Premium Variant</CardTitle>
                <CardDescription>For highlighted content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-grey-600 dark:text-grey-400">
                  Larger padding and a more pronounced border.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-foreground text-background border-foreground">
              <CardHeader>
                <CardTitle className="text-background">Dark Mode Card</CardTitle>
                <CardDescription className="text-background/50">High contrast</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-background/70">
                  Inverse color scheme for dramatic separation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-transparent border-transparent hover:border-foreground/30 hover:shadow-2xl hover:shadow-foreground/5 transition-all duration-500">
              <CardHeader>
                <CardTitle>Ghost Variant</CardTitle>
                <CardDescription>Minimal visual weight</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-grey-600 dark:text-grey-400">
                  No background or border by default.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Sections */}
      <Section variant="grey">
        <Container size="full">
          <SectionHeader 
            label="06 / Layout"
            title="Section Variants"
            description="Controlled spacing and background combinations."
          />

          <div className="space-y-6 mt-12">
            <div className="p-8 border border-border bg-background flex items-center justify-between">
              <span className="font-bold">Default Section</span>
              <Badge variant="outline">bg-background</Badge>
            </div>
            <div className="p-8 border border-border bg-secondary flex items-center justify-between">
              <span className="font-bold">Grey Section</span>
              <Badge variant="outline">bg-secondary</Badge>
            </div>
            <div className="p-8 border border-foreground bg-foreground text-background flex items-center justify-between">
              <span className="font-bold">Dark Section</span>
              <Badge variant="outline" className="border-background text-background">bg-foreground</Badge>
            </div>
          </div>
        </Container>
      </Section>

      {/* Utilities */}
      <Section>
        <Container size="full">
          <SectionHeader 
            label="07 / Special Effects"
            title="UI Utilities"
            description="Custom CSS classes for that premium feel."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            {/* Glass */}
            <div className="space-y-4">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest">Glassmorphism</div>
              <div className="h-40 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80')] bg-cover bg-center flex items-center justify-center p-8">
                <div className="glass p-6 text-center w-full">
                  <div className="font-bold">.glass class</div>
                  <div className="text-[10px] uppercase tracking-widest mt-1 opacity-60">Blur + Translucency</div>
                </div>
              </div>
            </div>

            {/* Hover Lift */}
            <div className="space-y-4">
              <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest">Interaction</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="hover-lift h-40 border border-border flex items-center justify-center font-bold bg-card cursor-pointer">
                  .hover-lift
                </div>
                <div className="card-hover h-40 border border-border flex items-center justify-center font-bold bg-card cursor-pointer">
                  .card-hover
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 space-y-4">
            <div className="font-mono text-[10px] text-grey-400 uppercase tracking-widest">Scroll Reveal</div>
            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-12 border border-border text-center font-serif text-2xl italic opacity-30">
                  Item {i}
                </div>
              ))}
            </StaggerChildren>
            <p className="text-[11px] text-grey-500 uppercase tracking-widest text-center mt-4">
              Refresh the page to see the stagger animation.
            </p>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="dark" className="mt-20">
        <Container size="md" className="text-center">
          <h2 className="font-serif text-5xl font-bold mb-8 italic">Ready to build?</h2>
          <div className="flex justify-center gap-4">
            <Button href="/" variant="outline" className="border-background text-background hover:bg-background hover:text-foreground">
              Return Home
            </Button>
            <Button href="/contact" variant="default">
              Contact Us
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
