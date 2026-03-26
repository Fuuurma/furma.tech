import Link from "next/link";

interface CTAProps {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  variant?: "light" | "dark";
}

export function CTA({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  variant = "light",
}: CTAProps) {
  const variantStyles = {
    light: "bg-bg text-fg",
    dark: "bg-fg text-bg dark:bg-white dark:text-fg",
  };

  const buttonStyles = {
    light: {
      primary: "bg-fg text-bg hover:bg-grey-800 dark:bg-white dark:text-fg dark:hover:bg-grey-200",
      secondary: "border-grey-200 text-fg hover:border-grey-400 hover:bg-grey-50 dark:border-grey-800 dark:text-white dark:hover:border-grey-600 dark:hover:bg-grey-800",
    },
    dark: {
      primary: "bg-white text-black hover:bg-gray-100 dark:bg-fg dark:text-white dark:hover:bg-grey-800",
      secondary: "border-white/20 text-white hover:border-white/40 hover:bg-white/10 dark:border-fg/20 dark:text-fg dark:hover:border-fg/40 dark:hover:bg-fg/10",
    },
  };

  const styles = buttonStyles[variant];

  return (
    <section className={`px-6 md:px-12 py-20 ${variantStyles[variant]}`}>
      <div className="max-w-2xl">
        <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-tight mb-6">
          {title}
        </h2>
        <p className={`text-[15px] leading-[1.7] mb-8 ${variant === "light" ? "text-grey-600" : "opacity-55"}`}>
          {description}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={primaryHref}
            className={`inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded transition-all ${styles.primary}`}
          >
            {primaryLabel} →
          </Link>
          {secondaryHref && secondaryLabel && (
            <Link
              href={secondaryHref}
              className={`inline-flex items-center gap-2 text-[13px] font-semibold no-underline px-6 py-3 rounded border transition-all ${styles.secondary}`}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
