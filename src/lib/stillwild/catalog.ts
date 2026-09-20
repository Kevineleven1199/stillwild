import { GROWTH_SECONDS } from "./config.ts";
import type { DecorationKind, Rarity, Species } from "./types.ts";

export const SPECIES: Species[] = [
  { id: "moon-maple", kind: "tree", name: "Moon Maple", rarity: "common", biome: "forest", blurb: "A rounded canopy that keeps a pale underside, even at noon." },
  { id: "silver-birch", kind: "tree", name: "Silver Birch", rarity: "common", biome: "forest", blurb: "Tall, quiet, and light enough to read the sky through." },
  { id: "cedar-whisper", kind: "tree", name: "Cedar Whisper", rarity: "uncommon", biome: "forest", blurb: "Layered boughs that hold still air underneath." },
  { id: "lantern-pine", kind: "tree", name: "Lantern Pine", rarity: "uncommon", biome: "forest", blurb: "A dense pine whose mature needles catch a warm inner light." },
  { id: "night-willow", kind: "tree", name: "Night Willow", rarity: "rare", biome: "forest", blurb: "Long trailing limbs, like rain paused in place." },
  { id: "star-oak", kind: "tree", name: "Star Oak", rarity: "rare", biome: "forest", blurb: "A broad oak with gaps in the crown that look like a small sky." },
  { id: "pearl-guppy", kind: "fish", name: "Pearl Guppy", rarity: "common", biome: "ocean", blurb: "A small, round companion that keeps to the shallows." },
  { id: "drift-minnow", kind: "fish", name: "Drift Minnow", rarity: "common", biome: "ocean", blurb: "Slender and unhurried, always a little ahead of the current." },
  { id: "coral-tetra", kind: "fish", name: "Coral Tetra", rarity: "uncommon", biome: "ocean", blurb: "A warm-toned school fish that prefers the reef shelf." },
  { id: "silk-angel", kind: "fish", name: "Silk Angelfish", rarity: "uncommon", biome: "ocean", blurb: "Triangular fins that move as if they were fabric." },
  { id: "moon-koi", kind: "fish", name: "Moon Koi", rarity: "rare", biome: "ocean", blurb: "A larger koi with a quiet, moonlit pattern." },
  { id: "abyss-lantern", kind: "fish", name: "Abyss Lantern", rarity: "rare", biome: "ocean", blurb: "Elongated, with a restrained glow that never shouts." },
];

export const DECORATIONS: DecorationKind[] = [
  { id: "river-stone", name: "River Stone", biome: "both", blurb: "A smooth stone for a path edge or a still pool." },
  { id: "paper-lantern", name: "Paper Lantern", biome: "forest", blurb: "A small light for a clearing, never a spotlight." },
  { id: "reed-cluster", name: "Reed Cluster", biome: "forest", blurb: "A handful of reeds to soften a bank." },
  { id: "coral-fan", name: "Coral Fan", biome: "ocean", blurb: "A pale fan that belongs on the reef shelf." },
  { id: "moon-shell", name: "Moon Shell", biome: "ocean", blurb: "A spiral shell that keeps to the sand." },
  { id: "moss-path", name: "Moss Path", biome: "forest", blurb: "A short path of moss and packed earth." },
];

export const BUILTIN_PRESETS = [
  { id: "rainy-clearing", name: "Rainy Clearing", music: 0.35, texture: 0.28, ambience: 0.82 },
  { id: "quiet-reef", name: "Quiet Reef", music: 0.42, texture: 0.4, ambience: 0.7 },
  { id: "moonlit-water", name: "Moonlit Water", music: 0.55, texture: 0.72, ambience: 0.38 },
] as const;

export function speciesById(id: string): Species | undefined {
  return SPECIES.find((s) => s.id === id);
}

export function decorationById(id: string): DecorationKind | undefined {
  return DECORATIONS.find((d) => d.id === id);
}

export function maturitySeconds(rarity: Rarity, tutorial?: boolean): number {
  if (tutorial) return GROWTH_SECONDS.tutorial;
  return GROWTH_SECONDS[rarity];
}

export function growthProgress(growthSeconds: number, rarity: Rarity, tutorial?: boolean): number {
  const cap = maturitySeconds(rarity, tutorial);
  if (cap <= 0) return 1;
  return Math.max(0, Math.min(1, growthSeconds / cap));
}

export function growthStage(progress: number): 0 | 1 | 2 {
  if (progress >= 0.72) return 2;
  if (progress >= 0.22) return 1;
  return 0;
}

export const FREE_DISCOVER_POOL = {
  tree: SPECIES.filter((s) => s.kind === "tree" && !s.premium),
  fish: SPECIES.filter((s) => s.kind === "fish" && !s.premium),
};

export function weightedPick<T extends { rarity: Rarity }>(list: T[], seed: number): T {
  const commons = list.filter((s) => s.rarity === "common");
  const uncommons = list.filter((s) => s.rarity === "uncommon");
  const rares = list.filter((s) => s.rarity === "rare");
  const n = ((seed % 1000) + 1000) % 1000;
  const pool = n < 620 ? commons : n < 900 ? uncommons : rares;
  const chosen = pool[n % pool.length] ?? commons[0] ?? list[0];
  return chosen;
}
