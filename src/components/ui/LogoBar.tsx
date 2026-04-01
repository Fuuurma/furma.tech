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
    <section className="py-16 border-y border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="flex flex-col items-center">
            <p className="font-mono text-[9px] font-bold tracking-[0.3em] uppercase text-grey-400 mb-12">
              Powering our ecosystem
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-30 grayscale">
              {partners.map((p) => (
                <span 
                  key={p.name} 
                  className="font-serif text-[18px] md:text-[22px] font-bold text-foreground tracking-tighter hover:opacity-100 transition-all cursor-default"
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
