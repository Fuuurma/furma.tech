# Portfolio Pages Consolidation Plan

## Summary
Consolidate all `/portfolio/*` pages into a unified design system with shared components, consistent spacing, and unique "signature sections" per product.

## Phase 1: Enhance `ProjectLayout.tsx`

Add these new exported components to `src/components/ui/ProjectLayout.tsx`:

### 1a. `ProjectFeatures`
- Standardized feature grid: icon + title + desc cards
- Props: `label?`, `title?`, `features: { icon?, title, desc }[]`, `columns? (2|3|4)`
- Style: `border border-border p-6 group hover:border-foreground/30`
- Icon box: `w-10 h-10 bg-foreground text-background`

### 1b. `ProjectStats`
- Stats bar with large serif numbers + mono labels
- Props: `stats: { value, label }[]`
- Style: `grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 mt-8 border-t border-border`

### 1c. `ProjectCTA`
- Unified CTA section (dark or light variant)
- Props: `title, description, primaryHref, primaryLabel, secondaryHref?, secondaryLabel?, variant? ("dark"|"light")`
- Dark: `bg-foreground text-background` with outline button that inverts
- Light: `bg-muted/30` with default button

### 1d. `ProjectStatusPlaceholder`
- Rich placeholder for roadmap/paused/soon pages
- Props: `status ("paused"|"roadmap"|"soon"), highlights?: { icon, title, desc }[]`
- Shows status label + message + optional highlight cards + "Notify Me" CTA

### 1e. Update `ProjectSection`
- Add `"dark"` variant: `bg-foreground text-background`
- Standardize spacing: `py-20 md:py-24` (was inconsistent `py-16 md:py-20`)

---

## Phase 2: Migrate Aitlas Sub-Pages to ProjectLayout

These pages currently use custom layouts. Wrap them with `<ProjectLayout>`:

### Pages to migrate:
1. **`/aitlas/twyt`** — Replace custom `Section`/`Container` with `ProjectSection`, replace custom dark CTA with `ProjectCTA`
2. **`/aitlas/library`** — Same pattern
3. **`/aitlas/rsrx`** — Same pattern, keep `PricingSection`
4. **`/aitlas/pay`** — Same pattern, keep terminal code snippet as signature section
5. **`/aitlas/health`** — Same pattern, keep insight cards as signature section
6. **`/aitlas/nexus`** — Wrap with `ProjectLayout`, normalize spacing, keep architecture diagram as signature

For each:
- Add `import { ProjectLayout } from "@/components/ui/ProjectLayout"`
- Wrap content in `<ProjectLayout>`
- Remove custom footer/CTA, use `ProjectCTA` instead
- Normalize section spacing to `py-20 md:py-24`

---

## Phase 3: Upgrade Stub Pages

Replace boring "This project is on the roadmap" with rich `ProjectStatusPlaceholder`:

### `/portfolio/pickstracker`
```
highlights: [
  { Trophy, "Pick Tracking", "Track predictions across NFL, NBA, football, and more." },
  { Users, "Social Competition", "Compete with friends on prediction accuracy." },
  { TrendingUp, "Analytics", "Detailed stats on your prediction history and win rate." },
]
```

### `/portfolio/opengovern`
```
highlights: [
  { MessageSquare, "Agora Forums", "Structured discussions that lead somewhere." },
  { Vote, "Community Polls", "Transparent voting with real outcomes." },
  { Building2, "Municipal Ready", "Designed for real civic engagement." },
]
```

### `/portfolio/onetomany`
```
highlights: [
  { Target, "Numeric Goals", "Create missions with real targets — 100 beers, 1000 reps." },
  { Users, "Community Validation", "Members verify progress through posts and voting." },
  { Trophy, "Achievement System", "Track milestones and celebrate together." },
]
```

### `/portfolio/linkup`
```
highlights: [
  { Video, "Short Video Profiles", "Introduce yourself in 30 seconds." },
  { Shuffle, "Random Matching", "Omegle-style professional connections." },
  { Shield, "Privacy Controls", "You choose who sees what." },
]
```

### `/portfolio/financehub`
```
highlights: [
  { TrendingUp, "18 Data Providers", "Aggregate stocks, crypto, ETFs from multiple sources." },
  { Zap, "Real-time Streaming", "WebSocket-powered live data with 85-95% cache hit rate." },
  { BarChart3, "Technical Analytics", "10+ indicators with custom alerting." },
]
```

---

## Phase 4: Normalize Aitlas Roadmap Stubs

