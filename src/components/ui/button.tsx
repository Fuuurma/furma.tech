"use client"

import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import type { VariantProps } from "class-variance-authority"
import Link from "next/link"

import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends Omit<ButtonPrimitive.Props, "disabled">,
    VariantProps<typeof buttonVariants> {
  href?: string
  disabled?: boolean
  glow?: boolean
}

function Button({
  className,
  variant = "default",
  size = "default",
  href,
  disabled = false,
  glow = false,
  children,
  ...props
}: ButtonProps) {
  const styles = cn(
    buttonVariants({ variant, size, className }),
    glow && "shadow-[0_0_20px_rgba(var(--foreground),0.2)]",
  )

  if (href) {
    const linkProps = props as Record<string, unknown>
    return (
      <Link
        href={href}
        className={styles}
        data-slot="button"
        {...linkProps}
      >
        {children}
      </Link>
    )
  }

  return (
    <ButtonPrimitive
      data-slot="button"
      className={styles}
      disabled={disabled}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  )
}

export { Button }
