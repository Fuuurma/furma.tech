import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Section, Container } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/ui/breadcrumb';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'OpenGovern — Furma.tech',
  description: 'Direct democracy tooling for municipalities. Participatory governance and transparent voting.',
  openGraph: {
    title: 'OpenGovern',
    description: 'Direct democracy tooling for municipalities.',
    images: [getOgImageUrl({ title: 'OpenGovern', subtitle: 'Direct Democracy', variant: 'aitlas' })],
  },
};

export default function OpenGovernPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      <div className="px-4 sm:px-6 md:px-12 pt-8 pb-16 sm:pb-20 border-b border-border">
        <div className="max-w-4xl">
          <Breadcrumbs className="mb-8" />
          <Badge variant="outline" className="mb-6">Roadmap</Badge>
          <h1 className="font-serif text-[clamp(36px,5vw,56px)] font-semibold leading-[1.05] tracking-tight text-foreground mb-6">OpenGovern</h1>
          <p className="text-[18px] sm:text-[20px] leading-[1.6] text-grey-600 dark:text-grey-400 max-w-[650px]">
            Direct democracy tooling for municipalities. Participatory governance enabling citizen engagement, transparent voting, and collaborative policy-making.
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
