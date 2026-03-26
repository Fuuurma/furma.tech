import { Container, SectionHeader } from "./Section";
import { Card } from "./Card";
import { StaggerChildren } from "./ScrollReveal";

interface Feature {
  title: string;
  desc: string;
}

interface FeaturesGridProps {
  label?: string;
  title?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
}

export function FeaturesGrid({
  label = "What you get",
  title = "Built for real service.",
  features,
  columns = 3,
}: FeaturesGridProps) {
  const columnStyles = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="px-6 md:px-12 py-20 bg-grey-50 border-t border-b border-grey-200 dark:bg-grey-900/30 dark:border-grey-800">
      <Container size="full">
        <SectionHeader 
          label={label}
          title={title}
        />

        <StaggerChildren 
          staggerDelay={80}
          className={`grid grid-cols-1 ${columnStyles[columns]} gap-6`}
        >
          {features.map((feature) => (
            <Card 
              key={feature.title} 
              padding="lg" 
              className="bg-white dark:bg-grey-900"
              hover
            >
              <h3 className="text-[17px] font-bold text-fg mb-3">{feature.title}</h3>
              <p className="text-[14px] leading-[1.6] text-grey-600 dark:text-grey-400">{feature.desc}</p>
            </Card>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
