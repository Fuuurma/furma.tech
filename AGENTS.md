# AGENTS.md – AI Coding Assistant Guidelines

**Purpose:** This file instructs AI coding tools (Cursor, Claude Code, GitHub Copilot) on Furma.tech development standards.

---

## 0. Aitlas Ecosystem Architecture

This project is part of the **Aitlas Ecosystem** - a standardized polyrepo architecture.
- **Rule Zero:** DO NOT attempt to combine this repository with other Furma.tech products. Maintain strict isolation.
- **Communication:** All cross-application communication must occur exclusively via the **Model Context Protocol (MCP)**.
- **Background Tasks:** Next.js API routes have strict timeouts. ANY task taking longer than 15 seconds MUST be offloaded to `f.loop`.

---

## 1. Core Directives

### Strict Types
- Use TypeScript with `strict: true` in `tsconfig.json`
- **NEVER** use `any` type. Use `unknown` with proper type guards instead.
- Define interfaces for all API boundaries.

### Validation
- All incoming data (POST/PUT endpoints, form inputs) **MUST** be validated using `zod`.
- Import schemas from `@/lib/schemas`.
- Return detailed validation errors to clients.

### API Responses
- Never return raw objects.
- Use proper Next.js `NextResponse.json()` with appropriate status codes.
- Return `{ error: string, details?: unknown }` for error responses.

### Logging
- Use the Pino logger from `@/lib/logger`.
- Never use `console.log` in production code.
- Log structured data: `logInfo("Action", { userId, itemId })`.

### Rate Limiting
- All `/api/` routes must implement rate limiting.
- Use `@/lib/rate-limit` utilities.
- Handle 429 responses gracefully in UI.

---

## 2. Project Structure

```
furma.tech/
├── app/                    # Next.js App Router
├── components/             # React components
│   └── ui/                # shadcn/ui components
├── lib/                   # Core utilities (SINGLE SOURCE OF TRUTH)
│   ├── schemas.ts        # Zod validation schemas
│   ├── rate-limit.ts     # Rate limiting
│   ├── logger.ts         # Logging
│   ├── cache.ts          # Caching
│   └── utils.ts          # General utilities
├── __tests__/             # Unit tests (Vitest)
└── public/                # Static assets
```

---

## 3. Naming Conventions

### Files
- **Components:** PascalCase (`HeroSection.tsx`, `ProductCard.tsx`)
- **Utilities:** camelCase (`formatDate.ts`, `validateEmail.ts`)
- **Tests:** `.test.ts` or `.spec.ts` suffix
- **Config:** camelCase (`vitest.config.ts`, `next.config.ts`)

### Variables & Functions
- **Variables:** camelCase (`isLoading`, `userData`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`, `API_BASE_URL`)
- **Types/Interfaces:** PascalCase (`UserProfile`, `ApiResponse`)
- **React Components:** PascalCase

---

## 4. Component Guidelines

### Functional Components
- Use `"use client"` directive only when needed (event handlers, hooks, state).
- Prefer server components by default.
- Use proper TypeScript types for props.

### shadcn/ui
- All UI components come from shadcn/ui.
- Do NOT use raw Radix UI or Headless UI unless necessary.
- Customize via Tailwind classes, not custom CSS.

### Tailwind CSS
- Use utility classes from Tailwind v4.
- Keep consistent color palette: `zinc` for grays.
- Use `fade-in` and animation components for entrance effects.

---

## 5. API Route Standards

### Request Handling
```typescript
import { NextResponse } from "next/server";
import { mySchema } from "@/lib/schemas";
import { logInfo, logError } from "@/lib/logger";
import { checkRateLimit, myRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  // 1. Rate limiting
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const rateCheck = await checkRateLimit(ip, myRateLimit);
  if (!rateCheck.success) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  // 2. Parse & validate
  const body = await request.json();
  const result = mySchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.issues },
      { status: 400 }
    );
  }

  // 3. Process
  logInfo("Action performed", { data: result.data });

  // 4. Respond
  return NextResponse.json({ success: true, data: result.data });
}
```

---

## 6. Testing Standards

### Unit Tests
- Use **Vitest** for testing framework.
- Place tests in `__tests__/` directory.
- Test business logic, schemas, utilities, and components.

### Test Structure
```typescript
import { describe, it, expect } from "vitest";
import { myFunction } from "../lib/my-module";

