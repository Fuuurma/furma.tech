import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "premium" | "dark";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  glow?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  glow = false,
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold no-underline rounded-xl transition-spring group-active relative overflow-hidden";

  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-white dark:text-black dark:hover:bg-grey-200 shadow-lg shadow-black/10 dark:shadow-white/10",
    secondary: "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 dark:bg-grey-900 dark:text-white dark:border-grey-800 dark:hover:border-grey-600 shadow-md",
    outline: "border border-border text-foreground hover:bg-secondary dark:border-grey-800 dark:text-white dark:hover:bg-grey-800",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-secondary dark:text-grey-400 dark:hover:text-white dark:hover:bg-grey-800",
    premium: "bg-primary text-primary-foreground hover:bg-primary/90 border border-amber-500/30 dark:bg-white dark:text-black dark:hover:bg-grey-200 dark:border-amber-500/40 shadow-xl shadow-amber-500/20",
    dark: "bg-primary text-primary-foreground hover:bg-primary/90 border border-white/10 dark:bg-white dark:text-black dark:hover:bg-grey-200 shadow-lg",
  };

  const sizeStyles = {
    sm: "text-[11px] sm:text-[12px] px-3.5 sm:px-4 py-1.5 sm:py-2",
    md: "text-[12px] sm:text-[13px] px-4.5 sm:px-5 py-3 sm:py-3.5",
    lg: "text-[13px] sm:text-[14px] px-6 sm:px-7 py-3.5 sm:py-4",
  };

  const glowStyle = glow ? "glow-amber-sm" : "";

  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${glowStyle} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles}>
      {children}
    </button>
  );
}
