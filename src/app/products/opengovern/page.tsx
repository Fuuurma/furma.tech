import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'OpenGovern — Furma.tech',
  description: 'Direct democracy tooling for municipalities. Participatory governance and citizen engagement.',
};

export default function OpenGovernPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="px-4 sm:px-6 md:px-12 py-16 sm:py-24 border-b border-border">
        <div className="max-w-4xl">
          <Link href="/products" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-grey-500 hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Building2 className="w-7 h-7 text-purple-500" strokeWidth={1.5} />
            </div>
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">Paused</Badge>
          </div>
          
          <h1 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-tight text-foreground mb-6">
            OpenGovern
          </h1>
          <p className="text-[18px] sm:text-[20px] leading-[1.6] text-grey-600 dark:text-grey-400 max-w-[650px]">
            Direct democracy tooling for municipalities. Participatory governance 
            and citizen engagement for modern local governments.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 md:px-12 py-16 sm:py-24">
        <div className="max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Civic Technology</h2>
            <p className="text-grey-600 dark:text-grey-400">
              OpenGovern provides municipalities with tools for participatory democracy, 
              citizen voting, and transparent governance. Build trust through technology.
            </p>
            
            <h2>Features</h2>
            <ul>
              <li>Participatory democracy tools</li>
              <li>Municipal dashboards</li>
              <li>Transparent voting systems</li>
              <li>Citizen engagement</li>
              <li>Public consultation modules</li>
            </ul>
            
            <h2>Status</h2>
            <p className="text-grey-600 dark:text-grey-400">
              Development paused. Civic tech requires significant resources for compliance 
              and security. We may revisit this when we have more capacity.
            </p>
          </div>
          
          <div className="mt-12 pt-12 border-t border-border">
            <Button href="/products" variant="default" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
