import type { GardenConfig } from "./types";

/** Replace {herName}, {myName}, {nickname} tokens inside any configured text. */
export function fill(
  text: string,
  config: Pick<GardenConfig, "herName" | "myName" | "nickname">,
): string {
  return text
    .replaceAll("{herName}", config.herName)
    .replaceAll("{myName}", config.myName)
    .replaceAll("{nickname}", config.nickname);
}

/** Split a message into paragraphs on blank lines. */
export function paragraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
