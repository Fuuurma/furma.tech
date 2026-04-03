# Copilot Instructions for furma.tech

This file provides guidance for GitHub Copilot sessions working in this repository.

## Quick Start

```bash
pnpm install    # Install dependencies
pnpm dev        # Start dev server (http://localhost:3000)
pnpm lint       # Run ESLint check
pnpm build      # Production build
pnpm start      # Start production server
```

**Note:** No test framework is configured. When adding tests, use **Vitest + React Testing Library**.

## Project Context

**Furma.tech** is a bootstrapped venture studio (Estonian OÜ, Sitges, Catalonia) with two verticals:

- **Industry SaaS** — B2B tools for restaurants/tourism (restauManager, GuideTours)
- **Aitlas** — Sovereign AI ecosystem (BYOK model, MCP-first, 34+ Actions)

**Core ethos:** 0% VC, profitable before flashy, "build software that works."

## Architecture Overview

### Stack

- **Framework:** Next.js 16.2.1 (App Router)
- **Runtime:** React 19.2.3
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (with custom CSS variables)
- **UI Components:** Radix UI primitives + custom components
- **Icons:** Lucide React
- **Forms/Validation:** Zod v4
- **Analytics:** Vercel Analytics + Speed Insights

### Directory Structure

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout (fonts, theme, nav, footer)
│   ├── globals.css          # Tailwind v4 config, CSS variables, animations
│   ├── page.tsx             # Homepage
│   ├── projects/            # Product pages (aitlas, saas, nested routes)
│   ├── about/               # About page
│   ├── brand/               # Brand guidelines page
│   ├── contact/             # Contact form
│   ├── docs/                # Developer portal
│   ├── updates/             # Blog/announcements
│   ├── privacy/             # Privacy policy
│   └── [nested]/page.tsx    # Dynamic/nested routes
├── components/
│   ├── ui/                  # Primitive UI components (Button, Dialog, etc.)
│   └── *.tsx                # Shared components (PascalCase)
├── lib/
│   ├── utils.ts             # cn() utility for Tailwind class merging
│   ├── metadata.ts          # SEO metadata constants/helpers
│   ├── schemas.ts           # Zod validation schemas
│   └── actions.ts           # Server actions (if any)
└── hooks/                   # Custom React hooks
```

## Code Conventions

### TypeScript

- **No `any` type** — use `unknown` with proper type guards
- Define interfaces for all component props and API responses
- Use `Readonly<T>` for immutable props in server components
- Interfaces should be named `{ComponentName}Props` for component props

### Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Button.tsx`, `PricingSection.tsx` |
| Utilities/Functions | camelCase | `cn()`, `formatDate.ts` |
| Types/Interfaces | PascalCase | `ButtonProps`, `ContactSchema` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES`, `API_TIMEOUT` |

### Component Patterns

**Server Component (default):**
- No `'use client'` directive
- Can fetch data directly
- Example: page components, layout components

**Client Component (only when needed):**
- Add `'use client'` at the top of the file
- Use for: `useState`, `useEffect`, event handlers, browser APIs
- Example: forms, interactive modals, animations

### Imports (ordered, trailing commas)

```typescript
// 1. React core
import { ReactNode, useState } from "react";
// 2. Next.js
import Link from "next/link";
import type { Metadata } from "next";
// 3. Third-party (Radix UI, Lucide, Zod, etc.)
import { clsx } from "clsx";
import { z } from "zod";
// 4. Internal (@/ aliases)
import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
// 5. Relative imports (rarely used)
```

### Formatting

- 2-space indentation
- Single quotes for strings
- Trailing commas in multiline objects/arrays
- Max line length: 100 characters (not enforced but preferred)
- Named exports for utilities; default exports for components

## Design System

### Tailwind CSS v4

**Semantic Color Variables** (defined in `globals.css`):
- `--color-primary`, `--color-secondary`, `--color-muted`, `--color-border`
- Grey scale: `--color-grey-50` through `--color-grey-900`
- Brand accents: `--color-amber`, `--color-green`, `--color-blue`, `--color-purple` (with `-400`, `-500`, `-10`, `-20` variants)
- Font families: `--font-serif`, `--font-sans`, `--font-mono`

**Animation Classes:**
- `.animate-fade-up` — main fade-up effect
- `.delay-1` through `.delay-5` — stagger delays (0.1s to 0.65s)
- `.animate-ticker` — horizontal ticker (pauses on hover)
- `.reveal` / `.reveal.visible` — scroll-triggered reveal effect
- `.reveal-up`, `.reveal-down`, `.reveal-left`, `.reveal-right` — directional reveals
- `.section` — padding helper (120px vertical on desktop, 80px on mobile)

**Effect Classes:**
- `.glass` — backdrop blur + semi-transparent background
- `.hover-lift` — translateY(-4px) on hover
- `.card-hover` — subtle shadow lift on hover
- `.gradient-text` — amber→orange→pink text gradient
- `.glow-amber-sm` — amber glow effect

### Typography

- **Sans (default):** Syne
- **Serif:** Cormorant
- **Mono:** JetBrains Mono

## Validation & Error Handling

### Zod Schemas

```typescript
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactInput = z.infer<typeof ContactSchema>;

// In server actions or API routes:
const result = ContactSchema.safeParse(data);
if (!result.success) {
  return { errors: result.error.flatten().fieldErrors };
}
```

### Error Handling

**Server Actions / API Routes:**
```typescript
try {
  const data = await operation();
  return { success: true, data };
} catch (error) {
  console.error("Operation failed:", error);
  return { success: false, error: "Failed to complete operation" };
}
```

**Client-side:**
```typescript
try {
  await submitForm(data);
} catch {
  setError("Something went wrong. Please try again.");
}
```

## Code Quality

### Before Committing

```bash
pnpm lint    # ESLint check (catches TypeScript errors too)
pnpm build   # Production build (catches Next.js issues)
```

### Prohibited Patterns

- ❌ `any` type (use `unknown`)
- ❌ `console.log` in production code
- ❌ Inline styles (use Tailwind classes)
- ❌ Relative imports when `@/` alias is available
- ❌ Non-default exports for page/layout components
- ❌ Direct DOM manipulation (use React)

## Debugging

### Dev Server Lock (if stuck)

**macOS/Linux:**
```bash
cat .next/dev/lock  # Check running PID
kill <pid>          # Kill the process
```

**Windows:**
```bash
taskkill /F /T /PID <pid>  # Kill stuck server
```

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout with fonts, ThemeProvider, Analytics |
| `src/app/globals.css` | Tailwind v4 config, CSS variables, animations |
| `src/lib/utils.ts` | `cn()` utility for merging Tailwind classes |
| `src/components/` | All shared and UI components |
| `eslint.config.mjs` | ESLint config (Next.js core-web-vitals + TypeScript) |

## Additional Resources

- See `AGENTS.md` in the repo root for additional AI assistant guidelines
- See `README.md` for high-level project overview
