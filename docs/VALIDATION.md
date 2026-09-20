# Validation

## Domain tests (this tree)

`src/lib/stillwild/growth.test.ts` — 17 passing:

- 8 hours away = 28,800 baseline seconds
- 30 foreground minutes = 3,600 total seconds (2×, not 3×)
- 31 foreground minutes with a 30-minute cap = 3,660 total seconds
- Disabled / unlimited policies
- Rest/sleep not double-counted
- Idempotent settlement
- Clock rollback never negative
- Midnight resets the bonus
- Nothing grows before placement; growth saturates
- 999 / 1,000 / 10,999 steps → 0 / 1 / 10 credits
- Repeated imports do not mint rewards
- Routines do not fabricate step samples

## Web prototype vs native iOS

| Area | Web prototype | Native iOS (not in this tree) |
| --- | --- | --- |
| Steps | Self-reported routine + labeled walk-session estimate | HealthKit read-only + Today history |
| Purchases | Local Plus preview entitlement | StoreKit 2 monthly/annual |
| Audio | Original Web Audio synthesis | Same mixer idea; commissioned stems later |
| Persistence | `localStorage` | SwiftData, local-first |
| Growth while away | Wall-clock settlement on return | Same rule |

## Not claimed

No iOS device test, no App Store submission, no HealthKit authorization, no real revenue.
