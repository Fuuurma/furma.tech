import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Updates — Furma.tech',
  description: 'News, updates, and insights from the Furma.tech team.',
};

const posts = [
  {
    slug: 'aitlas-rebrand',
    title: 'Aitlas Rebrand: Nexus → Nova, f.loop → Nexus runtime',
    excerpt: 'We updated our product naming to better reflect the ecosystem architecture. Here\'s what changed and why.',
    date: 'March 9, 2026',
    category: 'Product',
    readTime: '3 min read',
  },
  {
    slug: 'f-twyt-production',
    title: 'f.twyt is Now Live: Twitter Intelligence for 1 Credit',
    excerpt: 'Our first Action is production-ready. Search, ingest, and semantically search Twitter without rate limits.',
    date: 'February 28, 2026',
    category: 'Release',
    readTime: '5 min read',
  },
  {
    slug: 'restauManager-alpha',
    title: 'restauManager Alpha: First Beta Users Onboarded',
    excerpt: 'We welcomed our first restaurant partners in Catalonia. Early feedback shows strong product-market fit.',
    date: 'January 15, 2026',
    category: 'Product',
    readTime: '4 min read',
  },
  {
    slug: 'why-bootstrapped',
    title: 'Why We Chose Bootstrapping Over VC',
    excerpt: '0% funding. 100% control. Here\'s our reasoning and what it means for our product roadmap.',
    date: 'December 10, 2025',
    category: 'Company',
    readTime: '6 min read',
  },
  {
    slug: 'mcp-first-design',
    title: 'MCP-First Design: Why We Bet on Model Context Protocol',
    excerpt: 'MCP changes everything about AI integrations. Here\'s how we\'re building our entire ecosystem on top of it.',
    date: 'November 22, 2025',
    category: 'Technical',
    readTime: '8 min read',
  },
  {
    slug: 'aitlas-launch',
    title: 'Introducing Aitlas: A Sovereign AI Ecosystem',
    excerpt: 'Nova, GWagents Store, Actions, and Nexus runtime. The pieces are coming together for a new kind of AI platform.',
    date: 'October 30, 2025',
    category: 'Announcement',
    readTime: '5 min read',
  },
];

const categories = ['All', 'Product', 'Release', 'Company', 'Technical', 'Announcement'];

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="section">
        <div className="px-6 md:px-12 max-w-4xl">
          <div className="flex items-center gap-3 mb-8 animate-fade-up">
            <div className="w-10 h-px bg-grey-400"></div>
            <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-600">
              Updates & Insights
            </span>
          </div>
          <h1 className="font-serif text-[clamp(42px,5vw,72px)] font-semibold leading-[1.02] tracking-tight text-fg mb-7 animate-fade-up delay-1">
            Latest from<br />
            <em className="italic font-normal text-grey-600">Furma.tech</em>
          </h1>
          <p className="text-[17px] font-normal leading-[1.7] text-grey-600 max-w-[600px] animate-fade-up delay-2">
            Product updates, technical deep-dives, and company news. 
            Follow our journey building sovereign AI tools and practical SaaS products.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-6 md:px-12 py-8 border-t border-b border-grey-200">
        <div className="max-w-4xl flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`font-mono text-[11px] px-4 py-2 rounded transition-all ${
                category === 'All'
                  ? 'bg-fg text-bg'
                  : 'bg-white text-grey-600 border border-grey-200 hover:border-fg hover:text-fg'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section">
        <div className="px-6 md:px-12">
          <div className="max-w-4xl grid gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group border-b border-grey-200 pb-8 last:border-0 last:pb-0"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Date Column */}
                  <div className="md:w-32 flex-shrink-0">
                    <div className="font-mono text-[11px] text-grey-400 mb-2">{post.date}</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-grey-400">
                      {post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <Link
                      href={`/updates/${post.slug}`}
                      className="group-hover:text-grey-600 transition-colors"
                    >
                      <h2 className="font-serif text-[24px] font-semibold leading-[1.2] text-fg mb-3 group-hover:underline">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-[15px] leading-[1.6] text-grey-600 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/updates/${post.slug}`}
                        className="inline-flex items-center gap-1 text-[13px] font-semibold text-fg hover:text-grey-600 transition-colors"
                      >
                        Read more →
                      </Link>
                      <span className="text-grey-300">•</span>
                      <span className="font-mono text-[11px] text-grey-400">{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="max-w-4xl mt-12 text-center">
            <button className="font-mono text-[11px] px-6 py-3 border border-grey-200 rounded hover:border-fg hover:text-fg transition-all">
              Load more posts
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section bg-white">
        <div className="px-6 md:px-12 max-w-2xl text-center">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-400 mb-4">
            Stay updated
          </div>
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1] tracking-tight text-fg mb-4">
            Get the latest updates
          </h2>
          <p className="text-[15px] text-grey-600 mb-8">
            No spam. Just product updates and technical deep-dives. Unsubscribe anytime.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 border border-grey-200 rounded bg-white text-fg placeholder-grey-400 focus:outline-none focus:border-fg transition-colors"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-fg text-bg font-mono text-[11px] font-semibold rounded hover:bg-grey-800 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-grey-400 mt-4">
            By subscribing, you agree to receive email updates. We respect your privacy.
          </p>
        </div>
      </section>
    </div>
  );
}
