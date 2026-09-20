# Stillwild

**Walk to discover life. Rest to help it grow.**

Stillwild is a personal living sanctuary. Walking (or a self-reported routine) discovers tree seeds and fish eggs. Placed life grows as real time passes — including while you are away. Forest and ocean are yours to arrange, with an original layered ambient mix.

Nothing dies. Nothing is taken from you for resting. There are no ads, no streak punishments, and no paid hatching.

> The name is a placeholder and has not been legally cleared.

## This repository

This is the **playable web prototype** of the native iPhone app specified in the product brief (SwiftUI, SpriteKit, HealthKit, StoreKit 2). Use it to test whether people voluntarily return to a sanctuary they made.

Native iOS is not in this tree yet. On the web:

- Apple Health is unavailable — Today uses a clearly labeled self-reported routine and an optional walk-session estimate.
- Purchases are a local “Plus preview” entitlement, not StoreKit.
- Audio is original, synthesized in the browser (no third-party recordings).

## Product loop

1. Choose forest or ocean. A starter seed or egg is placed immediately and transforms within about a minute.
2. Note a walk or start a session. Discovery credits appear (1 per 1,000 steps, max 10/day).
3. Spend a credit on a seed **or** an egg. Place it. It grows in real time.
4. Open Sound, save a mix, optionally start Rest Mode with a fade.
5. Come back later: “Your sanctuary grew while you were away.”

## Run locally

The live prototype runs in Grok. The source below is the domain engine, React UI, and tests. Domain tests:

```bash
node --experimental-strip-types --test src/lib/stillwild/growth.test.ts
```

They cover 8h away = 28,800s, 30m foreground = 3,600s total, 31m capped = 3,660s, and 999/1000/10999 steps.

## Documents

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/ECONOMY.md](docs/ECONOMY.md)
- [docs/PRIVACY.md](docs/PRIVACY.md)
- [docs/VALIDATION.md](docs/VALIDATION.md)
- [ASSET_PROVENANCE.md](ASSET_PROVENANCE.md)

## License

Prototype source for private evaluation. Do not ship App Store binaries from this tree without replacing preview entitlements, adding HealthKit, and completing a rights audit.
