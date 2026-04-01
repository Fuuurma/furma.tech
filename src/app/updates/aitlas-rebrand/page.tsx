import { constructMetadata } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { Section, Container } from "@/components/ui/Section";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Aitlas Rebrand: Nexus → Nova, f.loop → Nexus runtime | Furma.tech",
  description: "We updated our product naming to better reflect the ecosystem architecture. Here's what changed and why.",
});

export default function AitlasRebrandPost() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <ProjectHero 
        label="Product Update"
        title="Aitlas Rebrand"
        description="We updated our product naming to better reflect the ecosystem architecture. Here's what changed and why."
        status="Product"
        tags={["March 9, 2026", "3 min read"]}
      />

      <Section variant="default" className="py-24">
        <Container size="sm">
          <Link href="/updates" className="inline-flex items-center gap-2 text-[13px] font-bold text-grey-500 hover:text-amber-600 transition-colors mb-12 no-underline">
            <ArrowLeft className="w-4 h-4" /> Back to updates
          </Link>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-[17px] leading-[1.8] mb-6">
              When we first built our agentic stack, the naming was functional but didn&apos;t reflect the
              architecture clearly. After user feedback and internal discussions, we&apos;ve updated the
              product names to better communicate what each piece does.
            </p>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">What Changed</h2>
            <ul className="space-y-4 mb-6 list-none pl-0">
              <li className="flex gap-4">
                <span className="text-amber-600 font-mono font-bold">→</span>
                <span><strong className="text-fg">Nexus</strong> is now <strong className="text-fg">Nova</strong> — our AI workspace where users bring their own keys and chat with agents</span>
              </li>
              <li className="flex gap-4">
                <span className="text-amber-600 font-mono font-bold">→</span>
                <span><strong className="text-fg">f.loop</strong> is now <strong className="text-fg">Nexus runtime</strong> — the durable execution engine behind the scenes</span>
              </li>
              <li className="flex gap-4">
                <span className="text-amber-600 font-mono font-bold">→</span>
                <span><strong className="text-fg">f.xyz Actions</strong> remain the same — our suite of MCP-powered micro-tools</span>
              </li>
            </ul>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">Why the Change</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              Users kept confusing &quot;Nexus&quot; (the hub) with &quot;Nexus runtime&quot; (the worker). By renaming
              the hub to Nova, we create a clear distinction: Nova is where you interact, Nexus is
              where your tasks run.
            </p>

            <p className="text-[17px] leading-[1.8] mb-6">
              The &quot;f.loop → Nexus runtime&quot; rename reflects that f.loop was never just a loop — it
              includes the worker process, state persistence, and the entire durable execution model.
            </p>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">What This Means for You</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              If you&apos;re already using our tools, nothing changes operationally. The APIs remain the
              same, the credit system is unchanged, and all your existing integrations will continue
              to work.
            </p>

            <p className="text-[17px] leading-[1.8]">
              The rebrand is cosmetic — it helps us communicate the architecture more clearly as we
              prepare for public launch.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}
