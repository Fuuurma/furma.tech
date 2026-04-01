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
  const baseStyles = "inline-flex items-center justify-center gap-2 font-bold no-underline rounded-none transition-all duration-300 group-active relative overflow-hidden uppercase tracking-widest";

  const variantStyles = {
    primary: "bg-foreground text-background hover:opacity-90 shadow-lg shadow-foreground/5",
    secondary: "bg-grey-100 text-foreground border border-border hover:bg-grey-200 dark:bg-grey-900 dark:border-grey-800 dark:hover:bg-grey-800",
    outline: "border border-foreground text-foreground hover:bg-foreground hover:text-background",
    ghost: "text-grey-500 hover:text-foreground hover:bg-foreground/5",
    premium: "bg-foreground text-background border border-foreground/20 hover:bg-background hover:text-foreground shadow-2xl shadow-foreground/10",
    dark: "bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground transition-colors",
  };

  const sizeStyles = {
    sm: "text-[10px] px-4 py-2",
    md: "text-[11px] px-6 py-3.5",
    lg: "text-[12px] px-8 py-4.5",
  };

  const glowStyle = glow ? "shadow-[0_0_20px_rgba(var(--foreground),0.2)]" : "";

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
