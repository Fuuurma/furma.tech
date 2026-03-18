import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
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
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold no-underline rounded transition-all";

  const variantStyles = {
    primary: "bg-fg text-bg hover:bg-grey-800",
    secondary: "bg-white text-black border border-grey-200 hover:border-grey-400 hover:bg-grey-50",
    outline: "border border-grey-200 text-fg hover:border-grey-400 hover:bg-grey-50",
    ghost: "text-grey-600 hover:text-fg",
  };

  const sizeStyles = {
    sm: "text-[12px] px-4 py-2",
    md: "text-[13px] px-5 py-3",
    lg: "text-[14px] px-6 py-4",
  };

  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

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
