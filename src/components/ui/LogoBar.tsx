import { ScrollReveal } from "./ScrollReveal";

const partners = [
  { name: "TheFork", logo: "THEFORK" },
  { name: "Viator", logo: "VIATOR" },
  { name: "Stripe", logo: "STRIPE" },
  { name: "Anthropic", logo: "ANTHROPIC" },
  { name: "DeepSeek", logo: "DEEPSEEK" },
  { name: "Brave API", logo: "BRAVE" },
];

export function LogoBar() {
  return (
    <section className="py-12 border-y border-grey-100 dark:border-grey-800 bg-background/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="flex flex-col items-center">
            <p className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-8">
              Powering our ecosystem
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 grayscale group">
              {partners.map((p) => (
                <span 
                  key={p.name} 
                  className="font-serif text-[18px] md:text-[22px] font-bold text-fg tracking-tighter hover:grayscale-0 hover:opacity-100 transition-all cursor-default"
                >
                  {p.logo}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
