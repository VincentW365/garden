import { useId } from "react";
import { petalStyle, ring, spread, type BloomProps } from "./shared";

const PALETTE = {
  a: { throat: "#dfe0a6", inner: "#fbf3ec", mid: "#f6dfe0", tip: "#e8b6c4", freckle: "rgba(150,55,80,0.45)", stamen: "#cdc37a", anther: "#8a5a2b" },
  b: { throat: "#e4d69c", inner: "#fdf8ea", mid: "#f6ecd4", tip: "#ecd3ad", freckle: "rgba(160,110,40,0.38)", stamen: "#d1c27c", anther: "#7c4f25" },
};

const OUTER = "M0 0 C-9 -6 -17 -20 -13 -34 C-10 -43 -3 -48 0 -48 C3 -48 10 -43 13 -34 C17 -20 9 -6 0 0 Z";
const INNER = "M0 0 C-7 -6 -13 -18 -10 -30 C-8 -38 -2 -42 0 -42 C2 -42 8 -38 10 -30 C13 -18 7 -6 0 0 Z";
const FRECKLES: Array<[number, number, number]> = [
  [-2.5, -9, 0.7],
  [2.2, -12, 0.6],
  [-4, -15, 0.65],
  [3.6, -18, 0.55],
  [-1.2, -20, 0.5],
  [1.8, -24, 0.45],
];

export default function LilyBloom({ variant }: BloomProps) {
  const c = PALETTE[variant];
  const id = useId();
  const g = `${id}-g`;
  return (
    <>
      <defs>
        <radialGradient id={g} cx="0" cy="0" r="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={c.throat} />
          <stop offset="0.22" stopColor={c.inner} />
          <stop offset="0.68" stopColor={c.mid} />
          <stop offset="1" stopColor={c.tip} />
        </radialGradient>
      </defs>
      {ring(
        3,
        0,
        (i) => (
          <g className="petal" style={petalStyle(i)}>
            <path d={OUTER} fill={`url(#${g})`} stroke="rgba(0,0,0,0.07)" strokeWidth="0.5" />
            <path d="M0 -6 L0 -42" stroke="rgba(120,60,80,0.12)" strokeWidth="0.8" />
            {FRECKLES.map(([x, y, r], k) => (
              <circle key={k} cx={x} cy={y} r={r} fill={c.freckle} />
            ))}
          </g>
        ),
        6,
      )}
      {ring(
        3,
        60,
        (i) => (
          <g className="petal" style={petalStyle(3 + i)}>
            <path d={INNER} fill={`url(#${g})`} stroke="rgba(0,0,0,0.07)" strokeWidth="0.5" />
            <path d="M0 -5 L0 -36" stroke="rgba(120,60,80,0.12)" strokeWidth="0.8" />
            {FRECKLES.slice(0, 4).map(([x, y, r], k) => (
              <circle key={k} cx={x * 0.8} cy={y * 0.85} r={r} fill={c.freckle} />
            ))}
          </g>
        ),
        9,
      )}
      {spread([-46, -28, -9, 9, 28, 46], () => (
        <g className="bloom-core">
          <path d="M0 0 C0 -7 -1 -14 -2 -20" fill="none" stroke={c.stamen} strokeWidth="0.9" />
          <ellipse cx="-2.2" cy="-21.5" rx="1.7" ry="3.1" fill={c.anther} transform="rotate(-12 -2.2 -21.5)" />
        </g>
      ))}
      <g className="bloom-core">
        <path d="M0 0 L0 -16" stroke={c.stamen} strokeWidth="1.1" />
        <circle cx="0" cy="-17" r="1.9" fill="#aeb86e" />
      </g>
    </>
  );
}
