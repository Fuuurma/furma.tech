import { Metadata } from 'next';
import { QrCode } from 'lucide-react';
import { ProjectLayout, ProjectHero, ProjectSection, ProjectSectionHeader, ProjectCTA } from '@/components/ui/ProjectLayout';
import { getOgImageUrl } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'QArt — AI QR Code Generator | Furma.tech',
  description: 'AI-generated QR codes that look like art. Transform any QR code into stunning visual art while maintaining full scannability.',
  openGraph: {
    title: 'QArt — AI QR Code Generator',
    description: 'AI-generated QR codes that look like art.',
    images: [getOgImageUrl({ title: 'QArt', subtitle: 'AI QR Code Generator', variant: 'product' })],
  },
};

const pattern = [
  1, 0, 1, 1, 0,
  0, 1, 0, 1, 1,
  1, 1, 0, 0, 1,
  0, 1, 1, 1, 0,
  1, 0, 1, 0, 1,
];

const features = [
  { title: 'AI Art Generation', desc: 'Our AI creates unique, beautiful QR codes that look like commissioned artwork.' },
  { title: '100% Scannable', desc: 'Every generated QR maintains full functionality. We guarantee readability.' },
  { title: 'Brand Customization', desc: 'Match your brand colors, styles, and themes. Complete creative control.' },
];

export default function QArtPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Marketing"
        title="QArt"
        description="Transform any QR code into stunning visual art. AI-powered design generation while maintaining 100% scannability. Perfect for brands and marketing."
        status={{ label: 'Soon', variant: 'soon' }}
      >
        <div className="flex items-center gap-4">
          <div className="font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground">Coming</div>
          <div className="font-serif text-[32px] font-light text-foreground">Q2 2026</div>
        </div>
      </ProjectHero>

      <ProjectSection>
        <ProjectSectionHeader label="Features" title="What you get" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div key={feature.title} className="border border-border p-8 hover:border-foreground/30 transition-colors">
              <h3 className="text-[15px] font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      <ProjectSection variant="muted">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-border p-12 flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <div className="w-24 h-24 bg-muted/50 mx-auto mb-4 flex items-center justify-center">
                <QrCode className="w-12 h-12 text-muted-foreground" strokeWidth={1} />
              </div>
              <p className="font-mono text-[11px] text-muted-foreground mt-4">Standard QR</p>
            </div>
          </div>
          <div className="border border-border p-12 flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <div className="w-24 h-24 bg-muted/30 mx-auto mb-4 flex items-center justify-center border border-border">
                <QrCode className="w-12 h-12 text-muted-foreground/50" strokeWidth={0.5} />
              </div>
              <p className="font-mono text-[11px] text-muted-foreground mt-4">Art QR (preview)</p>
            </div>
          </div>
          <div className="border border-border p-12 flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <div className="absolute inset-0 bg-foreground/5" />
                <div className="absolute inset-2 grid grid-cols-5 gap-0.5">
                  {pattern.map((cell, i) => (
                    <div key={i} className={`rounded-sm ${cell ? 'bg-foreground/20' : 'bg-transparent'}`} />
                  ))}
                </div>
              </div>
              <p className="font-mono text-[11px] text-muted-foreground mt-4">100% Scannable</p>
            </div>
          </div>
        </div>
      </ProjectSection>

      <ProjectCTA
        title="Be first in line"
        description="AI-generated QR codes that look like art while maintaining 100% scannability. Request early access."
        primaryHref="/#contact"
        primaryLabel="Request Access"
        secondaryHref="/portfolio"
        secondaryLabel="Back to Portfolio"
      />
    </ProjectLayout>
  );
}
