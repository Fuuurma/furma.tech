# AGENTS.md – Furma.tech Development Guidelines

**Purpose:** Instructions for AI coding assistants working in this codebase.

---

## 1. Project Overview

Next.js 16 website for Furma.tech - a bootstrapped venture studio with two verticals: industry SaaS tools and the Aitlas AI ecosystem.

- **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Path alias:** `@/*` maps to `./src/*`
- **Strict mode:** Enabled

---

## 2. Commands

```bash
# Development
pnpm dev          # Start dev server (http://localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server

# Linting
pnpm lint         # Run ESLint on all files
```

---

## 3. Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles + CSS custom properties
├── components/         # React components (PascalCase)
├── lib/               # Utilities (camelCase)
│   └── utils.ts       # cn() helper for Tailwind
└── styles/            # (empty, globals.css is in app/)
```

---

## 4. Code Style

### Imports
- Use `@/` alias for absolute imports: `import Link from 'next/link'`
- Group order: external → internal → types
- Trailing commas required

### TypeScript
- **Strict mode always** - no `any`, use `unknown` with type guards
- Define interfaces for all component props and API responses

### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Navigation.tsx`, `ProductCard.tsx` |
| Utilities | camelCase | `formatDate.ts`, `validateEmail.ts` |
| Types/Interfaces | PascalCase | `UserData`, `ApiResponse` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES` |

### Formatting
- 2-space indentation
- Single quotes for strings
- Max line length: 100 characters

---

## 5. Component Guidelines

### File Structure
```typescript
'use client';  // Only when needed (hooks, state, event handlers)

import Link from 'next/link';
import { useState } from 'react';

interface Props {
  title: string;
  onClick?: () => void;
}

export default function MyComponent({ title, onClick }: Props) {
  return <div onClick={onClick}>{title}</div>;
}
```

### Server vs Client
- Prefer **server components** by default
- Add `'use client'` only for: hooks (`useState`, `useEffect`), event handlers, browser APIs

---

## 6. Tailwind CSS v4

### CSS Custom Properties (from globals.css)
```css
--color-bg: #fafafa        /* Background */
--color-fg: #0d0d0d        /* Foreground/text */
--color-grey-50: #f7f7f7
--color-grey-100: #f0f0f0
--color-grey-200: #e2e2e2
--color-grey-400: #a0a0a0
--color-grey-600: #525252
--color-grey-800: #282828

--font-serif: var(--font-cormorant)
--font-sans: var(--font-syne)
--font-mono: var(--font-jetbrains)
```

### Available Animation Classes
```css
.animate-fade-up          /* Fade up animation */
.delay-1 through .delay-5 /* Animation delays (0.1s to 0.65s) */
.animate-ticker           /* Horizontal ticker (pauses on hover) */
.reveal / .reveal.visible /* Scroll reveal (use JS to add .visible) */
```

### Section Spacing
```css
.section  /* padding: 120px 0 (80px on mobile) */
```

---

## 7. Error Handling

```typescript
try {
  // operation
} catch (error) {
  console.error('Operation failed:', error);
  return NextResponse.json(
    { error: 'Operation failed' },
    { status: 500 }
  );
}
```

- Use try/catch for async operations
- Return meaningful error messages with proper status codes (400, 401, 429, 500)

---

## 8. Before Committing

```bash
pnpm lint      # Check for lint errors
pnpm build     # Verify build passes
```

**Never** commit code that fails these checks.

---

## 9. Prohibited Patterns

- ❌ `any` type (use `unknown` with type guards)
- ❌ `console.log` in production code
- ❌ Inline styles (use Tailwind)
- ❌ Relative imports when `@/` alias available

---

## 10. Future Integrations (Roadmap)

When adding these, update AGENTS.md with relevant guidelines:
- **Testing:** Vitest + React Testing Library
- **Validation:** Zod schemas in `@/lib/schemas`
- **Logging:** pino logger in `@/lib/logger`
- **Database:** Prisma
- **Auth:** NextAuth.js

---

## Summary

1. Use TypeScript strictly - no `any`
2. Prefer server components, add `'use client'` sparingly
3. Use Tailwind v4 with CSS custom properties from globals.css
4. Run `pnpm lint` and `pnpm build` before commit
5. Keep components small and focused
