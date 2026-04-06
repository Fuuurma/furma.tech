import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Gamepad2, Zap, Pause, Road } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section, Container } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface ProductPageProps {
  name: string;
  category: string;
  description: string;
  longDescription: string;
  status: 'dev' | 'roadmap' | 'paused';
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  features: string[];
  accentColor: string;
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    dev: { className: 'bg-foreground text-background border-foreground', label: 'In Dev', icon: Zap },
    roadmap: { className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20', label: 'Roadmap', icon: Road },
    paused: { className: 'bg-grey-500/10 text-grey-500 border-grey-500/20', label: 'Paused', icon: Pause },
  };
  const { className, label, icon: Icon } = config[status as keyof typeof config];
  return (
    <Badge className={`text-[10px] uppercase tracking-wider ${className}`}>
      <Icon className="w-3 h-3 mr-1" strokeWidth={2} />
      {label}
    </Badge>
  );
}

export function ProductContent({ name, category, description, longDescription, status, icon: Icon, features, accentColor }: ProductPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="px-4 sm:px-6 md:px-12 py-16 sm:py-24 border-b border-border">
        <div className="max-w-4xl">
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-grey-500 hover:text-foreground transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-14 h-14 rounded-xl ${accentColor} flex items-center justify-center cursor-pointer`}>
              <Icon className="w-7 h-7 text-foreground" strokeWidth={1.5} />
            </div>
            <StatusBadge status={status} />
          </div>
          
          <h1 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-tight text-foreground mb-6">
            {name}
          </h1>
          <p className="text-[18px] sm:text-[20px] leading-[1.6] text-grey-600 dark:text-grey-400 max-w-[650px]">
            {description}
          </p>
        </div>
      </section>

      {/* Content */}
      <Section variant="default">
        <Container size="md">
          <ScrollReveal>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>Overview</h2>
              <p className="text-grey-600 dark:text-grey-400 leading-relaxed">
                {longDescription}
              </p>
              
              <h2>Features</h2>
              <ul>
                {features.map((feature) => (
                  <li key={feature} className="text-grey-600 dark:text-grey-400">{feature}</li>
                ))}
              </ul>
              
              <h2>Status</h2>
              <p className="text-grey-600 dark:text-grey-400">
                {status === 'dev' && 'Currently in active development. Built with modern web technologies for optimal performance.'}
                {status === 'roadmap' && 'Planned for future release. Join the waitlist to get early access when we launch.'}
                {status === 'paused' && 'Development paused. We may revisit this project when we have more capacity.'}
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <div className="mt-12 pt-12 border-t border-border">
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
