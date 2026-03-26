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
    <section className={`px-6 md:px-12 py-20 md:py-32 ${isDark ? "bg-foreground text-background" : "bg-background text-foreground"}`}>
      <Container size="full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <ScrollReveal>
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className={`w-10 h-px ${isDark ? "bg-white/20" : "bg-grey-200"}`}></div>
                <span className={`font-mono text-[11px] font-medium tracking-[0.12em] uppercase ${isDark ? "text-white/40" : "text-grey-400"}`}>
                  {label}
                </span>
              </div>
              <h1 className="font-serif text-[clamp(42px,5vw,72px)] font-semibold leading-[1.02] tracking-tight">
                {title}
              </h1>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className={`text-[15px] leading-relaxed max-w-[380px] ${isDark ? "text-white/60" : "text-grey-600 dark:text-grey-400"}`}>
              {description}
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200}>
          <div className="flex flex-wrap gap-3">
            {status && (
              <span className="font-mono text-[10px] font-medium tracking-[0.08em] uppercase px-2 py-1 rounded border text-amber-400 border-amber-500/30 bg-amber-500/10">
                {status}
              </span>
            )}
            {tags.map((tag) => (
              <span
                key={tag}
                className={`font-mono text-[10px] font-medium tracking-[0.08em] uppercase px-2 py-1 rounded border ${
                  isDark ? "text-white/30 border-white/10" : "text-grey-400 border-grey-200 dark:text-grey-500 dark:border-grey-800"
                }`}
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
