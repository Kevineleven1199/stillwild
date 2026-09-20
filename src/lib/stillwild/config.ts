export const APP_NAME = "Stillwild";
export const APP_TAGLINE = "Walk to discover life. Rest to help it grow.";
export const SAVE_VERSION = 1;
export const SAVE_KEY = "stillwild.save.v1";

export const STEPS_PER_CREDIT = 1_000;
export const DAILY_STEP_CREDIT_CAP = 10;
export const DEFAULT_WALK_GOAL = 6_000;
export const FOREGROUND_BONUS_CAP_SECONDS = 30 * 60;
export const MAX_ABSENCE_MS = 30 * 24 * 60 * 60 * 1000;

export const GROWTH_SECONDS = {
  tutorial: 75,
  common: 6 * 60 * 60,
  uncommon: 24 * 60 * 60,
  rare: 48 * 60 * 60,
} as const;

export const STARTER_SEED_SPECIES = "moon-maple";
export const STARTER_EGG_SPECIES = "pearl-guppy";

export type BonusPolicy = "capped" | "unlimited" | "disabled";
export const DEFAULT_BONUS_POLICY: BonusPolicy = "capped";

export const ROUTINE_MILESTONES = [
  {
    id: "short-walk",
    label: "I took a short walk",
    detail: "A gentle outing, in your own words.",
    credits: 2,
  },
  {
    id: "outside",
    label: "I spent time outside",
    detail: "A porch, a garden, a pause of air.",
    credits: 1,
  },
  {
    id: "unwound",
    label: "I made space to unwind",
    detail: "Rest counts. No proof required.",
    credits: 1,
  },
] as const;
