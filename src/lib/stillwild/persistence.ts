import { SAVE_KEY, SAVE_VERSION } from "./config.ts";
import type { GameState } from "./types.ts";

export function createNewGame(nowMs: number): GameState {
  return {
    version: SAVE_VERSION,
    createdAtMs: nowMs,
    onboardingComplete: false,
    activeBiome: "forest",
    credits: 0,
    inventory: [
      { id: "starter-seed", speciesId: "moon-maple", kind: "tree", origin: "starter", tutorial: true },
      { id: "starter-egg", speciesId: "pearl-guppy", kind: "fish", origin: "starter", tutorial: true },
    ],
    placed: [],
    decorations: [],
    scenes: [],
    walkGoal: 6_000,
    ledgerByDay: {},
    growth: { lastSettledAtMs: nowMs, bonusPolicy: "capped", bonusUsedByDay: {} },
    audio: { music: 0.48, texture: 0.4, ambience: 0.62, muted: false, sceneLink: true, presetId: "rainy-clearing", customPresets: [] },
    rest: { active: false, startedAtMs: null, label: "declared-rest" },
    plus: { active: false, source: "none" },
    lastHiddenAtMs: null,
    pendingAwayMessage: null,
    movingId: null,
  };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function migrate(raw: unknown, nowMs: number): GameState {
  const fresh = createNewGame(nowMs);
  if (!isObject(raw)) return fresh;
  const base = { ...fresh, ...raw, version: SAVE_VERSION } as GameState;
  if (!Array.isArray(base.inventory)) base.inventory = fresh.inventory;
  if (!Array.isArray(base.placed)) base.placed = [];
  if (!Array.isArray(base.decorations)) base.decorations = [];
  if (!Array.isArray(base.scenes)) base.scenes = [];
  if (!base.ledgerByDay || typeof base.ledgerByDay !== "object") base.ledgerByDay = {};
  if (!base.growth || typeof base.growth !== "object") base.growth = fresh.growth;
  if (!base.audio || typeof base.audio !== "object") base.audio = fresh.audio;
  if (!base.rest || typeof base.rest !== "object") base.rest = fresh.rest;
  if (!base.plus || typeof base.plus !== "object") base.plus = fresh.plus;
  if (typeof base.walkGoal !== "number" || base.walkGoal < 1_000) base.walkGoal = 6_000;
  if (!base.growth.lastSettledAtMs) base.growth.lastSettledAtMs = nowMs;
  return base;
}

export function loadSave(nowMs: number): GameState {
  if (typeof window === "undefined") return createNewGame(nowMs);
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) return createNewGame(nowMs);
    return migrate(JSON.parse(raw), nowMs);
  } catch {
    return createNewGame(nowMs);
  }
}

export function writeSave(state: GameState): void {
  if (typeof window === "undefined") return;
  try {
    const prev = window.localStorage.getItem(SAVE_KEY);
    if (prev) window.localStorage.setItem(`${SAVE_KEY}.bak`, prev);
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch {
    /* keep in-memory world */
  }
}

export function clearSave(): void {
  if (typeof window === "undefined") return;
  try { window.localStorage.removeItem(SAVE_KEY); } catch { /* ignore */ }
}
