import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest transition-colors focus:outline-none rounded-none",
  {
    variants: {
      variant: {
        default:
          "border-foreground bg-foreground text-background",
        secondary:
          "border-border bg-grey-100 text-foreground dark:bg-grey-900",
        destructive:
          "border-foreground bg-transparent text-foreground opacity-50",
        outline: "border-foreground text-foreground",
        inverted: "border-border bg-background text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
