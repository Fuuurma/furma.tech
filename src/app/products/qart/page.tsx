import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'QArt — Furma.tech',
  description: 'AI-generated QR codes that look like art. Transform any QR code into stunning visual art while maintaining full scannability.',
};

export default function QArtPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="px-4 sm:px-6 md:px-12 py-16 sm:py-24 border-b border-border">
        <div className="max-w-4xl">
          <Link href="/products" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-grey-500 hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-xl bg-pink-500/10 flex items-center justify-center">
              <QrCode className="w-7 h-7 text-pink-500" strokeWidth={1.5} />
            </div>
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">Roadmap</Badge>
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

      <section className="px-4 sm:px-6 md:px-12 py-16 sm:py-24">
        <div className="max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>What is QArt?</h2>
            <p className="text-grey-600 dark:text-grey-400">
              QArt uses advanced AI to transform standard QR codes into unique visual artworks 
              while maintaining 100% scannability. Perfect for marketing materials, product 
              packaging, and brand campaigns.
            </p>
            
            <h2>Features</h2>
            <ul>
              <li>AI-powered art generation</li>
              <li>Full scannability guaranteed</li>
              <li>Brand customization options</li>
              <li>Multiple art styles</li>
              <li>High-resolution exports</li>
            </ul>
            
            <h2>Status</h2>
            <p className="text-grey-600 dark:text-grey-400">
              Planned for Q2 2026. Join the waitlist to get early access when we launch.
            </p>
          </div>
          
          <div className="mt-12 pt-12 border-t border-border">
            <Button href="/contact" variant="default" size="lg">
              Join Waitlist
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
