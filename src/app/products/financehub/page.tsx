import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'FinanceHub — Furma.tech',
  description: 'Real-time market data tracking and portfolio monitoring with alerts for stocks and crypto.',
};

export default function FinanceHubPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="px-4 sm:px-6 md:px-12 py-16 sm:py-24 border-b border-border">
        <div className="max-w-4xl">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-grey-500 hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-green-500" strokeWidth={1.5} />
            </div>
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">Paused</Badge>
          </div>
          
          <h1 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-tight text-foreground mb-6">
            FinanceHub
          </h1>
          <p className="text-[18px] sm:text-[20px] leading-[1.6] text-grey-600 dark:text-grey-400 max-w-[650px]">
            Real-time market data tracking and portfolio monitoring. 
            Track stocks, crypto, and get instant alerts on price movements.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 md:px-12 py-16 sm:py-24">
        <div className="max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>All Your Finance Data</h2>
            <p className="text-grey-600 dark:text-grey-400">
              FinanceHub aggregates market data from multiple sources into one clean dashboard. 
              Track your portfolio performance and set custom alerts for price movements.
            </p>
            
            <h2>Features</h2>
            <ul>
              <li>Real-time stock tracking</li>
              <li>Crypto monitoring</li>
              <li>Portfolio analytics</li>
              <li>Custom price alerts</li>
              <li>Market news feed</li>
            </ul>
            
            <h2>Status</h2>
            <p className="text-grey-600 dark:text-grey-400">
              Development paused. The financial data space is crowded, and we&apos;re focusing 
              on our differentiated B2B offerings.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
