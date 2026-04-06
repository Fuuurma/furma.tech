import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'SailingMate — Furma.tech',
  description: 'GPS-optimized routing and weather data for maritime navigation with wind optimization.',
};

export default function SailingMatePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="px-4 sm:px-6 md:px-12 py-16 sm:py-24 border-b border-border">
        <div className="max-w-4xl">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-grey-500 hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Compass className="w-7 h-7 text-blue-500" strokeWidth={1.5} />
            </div>
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">Paused</Badge>
          </div>
          
          <h1 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-tight text-foreground mb-6">
            SailingMate
          </h1>
          <p className="text-[18px] sm:text-[20px] leading-[1.6] text-grey-600 dark:text-grey-400 max-w-[650px]">
            GPS-optimized routing and weather data for maritime navigation. 
            Wind optimization and real-time maritime alerts for safe sailing.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 md:px-12 py-16 sm:py-24">
        <div className="max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Navigation Made Simple</h2>
            <p className="text-grey-600 dark:text-grey-400">
              SailingMate provides real-time GPS routing optimized for sailing conditions. 
              Get weather data, wind patterns, and maritime alerts all in one place.
            </p>
            
            <h2>Features</h2>
            <ul>
              <li>GPS-optimized routing</li>
              <li>Wind optimization</li>
              <li>Real-time weather data</li>
              <li>Maritime alerts</li>
              <li>Offline maps support</li>
            </ul>
            
            <h2>Status</h2>
            <p className="text-grey-600 dark:text-grey-400">
              Development paused. We&apos;re focusing on our core products but may revisit 
              this project in the future.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
