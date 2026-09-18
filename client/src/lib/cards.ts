// Lore and stats for the collectible cards on /shop.
// Keyed by the Fourthwall product slug; anything missing falls back to a
// neutral card so a new product never breaks the page.

export type CardData = {
  serie: string;
  city: string;
  ability: string;
  lore: string;
  stats: { groove: number; depth: number; night: number };
  rarity: 1 | 2 | 3;
};

export const RARITY_LABEL: Record<number, string> = {
  1: "Standard",
  2: "Rare",
  3: "Holo",
};

export const CARDS: Record<string, CardData> = {
  "headquarter-lisboa": {
    serie: "City series",
    city: "Lisboa",
    ability: "All-seeing",
    lore: "The eye that watches the whole floor. Worn by whoever finds the room before the room finds them.",
    stats: { groove: 88, depth: 74, night: 95 },
    rarity: 3,
  },
  "bcn-style": {
    serie: "City series",
    city: "Barcelona",
    ability: "Screen monster",
    lore: "Born from a TV set left on at 4am in a Barcelona flat. Loud, funny, impossible to ignore.",
    stats: { groove: 92, depth: 66, night: 81 },
    rarity: 2,
  },
  "pov-signature-tee": {
    serie: "Signature",
    city: "Everywhere",
    ability: "Shape shifter",
    lore: "The name folded into itself until it stopped being a word and became a pattern.",
    stats: { groove: 79, depth: 88, night: 72 },
    rarity: 2,
  },
  "soluna-tee": {
    serie: "Ritual",
    city: "Fuerteventura",
    ability: "Sun & moon",
    lore: "Eight points, eight eyes: the hours between the last sunset and the first coffee.",
    stats: { groove: 71, depth: 94, night: 86 },
    rarity: 3,
  },
  "bolo-by-night": {
    serie: "City series",
    city: "Bologna",
    ability: "Sound system",
    lore: "A van, a record and a night that refused to end. Bologna taught us how to load out at dawn.",
    stats: { groove: 95, depth: 70, night: 90 },
    rarity: 2,
  },
  "pov-eye-tee": {
    serie: "Essentials",
    city: "Everywhere",
    ability: "Point of view",
    lore: "The spiral eye, stripped down to the essential. The first thing you see, the last thing you forget.",
    stats: { groove: 76, depth: 80, night: 78 },
    rarity: 1,
  },
};

export const FALLBACK_CARD: CardData = {
  serie: "POV drop",
  city: "Europe",
  ability: "New entry",
  lore: "Fresh from the print room. Story to be written on the dancefloor.",
  stats: { groove: 75, depth: 75, night: 75 },
  rarity: 1,
};

export const cardFor = (slug: string): CardData => CARDS[slug] ?? FALLBACK_CARD;
