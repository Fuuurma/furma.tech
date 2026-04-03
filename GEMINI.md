# GEMINI.md — Furma.tech Project Context

This file provides essential context, architecture overview, and development standards for the Furma.tech codebase.

## Project Overview

**Furma.tech** is a bootstrapped venture studio (Estonian OÜ) based in Sitges, Catalonia. It operates in two main verticals:
- **Industry SaaS:** B2B tools for restaurants and tourism (e.g., restauManager, GuideTours).
- **Aitlas:** A sovereign AI ecosystem featuring a BYOK model and MCP-first architecture with 34+ Actions.

The project is built with a focus on performance, scalability, and a minimalist, high-end "monochrome" aesthetic.

### Core Technology Stack
- **Framework:** Next.js 16.2 (App Router)
- **Library:** React 19
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS v4
- **Validation:** Zod
- **UI Components:** Radix UI Primitives & Lucide Icons
- **Package Manager:** pnpm

---

## Architecture & Directory Structure

```text
src/
├── app/                    # Next.js App Router (pages, layouts, globals)
│   ├── layout.tsx         # Root layout (fonts, theme, navigation, footer)
│   ├── globals.css         # Tailwind v4 configuration + design system variables
│   └── [route]/page.tsx   # Individual route pages
├── components/
│   ├── ui/                # Primitive UI components (shadcn/ui style)
│   └── *.tsx              # Shared/Feature components
├── lib/                   # Core utilities and shared logic
│   ├── utils.ts           # Tailwind merge (cn) utility
│   ├── metadata.ts        # SEO and OpenGraph configurations
│   ├── schemas.ts         # Zod validation schemas
│   └── actions.ts         # Next.js Server Actions
└── hooks/                 # Custom React hooks
```

---

## Building and Running

| Command | Description |
|---------|-------------|
| `pnpm dev` | Starts the development server with Turbopack enabled. |
| `pnpm build` | Creates a production-ready build of the application. |
| `pnpm start` | Runs the production build locally. |
| `pnpm lint` | Executes ESLint to check for code quality and style issues. |

---

## Development Conventions

### Design System & Styling
- **Aesthetic:** Strictly monochrome (Black & White). Colors are represented as semantic CSS variables (`--color-primary`, `--color-border`, etc.) defined in `src/app/globals.css`.
- **Fonts:** Syne (Sans), Cormorant (Serif), JetBrains Mono (Mono).
- **Animations:** Uses custom utility classes for reveals and transitions (e.g., `.animate-fade-up`, `.reveal`, `.glass`, `.hover-lift`).
- **Tailwind v4:** Utilizes the `@theme inline` block in CSS for configuration instead of a separate JS file.

### TypeScript Standards
- **Strict Typing:** Avoid `any`. Use `unknown` with type guards or proper interfaces.
- **Props:** Define interfaces for all component props. Use `Readonly<T>` for server component props.
- **Naming:**
    - **Components:** PascalCase (e.g., `PricingSection.tsx`).
    - **Utilities/Hooks:** camelCase (e.g., `useScroll.ts`, `formatDate.ts`).
    - **Constants:** UPPER_SNAKE_CASE.

### Code Style & Patterns
- **Imports:** 
    1. React core
    2. Next.js
    3. Third-party libraries
    4. Internal `@/` aliases
- **Exports:** Use **named exports** for UI components and utilities; **default exports** are reserved for pages and major components.
- **Client Components:** Only use `'use client'` when strictly necessary (state, effects, browser APIs).

### Verification Checklist
- Run `pnpm lint` before pushing changes.
- Ensure `pnpm build` succeeds to verify type safety and production readiness.
- No `console.log` in production code.

---

## Additional Resources
- **AGENTS.md:** Detailed technical guidelines for AI assistants.
- **README.md:** General project overview and quick start.