### `/aitlas/deploy`, `/aitlas/support`, `/aitlas/guard`
These 3 pages currently have custom full-viewport heroes. Convert to:
- Use `ProjectLayout` wrapper
- Use `ProjectHero` with status badge
- Use `ProjectStatusPlaceholder` for body content (status: "roadmap" for deploy/support, "soon" for guard)
- Add 3 planned highlights per page

---

## Phase 5: Polish Built Pages

Normalize existing good pages to use shared components:

### `/portfolio/guidetours`
- Replace custom dark CTA section (lines 162-183) with `<ProjectCTA variant="dark" />`
- Normalize spacing

### `/portfolio/restauramanager`
- Replace custom dark CTA section (lines 204-220) with `<ProjectCTA variant="dark" />`
- Normalize spacing

### `/portfolio/aitlas` (main)
- Replace custom dark CTA section (lines 210-224) with `<ProjectCTA variant="dark" />`
- Use `<ProjectStats>` for the stats bar in hero

### `/portfolio/tic-tac-toe-disappear`
- Add `ScrollReveal` to features section
- Standardize card styles

### `/portfolio/qart`
- Add `ScrollReveal` to features section
- Standardize card styles

### `/portfolio/aitlas/nova`
- Replace custom dark CTA (lines 208-229) with `<ProjectCTA variant="dark" />`

---

## Visual Consistency Rules

| Element | Standard |
|---------|----------|
| Section spacing | `py-20 md:py-24` |
| Feature cards | `border border-border p-6 hover:border-foreground/30` |
| Section labels | `font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground` |
| Section titles | `font-serif text-[clamp(28px,4vw,44px)] font-semibold tracking-tight` |
| Body text | `text-[13px] text-muted-foreground leading-relaxed` |
| Icon boxes | `w-10 h-10 bg-foreground text-background` (not 12x12 or 14x14) |
| CTA buttons | `Button` component with consistent sizing |
| Layout wrapper | `ProjectLayout` for all pages |
| CTA sections | `ProjectCTA` component |
| Scroll animations | `ScrollReveal` + `StaggerChildren` on all content sections |

---

## Files Modified

1. `src/components/ui/ProjectLayout.tsx` — Add ProjectFeatures, ProjectStats, ProjectCTA, ProjectStatusPlaceholder; update ProjectSection
2. `src/app/portfolio/pickstracker/page.tsx` — Rich placeholder
3. `src/app/portfolio/opengovern/page.tsx` — Rich placeholder
4. `src/app/portfolio/onetomany/page.tsx` — Rich placeholder
5. `src/app/portfolio/linkup/page.tsx` — Rich placeholder
6. `src/app/portfolio/financehub/page.tsx` — Rich placeholder
7. `src/app/portfolio/tic-tac-toe-disappear/page.tsx` — Polish
8. `src/app/portfolio/qart/page.tsx` — Polish
9. `src/app/portfolio/guidetours/page.tsx` — Use ProjectCTA
10. `src/app/portfolio/restauramanager/page.tsx` — Use ProjectCTA
11. `src/app/portfolio/aitlas/page.tsx` — Use ProjectCTA, ProjectStats
12. `src/app/portfolio/aitlas/nova/page.tsx` — Use ProjectCTA
13. `src/app/portfolio/aitlas/nexus/page.tsx` — Wrap with ProjectLayout, use ProjectCTA
14. `src/app/portfolio/aitlas/twyt/page.tsx` — Use ProjectLayout + ProjectCTA
15. `src/app/portfolio/aitlas/library/page.tsx` — Use ProjectLayout + ProjectCTA
16. `src/app/portfolio/aitlas/rsrx/page.tsx` — Use ProjectLayout + ProjectCTA
17. `src/app/portfolio/aitlas/pay/page.tsx` — Use ProjectLayout + ProjectCTA
18. `src/app/portfolio/aitlas/health/page.tsx` — Use ProjectLayout + ProjectCTA
19. `src/app/portfolio/aitlas/deploy/page.tsx` — Use ProjectLayout + ProjectStatusPlaceholder
20. `src/app/portfolio/aitlas/support/page.tsx` — Use ProjectLayout + ProjectStatusPlaceholder
21. `src/app/portfolio/aitlas/guard/page.tsx` — Use ProjectLayout + ProjectStatusPlaceholder
22. `src/app/portfolio/aitlas/agents/page.tsx` — Use ProjectLayout + ProjectCTA

## Implementation Order
1. ProjectLayout.tsx (foundation)
2. Stub pages (biggest visual impact)
3. Aitlas sub-pages (consistency)
4. Built pages (polish)
5. Lint + build verification
