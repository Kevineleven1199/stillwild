import { FOREGROUND_BONUS_CAP_SECONDS, MAX_ABSENCE_MS } from "./config.ts";
import type { BonusPolicy } from "./config.ts";
import type { PlacedSpecimen, SettlementInput, SettlementResult } from "./types.ts";
import { maturitySeconds, speciesById } from "./catalog.ts";

export function settleInterval(input: SettlementInput): SettlementResult {
  let elapsedMs = input.nowMs - input.lastSettledAtMs;
  if (!Number.isFinite(elapsedMs) || elapsedMs < 0) elapsedMs = 0;
  if (elapsedMs > MAX_ABSENCE_MS) elapsedMs = MAX_ABSENCE_MS;

  const baselineSeconds = elapsedMs / 1000;
  const sameDay = input.lastDay === input.nowDay;
  let bonusUsed = sameDay ? Math.max(0, input.bonusUsedToday) : 0;

  let eligible = Math.max(0, input.foregroundSeconds);
  eligible = Math.min(eligible, baselineSeconds);

  let extraSeconds = 0;
  if (input.policy === "unlimited") {
    extraSeconds = eligible;
    bonusUsed += extraSeconds;
  } else if (input.policy === "capped") {
    const remaining = Math.max(0, input.dailyCapSeconds - bonusUsed);
    extraSeconds = Math.min(eligible, remaining);
    bonusUsed += extraSeconds;
  }

  return {
    baselineSeconds,
    extraSeconds,
    totalSeconds: baselineSeconds + extraSeconds,
    bonusUsedToday: bonusUsed,
    day: input.nowDay,
    lastSettledAtMs: input.nowMs,
  };
}

export function applyGrowth(
  placed: PlacedSpecimen[],
  totalSeconds: number,
): PlacedSpecimen[] {
  if (totalSeconds <= 0) return placed;
  return placed.map((spec) => {
    const species = speciesById(spec.speciesId);
    if (!species) return spec;
    const cap = maturitySeconds(species.rarity, spec.tutorial);
    const next = Math.min(cap, spec.growthSeconds + totalSeconds);
    if (next === spec.growthSeconds) return spec;
    return { ...spec, growthSeconds: next };
  });
}

export function emptySettlement(nowMs: number, day: string, bonusUsedToday: number): SettlementResult {
  return {
    baselineSeconds: 0,
    extraSeconds: 0,
    totalSeconds: 0,
    bonusUsedToday,
    day,
    lastSettledAtMs: nowMs,
  };
}

export function defaultCapSeconds(): number {
  return FOREGROUND_BONUS_CAP_SECONDS;
}

export function describePolicy(policy: BonusPolicy): string {
  if (policy === "disabled") return "All time grows at 1\u00d7. Visiting does not add a bonus.";
  if (policy === "unlimited") return "Time in the sanctuary grows at 2\u00d7 with no daily cap.";
  return "The first 30 minutes you spend here each day grow at 2\u00d7. After that, growth returns to 1\u00d7.";
}
