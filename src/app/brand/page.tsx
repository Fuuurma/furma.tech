import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowLeft, Download, CheckCircle2, XCircle, Copy } from "lucide-react";

export const metadata: Metadata = {
  title: "Brand Assets | Furma.tech",
  description: "Official Furma.tech logo files and brand guidelines. Minimalist, clean, and sovereign.",
  robots: { index: false, follow: false },
};

const logos = [
  {
    name: "Logo Minimal",
    file: "/logo-minimal.svg",
    bg: "bg-background",
    desc: "Primary mark - geometric F structure.",
  },
  {
    name: "Logo Dark",
    file: "/logo-dark.svg",
    bg: "bg-black",
    desc: "Inverted for dark backgrounds.",
  },
  {
    name: "Logo Clean",
    file: "/logo-clean.svg",
    bg: "bg-background",
    desc: "Legacy mark with structural dot.",
  },
  {
    name: "Favicon",
    file: "/favicon.svg",
    bg: "bg-background",
    desc: "Standard 32x32 browser icon.",
  },
];

function ColorSwatch({ name, hex, oklch, description }: { name: string; hex: string; oklch: string; description: string }) {
  return (
    <Card className="flex flex-col gap-4 p-6 border-grey-200 dark:border-grey-800 hover:border-foreground/30 transition-all duration-300">
      <div className={`aspect-square border border-grey-200 dark:border-grey-800 ${name === 'Black' ? 'bg-black' : 'bg-white'}`}></div>
      <CardContent className="flex flex-col gap-1 p-0">
        <div className="font-serif text-xl font-bold">{name}</div>
        <div className="font-mono text-xs text-grey-400">{hex}</div>
        <div className="font-mono text-[10px] text-grey-400 opacity-60">{oklch}</div>
        <p className="text-[13px] text-grey-600 dark:text-grey-400">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function LogoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* Header */}
      <PageHeader
        label="Brand Identity"
        title="Brand Assets."
        description="A minimalist, clean identity designed for high-stakes software systems. Strictly monochrome. Professional. Sovereign."
        variant="default"
      >
        <div className="flex items-center gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-grey-500 hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </PageHeader>

      {/* Logo Grid */}
      <Section variant="default">
        <Container size="full">
          <ScrollReveal>
            <div className="mb-12 flex flex-col gap-4">
              <Badge variant="outline" className="w-fit">Logo Files</Badge>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                Download assets
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {logos.map((logo, index) => (
              <Card
                key={logo.name}
                className="flex flex-col gap-4 p-6 bg-background border-grey-200 dark:border-grey-800 hover:border-foreground/30 transition-all duration-300 reveal-up visible"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className={`aspect-square border border-grey-200 dark:border-grey-800 ${logo.bg} flex items-center justify-center p-8 transition-transform group-hover:scale-[0.98] duration-300`}>
                  <Image
                    src={logo.file}
                    alt={logo.name}
                    width={120}
                    height={120}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <CardContent className="flex items-end justify-between p-0">
                  <div>
                    <h3 className="font-bold text-foreground text-[16px] mb-1">{logo.name}</h3>
                    <p className="text-[11px] font-mono text-grey-400 uppercase tracking-wider">{logo.desc}</p>
                  </div>
                  <a
                    href={logo.file}
                    download
                    className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-grey-500 hover:text-foreground transition-colors"
                  >
                    <Download className="size-3.5" />
                    SVG
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Guidelines & Palette */}
      <Section variant="grey">
        <Container size="full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
            {/* Usage Guidelines */}
            <div>
              <ScrollReveal>
                <div className="mb-10 flex flex-col gap-4">
                  <Badge variant="outline" className="w-fit">Usage Guidelines</Badge>
                  <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                    Do&apos;s & Don&apos;ts
                  </h2>
                </div>
              </ScrollReveal>

              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-5">
                  <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-green-600 dark:text-green-400 flex items-center gap-2">
                    <CheckCircle2 className="size-4" />
                    Always
                  </h3>
                  <ul className="flex flex-col gap-3 text-[15px] text-grey-600 dark:text-grey-400">
                    {[
                      "Use the minimal logo for most applications",
                      "Maintain significant clear space around the mark",
                      "Use black logo on white, white logo on black",
                      "Keep the logo sharp and crisp at all sizes",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="size-1.5 bg-foreground mt-2 rounded-full shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-5">
                  <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-red-600 dark:text-red-400 flex items-center gap-2">
                    <XCircle className="size-4" />
                    Never
                  </h3>
                  <ul className="flex flex-col gap-3 text-[15px] text-grey-600 dark:text-grey-400">
                    {[
                      "Stretch, distort, or rotate the logo",
                      "Add drop shadows, glows, or gradients",
                      "Use non-monochrome colors",
                      "Place on busy or low-contrast backgrounds",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="size-1.5 bg-red-500 mt-2 rounded-full shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Color Palette */}
            <div>
              <ScrollReveal>
                <div className="mb-10 flex flex-col gap-4">
                  <Badge variant="outline" className="w-fit">Color System</Badge>
                  <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                    Monochrome palette
                  </h2>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="reveal-up visible">
                  <ColorSwatch
                    name="Black"
                    hex="#000000"
                    oklch="oklch(0 0 0)"
                    description="Deep Space — Primary brand color"
                  />
                </div>
                <div className="reveal-up visible" style={{ transitionDelay: '50ms' }}>
                  <ColorSwatch
                    name="White"
                    hex="#FFFFFF"
                    oklch="oklch(1 0 0)"
                    description="Pure Signal — Background & contrast"
                  />
                </div>
              </div>

              <div className="mt-8 p-5 bg-background border border-grey-200 dark:border-grey-800">
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded bg-grey-100 dark:bg-grey-800 flex items-center justify-center shrink-0">
                    <Copy className="size-4 text-grey-600" />
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-foreground mb-1">Strictly Monochrome</div>
                    <p className="text-[13px] text-grey-600 dark:text-grey-400 leading-relaxed">
                      Our brand uses only black and white. No colored variants, no gradients, no exceptions.
                      This reflects our commitment to clarity and sovereignty.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Typography */}
      <Section variant="default">
        <Container size="full">
          <ScrollReveal>
            <div className="mb-12 flex flex-col gap-4">
              <Badge variant="outline" className="w-fit">Typography</Badge>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                Type system
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 p-8 bg-background border-grey-200 dark:border-grey-800">
              <CardContent className="flex flex-col gap-6 p-0">
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase text-grey-400 mb-2">Syne — Headlines</div>
                  <div className="text-[48px] font-serif font-semibold leading-tight">The quick brown fox</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase text-grey-400 mb-2">JetBrains Mono — Code & UI</div>
                  <div className="font-mono text-[14px] leading-relaxed">const sovereignty = true; // BYOK architecture</div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-8 bg-grey-50 dark:bg-grey-900/50 border-grey-200 dark:border-grey-800">
              <CardContent className="flex flex-col gap-4 p-0">
                <div className="font-mono text-[10px] font-bold uppercase text-grey-400">Usage</div>
                <ul className="flex flex-col gap-3 text-[14px] text-grey-600 dark:text-grey-400">
                  <li><strong className="text-foreground">Serif</strong> for headlines & hero text</li>
                  <li><strong className="text-foreground">Sans</strong> for body copy & UI</li>
                  <li><strong className="text-foreground">Mono</strong> for code & technical content</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Footer Navigation */}
      <Section variant="default">
        <Container size="md">
          <ScrollReveal>
            <div className="flex flex-col items-center gap-6 text-center pt-16 border-t border-border">
              <div className="flex flex-col gap-2">
                <Badge variant="outline" className="w-fit mx-auto">Need something else?</Badge>
                <p className="text-[15px] text-grey-600 dark:text-grey-400">
                  For custom brand requests or questions, get in touch.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/" variant="default" size="lg">
                  <ArrowLeft data-icon="inline-start" />
                  Back to Furma.tech
                </Button>
                <Button href="/#contact" variant="outline" size="lg">
                  Contact us
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </div>
  );
}
