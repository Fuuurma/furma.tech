import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'LinkUp — Furma.tech',
  description: 'AI-driven short-video matching for professionals in tourism and hospitality.',
};

export default function LinkUpPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="px-4 sm:px-6 md:px-12 py-16 sm:py-24 border-b border-border">
        <div className="max-w-4xl">
          <Link href="/products" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-grey-500 hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center">
              <Users className="w-7 h-7 text-green-500" strokeWidth={1.5} />
            </div>
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">Paused</Badge>
          </div>
          
          <h1 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-tight text-foreground mb-6">
            LinkUp
          </h1>
          <p className="text-[18px] sm:text-[20px] leading-[1.6] text-grey-600 dark:text-grey-400 max-w-[650px]">
            AI-driven short-video matching for professionals in tourism and hospitality. 
            Connect with opportunities through engaging video profiles.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 md:px-12 py-16 sm:py-24">
        <div className="max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Video-First Professional Network</h2>
            <p className="text-grey-600 dark:text-grey-400">
              LinkUp uses AI to match professionals through short video profiles. 
              Perfect for the tourism and hospitality industry where personality matters.
            </p>
            
            <h2>Features</h2>
            <ul>
              <li>AI-powered matching</li>
              <li>Video profiles</li>
              <li>Local connections</li>
              <li>Industry-specific filters</li>
              <li>Privacy controls</li>
            </ul>
            
            <h2>Status</h2>
            <p className="text-grey-600 dark:text-grey-400">
              Development paused. We&apos;re focusing on our core B2B products but believe 
              in the concept for the future.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
