import { cva } from "class-variance-authority"

export const badgeVariants = cva(
  "group/badge inline-flex items-center border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest transition-colors focus:outline-none rounded-none",
  {
    variants: {
      variant: {
        default: "border-foreground bg-foreground text-background",
        secondary:
          "border-border bg-grey-100 text-foreground dark:bg-grey-900",
        destructive:
          "border-foreground bg-transparent text-foreground opacity-50",
        outline: "border-foreground text-foreground",
        inverted: "border-border bg-background text-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
