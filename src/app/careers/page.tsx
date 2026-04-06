import { Metadata } from 'next';
import Link from 'next/link';
import { Coins, Calendar, Home, Laptop, BookOpen, TrendingUp, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section, Container } from '@/components/ui/Section';
import { ScrollReveal, StaggerChildren } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

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
  { icon: Laptop, title: 'Home Office Budget', description: '€2,000 setup + €50/month' },
  { icon: BookOpen, title: 'Learning Budget', description: '€1,000/year for courses and books' },
  { icon: TrendingUp, title: 'Equity Options', description: 'Own what you help build' },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <PageHeader
        label="Join the team"
        title={
          <>
            Build software<br />
            <em className="italic font-normal text-grey-600 dark:text-grey-400">that matters.</em>
          </>
        }
        description="We&apos;re a small team of builders creating the future of sovereign AI and practical SaaS tools. No VC pressure. No fake growth metrics. Just shipping useful products."
        variant="default"
      />

      {/* Benefits Grid */}
      <Section variant="grey">
        <Container size="full">
          <ScrollReveal>
            <div className="mb-12 flex flex-col gap-4">
              <Badge variant="outline" className="w-fit">Why Furma.tech</Badge>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                What we offer
              </h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit) => (
              <ScrollReveal key={benefit.title}>
                <Card className="flex flex-col gap-4 p-6 bg-background border-grey-200 dark:border-grey-800 hover:border-foreground/30 transition-all duration-300">
                  <CardHeader className="flex flex-row items-start gap-4 p-0 mb-0">
                    <div className="size-10 rounded-lg bg-grey-50 dark:bg-grey-800 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors shrink-0">
                      <benefit.icon className="size-5" strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-[16px]">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardDescription className="text-[14px]">{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </StaggerChildren>
        </Container>
      </Section>

      {/* Open Positions */}
      <Section variant="default">
        <Container size="full">
          <ScrollReveal>
            <div className="mb-12 flex flex-col gap-4">
              <Badge variant="outline" className="w-fit">Open Positions</Badge>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                Available roles
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl flex flex-col gap-3">
            {jobs.map((job) => (
              <Link
                key={job.title}
                href={`/careers/${job.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="group block"
              >
                <Card className="p-6 sm:p-8 bg-background border-grey-200 dark:border-grey-800 hover:border-foreground/40 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-6">
                    <div className="flex-1">
                      <h3 className="text-[20px] font-bold text-foreground mb-2 group-hover:underline underline-offset-4">
                        {job.title}
                      </h3>
                      <p className="text-[14px] text-grey-600 dark:text-grey-400 mb-4 leading-relaxed">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="font-mono text-[10px] font-bold uppercase tracking-wider">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 sm:text-right shrink-0">
                      <div className="text-[13px] text-grey-600 dark:text-grey-400">
                        <span className="font-medium">{job.department}</span>
                      </div>
                      <div className="text-[13px] text-grey-500">{job.location}</div>
                      <Badge variant="outline" className="w-fit text-[11px] mt-1">
                        {job.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-grey-500 group-hover:text-foreground transition-colors">
                    View details <ArrowRight data-icon="inline-end" className="transition-transform group-hover:translate-x-0" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Speculative Application */}
          <ScrollReveal>
            <Card className="max-w-3xl flex flex-col items-center gap-4 p-8 bg-grey-50 dark:bg-grey-900/50 border-grey-200 dark:border-grey-800 text-center mt-10">
              <p className="text-[15px] text-grey-600 dark:text-grey-400">
                Don&apos;t see a role that fits? We&apos;re always looking for exceptional people.
              </p>
              <Button href="/contact" variant="default" size="lg">
                Send us your resume
                <ArrowRight data-icon="inline-start" />
              </Button>
            </Card>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Culture Section */}
      <Section variant="grey">
        <Container size="md">
          <ScrollReveal>
            <div className="mb-12 flex flex-col gap-4">
              <Badge variant="outline" className="w-fit">How we work</Badge>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight text-foreground">
                Our culture
              </h2>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-8">
            {[
              {
                num: '01',
                title: 'Ship first, meeting later',
                desc: 'We value output over hours. Async communication by default. Meetings are a last resort, not the default.',
              },
              {
                num: '02',
                title: 'Own your work',
                desc: 'You pick the tools. You design the solution. We trust you to build the right thing. Micro-management doesn&apos;t exist here.',
              },
              {
                num: '03',
                title: 'Profitable or gone',
                desc: 'Every product must have a path to profitability. We don&apos;t build vanity metrics. We build sustainable businesses.',
              },
              {
                num: '04',
                title: 'Europe first',
                desc: 'Our home market is Europe. EU time zones only. We believe in work-life balance — no weekend hacks, no late-night crunch.',
              },
            ].map((item) => (
              <ScrollReveal key={item.title}>
                <div className="flex gap-6 group">
                  <div className="size-12 rounded-xl bg-grey-100 dark:bg-grey-800 flex items-center justify-center shrink-0 font-mono text-sm font-bold text-foreground group-hover:bg-foreground group-hover:text-background transition-colors">
                    {item.num}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[18px] font-bold text-foreground">{item.title}</h3>
                    <p className="text-[15px] text-grey-600 dark:text-grey-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="dark">
        <Container size="md">
          <ScrollReveal>
            <div className="flex flex-col items-center gap-6 text-center max-w-2xl mx-auto">
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight">
                Ready to build with us?
              </h2>
              <p className="text-[16px] text-background/60 leading-relaxed">
                We&apos;re looking for people who care about shipping useful software,
                not chasing trends. If that sounds like you, get in touch.
              </p>
              <Button href="/contact" variant="premium" size="lg">
                Apply now
                <ArrowRight data-icon="inline-start" />
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </div>
  );
}
