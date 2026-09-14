import { useId } from "react";
import { petalStyle, phyllotaxis, ring, type BloomProps } from "./shared";

const PALETTE = {
  a: { base: "#e6d6a6", mid: "#f7f0df", tip: "#fffbf2", back: "#e4dac7", core1: "#f3cf68", core2: "#d5a53d", core3: "#a3762a" },
  b: { base: "#efd0d3", mid: "#f9e8ea", tip: "#fdf5f5", back: "#e9d0d4", core1: "#f1cb6c", core2: "#d7a743", core3: "#a67a2e" },
};

const FRONT = "M0 0 C-3.4 -5 -4 -16 -2.4 -25 C-1.6 -29.5 1.6 -29.5 2.4 -25 C4 -16 3.4 -5 0 0 Z";
const BACK = "M0 0 C-3 -6 -3.6 -17 -2.2 -26 C-1.4 -30 1.4 -30 2.2 -26 C3.6 -17 3 -6 0 0 Z";
const SEEDS = phyllotaxis(40, 1.25, 7.2);

export default function DaisyBloom({ variant }: BloomProps) {
  const c = PALETTE[variant];
  const id = useId();
  const g = `${id}-g`;
  const core = `${id}-c`;
  return (
    <>
      <defs>
        <radialGradient id={g} cx="0" cy="0" r="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={c.base} />
          <stop offset="0.35" stopColor={c.mid} />
          <stop offset="1" stopColor={c.tip} />
        </radialGradient>
        <radialGradient id={core} cx="-2.5" cy="-3" r="10" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={c.core1} />
          <stop offset="0.65" stopColor={c.core2} />
          <stop offset="1" stopColor={c.core3} />
        </radialGradient>
      </defs>
      {ring(
        19,
        9.5,
        (i) => (
          <path className="petal" d={BACK} fill={c.back} style={petalStyle(i * 0.5)} />
        ),
        2,
      )}
      {ring(
        19,
        0,
        (i) => (
          <path
            className="petal"
            d={FRONT}
            fill={`url(#${g})`}
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="0.4"
            style={petalStyle(4 + i * 0.5)}
          />
        ),
        4,
      )}
      <g className="bloom-core">
        <circle r="8.6" fill={`url(#${core})`} />
        {SEEDS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="0.75" fill={i % 2 ? "rgba(110,75,20,0.4)" : "rgba(255,235,170,0.35)"} />
        ))}
      </g>
    </>
  );
}
