import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-none border border-transparent bg-clip-padding font-bold uppercase tracking-widest whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:opacity-90 shadow-lg shadow-foreground/5",
        outline:
          "border-foreground text-foreground hover:bg-foreground hover:text-background",
        secondary:
          "bg-grey-100 text-foreground border border-border hover:bg-grey-200 dark:bg-grey-900 dark:border-grey-800 dark:hover:bg-grey-800",
        ghost:
          "text-grey-500 hover:text-foreground hover:bg-foreground/5",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        premium: "bg-foreground text-background border border-foreground/20 hover:bg-background hover:text-foreground shadow-2xl shadow-foreground/10",
        dark: "bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground transition-colors",
      },
      size: {
        default: "text-[11px] px-6 py-3.5",
        sm: "text-[10px] px-4 py-2",
        md: "text-[11px] px-6 py-3.5",
        lg: "text-[12px] px-8 py-4.5",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
