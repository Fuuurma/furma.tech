# Furma.tech

**Bootstrapped studio building games, tools, and civic tech.**

- **In beta** — Tic-Tac-Toe, Gambit Deck
- **In development** — Pond, QArt, Renfe
- **Prototype** — Bloxs
- **0% VC** | Estonian OÜ

---

## Stack

Next.js 16.4 (App Router) | React 19.2 | TypeScript (strict) | Tailwind CSS v4 | Zod | Base UI | Lucide

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
| `pnpm dev` | Start dev server (Turbopack enabled) |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | ESLint check |
| `pnpm test` | node:test contract suites in `tests/` |
| `pnpm test:smoke` | Runtime smoke gate (needs `pnpm start` on :3080) |

---

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── layout.tsx         # Root layout (fonts, theme, metadata)
│   ├── globals.css         # Tailwind v4 config + CSS variables
│   └── [route]/page.tsx   # Route pages
├── components/
│   ├── ui/                # Primitive UI components
│   └── *.tsx              # Shared components
├── lib/
│   ├── utils.ts           # cn() utility
│   ├── metadata.ts        # SEO metadata
│   ├── schemas.ts         # Zod validation
│   └── server-actions.ts # Server actions
└── hooks/                # Custom React hooks
```

---

## Design System

- **Colors**: Semantic CSS variables (`--color-primary`, `--color-secondary`, etc.) + grey scale (`--color-grey-50` through `--color-grey-900`)
- **Fonts**: Instrument Sans (sans), Cormorant (serif), JetBrains Mono (mono)
- **Animations**: `.animate-fade-up`, `.animate-ticker`, `.reveal` (scroll-triggered)
- **Effects**: `.glass`, `.hover-lift`, `.card-hover`

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
| `/showcase` | Product films index |
| `/v2` | Alternate "Workshop" UI concept (noindex) |

Contact lives on the home experience at `/#contact`.

---

## License

Proprietary — Furma.tech OÜ
