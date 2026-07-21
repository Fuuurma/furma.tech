import { V2Experience } from "@/components/v2/V2Experience";
import { V2Nav } from "@/components/v2/V2Nav";
import { V2Hero } from "@/components/v2/V2Hero";
import { V2Marquee } from "@/components/v2/V2Marquee";
import { V2Manifesto } from "@/components/v2/V2Manifesto";
import { V2WorkIndex } from "@/components/v2/V2WorkIndex";
import { V2Verticals } from "@/components/v2/V2Verticals";
import { V2Stats } from "@/components/v2/V2Stats";
import { V2Contact } from "@/components/v2/V2Contact";
import { V2Footer } from "@/components/v2/V2Footer";

export default function V2Page() {
  return (
    <V2Experience>
      <V2Nav />
      <V2Hero />
      <V2Marquee />
      <V2Manifesto />
      <V2WorkIndex />
      <V2Verticals />
      <V2Stats />
      <V2Contact />
      <V2Footer />
    </V2Experience>
  );
}
