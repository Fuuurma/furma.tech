# Furma.tech – AI Assistant Context

**Last Updated:** March 25, 2026  
**Project Type:** Next.js 16 Website / Web Application

---

## 1. Project Overview

Furma.tech is a **bootstrapped digital venture studio** operating with a dual-vertical strategy:

1. **Industry B2B SaaS** – Cash-generating tools for traditional industries (restaurants, tour operators) in Catalonia
2. **Aitlas AI Ecosystem** – A sovereign AI workspace with BYOK (Bring Your Own Key) architecture, MCP protocol support, and autonomous agent tools

### Business Model
- **Legal Entity:** Estonian OÜ (EU VAT: EE102894502) – 0% tax on reinvested profits
- **Funding:** 100% bootstrapped (~€5,000 war chest), zero VC
- **Target MRR:** €3,000+ from B2B SaaS to fund AI R&D indefinitely

---

## 2. Technology Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Runtime** | React 19 |
| **Language** | TypeScript 5 (strict mode) |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | shadcn/ui (base-nova style) + Premium Custom Components |
| **Icons** | Lucide |
| **Package Manager** | pnpm |
| **Linting** | ESLint 9 + eslint-config-next |

### Key Dependencies
```json
{
  "next": "16.1.6",
  "react": "19.2.3",
  "react-dom": "19.2.3",
  "tailwindcss": "^4",
  "typescript": "^5"
}
```

---

## 3. Project Structure

```
furma.tech/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout (fonts, metadata, nav, footer)
│   │   ├── page.tsx         # Home page (Hero, Showcases)
│   │   ├── globals.css      # Global styles + CSS custom properties
│   │   ├── projects/        # Reorganized Project directory
│   │   │   ├── aitlas/      # Aitlas Vertical
│   │   │   │   ├── page.tsx # Overview
│   │   │   │   ├── nova/    # AI Workspace
│   │   │   │   ├── nexus/   # Durable Runtime
│   │   │   │   ├── twyt/    # Twitter Intelligence
│   │   │   │   └── ...      # Other Aitlas Actions
│   │   │   └── saas/        # SaaS Vertical
│   │   │       ├── page.tsx # Overview
│   │   │       ├── restauramanager/
│   │   │       └── guidetours/
│   │   ├── about/           # Company info
│   │   ├── careers/         # Job postings
│   │   ├── contact/         # Contact form
│   │   ├── docs/            # Developer Portal
│   │   ├── updates/         # Changelog/news
│   │   └── ...
│   ├── components/
│   │   ├── ui/              # Atomized UI components
│   │   │   ├── ProjectHero.tsx
│   │   │   ├── FeaturesGrid.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   ├── ScrollReveal.tsx
│   │   │   └── ...
│   │   ├── Navigation.tsx   # Glassmorphism Navigation
│   │   └── Footer.tsx       # Modernized Footer
│   ├── hooks/
│   │   └── useScroll.ts     # useInView, useScrollProgress
│   └── lib/
│       ├── utils.ts         # cn() utility
│       └── metadata.ts      # constructMetadata SEO utility
├── public/                  # Static assets
└── ...
```

---

## 4. Building and Running

### Development
```bash
pnpm dev          # Start dev server at http://localhost:3000
```

### Production
```bash
pnpm build        # Create production build
pnpm start        # Start production server
```

---

## 5. Design System & Components

### Core Layout Components
- **`ProjectHero`**: Standardized hero for project pages (dark/light support, badges).
- **`FeaturesGrid`**: Reusable grid for product features with stagger animations.
- **`PricingSection`**: Managed pricing tables with "Popular" tier logic.
- **`Section` & `Container`**: Foundation for consistent spacing and sizing.

### Visual Effects
- **Glassmorphism**: Applied to `Navigation`.
- **Glows**: `glow-amber-sm`, `glow-orange` for AI-themed elements.
- **Reveal**: `ScrollReveal` and `StaggerChildren` for entry animations.
- **Texture**: Subtle SVG grain texture in `globals.css`.

---

## 6. Metadata & SEO

All pages should use the `constructMetadata` utility from `@/lib/metadata` to ensure consistent OpenGraph, Twitter, and index settings.

```typescript
export const metadata = constructMetadata({
  title: "Page Title",
  description: "Page description...",
});
```

---

## 7. Key Pages & Routes (New Structure)

### Aitlas Ecosystem (`/projects/aitlas`)
| Route | Purpose |
|-------|---------|
| `/projects/aitlas` | Ecosystem overview |
| `/projects/aitlas/nova` | AI workspace (BYOK) |
| `/projects/aitlas/nexus` | Background compute runtime |
| `/projects/aitlas/agents` | GWagents marketplace |
| `/projects/aitlas/twyt` | f.twyt – Twitter intelligence |
| `/projects/aitlas/library` | f.library – Vector knowledge base |

### Industry SaaS (`/projects/saas`)
| Route | Purpose |
|-------|---------|
| `/projects/saas` | Product showcase overview |
| `/projects/saas/restauramanager` | Restaurant management |
| `/projects/saas/guidetours` | Tour operator booking sync |

---

## 8. Prohibited Patterns

- ❌ `any` type – use `unknown` with type guards.
- ❌ Direct manual `Metadata` objects – use `constructMetadata`.
- ❌ Hardcoded project links – always verify path in `src/app/projects`.
- ❌ Repetitive manual Hero sections – use `ProjectHero`.

---

**Build fast. Sell smart. Stay profitable. Zero token liability.** 🚀
