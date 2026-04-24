"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import Link from "next/link"
import { ChevronRight, ChevronRightIcon, Home, MoreHorizontalIcon } from "lucide-react"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  )
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn("transition-colors hover:text-foreground", className),
      },
      props
    ),
    render,
    state: {
      slot: "breadcrumb-link",
    },
  })
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? (
        <ChevronRightIcon />
      )}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex size-5 items-center justify-center [&>svg]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon
      />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}

// ——— Legacy auto-generating Breadcrumbs (default export) ———
interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
}

const routeLabels: Record<string, string> = {
  portfolio: "Portfolio",
  aitlas: "Aitlas",
  about: "About",
  careers: "Careers",
  contact: "Contact",
  updates: "Updates",
  docs: "Docs",
  privacy: "Privacy",
  nova: "Nova",
  nexus: "Nexus",
  agents: "Agents Store",
  twyt: "f.twyt",
  library: "f.library",
  rsrx: "f.rsrx",
  pay: "f.pay",
  health: "f.health",
  guard: "f.guard",
  support: "f.support",
  deploy: "f.deploy",
  restauramanager: "restauManager",
  guidetours: "GuideTours",
  qart: "QArt",
  "tic-tac-toe": "Tic-Tac-Toe",
  "tic-tac-toe-disappear": "Tic-Tac-Toe",
  sailingmate: "SailingMate",
  financehub: "FinanceHub",
  linkup: "LinkUp",
  pickstracker: "PicksTracker",
  onetomany: "OneToMany",
  opengovern: "OpenGovern",
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const pathname = usePathname()
  const breadcrumbItems = items || generateBreadcrumbs(pathname)
  if (breadcrumbItems.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm", className)}>
      <Link href="/" className="text-grey-500 hover:text-foreground transition-colors no-underline flex items-center gap-1">
        <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="sr-only">Home</span>
      </Link>
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center gap-1 sm:gap-1.5">
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-grey-400" />
          {item.href ? (
            <Link href={item.href} className="text-grey-500 hover:text-foreground transition-colors no-underline">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  if (pathname === "/") return []
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []
  let currentPath = ""
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    currentPath += `/${segment}`
    const isLast = i === segments.length - 1
    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    breadcrumbs.push({ label, href: isLast ? undefined : currentPath })
  }
  return breadcrumbs
}
