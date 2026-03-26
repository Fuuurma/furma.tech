import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  variant?: "standard" | "premium" | "ghost" | "dark";
}

export function Card({
  children,
  className = "",
  hover = false,
  padding = "md",
  variant = "standard"
}: CardProps) {
  const paddingStyles = {
    none: "",
    sm: "p-3 sm:p-4",
    md: "p-4 sm:p-6",
    lg: "p-6 sm:p-8",
  };

  const variantStyles = {
    standard: "bg-card border-border dark:bg-card dark:border-border",
    premium: "bg-card border-amber-500/20 glow-amber-sm dark:bg-card dark:border-amber-500/30",
    ghost: "bg-transparent border-transparent hover:border-grey-200 hover:bg-grey-50 dark:border-transparent dark:hover:border-grey-800 dark:hover:bg-grey-800/50",
    dark: "bg-foreground text-background border-grey-800 dark:bg-foreground dark:text-background dark:border-grey-700",
  };

  const hoverStyles = hover
    ? "transition-spring group-active hover:border-grey-400 dark:hover:border-grey-600 hover:-translate-y-1 hover:shadow-xl"
    : "transition-spring";

  return (
    <div className={`rounded-xl border ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className = "" }: CardTitleProps) {
  return <h3 className={`text-[18px] font-bold tracking-tight text-foreground ${className}`}>{children}</h3>;
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className = "" }: CardDescriptionProps) {
  return <p className={`text-[14px] text-grey-600 dark:text-grey-400 ${className}`}>{children}</p>;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={className}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return <div className={`mt-4 pt-4 border-t border-grey-100 dark:border-grey-800 ${className}`}>{children}</div>;
}
