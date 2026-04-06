import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Section, Container } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Product — Furma.tech',
  description: 'Product from Furma.tech venture studio.',
};

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="px-4 sm:px-6 md:px-12 py-16 sm:py-24 border-b border-border">
        <div className="max-w-4xl">
          <Link href="/products" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-grey-500 hover:text-foreground transition-colors mb-8 cursor-pointer group">
            <ArrowLeft className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
            Back to Products
          </Link>
          <Badge className="mb-6 text-[10px] uppercase tracking-wider bg-grey-500/10 text-grey-500 border-grey-500/20">Paused</Badge>
          <h1 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-tight text-foreground mb-6">Product</h1>
          <p className="text-[18px] sm:text-[20px] leading-[1.6] text-grey-600 dark:text-grey-400 max-w-[650px]">
            This product is currently paused. We may revisit it when we have more capacity.
          </p>
        </div>
      </section>
      <Section variant="grey">
        <Container size="md">
          <ScrollReveal>
            <div className="text-center">
              <Button href="/products" variant="default" size="lg" className="cursor-pointer">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Products
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </div>
  );
}
