import Link from "next/link";
import { Container, SectionHeader } from "./Section";
import { Card } from "./Card";
import { StaggerChildren } from "./ScrollReveal";
import { Button } from "./Button";

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
    <section className="px-6 md:px-12 py-20">
      <Container size="full">
        <SectionHeader 
          label={label}
          title={title}
        />

        <StaggerChildren 
          staggerDelay={100}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {plans.map((plan) => (
            <Card
              key={plan.name}
              padding="lg"
              variant={plan.popular ? "dark" : "standard"}
              className={`flex flex-col h-full ${plan.popular ? "scale-[1.02] shadow-2xl relative z-10" : ""}`}
              hover
            >
              {plan.popular && (
                <div className="font-mono text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-1 rounded bg-amber-500 text-fg mb-6 w-fit">
                  Most Popular
                </div>
              )}
              <div className="text-[15px] font-bold mb-2">{plan.name}</div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="font-serif text-[44px] font-semibold leading-none">{plan.price}</span>
                {plan.period && (
                  <span className={`text-[14px] ${plan.popular ? "text-white/50" : "text-grey-400"}`}>
                    {plan.period}
                  </span>
                )}
              </div>
              <p className={`text-[14px] mb-8 leading-relaxed ${plan.popular ? "text-white/60" : "text-grey-600 dark:text-grey-400"}`}>
                {plan.desc}
              </p>
              
              <ul className="list-none flex flex-col gap-3 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[13px]">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${plan.popular ? "bg-amber-500" : "bg-fg dark:bg-white/20"}`}></span>
                    <span className={plan.popular ? "text-white/80" : "text-grey-600 dark:text-grey-400"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button 
                href={plan.href || "/contact"} 
                variant={plan.popular ? "premium" : "outline"}
                glow={plan.popular}
                className="w-full"
              >
                {plan.buttonText || "Request demo"}
              </Button>
            </Card>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
