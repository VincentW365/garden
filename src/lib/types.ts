/**
 * Shared types for the garden.
 * You normally don't need to edit this file — edit `garden.config.ts` instead.
 */

/** Every flower shape the garden knows how to draw. */
export type FlowerType =
  | "rose"
  | "tulip"
  | "daisy"
  | "lily"
  | "sunflower"
  | "lavender"
  | "wildflower"
  | "moonflower";

/** Each flower type has two colour variants so repeated types still look distinct. */
export type FlowerVariant = "a" | "b";

export interface FlowerMessage {
  /** Unique id. Used internally; keep it stable once set. */
  id: string;
  flowerType: FlowerType;
  variant?: FlowerVariant;
  /** The category shown as the small heading on the card. */
  title: string;
  /** The message itself. Blank lines become paragraphs. */
  message: string;
  /** Optional quotation shown above the message, in italics with its author. */
  quote?: { text: string; author: string };
  /** Optional image shown at the top of the card, e.g. "/images/us.jpg" (file goes in /public/images). */
  image?: { src: string; alt: string };
}

export interface SecretFlower {
  id: string;
  flowerType: FlowerType;
  /** 0-based position in the planting order (0 = the very first flower). */
  plantAt: number;
  /** Shown first when she taps it. */
  foundText: string;
  /** The longer, more personal letter. Blank lines become paragraphs. */
  letter: string;
}

export type MoodKey = "bad" | "meh" | "better" | "needYou";

export interface MoodConfig {
  /** How many flowers she should open before the check-in appears. */
  afterFlowersOpened: number;
  prompt: string;
  options: Record<MoodKey, { emoji: string; label: string }>;
  /** Lines shown one after another for each answer. */
  responses: Record<MoodKey, string[]>;
  /** Button labels shown after the response. */
  actions: {
    backToGarden: string;
    findAnother: string;
    callMe: string;
    notNow: string;
  };
}

export interface GardenConfig {
  herName: string;
  myName: string;
  nickname: string;
  /** Used for the "Call me" button. Digits with country code, e.g. "+15555550123". Empty = button hidden. */
  phoneNumber: string;
  /** Optional. Carved faintly into the bench under the initials. Any short text, e.g. "12 . 03 . 2024". */
  importantDate: string;
  /** Optional, reserved for future details (e.g. days together). ISO date "YYYY-MM-DD". */
  relationshipStartDate: string;
  /** Browser tab title. */
  siteTitle: string;
  audio: {
    /** Path to an audio file in /public, e.g. "/audio/garden.mp3". Empty = audio toggle hidden. */
    src: string;
    label: string;
  };
  intro: {
    /** Optional sealed-envelope opening shown before the intro lines. Supports name tokens. */
    seal?: {
      eyebrow: string;
      headline: string;
      to: string;
      from: string;
      monogram: string;
      prompt: string;
    };
    lines: string[];
    touchPrompt: string;
  };
  flowers: FlowerMessage[];
  secretFlower: SecretFlower;
  bench: {
    /** Shown when she taps the bench. */
    message: string;
    /** Carved into the backrest. Leave empty to use initials from the names above. */
    carving: string;
  };
  hiddenDetails: {
    /** Revealed by tapping one particular star. */
    starMessage: string;
  };
  mood: MoodConfig;
  finalMessage: {
    /** How many flowers she should open before the final message becomes available. */
    afterFlowersOpened: number;
    /** Subtle prompt shown at the bottom of the garden when it's ready. */
    prompt: string;
    lines: string[];
    /** Shown under the last line. Supports {myName}, {herName}, {nickname}. */
    signOff: string;
  };
  growing: {
    buttonLabel: string;
    note: string;
    allPlantedNote: string;
  };
  ui: {
    touchFlowerHint: string;
    touchGroundHint: string;
    close: string;
    backToGarden: string;
    audioOn: string;
    audioOff: string;
    moonLabel: string;
    starLabel: string;
    benchLabel: string;
    /** Screen-reader label for the hidden flower. Keep it neutral so it stays a secret. */
    secretFlowerLabel: string;
  };
}
