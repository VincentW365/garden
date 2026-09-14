import { useId } from "react";
import { petalStyle, type BloomProps } from "./shared";

const PALETTE = {
  a: { base: "#b5544f", mid: "#e2907f", tip: "#f7cbb8", inner: "#c9695e" },
  b: { base: "#63509c", mid: "#9a86cb", tip: "#d6cbef", inner: "#7a68b0" },
};

const BACK = "M0 8 C-19 2 -21 -30 -7 -46 C-3 -50 3 -50 7 -46 C21 -30 19 2 0 8 Z";
const GLIMPSE_L = "M-1 6 C-13 2 -22 -22 -16 -40 C-14 -46 -10 -47 -8 -43 C-5 -30 -3 -14 -1 6 Z";
const GLIMPSE_R = "M1 6 C13 2 22 -22 16 -40 C14 -46 10 -47 8 -43 C5 -30 3 -14 1 6 Z";
const FRONT_L = "M0 8 C-21 4 -27 -24 -15 -44 C-12 -49 -7 -49 -5 -44 C-3 -28 -1 -10 0 8 Z";
const FRONT_R = "M0 8 C21 4 27 -24 15 -44 C12 -49 7 -49 5 -44 C3 -28 1 -10 0 8 Z";

export default function TulipBloom({ variant }: BloomProps) {
  const c = PALETTE[variant];
  const id = useId();
  const g = `${id}-g`;
  const sh = `${id}-s`;
  return (
    <>
      <defs>
        <linearGradient id={g} x1="0" y1="8" x2="0" y2="-48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={c.base} />
          <stop offset="0.55" stopColor={c.mid} />
          <stop offset="1" stopColor={c.tip} />
        </linearGradient>
        <linearGradient id={sh} x1="-22" y1="0" x2="22" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="rgba(0,0,0,0.22)" />
          <stop offset="0.5" stopColor="rgba(0,0,0,0)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.14)" />
        </linearGradient>
      </defs>
      <path className="petal" d={BACK} fill={`url(#${g})`} style={petalStyle(0)} />
      <path className="petal" d={GLIMPSE_L} fill={c.inner} opacity="0.9" style={petalStyle(1)} />
      <path className="petal" d={GLIMPSE_R} fill={c.inner} opacity="0.9" style={petalStyle(1.5)} />
      <g className="petal" style={petalStyle(2.5)}>
        <path d={FRONT_L} fill={`url(#${g})`} stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
        <path d={FRONT_L} fill={`url(#${sh})`} />
        <path d="M-12 -30 C-13 -18 -10 -6 -6 2" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.9" />
      </g>
      <g className="petal" style={petalStyle(3)}>
        <path d={FRONT_R} fill={`url(#${g})`} stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
        <path d={FRONT_R} fill={`url(#${sh})`} opacity="0.6" />
      </g>
    </>
  );
}
