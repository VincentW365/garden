import { useId } from "react";
import { petalStyle, phyllotaxis, ring, type BloomProps } from "./shared";

const PALETTE = {
  a: { p0: "#b0621c", p1: "#dd9d2c", p2: "#f1c64a", p3: "#f8d96e", q0: "#9c5716", q1: "#d38f27", q2: "#ecbd45", d0: "#5a3a22", d1: "#3b2416", d2: "#26170e" },
  b: { p0: "#b56f22", p1: "#e0a83a", p2: "#f2cf5f", p3: "#f9e083", q0: "#a2611c", q1: "#d59a33", q2: "#eec55a", d0: "#553522", d1: "#372116", d2: "#22150d" },
};

const OUTER = "M0 0 C-4.5 -6 -6.6 -16 -4.6 -27 C-3.1 -33 -1 -36 0 -36 C1 -36 3.1 -33 4.6 -27 C6.6 -16 4.5 -6 0 0 Z";
const INNER = "M0 0 C-4 -5 -5.6 -14 -3.8 -23 C-2.6 -28 -0.9 -30.5 0 -30.5 C0.9 -30.5 2.6 -28 3.8 -23 C5.6 -14 4 -5 0 0 Z";
const SEEDS = phyllotaxis(90, 1.55, 13.2);
const RIM = Array.from({ length: 26 }, (_, i) => {
  const a = (i / 26) * Math.PI * 2;
  return [+(14.6 * Math.cos(a)).toFixed(2), +(14.6 * Math.sin(a)).toFixed(2)] as [number, number];
});

export default function SunflowerBloom({ variant }: BloomProps) {
  const c = PALETTE[variant];
  const id = useId();
  const g1 = `${id}-a`;
  const g2 = `${id}-b`;
  const disc = `${id}-d`;
  return (
    <>
      <defs>
        <radialGradient id={g1} cx="0" cy="0" r="37" gradientUnits="userSpaceOnUse">
          <stop offset="0.3" stopColor={c.p0} />
          <stop offset="0.5" stopColor={c.p1} />
          <stop offset="0.85" stopColor={c.p2} />
          <stop offset="1" stopColor={c.p3} />
        </radialGradient>
        <radialGradient id={g2} cx="0" cy="0" r="32" gradientUnits="userSpaceOnUse">
          <stop offset="0.35" stopColor={c.q0} />
          <stop offset="0.6" stopColor={c.q1} />
          <stop offset="1" stopColor={c.q2} />
        </radialGradient>
        <radialGradient id={disc} cx="-3" cy="-3" r="18" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={c.d0} />
          <stop offset="0.6" stopColor={c.d1} />
          <stop offset="1" stopColor={c.d2} />
        </radialGradient>
      </defs>
      {ring(
        21,
        8.6,
        (i) => (
          <path className="petal" d={INNER} fill={`url(#${g2})`} style={petalStyle(8 + i * 0.4)} />
        ),
        11,
      )}
      {ring(
        21,
        0,
        (i) => (
          <g className="petal" style={petalStyle(i * 0.4)}>
            <path d={OUTER} fill={`url(#${g1})`} stroke="rgba(90,40,0,0.12)" strokeWidth="0.45" />
            <path d="M0 -4 L0 -30" stroke="rgba(120,60,0,0.16)" strokeWidth="0.7" />
          </g>
        ),
        13,
      )}
      <g className="bloom-core">
        <circle r="15.4" fill={`url(#${disc})`} />
        {SEEDS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="0.85" fill={i % 3 === 0 ? "rgba(255,190,90,0.22)" : "rgba(10,5,2,0.45)"} />
        ))}
        {RIM.map(([x, y], i) => (
          <circle key={`r${i}`} cx={x} cy={y} r="0.9" fill="rgba(210,160,60,0.75)" />
        ))}
      </g>
    </>
  );
}
