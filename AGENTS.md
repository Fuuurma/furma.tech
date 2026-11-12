# AGENTS.md – Furma.tech Development Guidelines

**Purpose:** Instructions for AI coding assistants working in this codebase.

## Design

- Contract: `DESIGN.md` (this repo). Notes: `.impeccable.md` for `/v2`.
- Invoke `design-arsenal`, then `design-taste-frontend` / `hallmark` / `impeccable`.
- Name three references + one craft move before generating UI. Default shadcn is not done.
- Hub catalogs: `~/Projects/hub/design/README.md`.

**Context:** Furma.tech is a bootstrapped studio (Estonian OÜ). The product catalogue is `src/lib/home-projects.ts`: six advertised products (`HOME_PROJECTS`) plus eight archived pages (`ARCHIVED_PROJECTS`) that stay reachable but are not advertised. `tests/guide-catalogue.test.ts` fails when this block drifts from the catalogue.

**Advertised products (`HOME_PROJECTS`):**
- **Tic-Tac-Toe** — Vanishing-move strategy game (Beta)
- **Gambit Deck** — Guest-first card game, no account to play (Beta)
- **Pond** — Capture-first library and planner (In Development)
- **QArt** — AI-generated QR codes that look like art (In Development)
- **Bloxs** — Component library rebuilt from named sources (Prototype)
- **Renfe** — Civic dashboard measuring Renfe service from open feeds (In Development)

**Archived (`ARCHIVED_PROJECTS`, reachable, not advertised):** Aitlas, restauManager, GuideTours, FinanceHub, PicksTracker, LinkUp, OneToMany, OpenGovern.

Primary routes: `/`, `/portfolio`, `/portfolio/[project]`, `/privacy`. Contact: `/#contact`.

Alternate UI concept: `/v2` — "The Workshop" (warm editorial, self-contained: own layout, fonts, CSS in `src/app/v2/`, components in `src/components/v2/`). Bypasses v1 chrome via `isV2` in `LayoutChrome.tsx`. See `.impeccable.md` for its design context.

Core ethos: 0% VC, profitable before flashy, "build software that works."

**Stack:** Next.js 16.4.2 | React 19.2.8 | TypeScript (strict) | Tailwind v4 | Zod | Base UI | Lucide

---

## 1. Commands

```bash
pnpm dev          # Start dev server (http://127.0.0.1:3080)
pnpm dev --turbo  # Force Turbopack (the default in Next 16)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm test         # node:test contract suites in tests/
pnpm test:smoke   # Runtime smoke gate (needs pnpm start on :3080)
```

### Dev Server Lock
```bash
cat .next/dev/lock  # Check running PID
taskkill /F /T /PID <pid>  # Kill stuck server (Windows)
kill <pid>               # Kill stuck server (macOS/Linux)
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
├── hooks/                 # Custom React hooks
└── lib/                   # Utilities (camelCase)
    └── utils.ts           # cn() helper using clsx + tailwind-merge
tests/                     # node:test contract suites (run via pnpm test)
scripts/                   # Zero-dep ops scripts (smoke.mjs runtime gate)
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
// 3. Third-party (Base UI, Lucide, class-variance-authority, Zod)
import { clsx, type ClassValue } from "clsx";
// 4. Internal @/ aliases
import { LayoutChrome } from "@/components/LayoutChrome";
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
/* Accent names kept as monochrome aliases — they resolve to
   foreground/grey and carry no hue (the page is monochrome; DESIGN.md) */
--color-amber, --color-green, --color-blue, --color-purple
/* Fonts */
--font-serif, --font-sans, --font-mono
```

### Animation Classes
```css
.animate-fade-up         /* Main fade-up */
.delay-1 through .delay-5  /* 0.1s to 0.5s delays */
.animate-ticker          /* Horizontal ticker (pauses on hover) */
.reveal / .reveal.visible  /* Scroll reveal (add .visible via JS) */
/* Directional reveals: .reveal-up, .reveal-down, .reveal-left, .reveal-right */
.section                 /* padding: 100px 0 (60px mobile) */
```

### Glass & Effects
```css
.glass         /* backdrop-filter blur + semi-transparent bg */
.hover-lift    /* translateY(-2px) on hover */
.card-hover    /* subtle shadow lift on hover */
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

Zero-dependency `node:test` contract suites under `tests/` — no framework
install. Suites import pure `src/lib` modules directly and read component
source with `readFileSync` to pin product decisions (copy, a11y, config).

**Running tests:**
```bash
pnpm test        # All contract suites (listed in package.json)
pnpm test:smoke  # Runtime smoke gate against a running server
```

**Test file naming:** `tests/<area>.test.ts`

**Test pattern:**
```typescript
import { test } from "node:test";
import assert from "node:assert/strict";

test("the contract holds", () => {
  assert.equal(actual, expected);
});
```

---

## 9. Before Committing

```bash
pnpm lint   # ESLint check
pnpm test   # node:test contract suites
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

### Engineering foundation

Before implementation, debugging, architecture work, agent-instruction edits,
or knowledge curation, invoke `hub-foundation` from `.devin/skills/`.
If the harness cannot invoke it, read `.devin/skills/hub-foundation/SKILL.md`
explicitly and follow only the references relevant to the approved task.
The foundation supplements this repository's rules; it grants no additional
permissions. `retro` is owner-invoked, and raw session history stays local.
Provenance: `.devin/skills/mattpocock-source.json`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
