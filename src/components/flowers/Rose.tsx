import { useId } from "react";
import { petalStyle, ring, type BloomProps } from "./shared";

const PALETTE = {
  a: { deep: "#6f2a3d", base: "#93404f", mid: "#c5697f", light: "#e7a7b6", edge: "rgba(255,255,255,0.28)" },
  b: { deep: "#8a5a4c", base: "#b07d6c", mid: "#d8ac9b", light: "#f4dccf", edge: "rgba(255,255,255,0.35)" },
};

// Cupped petals with a soft notch at the tip, drawn upward from the bloom centre.
const OUTER = "M0 3 C-15 -2 -25 -16 -20 -31 C-16 -40 -7 -45 0 -41 C7 -45 16 -40 20 -31 C25 -16 15 -2 0 3 Z";
const MID = "M0 2 C-11 -1 -18 -12 -14 -23 C-11 -30 -4 -33 0 -30 C4 -33 11 -30 14 -23 C18 -12 11 -1 0 2 Z";
const INNER = "M0 1 C-7 -1 -12 -8 -9 -15 C-7 -20 -2 -21 0 -19 C2 -21 7 -20 9 -15 C12 -8 7 -1 0 1 Z";

export default function RoseBloom({ variant }: BloomProps) {
  const c = PALETTE[variant];
  const id = useId();
  const g = `${id}-g`;
  const gi = `${id}-i`;
  return (
    <>
      <defs>
        <radialGradient id={g} cx="0" cy="0" r="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={c.base} />
          <stop offset="0.45" stopColor={c.mid} />
          <stop offset="1" stopColor={c.light} />
        </radialGradient>
        <radialGradient id={gi} cx="0" cy="0" r="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={c.deep} />
          <stop offset="0.6" stopColor={c.base} />
          <stop offset="1" stopColor={c.mid} />
        </radialGradient>
      </defs>
      {ring(
        7,
        0,
        (i) => (
          <g className="petal" style={petalStyle(i)}>
            <path d={OUTER} fill={`url(#${g})`} stroke="rgba(0,0,0,0.14)" strokeWidth="0.6" />
            <path d="M-11 -31 C-6 -38 6 -38 11 -31" fill="none" stroke={c.edge} strokeWidth="0.9" />
          </g>
        ),
        3,
      )}
      {ring(
        6,
        26,
        (i) => (
          <g className="petal" style={petalStyle(7 + i)}>
            <path d={MID} fill={`url(#${g})`} stroke="rgba(0,0,0,0.16)" strokeWidth="0.55" />
            <path d="M-7 -23 C-3 -28 3 -28 7 -23" fill="none" stroke={c.edge} strokeWidth="0.7" />
          </g>
        ),
        5,
      )}
      {ring(
        5,
        8,
        (i) => (
          <path
            className="petal"
            d={INNER}
            fill={`url(#${gi})`}
            stroke="rgba(0,0,0,0.18)"
            strokeWidth="0.5"
            style={petalStyle(13 + i)}
          />
        ),
        7,
      )}
      <g className="bloom-core">
        <circle r="3.6" fill={c.deep} />
        <path
          d="M-2.4 -0.6 C-2.2 -3.2 1.4 -3.6 2.2 -1.2 C2.8 0.8 0.2 2.6 -1.2 1.4 C-2.4 0.4 -1 -1.4 0.2 -0.8"
          fill="none"
          stroke={c.light}
          strokeWidth="0.7"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>
    </>
  );
}
