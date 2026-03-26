import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "grey" | "dark";
}

export function Section({ children, className = "", id, variant = "default" }: SectionProps) {
  const variantStyles = {
    default: "bg-background",
    grey: "bg-secondary dark:bg-grey-900/50",
    dark: "bg-foreground text-background",
  };

  return (
    <section id={id} className={`px-4 sm:px-6 md:px-12 py-16 sm:py-20 ${variantStyles[variant]} ${className}`}>
      <div>{children}</div>
    </section>
  );
}

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Container({ children, className = "", size = "lg" }: ContainerProps) {
  const sizeStyles = {
    sm: "max-w-2xl",
    md: "max-w-3xl",
    lg: "max-w-4xl",
    xl: "max-w-5xl",
    full: "max-w-7xl",
  };

  return (
    <div className={`${sizeStyles[size]} mx-auto px-2 sm:px-0 ${className}`}>
      {children}
    </div>
  );
}

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  variant?: "light" | "dark";
}

export function SectionHeader({ label, title, description, variant = "light" }: SectionHeaderProps) {
  const variantStyles = {
    light: {
      label: "text-grey-400",
      title: "text-foreground",
      description: "text-grey-600 dark:text-grey-400",
    },
    dark: {
      label: "text-white/40",
      title: "text-white",
      description: "text-white/60",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className="mb-16">
      {label && (
        <div className={`font-mono text-[11px] font-medium tracking-[0.12em] uppercase ${styles.label} mb-4`}>
          {label}
        </div>
      )}
      <h2 className={`font-serif text-[clamp(36px,4vw,56px)] font-semibold leading-[1.08] tracking-tight ${styles.title}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-[15px] leading-[1.7] mt-6 ${styles.description}`}>
          {description}
        </p>
      )}
    </div>
  );
}
