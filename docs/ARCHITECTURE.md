# Architecture

Stillwild is a local-first sanctuary. This repository is the **web prototype** of the product specified for native iPhone (SwiftUI, SpriteKit, SwiftData, HealthKit, StoreKit 2). The growth, reward, and economy rules live in a pure TypeScript domain layer so they can be ported without UI.

## Layers

- **Domain** (`src/lib/stillwild/growth.ts`, `rewards.ts`, `catalog.ts`, `config.ts`) — no DOM, no storage. Injectable timestamps. Covered by `growth.test.ts`.
- **Persistence** (`persistence.ts`) — versioned JSON in `localStorage`, backup of the previous blob, migrate-on-load.
- **Session** (`store.ts`) — Zustand. Foreground time is accumulated only while `document.visibilityState === "visible"` via `requestAnimationFrame`. Hidden gaps receive baseline 1× growth only.
- **Presentation** — React + canvas. Four areas: Sanctuary, Today, Sound, Collection.
- **Audio** — Web Audio graph with three buses. Created/resumed on a user gesture. Background listening is real playback, never a silent keep-alive.

## Growth

`total = baselineElapsed + extraForeground`

- Baseline: wall-clock elapsed since last settlement, clamped to 30 days, never negative.
- Extra: measured visible time, plus one extra 1× (not 2× on top of a 2×). Default policy caps extra at 30 minutes per local game day.
- Policies: `capped` (launch default), `unlimited`, `disabled`.
- Unplanted inventory does not grow. Placed specimens grow in parallel and saturate at maturity.
- Unexpected termination: unconfirmed time is baseline only, because extra is only taken from rAF-visible seconds that were actually settled.

## Health (web vs iOS)

The web prototype does **not** read HealthKit or Core Motion. Today uses a self-reported routine and an explicitly labeled walk-session estimate. Native iOS should replace that with read-only HealthKit aggregation, a per-day credited-threshold ledger, and no write access.

## Out of v1

Backend, login, ads, GPS, live AI music, multiplayer, Watch, Android, purchased mystery eggs, dying creatures, streak punishments.
