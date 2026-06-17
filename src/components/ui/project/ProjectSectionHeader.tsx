"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SplitReveal } from "@/components/motion/SplitReveal";

interface ProjectSectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  index?: string;
}

export function ProjectSectionHeader({
  label,
  title,
  description,
  index,
}: ProjectSectionHeaderProps) {
  return (
    <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
      <ScrollReveal className="col-span-12 md:col-span-2">
        {label && <p className="plastic-label">{label}</p>}
        {index && <p className="plastic-label mt-4">Index {index}</p>}
      </ScrollReveal>
      <div className="col-span-12 md:col-span-8 md:col-start-4 lg:col-start-5">
        <SplitReveal
          as="h2"
          text={title}
          className="plastic-headline mb-4 block"
          delay={60}
        />
        {description && (
          <ScrollReveal delay={140}>
            <p className="plastic-paragraph text-[clamp(16px,2vw,22px)] max-w-2xl opacity-80">
              {description}
            </p>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
