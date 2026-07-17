import { Metadata } from "next";
import {
  ProjectLayout,
  ProjectHero,
  ProjectSection,
  ProjectFeatures,
  ProjectCTA,
} from "@/components/ui/ProjectLayout";
import { getProjectCoverTint } from "@/lib/home-projects";
import { getOgImageUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "QArt — AI QR Code Generator | Furma.tech",
  description:
    "AI-generated QR codes that look like art. Transform any QR code into stunning visual art while maintaining full scannability.",
  openGraph: {
    title: "QArt — AI QR Code Generator",
    description: "AI-generated QR codes that look like art.",
    images: [
      getOgImageUrl({
        title: "QArt",
        subtitle: "AI QR Code Generator",
        variant: "product",
      }),
    ],
  },
};

const features = [
  {
    title: "AI Art Generation",
    desc: "Our AI creates unique, beautiful QR codes that look like commissioned artwork.",
  },
  {
    title: "100% Scannable",
    desc: "Every generated QR maintains full functionality. We guarantee readability.",
  },
  {
    title: "Brand Customization",
    desc: "Match your brand colors, styles, and themes. Complete creative control.",
  },
];

export default function QArtPage() {
  return (
    <ProjectLayout>
      <ProjectHero
        label="Marketing"
        title="QArt"
        description="Transform any QR code into stunning visual art. AI-powered design generation while maintaining 100% scannability. Perfect for brands and marketing."
        status={{ label: "Coming Soon · Q2 2026", variant: "soon" }}
        projectId="qart"
        coverTint={getProjectCoverTint("qart")}
      />

      <ProjectSection>
        <ProjectFeatures
          label="Features"
          title="What you get"
          features={features}
        />
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
