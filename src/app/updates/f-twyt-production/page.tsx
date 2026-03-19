import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "f.twyt is Now Live: Twitter Intelligence for 1 Credit",
  description: "Our first Action is production-ready. Search, ingest, and semantically search Twitter without rate limits.",
};

export default function FTwytProductionPost() {
  return (
    <div className="min-h-screen bg-bg">
      <section className="section">
        <div className="px-6 md:px-12 max-w-3xl">
          <Link href="/updates" className="inline-flex items-center gap-2 text-[13px] text-grey-600 hover:text-fg mb-8 no-underline">
            ← Back to updates
          </Link>
          
          <div className="mb-8">
            <div className="font-mono text-[11px] text-grey-400 mb-2">February 28, 2026</div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-green-500/10 text-green-600">
                Release
              </span>
              <span className="font-mono text-[11px] text-grey-400">5 min read</span>
            </div>
          </div>

          <h1 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-fg mb-8">
            f.twyt is Now Live: Twitter Intelligence for 1 Credit
          </h1>

          <div className="prose prose-lg text-grey-600">
            <p className="text-[17px] leading-[1.8] mb-6">
              After weeks of testing, f.twyt is now production-ready. This is our first Action in the
              f.xyz suite — a Twitter intelligence tool that lets you search, ingest, and semantically
              search tweets without worrying about rate limits.
            </p>

            <h2 className="font-serif text-[28px] font-semibold text-fg mt-12 mb-4">What f.twyt Does</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              f.twyt wraps the Twitter API with intelligent rate limit handling and adds semantic search
              capabilities on top. You can:
            </p>
            <ul className="space-y-3 mb-6">
              <li>Search tweets by keyword, user, or hashtag</li>
              <li>Ingest tweets into your personal knowledge base</li>
              <li>Semantic search across your ingested tweets using vector embeddings</li>
              <li>Build custom feeds filtered by topic or sentiment</li>
            </ul>

            <h2 className="font-serif text-[28px] font-semibold text-fg mt-12 mb-4">Pricing</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              Each search query costs 1 credit. Ingesting tweets costs 2 credits per tweet.
              Compare this to Twitter&apos;s API pricing which starts at $100/month for basic access.
            </p>

            <h2 className="font-serif text-[28px] font-semibold text-fg mt-12 mb-4">Getting Started</h2>
            <p className="text-[17px] leading-[1.8] mb-6">
              Sign up for a free account, add some credits, and connect your Twitter API keys
              (or use ours if you don&apos;t have access). The choice is yours — that&apos;s the BYOK way.
            </p>

            <p className="text-[17px] leading-[1.8]">
              Try it at <span className="font-mono text-fg">twyt.f.xyz</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
