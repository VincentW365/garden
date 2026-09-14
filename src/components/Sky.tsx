"use client";

import { mulberry32 } from "@/lib/random";
import type { CSSVars } from "@/lib/css";

// Deterministic so the server and client render the same sky.
const rand = mulberry32(140221);

const STARS = Array.from({ length: 46 }, () => ({
  x: rand() * 100,
  y: rand() * 56,
  s: 1 + rand() * 1.3,
  d: 3 + rand() * 5,
  delay: -rand() * 8,
}));

const FIREFLIES = Array.from({ length: 18 }, () => ({
  x: 4 + rand() * 92,
  y: 34 + rand() * 56,
  dx: 20 + rand() * 50,
  dy: 14 + rand() * 40,
  dur: 14 + rand() * 12,
  glow: 3 + rand() * 4,
  delay: -rand() * 20,
  delay2: -rand() * 6,
}));

const POLLEN = Array.from({ length: 8 }, () => ({
  x: rand() * 100,
  y: 62 + rand() * 34,
  dx: (rand() - 0.5) * 40,
  dur: 16 + rand() * 14,
  delay: -rand() * 20,
}));

/** The one star that answers when touched. */
const SPECIAL_STAR = { x: 23, y: 21 };

interface SkyProps {
  atmosphere: "night" | "moonlit";
  moonLabel: string;
  starLabel: string;
  onMoon: () => void;
  onStar: () => void;
}

export default function Sky({ atmosphere, moonLabel, starLabel, onMoon, onStar }: SkyProps) {
  return (
    <>
      <div className="sky" aria-hidden="true">
        <div className="sky-layer sky-night" />
        <div className="sky-layer sky-warm" />
        <div className="sky-layer sky-moonlit" />
        <div className="horizon-glow" />
        <div className="stars">
          {STARS.map((s, i) => (
            <span
              key={i}
              className="star"
              style={
                {
                  "--x": `${s.x.toFixed(2)}%`,
                  "--y": `${s.y.toFixed(2)}%`,
                  "--s": `${s.s.toFixed(2)}px`,
                  "--d": `${s.d.toFixed(2)}s`,
                  "--delay": `${s.delay.toFixed(2)}s`,
                } as CSSVars
              }
            />
          ))}
        </div>
      </div>
      <button
        type="button"
        className="star-special"
        style={{ "--x": `${SPECIAL_STAR.x}%`, "--y": `${SPECIAL_STAR.y}%` } as CSSVars}
        aria-label={starLabel}
        onClick={(e) => {
          e.stopPropagation();
          onStar();
        }}
      >
        <span className="cross-v" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="moon"
        aria-label={moonLabel}
        aria-pressed={atmosphere === "moonlit"}
        onClick={(e) => {
          e.stopPropagation();
          onMoon();
        }}
      />
      <div className="mist" aria-hidden="true" />
    </>
  );
}

export function Fireflies({ extra }: { extra: boolean }) {
  const list = extra ? FIREFLIES : FIREFLIES.slice(0, 11);
  return (
    <div className="fireflies" aria-hidden="true">
      {list.map((f, i) => (
        <span
          key={i}
          className="firefly"
          style={
            {
              "--x": `${f.x.toFixed(2)}%`,
              "--y": `${f.y.toFixed(2)}%`,
              "--dx": `${f.dx.toFixed(1)}px`,
              "--dy": `${f.dy.toFixed(1)}px`,
              "--dur": `${f.dur.toFixed(2)}s`,
              "--glow": `${f.glow.toFixed(2)}s`,
              "--delay": `${f.delay.toFixed(2)}s`,
              "--delay2": `${f.delay2.toFixed(2)}s`,
            } as CSSVars
          }
        />
      ))}
      {POLLEN.map((p, i) => (
        <span
          key={`p${i}`}
          className="pollen"
          style={
            {
              "--x": `${p.x.toFixed(2)}%`,
              "--y": `${p.y.toFixed(2)}%`,
              "--dx": `${p.dx.toFixed(1)}px`,
              "--dur": `${p.dur.toFixed(2)}s`,
              "--delay": `${p.delay.toFixed(2)}s`,
            } as CSSVars
          }
        />
      ))}
    </div>
  );
}

/** A single golden firefly that drifts toward wherever she last touched. */
export function RareFirefly({ x, y, fading }: { x: number; y: number; fading: boolean }) {
  return (
    <div
      className="firefly-rare"
      aria-hidden="true"
      style={{ transform: `translate3d(${x}px, ${y}px, 0)`, opacity: fading ? 0 : 1 }}
    >
      <span className="firefly-rare-inner" style={{ display: "block" }} />
    </div>
  );
}
