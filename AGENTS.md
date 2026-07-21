# AGENTS.md – Furma.tech Development Guidelines

**Purpose:** Instructions for AI coding assistants working in this codebase.

**Context:** Furma.tech is a bootstrapped venture studio (Estonian OÜ, Sitges, Catalonia). 11 products across games, SaaS, AI, finance, and civic tech:

**Products:**
- **Tic-Tac-Toe Disappear** — Vanishing-move strategy game (In Dev)
- **QArt** — AI-generated QR codes that look like art (Soon)
- **GuideTours** — Tour operator platform with Viator sync (In Dev)
- **restauManager** — Restaurant management with TheFork integration (In Dev)
- **FinanceHub** — Market data & portfolio monitoring (Paused)
- **OneToMany** — Goal setting & habit tracking (Paused)
- **OpenGovern** — Direct democracy tooling for municipalities (Roadmap)
- **LinkUp** — Short-video professional matching (Paused)
- **PicksTracker** — Sports pick tracking with social predictions (Roadmap)
- **Aitlas** — Sovereign AI ecosystem: Nova workspace, Nexus runtime, Agents marketplace (In Dev)

Primary routes: `/`, `/portfolio`, `/portfolio/[project]`, `/privacy`. Contact: `/#contact`.

Alternate UI concept: `/v2` — "The Workshop" (warm editorial, self-contained: own layout, fonts, CSS in `src/app/v2/`, components in `src/components/v2/`). Bypasses v1 chrome via `isV2` in `LayoutChrome.tsx`. See `.impeccable.md` for its design context.

Core ethos: 0% VC, profitable before flashy, "build software that works."

**Stack:** Next.js 16.2.1 | React 19.2.3 | TypeScript (strict) | Tailwind v4 | Zod | Radix UI | Lucide

---

## 1. Commands

```bash
  pnpm dev          # Start dev server (http://127.0.0.1:3080)
pnpm dev --turbo  # Force Turbopack (default in 16.2)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

**Note:** No test framework configured yet. When adding tests, use Vitest + RTL.

### Dev Server Lock
```bash
cat .next/dev/lock  # Check running PID
taskkill /F /T /PID <pid>  # Kill stuck server (Windows)
```

---

## 2. Project Structure

```
src/
├── app/                    # Next.js App Router (route groups, layouts, pages)
│   ├── layout.tsx         # Root layout with fonts, theme, nav, footer
│   ├── globals.css         # Tailwind v4 config, CSS variables, animations
│   └── [route]/page.tsx   # Route pages
├── components/
│   ├── *.tsx              # Shared components (PascalCase)
│   └── ui/                # Primitive UI components
├── lib/                   # Utilities (camelCase)
│   └── utils.ts           # cn() helper using clsx + tailwind-merge
└── styles/                # (unused, globals.css is in app/)
```

---

## 3. Code Style

### Imports (ordered, trailing commas)
```typescript
// 1. React core
import { ReactNode, useState } from "react";
// 2. Next.js (link, image, metadata)
import Link from "next/link";
import type { Metadata } from "next";
// 3. Third-party (Radix, Lucide, class-variance-authority, Zod)
import { clsx, type ClassValue } from "clsx";
// 4. Internal @/ aliases
import Navigation from "@/components/Navigation";
// 5. Relative imports (rarely used)
```

### TypeScript Rules
- **No `any`** – use `unknown` with type guards
- Define interfaces for all props and API responses
- Use `Readonly<T>` for immutable props in server components

### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Button.tsx`, `PricingSection.tsx` |
| UI components | kebab-case | `src/components/ui/button.tsx` |
| Utilities | camelCase | `cn()`, `formatDate.ts` |
| Types/Interfaces | PascalCase | `ButtonProps`, `ApiResponse` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES` |

### Formatting
- 2-space indentation, single quotes, trailing commas
- Max line length: 100 characters
- Named exports for utilities, default exports for components

---

## 4. Component Patterns

### Server Component (default)
```typescript
import type { Metadata } from "next";

interface Props {
  title: string;
}

export const metadata: Metadata = { title: "Page" };

export default function MyPage({ title }: Props) {
  return <div>{title}</div>;
}
```

### Client Component (when needed)
```typescript
"use client";

import { useState } from "react";

interface Props {
  defaultValue?: string;
  onSubmit: (value: string) => void;
}

