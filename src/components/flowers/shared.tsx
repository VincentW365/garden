import type { ReactNode } from "react";
import type { FlowerVariant } from "@/lib/types";
import type { CSSVars } from "@/lib/css";

export interface BloomProps {
  variant: FlowerVariant;
}

/** Stagger index for petal unfolding. */
export function petalStyle(i: number): CSSVars {
  return { "--i": i };
}

/** Deterministic tiny variance so petals never look machine-perfect. */
export function jitter(i: number, seed = 1): { rot: number; s: number } {
  const a = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  const b = Math.sin(i * 39.3467 + seed * 11.135) * 12345.678;
  const f = a - Math.floor(a);
  const g = b - Math.floor(b);
  return { rot: (f - 0.5) * 7, s: 0.95 + g * 0.1 };
}

/** Repeat a petal `n` times around the bloom centre. Pass a seed to add organic variance. */
export function ring(
  n: number,
  offset: number,
  render: (i: number) => ReactNode,
  seed?: number,
): ReactNode[] {
  return Array.from({ length: n }, (_, i) => {
    const angle = offset + (360 / n) * i;
    const j = seed === undefined ? { rot: 0, s: 1 } : jitter(i, seed);
    return (
      <g key={i} transform={`rotate(${(angle + j.rot).toFixed(2)}) scale(${j.s.toFixed(3)})`}>
        {render(i)}
      </g>
    );
  });
}

/** Place petals at explicit angles. */
export function spread(angles: number[], render: (i: number) => ReactNode): ReactNode[] {
  return angles.map((a, i) => (
    <g key={i} transform={`rotate(${a})`}>
      {render(i)}
    </g>
  ));
}

/** Sunflower-style seed spiral (phyllotaxis). */
export function phyllotaxis(count: number, spacing: number, maxR: number): Array<[number, number]> {
  const pts: Array<[number, number]> = [];
  for (let n = 1; n <= count; n++) {
    const r = spacing * Math.sqrt(n);
    if (r > maxR) break;
    const t = n * 2.39996; // golden angle in radians
    pts.push([+(r * Math.cos(t)).toFixed(2), +(r * Math.sin(t)).toFixed(2)]);
  }
  return pts;
}
