# QWEN.md – Furma.tech Project Context

## Project Overview

**Furma.tech** is a bootstrapped studio (Estonian OÜ, based in Sitges, Catalonia) building two main verticals:

- **Industry SaaS** — B2B tools for restaurants and tourism (restauManager, GuideTours)
- **Aitlas** — Sovereign AI ecosystem (BYOK model, MCP-first, 34+ Actions)

Core ethos: **0% VC, profitable before flashy, "build software that works."**

This is a **Next.js 16.3.5 website** using the App Router, serving as the corporate site and developer portal. It features a custom design system with semantic CSS variables, scroll-triggered animations, glass effects, and dark mode support.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16.3.5 (App Router) |
| UI | React 19.2.8 |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Components | Base UI (`@base-ui/react`) + Lucide Icons |
| Validation | Zod v4 |
| Package Manager | pnpm |
| Analytics | Vercel Analytics + Speed Insights |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router (routes, layouts, pages)
│   ├── layout.tsx         # Root layout (fonts, ThemeProvider, nav, footer)
│   ├── globals.css         # Tailwind v4 config, CSS variables, animations
│   └── [route]/page.tsx   # Route pages
├── components/
│   ├── ui/                # Primitive UI components (Base UI)
│   └── *.tsx              # Shared/components
├── hooks/                 # Custom React hooks
└── lib/
    ├── utils.ts           # cn() utility (clsx + tailwind-merge)
    ├── metadata.ts        # SEO metadata helpers
    ├── schemas.ts         # Zod validation schemas
    └── server-actions.ts  # Server actions
```

---

## Key Commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Start dev server (http://127.0.0.1:3080, Turbopack is the default bundler)
pnpm build          # Production build
pnpm start          # Start production server
pnpm lint           # Run ESLint
pnpm test           # Zero-dependency node --test gate (tests/*.test.ts)
pnpm test:smoke     # Production-server route smoke check (scripts/smoke.mjs)
```

**Before committing:** Always run `pnpm lint && pnpm test && pnpm build`.

---

## Development Conventions

### TypeScript
- **Strict mode** enabled — no `any` type (use `unknown` with type guards)
- Define `interface` for all props and API responses
- Use `Readonly<T>` for immutable props in server components

### Naming
- **Components:** PascalCase (`Button.tsx`, `PricingSection.tsx`)
- **Utilities:** camelCase (`cn()`, `formatDate.ts`)
- **Types/Interfaces:** PascalCase (`ButtonProps`, `ApiResponse`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_RETRIES`)

### Imports (ordered)
1. React core (`react`, `react-dom`)
2. Next.js (`next/link`, `next/image`, `next/metadata`)
3. Third-party (Base UI, Lucide, Zod, class-variance-authority)
4. Internal `@/` aliases
5. Relative imports (rarely used)

### Component Patterns
- **Server components** are the default
- Use `'use client'` only when needed: `useState`, `useEffect`, event handlers, browser APIs
- Named exports for utilities, default exports for components
- 2-space indentation, single quotes, trailing commas
- Max line length: 100 characters

### Styling (Tailwind CSS v4)
- Use semantic CSS variables: `--color-primary`, `--color-secondary`, `--color-muted`, `--color-border`
- Grey scale: `--color-grey-50` through `--color-grey-900`
- Fonts: Syne (sans), Cormorant (serif), JetBrains Mono (mono)
- **No inline styles** — use Tailwind utility classes exclusively

### Animations & Effects
- `.animate-fade-up` — Main fade-up animation
- `.delay-1` through `.delay-5` — Stagger delays (0.1s–0.5s)
- `.reveal` / `.reveal.visible` — Scroll-triggered reveals
- `.glass` — Backdrop blur effect
- `.hover-lift` — `translateY(-2px)` on hover
- `.card-hover` — Border turns to the foreground colour on hover
- `.gradient-text` — Legacy name; prints the foreground colour, no gradient (the page is monochrome — `DESIGN.md`)

### Zod Validation (v4)
```typescript
import { z } from "zod";

const Schema = z.object({ /* ... */ });
type Input = z.infer<typeof Schema>;
const result = Schema.safeParse(data);
```

### Error Handling
- Server actions/API: return `NextResponse.json({ error }, { status })`
- Client-side: display user-friendly messages, never expose raw errors

---

## Prohibited Patterns

- ❌ `any` type
- ❌ `console.log` in production code
- ❌ Inline styles (use Tailwind)
- ❌ Relative imports when `@/` alias is available
- ❌ Non-named exports for UI components

---

## Key Routes

| Route | Description |
|-------|-------------|
| `/` | Fullscreen studio home (contact at `/#contact`) |
| `/portfolio` | Editorial project list |
| `/portfolio/[project]` | Case study pages |
| `/privacy` | Privacy policy |
| `/brand` | Brand assets (noindex) |
| `/styleguide` | UI primitive reference |
| `/v2` | Alternate "Workshop" concept (excluded from the sitemap) |

---

## Key Files

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout with fonts, ThemeProvider, Analytics |
| `src/app/globals.css` | Tailwind v4 config, CSS variables, animations |
| `src/lib/utils.ts` | `cn()` utility for Tailwind class merging |
| `src/components/ThemeProvider.tsx` | Dark mode state management |
| `eslint.config.mjs` | ESLint config (Next core-web-vitals + TypeScript) |
| `next.config.ts` | Next.js config (browser logging, image optimization) |
| `components.json` | shadcn/ui component registry config |

---

## Testing

Tests run on Node's built-in runner — **zero-dependency `node --test`**, no third-party framework. `pnpm test` runs `node --test "tests/*.test.ts"`; each file in `tests/` imports `node:test` and `node:assert/strict`. `pnpm test:smoke` runs `scripts/smoke.mjs`. See `AGENTS.md` §8.

---

## Additional Notes

- See `AGENTS.md` for comprehensive development guidelines
- Package manager: **pnpm** (not npm/yarn)
- Deployment: Vercel (inferred from analytics dependencies)
- License: Proprietary — Furma.tech OÜ
