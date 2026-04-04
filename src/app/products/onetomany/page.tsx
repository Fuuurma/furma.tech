import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'OneToMany — Furma.tech',
  description: 'One tool to manage many goals. Habit tracking and progress analytics for teams.',
};

export default function OneToManyPage() {
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
              <Target className="w-7 h-7 text-blue-500" strokeWidth={1.5} />
            </div>
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">Paused</Badge>
          </div>
          
          <h1 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-tight text-foreground mb-6">
            OneToMany
          </h1>
          <p className="text-[18px] sm:text-[20px] leading-[1.6] text-grey-600 dark:text-grey-400 max-w-[650px]">
            One tool to manage many goals. Habit tracking and progress analytics 
            for individuals and teams who want to achieve more.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 md:px-12 py-16 sm:py-24">
        <div className="max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Goal Management Simplified</h2>
            <p className="text-grey-600 dark:text-grey-400">
              OneToMany helps you track multiple goals simultaneously with habit tracking, 
              progress analytics, and team accountability features.
            </p>
            
            <h2>Features</h2>
            <ul>
              <li>Goal management dashboard</li>
              <li>Habit tracking</li>
              <li>Progress analytics</li>
              <li>Team accountability</li>
              <li>Milestone celebrations</li>
            </ul>
            
            <h2>Status</h2>
            <p className="text-grey-600 dark:text-grey-400">
              Development paused. The productivity space is highly competitive, and we&apos;re 
              focusing on our industry-specific B2B products.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
