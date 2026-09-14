import { useId } from "react";
import { petalStyle, ring, spread, type BloomProps } from "./shared";

const LOBE = "M0 0 C-17 -6 -25 -26 -13 -38 C-8 -43 -3 -45 0 -44 C3 -45 8 -43 13 -38 C25 -26 17 -6 0 0 Z";

/**
 * The rare one: a moonflower. A wide white trumpet with five fused lobes,
 * a pale green throat, and a faint luminous halo. Sparkles now and then.
 */
export default function MoonflowerBloom({ variant }: BloomProps) {
  const id = useId();
  const g = `${id}-g`;
  const halo = `${id}-h`;
  const throat = `${id}-t`;
  const edge = variant === "b" ? "#e6cfe0" : "#cfc3f0";
  return (
    <>
      <defs>
        <radialGradient id={g} cx="0" cy="0" r="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#e6efd0" />
          <stop offset="0.3" stopColor="#ffffff" />
          <stop offset="0.78" stopColor="#f3edff" />
          <stop offset="1" stopColor={edge} />
        </radialGradient>
        <radialGradient id={halo} cx="0" cy="0" r="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#dcd3ff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#dcd3ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={throat} cx="0" cy="0" r="9" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#d5dd9c" stopOpacity="0.95" />
          <stop offset="1" stopColor="#d5dd9c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle className="bloom-core" r="40" fill={`url(#${halo})`} />
      {ring(
        5,
        0,
        (i) => (
          <g className="petal" style={petalStyle(i)}>
            <path d={LOBE} fill={`url(#${g})`} stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
            <path d="M0 -8 L0 -40" stroke="rgba(120,110,175,0.16)" strokeWidth="0.9" />
          </g>
        ),
        4,
      )}
      {spread([36, 108, 180, 252, 324], () => (
        <path className="bloom-core" d="M0 -3 L0 -30" stroke="rgba(120,110,175,0.1)" strokeWidth="0.8" />
      ))}
      <circle className="bloom-core" r="9" fill={`url(#${throat})`} />
      {spread([-30, -15, 0, 15, 30], () => (
        <g className="bloom-core">
          <path d="M0 0 L0 -12" stroke="#e4d9a2" strokeWidth="0.7" />
          <circle cx="0" cy="-12.6" r="1.1" fill="#f0e2a8" />
        </g>
      ))}
      <g transform="translate(22 -28)">
        <path
          className="sparkle"
          d="M0 -6 L1.2 -1.2 L6 0 L1.2 1.2 L0 6 L-1.2 1.2 L-6 0 L-1.2 -1.2 Z"
          fill="#fff6d6"
        />
      </g>
    </>
  );
}
