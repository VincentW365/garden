import type { ComponentType } from "react";
import type { FlowerType, FlowerVariant } from "@/lib/types";
import type { BloomProps } from "./shared";
import RoseBloom from "./Rose";
import TulipBloom from "./Tulip";
import DaisyBloom from "./Daisy";
import LilyBloom from "./Lily";
import SunflowerBloom from "./Sunflower";
import LavenderBloom from "./Lavender";
import WildflowerBloom from "./Wildflower";
import MoonflowerBloom from "./Moonflower";

export interface FlowerSpec {
  Bloom: ComponentType<BloomProps>;
  /** y (in the 120x260 viewBox) where the stem ends and the bloom sits. */
  tipY: number;
  /** Stem / leaf colours: dark (base) and light (toward the tip). */
  stem: string;
  stemLight: string;
  leafScale: number;
  bloomScale: number;
  /** Colour used for the card accent, per variant. */
  accent: Record<FlowerVariant, string>;
}

/**
 * Registry of flower shapes. To add a new type: create a Bloom component,
 * add it here, and add the name to `FlowerType` in lib/types.ts.
 */
export const FLOWERS: Record<FlowerType, FlowerSpec> = {
  rose: {
    Bloom: RoseBloom,
    tipY: 78,
    stem: "#3f6b4a",
    stemLight: "#6e9a74",
    leafScale: 1,
    bloomScale: 1,
    accent: { a: "#c5697f", b: "#d8ac9b" },
  },
  tulip: {
    Bloom: TulipBloom,
    tipY: 84,
    stem: "#456f4c",
    stemLight: "#7ea67f",
    leafScale: 1.05,
    bloomScale: 1,
    accent: { a: "#e2907f", b: "#9a86cb" },
  },
  daisy: {
    Bloom: DaisyBloom,
    tipY: 82,
    stem: "#4a6f4e",
    stemLight: "#7ca07c",
    leafScale: 0.85,
    bloomScale: 1,
    accent: { a: "#f3cf68", b: "#efd0d3" },
  },
  lily: {
    Bloom: LilyBloom,
    tipY: 76,
    stem: "#3e6547",
    stemLight: "#6f9770",
    leafScale: 1.1,
    bloomScale: 1,
    accent: { a: "#e8b6c4", b: "#ecd3ad" },
  },
  sunflower: {
    Bloom: SunflowerBloom,
    tipY: 68,
    stem: "#3f5f3f",
    stemLight: "#6d8f66",
    leafScale: 1.3,
    bloomScale: 1.12,
    accent: { a: "#dd9d2c", b: "#e0a83a" },
  },
  lavender: {
    Bloom: LavenderBloom,
    tipY: 58,
    stem: "#5b7c5e",
    stemLight: "#8aa889",
    leafScale: 0.6,
    bloomScale: 1,
    accent: { a: "#a596d4", b: "#c19ac9" },
  },
  wildflower: {
    Bloom: WildflowerBloom,
    tipY: 104,
    stem: "#4d7a57",
    stemLight: "#7ea67f",
    leafScale: 0.7,
    bloomScale: 1,
    accent: { a: "#aea4df", b: "#e8b7c4" },
  },
  moonflower: {
    Bloom: MoonflowerBloom,
    tipY: 74,
    stem: "#4c6e63",
    stemLight: "#7d9c92",
    leafScale: 0.95,
    bloomScale: 1,
    accent: { a: "#e8e2ff", b: "#e6cfe0" },
  },
};
