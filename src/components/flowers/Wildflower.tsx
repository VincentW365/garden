import { useId } from "react";
import { petalStyle, ring, type BloomProps } from "./shared";

const PALETTE = {
  a: { inner: "#ffffff", mid: "#dcd8f3", edge: "#aea4df", core: "#f1c451", core2: "#c98f2a", bud: "#9d93cc", calyx: "#5a8a63", stem: "#5a8a63" },
  b: { inner: "#ffffff", mid: "#f6dfe4", edge: "#e8b7c4", core: "#f1c451", core2: "#c98f2a", bud: "#dfb0bd", calyx: "#5a8a63", stem: "#5a8a63" },
};

const PETAL = "M0 0 C-3.8 -2 -5.6 -6.4 -4.2 -10 C-3.2 -12.6 -1 -13.6 0 -12.4 C1 -13.6 3.2 -12.6 4.2 -10 C5.6 -6.4 3.8 -2 0 0 Z";

const HEADS: Array<{ x: number; y: number; path: string; scale: number }> = [
  { x: -20, y: -24, path: "M0 0 C-6 -8 -14 -14 -20 -24", scale: 1 },
  { x: 2, y: -33, path: "M0 0 C1 -10 0 -20 2 -33", scale: 1.1 },
  { x: 19, y: -19, path: "M0 0 C6 -6 14 -12 19 -19", scale: 0.9 },
];
const BUDS: Array<{ x: number; y: number; path: string; rot: number }> = [
  { x: -9, y: -15, path: "M0 0 C-3 -5 -6 -9 -9 -15", rot: -28 },
  { x: 12, y: -9, path: "M0 0 C4 -3 8 -6 12 -9", rot: 34 },
];

export default function WildflowerBloom({ variant }: BloomProps) {
  const c = PALETTE[variant];
  const id = useId();
  const g = `${id}-g`;
  return (
    <>
      <defs>
        {/* objectBoundingBox: every petal shades from a white base to a coloured edge */}
        <radialGradient id={g} cx="0.5" cy="1" r="1">
          <stop offset="0" stopColor={c.inner} />
          <stop offset="0.45" stopColor={c.mid} />
          <stop offset="1" stopColor={c.edge} />
        </radialGradient>
      </defs>
      {[...HEADS, ...BUDS].map((h, i) => (
        <path
          key={`s${i}`}
          className="bloom-core"
          d={h.path}
          fill="none"
          stroke={c.stem}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      ))}
      {BUDS.map((b, i) => (
        <g key={`b${i}`} className="bloom-core" transform={`translate(${b.x} ${b.y}) rotate(${b.rot})`}>
          <ellipse cx="0" cy="-3.6" rx="2.3" ry="3.6" fill={c.bud} />
          <path d="M-2.4 -2 C-1.4 0.4 1.4 0.4 2.4 -2 L0 0.6 Z" fill={c.calyx} />
        </g>
      ))}
      {HEADS.map((h, hi) => (
        <g key={hi} transform={`translate(${h.x} ${h.y}) scale(${h.scale})`}>
          {ring(
            5,
            hi * 17,
            (i) => (
              <path
                className="petal"
                d={PETAL}
                fill={`url(#${g})`}
                stroke="rgba(0,0,0,0.06)"
                strokeWidth="0.35"
                style={petalStyle(hi * 3 + i)}
              />
            ),
            hi + 2,
          )}
          <g className="bloom-core">
            <circle r="2.4" fill={c.core} />
            <circle r="1.1" fill={c.core2} />
          </g>
        </g>
      ))}
    </>
  );
}
