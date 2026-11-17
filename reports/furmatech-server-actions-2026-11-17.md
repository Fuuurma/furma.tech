# FURMATECH-SERVER-ACTIONS — chore(contact): remove dead waitlist/booking action and schemas

Date: 2026-11-17 · Slice: chore(contact) · Landed: 9a84fd1 on origin/main

## What was removed

- `src/lib/server-actions.ts`: `submitWaitlistSignup` (zero callers — only
  `submitContactForm` is imported, by `PlasticHome.tsx` and `V2Contact.tsx`),
  the `waitlistSchema` import, and the file-header "contact + waitlist" wording.
- `src/lib/schemas.ts`: `waitlistSchema` + `WaitlistData`, `bookingSchema` +
  `BookingData` (stale product enums), and the unused `ContactFormData`
  inferred type. `contactFormSchema`, `ValidationResult` and `validateForm`
  are unchanged — the contact form contract is preserved.

Net: 2 files, +2/−103.

## What was deliberately kept

- `contact-provider.ts` still types `SubmissionChannel = "contact" |
  "waitlist"` and the optional `interest` field: it is the tested provider
  boundary (`tests/contact-provider.test.ts` exercises the waitlist channel)
  and out of this slice's named deletions.
- `contactScopes` in `server-actions.ts` stays channel-parameterized: the
  dual-scope wiring is source-pinned by `tests/rate-limit-scopes.test.ts`
  (`${channel}:${email}` / `${channel}:caller:${caller}`), and the waitlist
  rate constants remain referenced by that shared helper.
- `ARCHITECTURE.md` still describes the module as "contact/waitlist"; doc
  sweep is out of scope for this chore.

## Verification

- `pnpm exec tsc --noEmit` — clean (exit 0, no output).
- `pnpm lint` — 0 errors, 1 pre-existing warning (`src/lib/metadata.ts`
  unused `_params`, untouched by this change).
- `pnpm test` — 90/90 pass on the rebased tree (`node --test "tests/*.test.ts"`),
  including the `rate-limit-scopes` source pin and the new
  `portfolio-parity` suite landed at dee86e7.
- `grep -rn "submitWaitlistSignup|waitlistSchema|bookingSchema|ContactFormData|
  WaitlistData|BookingData" src/ tests/ scripts/` — zero matches.
