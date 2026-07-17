import { Container, SectionHeader } from "./Section";
import { Card } from "@/components/ui/card";
import { StaggerChildren } from "./ScrollReveal";
import { Button } from "@/components/ui/button";

interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  desc: string;
  features: string[];
  popular?: boolean;
  buttonText?: string;
  href?: string;
}

interface PricingSectionProps {
  label?: string;
  title?: string;
  plans: PricingPlan[];
}

export function PricingSection({
  label = "Pricing",
  title = "Simple, transparent pricing.",
  plans,
}: PricingSectionProps) {
  return (
    <section className="px-6 md:px-12 py-24">
      <Container size="full">
        <SectionHeader 
          label={label}
          title={title}
        />

        <StaggerChildren 
          staggerDelay={100}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border"
        >
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col h-full bg-background p-6 sm:p-8 hover:border-foreground/30 transition-colors ${plan.popular ? 'bg-foreground text-background border-foreground' : ''}`}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="text-[14px] font-bold uppercase tracking-widest">{plan.name}</div>
                {plan.popular && (
                  <div className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-1 border border-foreground/20">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-serif text-[48px] font-bold leading-none">{plan.price}</span>
                {plan.period && (
                  <span className="text-[12px] font-mono uppercase tracking-widest opacity-40">
                    {plan.period}
                  </span>
                )}
              </div>
              
              <p className="text-[14px] mb-12 leading-relaxed text-grey-500">
                {plan.desc}
              </p>
              
              <ul className="list-none flex flex-col gap-4 mb-16 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-4 text-[13px] font-bold opacity-60">
                    <div className="w-1 h-1 bg-current opacity-20"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                href={plan.href || "/#contact"} 
                variant={plan.popular ? "default" : "outline"}
                className="w-full h-14"
              >
                {plan.buttonText || "Request Access"}
              </Button>
            </Card>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