describe("myFunction", () => {
  it("does something specific", () => {
    expect(myFunction(input)).toBe(expectedOutput);
  });
});
```

### Running Tests
```bash
pnpm test        # Run all tests
pnpm test:watch # Watch mode
```

---

## 7. Security Guidelines

### BYOK (Bring Your Own Key)
- **Zero-Burn Principle:** Users provide their own LLM API keys (OpenAI, Anthropic, DeepSeek).
- **Key Storage:** API keys are NEVER stored in plain text. Use AES-256-GCM encryption from `@/lib/encryption.ts`.
- **Encryption Example:**
```typescript
import { encryptApiKey, decryptApiKey } from "@/lib/encryption";

const { encrypted, iv, authTag, salt } = encryptApiKey(apiKey);
// Store encrypted data in database

// To use:
const key = decryptApiKey(encryptedData);
// Use for LLM call → immediately garbage-collect
```

### Never Expose
- API keys, tokens, secrets in client-side code
- Database connection strings in frontend
- Internal implementation details

### Validate & Sanitize
- All user input must be validated with Zod
- Escape output when rendering user content
- Use parameterized queries (Prisma handles this)

### Authentication
- Use NextAuth for auth requirements
- Never implement custom auth unless absolutely necessary

---

## 8. Database Schema (Prisma)

This project uses Prisma with the Furma DNA schema. Core models:
- **User** - Furma ID SSO + computeCredits (THE PAYWALL)
- **ApiKey** - BYOK API keys (AES-256 encrypted)
- **Agent** - Agent Store personas
- **Skill** - Agent skills with MCP targets
- **TaskQueue** - f.loop async tasks

**Multi-Tenancy Isolation:** Every Prisma query MUST include `userId` in the `where` clause.
- *Correct:* `prisma.document.findMany({ where: { userId: session?.user?.id, ... } })`
- *Incorrect:* `prisma.document.findMany({ where: { ... } })`

---

## 9. Performance Guidelines

### Server Components
- Use server components by default
- Pass only serialized data to client components

### Caching
- Use `lib/cache.ts` for in-memory caching
- Implement proper cache invalidation

### Images
- Use `next/image` for optimization
- Specify dimensions and formats

---

## 9. Error Handling

### Try-Catch
```typescript
try {
  // operation
} catch (error) {
  logError("Operation failed", error);
  return NextResponse.json(
    { error: "Operation failed" },
    { status: 500 }
  );
}
```

### Custom Errors
- Create custom error classes for domain-specific errors
- Use error codes for client handling

---

## 10. Git Conventions

### Commits
- Use clear, concise commit messages
- Start with verb: "Add feature", "Fix bug", "Update docs"

### Branch Naming
- `feature/` for new features
- `fix/` for bug fixes
- `refactor/` for code improvements

---

## 11. Before Committing

Run these commands:

```bash
pnpm lint      # Check for lint errors
pnpm test      # Run tests
pnpm build     # Verify build passes
```

**NEVER** commit code that fails any of these checks.

---

## 12. Dependencies

### Adding Dependencies
- Check if functionality already exists in `@/lib/`
- Use well-maintained, type-safe packages
- Add proper types (`@types/*`) for TypeScript

### Prohibited
- `any` type usage
- `console.log` (use logger instead)
- Raw SQL (use Prisma)
- Inline styles (use Tailwind)

---

## Summary

When working on Furma.tech code:
1. ✅ Use TypeScript strictly
2. ✅ Validate with Zod
3. ✅ Log with Pino
4. ✅ Rate limit APIs
5. ✅ Test with Vitest
6. ✅ Use shadcn/ui components
7. ✅ Follow naming conventions
8. ✅ Run lint/test/build before commit
