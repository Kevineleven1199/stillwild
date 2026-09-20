import { DAILY_STEP_CREDIT_CAP, ROUTINE_MILESTONES, STEPS_PER_CREDIT } from "./config.ts";
import type { DayLedger } from "./types.ts";

export function emptyLedger(): DayLedger {
  return {
    steps: 0,
    stepCredits: 0,
    routineCredits: 0,
    routineIds: [],
    creditedStepThreshold: 0,
    source: "none",
  };
}

export function creditsFromSteps(params: {
  stepsToday: number;
  creditedThreshold: number;
  dailyCap?: number;
  stepsPerCredit?: number;
}): { newCredits: number; newThreshold: number; totalStepCredits: number } {
  const cap = params.dailyCap ?? DAILY_STEP_CREDIT_CAP;
  const per = params.stepsPerCredit ?? STEPS_PER_CREDIT;
  const steps = Math.max(0, Math.floor(params.stepsToday));
  const maxCreditableSteps = cap * per;
  const bounded = Math.min(steps, maxCreditableSteps);
  const totalStepCredits = Math.floor(bounded / per);
  const already = Math.floor(Math.max(0, params.creditedThreshold) / per);
  const newCredits = Math.max(0, totalStepCredits - already);
  return {
    newCredits,
    newThreshold: totalStepCredits * per,
    totalStepCredits,
  };
}

export function remainingDailyCredits(ledger: DayLedger, cap = DAILY_STEP_CREDIT_CAP): number {
  return Math.max(0, cap - ledger.stepCredits - ledger.routineCredits);
}

export function applyRoutine(
  ledger: DayLedger,
  milestoneId: string,
  cap = DAILY_STEP_CREDIT_CAP,
): { ledger: DayLedger; granted: number } | { error: string } {
  const milestone = ROUTINE_MILESTONES.find((m) => m.id === milestoneId);
  if (!milestone) return { error: "Unknown routine." };
  if (ledger.routineIds.includes(milestoneId)) {
    return { error: "Already noted for today." };
  }
  const remaining = remainingDailyCredits(ledger, cap);
  if (remaining <= 0) {
    return { error: "Today’s discoveries are already full. The world will still be here tomorrow." };
  }
  const granted = Math.min(milestone.credits, remaining);
  return {
    granted,
    ledger: {
      ...ledger,
      routineCredits: ledger.routineCredits + granted,
      routineIds: [...ledger.routineIds, milestoneId],
      source: "self-reported",
    },
  };
}

export function applySelfReportedSteps(
  ledger: DayLedger,
  steps: number,
): { ledger: DayLedger; granted: number } {
  const nextSteps = Math.max(ledger.steps, Math.floor(steps));
  const result = creditsFromSteps({
    stepsToday: nextSteps,
    creditedThreshold: ledger.creditedStepThreshold,
  });
  const remaining = remainingDailyCredits(ledger);
  const granted = Math.min(result.newCredits, remaining);
  return {
    granted,
    ledger: {
      ...ledger,
      steps: nextSteps,
      stepCredits: ledger.stepCredits + granted,
      creditedStepThreshold: result.newThreshold,
      source: ledger.source === "none" ? "session-estimate" : ledger.source,
    },
  };
}
