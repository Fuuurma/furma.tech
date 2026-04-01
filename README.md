# Furma.tech

**Bootstrapped venture studio building profitable SaaS and the Aitlas AI ecosystem.**

- **Industry SaaS** — B2B tools for restaurants/tourism (restauManager, GuideTours)
- **Aitlas** — Sovereign AI platform (BYOK, MCP-first, 34+ Actions)
- **0% VC** | Estonian OÜ | Based in Sitges, Catalonia

---

## Stack

Next.js 16.2 (App Router) | React 19 | TypeScript (strict) | Tailwind CSS v4 | Zod | Radix UI | Lucide

---

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (Turbopack enabled) |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | ESLint check |

---

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── layout.tsx         # Root layout (fonts, theme, nav, footer)
│   ├── globals.css         # Tailwind v4 config + CSS variables
│   └── [route]/page.tsx   # Route pages
├── components/
│   ├── ui/                # Primitive UI components
│   └── *.tsx              # Shared components
├── lib/
│   ├── utils.ts           # cn() utility
│   ├── metadata.ts        # SEO metadata
│   ├── schemas.ts         # Zod validation
│   └── actions.ts        # Server actions
└── hooks/                # Custom React hooks
```

---

## Design System

- **Colors**: Semantic CSS variables (`--color-primary`, `--color-secondary`, etc.) + grey scale (`--color-grey-50` through `--color-grey-900`)
- **Fonts**: Syne (sans), Cormorant (serif), JetBrains Mono (mono)
- **Animations**: `.animate-fade-up`, `.animate-ticker`, `.reveal` (scroll-triggered)
- **Effects**: `.glass`, `.glow-amber-sm`, `.hover-lift`, `.card-hover`

See `AGENTS.md` for full guidelines.

---

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/about` | Studio info |
| `/projects/aitlas` | AI ecosystem |
| `/projects/saas` | Industry SaaS |
| `/contact` | Contact form |
| `/docs` | Developer portal |

---

## License

Proprietary — Furma.tech OÜ
