# Furma.tech

**Bootstrapped studio building games, tools, and civic tech.**

- **In beta** — Tic-Tac-Toe, Gambit Deck
- **In development** — Pond, QArt, Renfe
- **Prototype** — Bloxs
- **0% VC** | Estonian OÜ

---

## Stack

Next.js 16.4.6 (App Router) | React 19.2 | TypeScript (strict) | Tailwind CSS v4 | Zod | Base UI | Lucide

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

## Contact provider

The contact form (`/#contact`) and waitlist signups submit through a durable
provider boundary. A submission is reported as sent — and a receipt id is
shown — only when the provider durably records it and returns the
acknowledgment contract below. Until a provider is configured, every
submission fails closed with the same truthful retry copy.

### Configuration

| Variable | Description |
|----------|-------------|
| `CONTACT_PROVIDER_URL` | HTTPS endpoint that durably records the submission. Required to enable delivery; absent or invalid means every submission fails closed. |
| `CONTACT_PROVIDER_TOKEN` | Optional bearer token sent to the endpoint as `Authorization: Bearer …`. |

### Acknowledgment contract

The provider must answer `2xx` with a JSON body matching one of these shapes:

- Canonical: `{ "acknowledged": true }` — an optional `reference` string may be included.
- Legacy: `{ "ok": true, "reference": "<id>" }` or `{ "ok": true, "id": "<id>" }` — the `reference`/`id` is required.

Any other 2xx — an empty body, HTML, `{ "status": "received" }`, or a bare
`{ "ok": true }` with no reference — is rejected as
`provider-acknowledgment-missing`, so a misconfigured webhook that only echoes
200 OK can never make the UI claim success while the message is lost.

### Fail-closed behavior

The boundary reasons — `not-configured`, `provider-status-*`,
`provider-acknowledgment-missing`, `provider-unreachable` — never reach the
visitor. On any of them the form surfaces the same copy pointing at direct
mail:

> "We couldn't record your message right now. Email hello@furma.tech
> directly and we'll reply within 48 hours."

Success is returned only on a contract acknowledgment, and a receipt /
`messageId` / `signupId` is shown only when the provider itself returns a
reference — never fabricated.

### Rate limits

Both actions are throttled over a 60-second sliding window: 5 submissions per
minute per email address and 15 per minute per caller (network origin).
Excess attempts get the rate-limit copy, not a submission.

`src/lib/contact-provider.ts` is the source of truth for the boundary;
`src/lib/server-actions.ts` wires it into the forms.

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
