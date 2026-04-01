import { Container } from "./Section";
import { ScrollReveal } from "./ScrollReveal";

interface ProjectHeroProps {
  label: string;
  title: string;
  description: string;
  status?: string;
  tags?: string[];
  variant?: "light" | "dark";
}

export function ProjectHero({
  label,
  title,
  description,
  status,
  tags = [],
  variant = "dark",
}: ProjectHeroProps) {
  const isDark = variant === "dark";

  return (
    <section className={`px-4 sm:px-6 md:px-12 py-24 sm:py-32 ${isDark ? "bg-foreground text-background" : "bg-background text-foreground"}`}>
      <Container size="full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16 sm:mb-24">
          <ScrollReveal>
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-8">
                <span className={`font-mono text-[10px] font-bold tracking-[0.3em] uppercase ${isDark ? "opacity-40" : "text-grey-400"}`}>
                  {label}
                </span>
              </div>
              <h1 className="font-serif text-[clamp(40px,6vw,80px)] font-semibold leading-[0.95] tracking-tighter">
                {title}
              </h1>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className={`text-[16px] sm:text-[18px] leading-relaxed max-w-sm ${isDark ? "opacity-60" : "text-grey-500"}`}>
              {description}
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200}>
          <div className="flex flex-wrap gap-2 pt-12 border-t border-current opacity-10">
            {status && (
              <span className={`font-mono text-[10px] font-bold tracking-[0.1em] uppercase px-3 py-1 border border-current`}>
                {status}
              </span>
            )}
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] font-bold tracking-[0.1em] uppercase px-3 py-1 border border-current opacity-40"
              >
                {tag}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
