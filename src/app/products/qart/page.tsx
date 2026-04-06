import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, QrCode, Sparkles, Palette, Scan, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Section, Container } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'QArt — Furma.tech',
  description: 'AI-generated QR codes that look like art. Transform any QR code into stunning visual art while maintaining full scannability.',
};

const features = [
  { icon: Sparkles, title: 'AI-Powered Generation', desc: 'Transform standard QR codes into unique artworks using advanced AI models.' },
  { icon: Scan, title: '100% Scannable', desc: 'Every generated design maintains full QR code functionality and reliability.' },
  { icon: Palette, title: 'Brand Customization', desc: 'Match colors, styles, and aesthetics to your brand identity.' },
  { icon: Wand2, title: 'Multiple Art Styles', desc: 'Choose from various artistic styles from minimal to elaborate.' },
];

export default function QArtPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="px-4 sm:px-6 md:px-12 py-16 sm:py-24 border-b border-border">
        <div className="max-w-4xl">
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-grey-500 hover:text-foreground transition-colors mb-8 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
            Back to Products
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-xl bg-pink-500/10 flex items-center justify-center cursor-pointer hover:bg-pink-500/20 transition-colors">
              <QrCode className="w-7 h-7 text-pink-500" strokeWidth={1.5} />
            </div>
            <Badge className="text-[10px] uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
              Roadmap
            </Badge>
          </div>
          
          <h1 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-tight text-foreground mb-6">
            QArt
          </h1>
          <p className="text-[18px] sm:text-[20px] leading-[1.6] text-grey-600 dark:text-grey-400 max-w-[650px]">
            Transform any QR code into stunning visual art while maintaining full scannability. 
            AI-powered design generation for branded, beautiful QR codes.
          </p>
        </div>
      </section>

      {/* Features */}
      <Section variant="default">
        <Container size="md">
          <ScrollReveal>
            <div className="mb-10">
              <div className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-4">
                Features
              </div>
              <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                What makes QArt special
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 50}>
                <div className="group p-6 bg-white dark:bg-grey-900 border border-grey-200 dark:border-grey-800 hover:border-foreground/30 transition-all duration-300 cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-pink-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[16px] font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Status */}
      <Section variant="grey">
        <Container size="md">
          <ScrollReveal>
            <div className="p-8 bg-white dark:bg-grey-900 border border-grey-200 dark:border-grey-800 rounded-lg text-center">
              <h2 className="font-serif text-[28px] font-semibold mb-3">Coming in Q2 2026</h2>
              <p className="text-[15px] text-grey-600 dark:text-grey-400 mb-6 max-w-md mx-auto">
                Join the waitlist to get early access when we launch. Be the first to create beautiful, scannable QR art.
              </p>
              <Button href="/contact" variant="default" size="lg" className="cursor-pointer">
                Join Waitlist
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </div>
  );
}
