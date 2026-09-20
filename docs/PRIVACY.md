# Privacy

Local-first. No account. No backend. No advertising.

- Save data lives in the browser (`localStorage` key `stillwild.save.v1`).
- The web prototype does not read HealthKit, motion, GPS, or microphone input beyond Web Audio playback.
- Self-reported routines and estimated walk sessions stay on device.
- Share/export produces a PNG of the sanctuary artwork. Steps, sleep, timestamps, and reward provenance are omitted.
- Rest Mode is declared rest unless a future iOS build imports sleep records. Missing sleep never reduces growth. Sleep is never double-counted on top of baseline elapsed time.
- Native iOS must keep health totals, sleep, timestamps, and reward provenance out of analytics, crash logs, CloudKit, and ads. Apple restricts HealthKit to health/fitness use; do not request it only to unlock a game, and do not store personal health information in iCloud.
