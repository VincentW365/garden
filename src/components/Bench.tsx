"use client";

import { useId } from "react";
import type { CSSVars } from "@/lib/css";

interface BenchProps {
  label: string;
  carving: string;
  date: string;
  onOpen: () => void;
}

const FIGURE = "#14122a";
const RIM = "rgba(243, 233, 216, 0.34)";
const IRON = "#3a3134";
const IRON_HI = "rgba(243, 233, 216, 0.16)";

/**
 * A slatted park bench under a soft pool of light. Two figures sit close:
 * her head on his shoulder, his arm around her, her hand on his knee.
 * The only motion is a slow breath.
 */
export default function Bench({ label, carving, date, onOpen }: BenchProps) {
  const id = useId();
  const glowId = `${id}-glow`;
  const woodId = `${id}-wood`;
  const seatId = `${id}-seat`;
  const poolId = `${id}-pool`;
  return (
    <button
      type="button"
      className="bench"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
    >
      <svg viewBox="0 0 200 130" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id={glowId} cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#e8c48c" stopOpacity="0.3" />
            <stop offset="55%" stopColor="#e8c48c" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#e8c48c" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={poolId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f0d9a8" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#f0d9a8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={woodId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7a5c4b" />
            <stop offset="1" stopColor="#4b372f" />
          </linearGradient>
          <linearGradient id={seatId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#846452" />
            <stop offset="1" stopColor="#523d33" />
          </linearGradient>
        </defs>

        {/* ambient light */}
        <ellipse cx="100" cy="96" rx="112" ry="48" fill={`url(#${glowId})`} />
        <ellipse cx="100" cy="118" rx="78" ry="9" fill={`url(#${poolId})`} />
        <ellipse cx="100" cy="117" rx="70" ry="5" fill="rgba(0,0,0,0.22)" />

        {/* iron frame: back posts, legs, feet */}
        <rect x="43" y="44" width="4" height="40" rx="1.5" fill={IRON} />
        <rect x="153" y="44" width="4" height="40" rx="1.5" fill={IRON} />
        <path d="M45 88 C44 98 43 106 42 114" stroke={IRON} strokeWidth="4.2" strokeLinecap="round" fill="none" />
        <path d="M155 88 C156 98 157 106 158 114" stroke={IRON} strokeWidth="4.2" strokeLinecap="round" fill="none" />
        <path d="M34 115 L52 115" stroke={IRON} strokeWidth="3" strokeLinecap="round" />
        <path d="M148 115 L166 115" stroke={IRON} strokeWidth="3" strokeLinecap="round" />

        {/* back slats */}
        <rect x="38" y="47" width="124" height="7.5" rx="2.5" fill={`url(#${woodId})`} />
        <rect x="38" y="56.5" width="124" height="7.5" rx="2.5" fill={`url(#${woodId})`} />
        <rect x="38" y="66" width="124" height="7.5" rx="2.5" fill={`url(#${woodId})`} />
        <rect x="38" y="47" width="124" height="1.2" rx="0.6" fill="rgba(243,233,216,0.2)" />
        <rect x="38" y="56.5" width="124" height="1.2" rx="0.6" fill="rgba(243,233,216,0.16)" />
        <rect x="38" y="66" width="124" height="1.2" rx="0.6" fill="rgba(243,233,216,0.13)" />

        {/* carving, on the right end of the top slats */}
        {carving && (
          <text
            x="146"
            y="53"
            textAnchor="middle"
            fontSize="5.4"
            fontFamily="var(--font-serif)"
            fontStyle="italic"
            fill="rgba(243,233,216,0.38)"
          >
            {carving}
          </text>
        )}
        {date && (
          <text
            x="146"
            y="62.2"
            textAnchor="middle"
            fontSize="3.1"
            fontFamily="var(--font-sans)"
            letterSpacing="0.25"
            fill="rgba(243,233,216,0.26)"
          >
            {date}
          </text>
        )}

        {/* seat slats */}
        <rect x="32" y="80" width="136" height="6.5" rx="2.2" fill={`url(#${seatId})`} />
        <rect x="32" y="87.5" width="136" height="5.5" rx="2" fill={`url(#${woodId})`} />
        <rect x="32" y="80" width="136" height="1.3" rx="0.6" fill="rgba(243,233,216,0.24)" />
        <rect x="32" y="87.5" width="136" height="1" rx="0.5" fill="rgba(243,233,216,0.1)" />

        {/* armrests: iron scrolls */}
        <path d="M36 80 C31 74 31 66 38 62 C44 59 50 62 50 66" stroke={IRON} strokeWidth="3.2" strokeLinecap="round" fill="none" />
        <path d="M164 80 C169 74 169 66 162 62 C156 59 150 62 150 66" stroke={IRON} strokeWidth="3.2" strokeLinecap="round" fill="none" />
        <path d="M38 62 C44 59 50 62 50 66" stroke={IRON_HI} strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M162 62 C156 59 150 62 150 66" stroke={IRON_HI} strokeWidth="1" strokeLinecap="round" fill="none" />

        {/* him: seated, head tilted toward her, arm around her shoulders */}
        <g className="breath" style={{ "--breath-dur": "5.4s", "--breath-delay": "-1s" } as CSSVars}>
          {/* legs */}
          <path d="M70 84 C73 92 76 100 76 112" stroke={FIGURE} strokeWidth="9" strokeLinecap="round" fill="none" />
          <path d="M84 84 C87 92 90 100 90 112" stroke={FIGURE} strokeWidth="9" strokeLinecap="round" fill="none" />
          <ellipse cx="77" cy="115" rx="6.5" ry="2.6" fill={FIGURE} />
          <ellipse cx="91" cy="115" rx="6.5" ry="2.6" fill={FIGURE} />
          {/* torso */}
          <path d="M60 84 C58 68 64 55 80 52 C96 52 102 62 102 84 Z" fill={FIGURE} />
          {/* arm around her, hand on her far shoulder */}
          <path d="M96 57 C108 53 120 56 127 64 C130 68 131 74 128 79" stroke={FIGURE} strokeWidth="7.4" strokeLinecap="round" fill="none" />
          <path d="M97 54 C108 50 121 53 128 61 C131 65 132 71 130 76" stroke={RIM} strokeWidth="1" strokeLinecap="round" fill="none" />
          {/* neck + head with short hair, leaning toward her */}
          <g transform="rotate(9 81 53)">
            <rect x="76.5" y="44" width="9" height="11" rx="3" fill={FIGURE} />
            <circle cx="81" cy="39.5" r="9.4" fill={FIGURE} />
            <path d="M71.8 37.5 C72 29.5 88 27.5 90.8 36 C86 32.5 76 32.5 71.8 37.5 Z" fill={FIGURE} />
            <path d="M84.5 30.6 C88.6 32.2 90.8 36 90.4 41" stroke={RIM} strokeWidth="1" strokeLinecap="round" fill="none" />
          </g>
        </g>

        {/* her: leaning into him, head on his shoulder, hand on his knee */}
        <g className="breath" style={{ "--breath-dur": "6.1s", "--breath-delay": "-3.6s" } as CSSVars}>
          {/* legs, knees together, lower legs angled slightly toward him */}
          <path d="M110 84 C109 92 106 100 104 112" stroke={FIGURE} strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M118 84 C117 92 113 100 110 112" stroke={FIGURE} strokeWidth="8" strokeLinecap="round" fill="none" />
          <ellipse cx="103" cy="115" rx="5.5" ry="2.4" fill={FIGURE} />
          <ellipse cx="109.5" cy="115" rx="5.5" ry="2.4" fill={FIGURE} />
          {/* torso, leaning left into him */}
          <path d="M100 84 C99 72 103 64 111 61 C123 61 129 68 129 84 Z" fill={FIGURE} />
          <path d="M123 65 C127 69 129 76 129 83" stroke={RIM} strokeWidth="0.9" strokeLinecap="round" fill="none" />
          {/* her arm resting across to his knee */}
          <path d="M105 67 C97 72 88 79 81 87" stroke={FIGURE} strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M104 64.5 C96 69.5 88 76 81 84" stroke={RIM} strokeWidth="0.8" strokeLinecap="round" fill="none" />
          <ellipse cx="79.5" cy="88.5" rx="3.8" ry="2.6" fill={FIGURE} />
          {/* head resting on his shoulder: tilted, hair in a low knot with a soft fall */}
          <g transform="rotate(-16 103 62)">
            <path d="M104 56 C110 58 114 64 113 73 C110 70 106 67 104 63 Z" fill={FIGURE} />
            <ellipse cx="110.5" cy="50" rx="6" ry="5.4" fill={FIGURE} />
            <circle cx="103" cy="52" r="8.6" fill={FIGURE} />
            <path d="M97.5 46 C100 42.5 106 41.5 110 44.5" stroke={RIM} strokeWidth="0.9" strokeLinecap="round" fill="none" />
            <path d="M113 46.5 C116 48.5 116.8 52.5 115 55.5" stroke={RIM} strokeWidth="0.9" strokeLinecap="round" fill="none" />
          </g>
        </g>

        <rect className="hit" x="26" y="26" width="148" height="94" fill="rgba(0,0,0,0)" pointerEvents="all" />
      </svg>
    </button>
  );
}
