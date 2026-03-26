import { Metadata } from 'next';
import Link from 'next/link';
import { Coins, Calendar, Home, Laptop, BookOpen, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers — Furma.tech',
  description: 'Join our team building the future of sovereign AI and industry SaaS.',
};

const jobs = [
  {
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Remote (EU)',
    type: 'Full-time',
    description: 'Build and ship products across our two verticals. Next.js, React, TypeScript stack.',
    skills: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote (EU)',
    type: 'Full-time',
    description: 'Shape the user experience for Nova, Agents Store, and our industry SaaS products.',
    skills: ['Figma', 'UI/UX', 'Design Systems', 'Prototyping'],
  },
  {
    title: 'Developer Relations',
    department: 'Community',
    location: 'Remote (EU)',
    type: 'Full-time',
    description: 'Grow the Aitlas ecosystem. Work with developers building agents and actions.',
    skills: ['Technical Writing', 'Public Speaking', 'Community Building', 'TypeScript'],
  },
];

const benefits = [
  { icon: Coins, title: 'Competitive Salary', description: 'Market-rate compensation in EUR' },
  { icon: Calendar, title: 'Unlimited PTO', description: 'Take the time you need. We trust adults.' },
  { icon: Home, title: 'Remote First', description: 'Work from anywhere in the EU time zones' },
  { icon: Laptop, title: 'Home Office Budget', description: '€2,000 setup budget + €50/month' },
  { icon: BookOpen, title: 'Learning Budget', description: '€1,000/year for courses and books' },
  { icon: TrendingUp, title: 'Equity Options', description: 'Own what you help build' },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="section">
        <div className="px-6 md:px-12 max-w-4xl">
          <div className="flex items-center gap-3 mb-8 animate-fade-up">
            <div className="w-10 h-px bg-grey-400 dark:bg-grey-600"></div>
            <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-600 dark:text-grey-400">
              Join the team
            </span>
          </div>
          <h1 className="font-serif text-[clamp(42px,5vw,72px)] font-semibold leading-[1.02] tracking-tight text-foreground mb-7 animate-fade-up delay-1">
            Build software<br />
            <em className="italic font-normal text-grey-600 dark:text-grey-400">that matters.</em>
          </h1>
          <p className="text-[17px] font-normal leading-[1.7] text-grey-600 dark:text-grey-400 max-w-[600px] animate-fade-up delay-2">
            We&apos;re a small team of builders creating the future of sovereign AI and practical SaaS tools.
            No VC pressure. No fake growth metrics. Just shipping useful products.
          </p>
        </div>
      </section>

      {/* Why Join */}
      <section className="section bg-white dark:bg-grey-900">
        <div className="px-6 md:px-12">
          <div className="max-w-4xl mb-16">
            <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-400 dark:text-grey-500 mb-4">
              Why Furma.tech
            </div>
            <h2 className="font-serif text-[clamp(36px,4vw,56px)] font-semibold leading-[1.08] tracking-tight text-foreground">
              What we offer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-6 border border-grey-200 dark:border-grey-800">
                <benefit.icon className="w-8 h-8 text-foreground mb-4" strokeWidth={1.5} />
                <h3 className="text-[16px] font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-[13px] text-grey-600 dark:text-grey-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section bg-grey-50 dark:bg-grey-900/50">
        <div className="px-6 md:px-12">
          <div className="max-w-4xl mb-16">
            <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-400 dark:text-grey-500 mb-4">
              Open Positions
            </div>
            <h2 className="font-serif text-[clamp(36px,4vw,56px)] font-semibold leading-[1.08] tracking-tight text-foreground">
              Available roles
            </h2>
          </div>

          <div className="max-w-4xl space-y-4">
            {jobs.map((job, index) => (
              <div key={index} className="p-8 bg-white border border-grey-200 hover:border-fg transition-colors dark:bg-grey-900 dark:border-grey-800">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-4">
                  <div className="flex-1">
                    <h3 className="text-[20px] font-bold text-foreground mb-2">{job.title}</h3>
                    <p className="text-[14px] text-grey-600 dark:text-grey-400 mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <span key={skill} className="font-mono text-[10px] px-2 py-1 rounded bg-grey-50 border border-grey-200 text-grey-600 dark:bg-grey-800 dark:border-grey-700 dark:text-grey-400">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:text-right">
                    <div className="text-[13px] text-grey-600 dark:text-grey-400">
                      <span className="font-medium">{job.department}</span> • {job.location}
                    </div>
                    <div className="font-mono text-[11px] text-grey-400 dark:text-grey-500">{job.type}</div>
                  </div>
                </div>
                <div className="pt-4 border-t border-grey-100 dark:border-grey-800">
                  <Link
                    href={`/careers/${job.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-2 text-[13px] font-semibold no-underline text-foreground hover:text-grey-600 dark:hover:text-grey-400 transition-colors"
                  >
                    View details →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* No matching jobs */}
          <div className="max-w-4xl mt-12 p-8 bg-white border border-grey-200 dark:bg-grey-900 dark:border-grey-800">
            <p className="text-[15px] text-grey-600 dark:text-grey-400 text-center">
              Don&apos;t see a role that fits? We&apos;re always looking for exceptional people.
            </p>
            <div className="text-center mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded bg-foreground text-background hover:bg-grey-800 transition-all"
              >
                Send us your resume →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Culture */}
      <section className="section bg-white dark:bg-grey-900">
        <div className="px-6 md:px-12 max-w-4xl">
          <div className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-grey-400 dark:text-grey-500 mb-4">
            How we work
          </div>
          <h2 className="font-serif text-[clamp(36px,4vw,56px)] font-semibold leading-[1.08] tracking-tight text-foreground mb-8">
            Our culture
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-foreground mb-2">Ship first, meeting later</h3>
                <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">
                  We value output over hours. Async communication by default.
                  Meetings are a last resort, not the default.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold">
                2
              </div>
              <div>
              <h3 className="text-[18px] font-bold text-foreground mb-2">Own your work</h3>
              <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">
                You pick the tools. You design the solution. We trust you to build
                the right thing. Micro-management doesn&apos;t exist here.
              </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold">
                3
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-foreground mb-2">Profitable or gone</h3>
                <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">
                  Every product must have a path to profitability. We don&apos;t build
                  vanity metrics. We build sustainable businesses.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold">
                4
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-foreground mb-2">Europe first</h3>
                <p className="text-[14px] text-grey-600 dark:text-grey-400 leading-relaxed">
                  Our home market is Europe. EU time zones only. We believe in work-life
                  balance — no weekend hacks, no late-night crunch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-foreground text-background">
        <div className="px-6 md:px-12 max-w-2xl text-center">
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight mb-6">
            Ready to build with us?
          </h2>
          <p className="text-[15px] leading-[1.7] opacity-55 mb-8">
            We&apos;re looking for people who care about shipping useful software,
            not chasing trends. If that sounds like you, get in touch.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded bg-background text-foreground hover:bg-gray-100 transition-all"
          >
            Apply now →
          </Link>
        </div>
      </section>
    </div>
  );
}
