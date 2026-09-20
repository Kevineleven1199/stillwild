# Stillwild

**Walk to discover life. Rest to help it grow.**

Public repo: [Kevineleven1199/stillwild](https://github.com/Kevineleven1199/stillwild)

Stillwild is a personal living sanctuary. Walking (or a self-reported routine) discovers tree seeds and fish eggs. Placed life grows as real time passes — including while you are away. Forest and ocean are yours to arrange, with an original layered ambient mix.

Nothing dies. Nothing is taken from you for resting. There are no ads, no streak punishments, and no paid hatching.

> The name is a placeholder and has not been legally cleared.

## What this is

A **web prototype** of the native iPhone app in the product brief (SwiftUI, SpriteKit, HealthKit, StoreKit 2). Native iOS cannot be compiled here. The playable app is the live preview: forest/ocean, growth while away, discovery credits, sound mixer, Rest Mode.

This repository holds the portable core you can take into Xcode later:

- Pure growth/reward engine (`src/lib/stillwild/growth.ts`, `rewards.ts`) with the spec’s tests (8h away = 28,800s; 30m foreground = 3,600s total; 31m capped = 3,660s; 999/1000/10999 steps)
- Versioned economy, catalog of six trees and six fish, local save format
- Architecture, economy, privacy, asset-provenance, and validation notes

On the web, Apple Health is unavailable. Today uses a labeled self-reported routine and an optional walk-session estimate. Purchases are a local Plus preview, not StoreKit. Audio is original Web Audio synthesis.

## Product loop

1. Choose forest or ocean. A starter seed or egg is placed immediately and transforms within about a minute.
2. Note a walk or start a session. Discovery credits appear (1 per 1,000 steps, max 10/day).
3. Spend a credit on a seed **or** an egg. Place it. It grows in real time.
4. Open Sound, save a mix, optionally start Rest Mode with a fade.
5. Come back later: “Your sanctuary grew while you were away.”

## Domain tests

```bash
node --experimental-strip-types --test src/lib/stillwild/growth.test.ts
```

## Documents

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/ECONOMY.md](docs/ECONOMY.md)
- [docs/PRIVACY.md](docs/PRIVACY.md)
- [docs/VALIDATION.md](docs/VALIDATION.md)
- [ASSET_PROVENANCE.md](ASSET_PROVENANCE.md)

## License

Prototype source for private evaluation. Do not ship App Store binaries from this tree without replacing preview entitlements, adding HealthKit, and completing a rights audit.
