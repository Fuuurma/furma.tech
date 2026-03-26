import { constructMetadata } from "@/lib/metadata";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "f.twyt is Now Live | Furma.tech",
  description: "Our first Action is production-ready. Search, ingest, and semantically search Twitter without rate limits.",
});

export default function FTwytProductionPost() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <ProjectHero 
        label="Product Release"
        title="f.twyt is Now Live"
        description="Our first Action is production-ready. Search, ingest, and semantically search Twitter without rate limits."
        status="Live"
        tags={["February 28, 2026", "5 min read"]}
      />

      <Section variant="default" className="py-24">
        <Container size="sm">
          <Link href="/updates" className="inline-flex items-center gap-2 text-[13px] font-bold text-grey-500 hover:text-amber-600 transition-colors mb-12 no-underline">
            <ArrowLeft className="w-4 h-4" /> Back to updates
          </Link>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-[17px] leading-[1.8] mb-6">
              After weeks of testing, f.twyt is now production-ready. This is our first Action in the
              f.xyz suite — a Twitter intelligence tool that lets you search, ingest, and semantically
              search tweets without worrying about rate limits.
            </p>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">What f.twyt Does</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              f.twyt wraps the Twitter API with intelligent rate limit handling and adds semantic search
              capabilities on top. You can:
            </p>
            <ul className="space-y-4 mb-6 list-none pl-0">
              <li className="flex gap-4">
                <span className="text-amber-600 font-mono font-bold">→</span>
                <span>Search tweets by keyword, user, or hashtag</span>
              </li>
              <li className="flex gap-4">
                <span className="text-amber-600 font-mono font-bold">→</span>
                <span>Ingest tweets into your personal knowledge base</span>
              </li>
              <li className="flex gap-4">
                <span className="text-amber-600 font-mono font-bold">→</span>
                <span>Semantic search across your ingested tweets using vector embeddings</span>
              </li>
              <li className="flex gap-4">
                <span className="text-amber-600 font-mono font-bold">→</span>
                <span>Build custom feeds filtered by topic or sentiment</span>
              </li>
            </ul>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">Pricing</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              Each search query costs 1 credit. Ingesting tweets costs 2 credits per tweet.
              Compare this to Twitter&apos;s API pricing which starts at $100/month for basic access.
            </p>

            <h2 className="text-[28px] font-bold text-fg mt-12 mb-6">Getting Started</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              Sign up for a free account, add some credits, and connect your Twitter API keys
              (or use ours if you don&apos;t have access). The choice is yours — that&apos;s the BYOK way.
            </p>

            <Button href="/projects/aitlas/twyt" variant="premium">Try f.twyt →</Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
