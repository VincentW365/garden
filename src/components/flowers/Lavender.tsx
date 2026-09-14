import { useId } from "react";
import { petalStyle, type BloomProps } from "./shared";

const PALETTE = {
  a: { low: "#5f4f9a", high: "#b7a6e6", calyx: "#4a3f7c", leaf: "#6f8f6e" },
  b: { low: "#7d5a92", high: "#d3b0d8", calyx: "#5a4468", leaf: "#6f8f6e" },
};

/** A single lavender floret: a small bud that opens into two lips. */
const FLORET = "M0 0 C-2.8 -1.6 -3.9 -5 -1.8 -7.4 C-0.8 -8.5 0.8 -8.5 1.8 -7.4 C3.9 -5 2.8 -1.6 0 0 Z";

const WHORLS = Array.from({ length: 9 }, (_, k) => 50 - k * 7.4);

export default function LavenderBloom({ variant }: BloomProps) {
  const c = PALETTE[variant];
  const id = useId();
  const g = `${id}-g`;
  return (
    <>
      <defs>
        <linearGradient id={g} x1="0" y1="52" x2="0" y2="-18" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={c.low} />
          <stop offset="1" stopColor={c.high} />
        </linearGradient>
      </defs>
      {/* tiny bracts at the base of the spike */}
      <g className="bloom-core">
        <path d="M0 54 C-5 50 -9 50 -12 44" fill="none" stroke={c.leaf} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M0 54 C5 50 9 50 12 44" fill="none" stroke={c.leaf} strokeWidth="1.2" strokeLinecap="round" />
      </g>
      {WHORLS.map((y, k) => {
        const sides = [-1, 1];
        return sides.map((s) => {
          const x = s * (3.6 - (k > 6 ? (k - 6) * 0.6 : 0));
          const tilt = s * (34 - k * 1.5);
          const i = k * 2 + (s > 0 ? 1 : 0);
          return (
            <g key={`${k}${s}`} transform={`translate(${x} ${y}) rotate(${tilt})`}>
              <ellipse
                className="petal"
                cx="0"
                cy="-3.2"
                rx="2.2"
                ry="3.4"
                fill={c.calyx}
                style={{ ...petalStyle(i), transformOrigin: "50% 100%" }}
              />
              <path
                className="petal"
                d={FLORET}
                fill={`url(#${g})`}
                stroke="rgba(0,0,0,0.12)"
                strokeWidth="0.35"
                style={{ ...petalStyle(i + 0.5), transformOrigin: "50% 100%" }}
              />
            </g>
          );
        });
      })}
      <g transform="translate(0 -14)">
        <path
          className="petal"
          d={FLORET}
          fill={`url(#${g})`}
          style={{ ...petalStyle(19), transformOrigin: "50% 100%" }}
        />
      </g>
    </>
  );
}