export default function MyComponent({ defaultValue = "", onSubmit }: Props) {
  const [value, setValue] = useState(defaultValue);
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

**Add `'use client'` only for:** `useState`, `useEffect`, event handlers, browser APIs, `onClick`, `onChange`.

---

## 5. Tailwind CSS v4

### Color Variables (from globals.css)
```css
/* Semantic */
--color-primary, --color-secondary, --color-muted, --color-border
/* Grey scale */
--color-grey-50 through --color-grey-900
/* Brand accents */
--color-amber, --color-green, --color-blue, --color-purple (with -400, -500, -10, -20 variants)
/* Fonts */
--font-serif, --font-sans, --font-mono
```

### Animation Classes
```css
.animate-fade-up         /* Main fade-up */
.delay-1 through .delay-5  /* 0.1s to 0.65s delays */
.animate-ticker          /* Horizontal ticker (pauses on hover) */
.reveal / .reveal.visible  /* Scroll reveal (add .visible via JS) */
/* Directional reveals: .reveal-up, .reveal-down, .reveal-left, .reveal-right */
.section                 /* padding: 120px 0 (80px mobile) */
```

### Glass & Effects
```css
.glass         /* backdrop-filter blur + semi-transparent bg */
.hover-lift    /* translateY(-4px) on hover */
.card-hover    /* subtle shadow lift on hover */
.gradient-text /* amber→orange→pink text gradient */
.glow-amber-sm /* amber glow effect */
```

---

## 6. Zod Validation (v4)

```typescript
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

// Infer type from schema
type ContactInput = z.infer<typeof ContactSchema>;

// Parse with error handling
const result = ContactSchema.safeParse(data);
if (!result.success) {
  return { errors: result.error.flatten().fieldErrors };
}
```

---

## 7. Error Handling

```typescript
// Server actions / API routes
try {
  const data = await operation();
  return NextResponse.json({ data });
} catch (error) {
  console.error("Operation failed:", error);
  return NextResponse.json(
    { error: "Failed to complete operation" },
    { status: 500 }
  );
}

// Client-side: display user-friendly messages
try {
  await submitForm(data);
} catch {
  setError("Something went wrong. Please try again.");
}
```

---

## 8. Testing Guidelines

No test framework is configured yet. When adding tests:

**Framework:** Vitest + React Testing Library
**Running tests:**
```bash
pnpm test           # Run tests in watch mode
pnpm test:run      # Run tests once (CI mode)
pnpm test:coverage # Generate coverage report
```

**Test file naming:**
- Unit tests: `ComponentName.test.tsx`
- Integration tests: `api.endpoint.test.ts`
- E2E tests: `*.e2e.test.ts`

**Test patterns:**
```typescript
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("ComponentName", () => {
  it("renders correctly", () => {
    render(<ComponentName />);
    expect(screen.getByText("Expected")).toBeInTheDocument();
  });
});
```

---

## 9. Before Committing

```bash
pnpm lint   # ESLint check
pnpm build  # Production build
```

---

## 10. Commit & Pull Request Guidelines

### Commit Messages
Follow conventional commits format:
```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, test, chore
Scope: optional, e.g., auth, products, ui
```

**Examples:**
```bash
git commit -m "feat(products): add product listing page"
git commit -m "fix(ui): correct button hover state"
git commit -m "docs: update API documentation"
```

### Pull Requests
1. Create a feature branch from `master`
2. Use descriptive PR titles: `feat: add new feature` or `fix: resolve issue`
3. Include in PR description:
   - What changed and why
   - Screenshots for UI changes
   - Linked issues (e.g., "Closes #123")
4. Ensure all checks pass before requesting review
5. Request review from at least one team member

### Branch Naming
```
feat/<short-description>    # New features
fix/<short-description>     # Bug fixes
docs/<short-description>    # Documentation
refactor/<short-description> # Code improvements
```

---

## 11. Prohibited Patterns

- ❌ `any` type
- ❌ `console.log` in production code
- ❌ Inline styles (use Tailwind)
- ❌ Relative imports when `@/` alias is available
- ❌ Non-named exports for UI components (use named exports instead)

---

## 12. Key Files

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout with fonts, ThemeProvider, Analytics |
| `src/app/globals.css` | Tailwind v4 config, CSS variables, animations |
| `src/lib/utils.ts` | `cn()` utility for Tailwind class merging |
| `src/components/ThemeProvider.tsx` | Dark mode state management |
| `eslint.config.mjs` | ESLint config (Next core-web-vitals + TypeScript) |
