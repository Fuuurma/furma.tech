import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'PicksTracker — Furma.tech',
  description: 'Track your sports predictions, compete with friends, and build your track record with social leaderboards.',
};

export default function PicksTrackerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="px-4 sm:px-6 md:px-12 py-16 sm:py-24 border-b border-border">
        <div className="max-w-4xl">
          <Link href="/products" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-grey-500 hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Trophy className="w-7 h-7 text-blue-500" strokeWidth={1.5} />
            </div>
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">Roadmap</Badge>
          </div>
          
          <h1 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-tight text-foreground mb-6">
            PicksTracker
          </h1>
          <p className="text-[18px] sm:text-[20px] leading-[1.6] text-grey-600 dark:text-grey-400 max-w-[650px]">
            Track your sports predictions, compete with friends, and build your track record 
            with social leaderboards and analytics.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 md:px-12 py-16 sm:py-24">
        <div className="max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Track Your Picks</h2>
            <p className="text-grey-600 dark:text-grey-400">
              Keep a detailed record of all your sports predictions across different leagues 
              and sports. Analyze your performance over time with detailed statistics.
            </p>
            
            <h2>Features</h2>
            <ul>
              <li>Pick tracking across multiple sports</li>
              <li>Social predictions and leaderboards</li>
              <li>Performance analytics</li>
              <li>Head-to-head competitions</li>
              <li>Historical track record</li>
            </ul>
            
            <h2>Status</h2>
            <p className="text-grey-600 dark:text-grey-400">
              Planned for 2026. Building the ultimate platform for sports prediction enthusiasts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
