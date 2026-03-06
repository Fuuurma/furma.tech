# Furma.tech - Documentation Index

**Last Updated:** March 6, 2026  
**Status:** ✅ Production Ready

---

## 📚 Core Documentation

### Business & Strategy

| Document | Location | Purpose |
|----------|----------|---------|
| **BUSINESS_PLAN.md** | `/docs/business/BUSINESS_PLAN.md` | Complete business plan + financials |
| **FURMA_MASTER.md** | `/FURMA_MASTER.md` | Business + tech blueprint |
| **AITLAS_ALIGNMENT_PLAN.md** | `/docs/AITLAS_ALIGNMENT_PLAN.md` | f.library & f.rsrx adaptation |

### Technical Implementation

| Document | Location | Purpose |
|----------|----------|---------|
| **AGENTS.md** | `/furma.tech/AGENTS.md` | AI coding guidelines (REQUIRED for all repos) |
| **README.md** | `/furma.tech/README.md` | Project overview |
| **GITHUB_CONFIG.md** | `/furma.tech/docs/GITHUB_CONFIG.md` | GitHub PAT & repo management |

---

## 🏗️ furma-core-template

**GitHub:** https://github.com/Fuuurma/furma-core-template (PRIVATE)

**Purpose:** Base template for ALL Furma.tech products

| File | Purpose |
|------|---------|
| `AGENTS.md` | AI coding guidelines |
| `prisma/schema.prisma` | Database schema (User, ApiKey, TaskQueue) |
| `lib/encryption.ts` | AES-256-GCM BYOK encryption |
| `lib/logger.ts` | Pino structured logging |
| `lib/rate-limit.ts` | Upstash rate limiting |
| `lib/cache.ts` | LRU cache with TTL |
| `lib/utils.ts` | Common utilities |
| `lib/constants.ts` | Centralized constants |
| `worker.ts` | f.loop Ralph engine |
| `scripts/setup.ts` | One-time setup (generates keys) |
| `README.md` | Setup instructions |
| `SETUP_COMPLETE.md` | Production verification |

---

## 🎯 Aitlas Ecosystem

### 3 Core Pillars

| Pillar | Repo | Status |
|--------|------|--------|
| **Nexus** (Hub) | TBD | 🟡 Planned |
| **Agents** (Store) | TBD | 🟡 Planned |
| **Actions** (f.xyz) | See below | 🟢 In Progress |

### Actions (f.xyz Suite)

| Action | Repo | Status | GitHub |
|--------|------|--------|--------|
| **f.library** | `/PROJECTS/f.library` | 🟢 Adapted | github.com/Fuuurma/library |
| **f.rsrx** | `/PROJECTS/f.rsrx` | 🟡 Needs adaptation | github.com/Fuuurma/f.rsrx |
| **f.twyt** | `/PROJECTS/f.twyt` | 🟢 Production ready | github.com/Fuuurma/f.twyt |
| **f.decloy** | `/PROJECTS/f.decloy` | 🟡 Roadmap | github.com/Fuuurma/f.decloy |
| **f.guard** | TBD | ⏳ Planned | - |
| **f.support** | TBD | ⏳ Planned | - |
| **f.memory** | TBD | ⏳ Planned | - |
| **f.loop** | Worker in each repo | 🟢 Implemented | - |

---

## 💰 Credit System

**The Paywall:** Free chat (BYOK) + Paid actions (compute credits)

| Action | Credit Cost | USD Value |
|--------|-------------|-----------|
| f.library search | 1 | ~$0.01 |
| f.library ingest | 2 | ~$0.02 |
| f.rsrx search | 2 | ~$0.02 |
| f.rsrx synthesize | 5 | ~$0.05 |
| Ralph loops | 10/hour | ~$0.10/hr |

**Credit Packages:**
- $10 = 1,000 credits
- $25 = 3,000 credits (+20% bonus)
- $50 = 7,500 credits (+50% bonus)

---

## 🔐 Security Standards

### BYOK Encryption
- **Algorithm:** AES-256-GCM
- **Key Storage:** Environment variable (BYOK_ENCRYPTION_KEY)
- **IV:** Unique per encryption (randomBytes)
- **Auth Tag:** Included for integrity verification

### Multi-Tenancy
- **Rule:** userId in EVERY Prisma query
- **Prevention:** IDOR attacks prevented
- **Isolation:** Each user's data fully isolated

### Rate Limiting
- **Provider:** Upstash Redis
- **Limits:**
  - API: 100 req/min
  - Auth: 5 req/min
  - Search: 30 req/min
  - MCP: 50 req/min

---

## 🚀 Deployment Architecture

### UI Layer
- **Platform:** Vercel
- **Framework:** Next.js 16
- **Timeout:** 60s max

### Worker Layer (f.loop)
- **Platform:** Hetzner or Railway
- **Runtime:** Bun
- **Timeout:** Unlimited (24/7 execution)

### Database
- **Provider:** Neon or Supabase
- **Type:** PostgreSQL + pgvector
- **Features:** Serverless, scale-to-zero

---

## 📊 Current Status (March 6, 2026)

### Completed ✅
- [x] furma-core-template created & pushed
- [x] GitHub PAT stored & tested
- [x] FURMA_MASTER.md written
- [x] f.library adapted to Aitlas model
- [x] BYOK encryption implemented
- [x] f.loop worker pattern established
- [x] Credit system designed

### In Progress 🟡
- [ ] f.rsrx adaptation
- [ ] Nexus MVP
- [ ] Agents Store
- [ ] MCP integration testing

### Planned ⏳
- [ ] f.guard (AI code reviewer)
- [ ] f.support (autonomous helpdesk)
- [ ] f.memory (vector context)
- [ ] Landing page (aitlas.com)
- [ ] God-Mode Demo video

---

## 🔗 Quick Links

| Resource | URL |
|----------|-----|
| **furma-core-template** | https://github.com/Fuuurma/furma-core-template |
| **f.library** | https://github.com/Fuuurma/library |
| **f.twyt** | https://github.com/Fuuurma/f.twyt |
| **f.rsrx** | https://github.com/Fuuurma/f.rsrx |
| **f.decloy** | https://github.com/Fuuurma/f.decloy |

---

## 📝 How to Use This Documentation

### For New Products
1. Clone furma-core-template
2. Read AGENTS.md (AI coding guidelines)
3. Follow README.md setup
4. Extend schema with product-specific models

### For Contributors
1. Read FURMA_MASTER.md (business context)
2. Follow AGENTS.md (coding standards)
3. Use lib/ utilities (don't reinvent)

### For AI Assistants
1. AGENTS.md is THE source of truth
2. Always output schema first
3. Use Furma DNA utilities
4. userId in EVERY query

---

**Maintained by:** Furma.tech Engineering  
**Last Review:** March 6, 2026  
**Next Review:** March 13, 2026
