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
    standard: "bg-card border-border",
    premium: "bg-card border-foreground/20",
    ghost: "bg-transparent border-transparent hover:border-border hover:bg-foreground/[0.02]",
    dark: "bg-foreground text-background border-foreground",
  };

  const hoverStyles = hover
    ? "transition-all duration-500 hover:border-foreground/30 hover:shadow-2xl hover:shadow-foreground/5"
    : "transition-all duration-500";

  return (
    <div className={`rounded-none border ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}>
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
  return <p className={`text-[14px] text-grey-500 ${className}`}>{children}</p>;
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
  return <div className={`mt-4 pt-4 border-t border-border ${className}`}>{children}</div>;
}
