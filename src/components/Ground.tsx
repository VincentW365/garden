import { useId } from "react";
import type { CSSVars } from "@/lib/css";

const TUFTS: Array<{ x: number; y: number; dur: number; delay: number }> = [
  { x: 6, y: 44, dur: 5.5, delay: -1 },
  { x: 21, y: 41, dur: 6.2, delay: -3 },
  { x: 38, y: 39.5, dur: 5.8, delay: -2 },
  { x: 47, y: 47, dur: 6.6, delay: -4 },
  { x: 63, y: 40, dur: 5.4, delay: -1.5 },
  { x: 80, y: 43, dur: 6.4, delay: -2.5 },
  { x: 94, y: 45, dur: 5.9, delay: -3.5 },
  { x: 14, y: 32, dur: 6.8, delay: -0.5 },
  { x: 55, y: 29, dur: 6.1, delay: -2.2 },
  { x: 90, y: 31, dur: 5.7, delay: -4.4 },
];

export default function Ground() {
  const id = useId();
  const back = `${id}-back`;
  const mid = `${id}-mid`;
  const front = `${id}-front`;
  return (
    <div className="ground" aria-hidden="true">
      <svg viewBox="0 0 100 60" preserveAspectRatio="none">
        <defs>
          <linearGradient id={back} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#213539" />
            <stop offset="1" stopColor="#131f27" />
          </linearGradient>
          <linearGradient id={mid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#28483d" />
            <stop offset="1" stopColor="#182d26" />
          </linearGradient>
          <linearGradient id={front} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#315846" />
            <stop offset="1" stopColor="#1e3a2e" />
          </linearGradient>
        </defs>
        <path d="M0 20 C25 8 65 6 100 16 L100 60 L0 60 Z" fill={`url(#${back})`} />
        <path d="M0 31 C30 21 70 23 100 29 L100 60 L0 60 Z" fill={`url(#${mid})`} />
        <path d="M0 43 C30 35 70 37 100 41 L100 60 L0 60 Z" fill={`url(#${front})`} />
        {TUFTS.map((t, i) => (
          <g
            key={i}
            className="tuft"
            style={{ "--sway-dur": `${t.dur}s`, "--sway-delay": `${t.delay}s` } as CSSVars}
          >
            <path
              d={`M${t.x} ${t.y} l-1.4 -4 M${t.x} ${t.y} l0.2 -5.2 M${t.x} ${t.y} l1.6 -3.8`}
              stroke="#3f6a4c"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
      </svg>
      <div className="ground-warm" />
    </div>
  );
}
