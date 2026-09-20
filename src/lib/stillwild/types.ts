import type { BonusPolicy } from "./config.ts";

export type Biome = "forest" | "ocean";
export type Rarity = "common" | "uncommon" | "rare";
export type Kind = "tree" | "fish";
export type TabId = "sanctuary" | "today" | "sound" | "collection";

export interface Species {
  id: string;
  kind: Kind;
  name: string;
  rarity: Rarity;
  biome: Biome;
  blurb: string;
  premium?: boolean;
}

export interface DecorationKind {
  id: string;
  name: string;
  biome: Biome | "both";
  blurb: string;
  premium?: boolean;
}

export interface InventoryItem {
  id: string;
  speciesId: string;
  kind: Kind;
  origin: "starter" | "walk" | "routine";
  tutorial?: boolean;
}

export interface PlacedSpecimen {
  id: string;
  speciesId: string;
  kind: Kind;
  biome: Biome;
  x: number;
  y: number;
  growthSeconds: number;
  placedAtMs: number;
  tutorial?: boolean;
  origin: "starter" | "walk" | "routine";
  premiumCosmetic?: boolean;
}

export interface PlacedDecoration {
  id: string;
  decorationId: string;
  biome: Biome;
  x: number;
  y: number;
  premium?: boolean;
}

export interface MixPreset {
  id: string;
  name: string;
  music: number;
  texture: number;
  ambience: number;
  builtin?: boolean;
}

export interface SavedScene {
  id: string;
  name: string;
  biome: Biome;
  placed: PlacedSpecimen[];
  decorations: PlacedDecoration[];
  savedAtMs: number;
}

export interface DayLedger {
  steps: number;
  stepCredits: number;
  routineCredits: number;
  routineIds: string[];
  creditedStepThreshold: number;
  source: "self-reported" | "session-estimate" | "none";
}

export interface GameState {
  version: number;
  createdAtMs: number;
  onboardingComplete: boolean;
  activeBiome: Biome;
  credits: number;
  inventory: InventoryItem[];
  placed: PlacedSpecimen[];
  decorations: PlacedDecoration[];
  scenes: SavedScene[];
  walkGoal: number;
  ledgerByDay: Record<string, DayLedger>;
  growth: {
    lastSettledAtMs: number;
    bonusPolicy: BonusPolicy;
    bonusUsedByDay: Record<string, number>;
  };
  audio: {
    music: number;
    texture: number;
    ambience: number;
    muted: boolean;
    sceneLink: boolean;
    presetId: string;
    customPresets: MixPreset[];
  };
  rest: {
    active: boolean;
    startedAtMs: number | null;
    label: "declared-rest";
  };
  plus: {
    active: boolean;
    source: "none" | "preview";
  };
  lastHiddenAtMs: number | null;
  pendingAwayMessage: string | null;
  movingId: string | null;
}

export interface SettlementInput {
  lastSettledAtMs: number;
  nowMs: number;
  foregroundSeconds: number;
  bonusUsedToday: number;
  lastDay: string;
  nowDay: string;
  policy: BonusPolicy;
  dailyCapSeconds: number;
}

export interface SettlementResult {
  baselineSeconds: number;
  extraSeconds: number;
  totalSeconds: number;
  bonusUsedToday: number;
  day: string;
  lastSettledAtMs: number;
}
