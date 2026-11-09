# Furma.tech

**Bootstrapped studio building profitable SaaS and the Aitlas AI ecosystem.**

- **Industry SaaS** — B2B tools for restaurants/tourism (restauManager, GuideTours)
- **Aitlas** — Sovereign AI platform (BYOK, MCP-first, 34+ Actions)
- **0% VC** | Estonian OÜ | Based in Sitges, Catalonia

---

## Stack

Next.js 16.3.5 (App Router) | React 19.2.8 | TypeScript (strict) | Tailwind CSS v4 | Zod | Base UI | Lucide

---

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://127.0.0.1:3080](http://127.0.0.1:3080)

---

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (Turbopack is the default bundler) |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | ESLint check |
| `pnpm test` | Zero-dependency `node --test` gate (`tests/*.test.ts`) |
| `pnpm test:smoke` | Production-server route smoke check (`scripts/smoke.mjs`) |

---

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── layout.tsx         # Root layout (fonts, theme, nav, footer)
│   ├── globals.css         # Tailwind v4 config + CSS variables
│   └── [route]/page.tsx   # Route pages
├── components/
│   ├── ui/                # Primitive UI components (Base UI)
│   └── *.tsx              # Shared components
├── hooks/                 # Custom React hooks
└── lib/
    ├── utils.ts           # cn() utility
    ├── metadata.ts        # SEO metadata
    ├── schemas.ts         # Zod validation
    └── server-actions.ts  # Server actions
```

Tests live in `tests/` (`*.test.ts`, run by `pnpm test`); the smoke script is `scripts/smoke.mjs`.

---

## Design System

- **Colors**: Semantic CSS variables (`--color-primary`, `--color-secondary`, etc.) + grey scale (`--color-grey-50` through `--color-grey-900`)
- **Fonts**: Syne (sans), Cormorant (serif), JetBrains Mono (mono)
- **Animations**: `.animate-fade-up`, `.animate-ticker`, `.reveal` (scroll-triggered)
- **Effects**: `.glass`, `.glow-mono`, `.hover-lift`, `.card-hover` — all monochrome; the page carries no hue (`DESIGN.md`)

See `AGENTS.md` for full guidelines.

---

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Fullscreen studio home |
| `/portfolio` | Editorial project list |
| `/portfolio/[project]` | Case study pages |
| `/privacy` | Privacy policy |
| `/brand` | Brand assets (noindex) |
| `/styleguide` | UI primitive reference |
| `/v2` | Alternate "Workshop" concept (excluded from the sitemap) |

Contact lives on the home experience at `/#contact`.

---

## License

Proprietary — Furma.tech OÜ
