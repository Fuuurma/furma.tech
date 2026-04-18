import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Section, Container } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/ui/breadcrumb';

export const metadata: Metadata = {
  title: 'LinkUp — Furma.tech',
  description: 'Short-video professional matching. Swipe-based professional networking using short video profiles.',
};

export default function LinkUpPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      <div className="px-4 sm:px-6 md:px-12 pt-8 pb-16 sm:pb-20 border-b border-border">
        <div className="max-w-4xl">
          <Breadcrumbs className="mb-8" />
          <Badge variant="outline" className="mb-6">Paused</Badge>
          <h1 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-tight text-foreground mb-6">LinkUp</h1>
          <p className="text-[18px] sm:text-[20px] leading-[1.6] text-grey-600 dark:text-grey-400 max-w-[650px]">
            Short-video professional matching. Connect with collaborators, hires, and mentors through swipe-based networking.
          </p>
        </div>
      </div>
      <Section variant="grey">
        <Container size="md">
          <ScrollReveal>
            <div className="text-center">
              <Button href="/portfolio" variant="default" size="lg">
                Back to Portfolio
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </div>
  );
}
