"use client";

import { useId, useMemo } from "react";
import { FLOWERS } from "./flowers";
import { hashString, mulberry32 } from "@/lib/random";
import type { FlowerType, FlowerVariant } from "@/lib/types";
import type { CSSVars } from "@/lib/css";

interface FlowerProps {
  id: string;
  type: FlowerType;
  variant?: FlowerVariant;
  label: string;
  /** % of stage width */
  x: number;
  /** % of stage height */
  bottom: number;
  scale: number;
  z: number;
  depth: number;
  secret?: boolean;
  opened?: boolean;
  onOpen: (id: string) => void;
}

const LEAF = "M0 0 C-9 -13 -27 -14 -37 -1 C-27 12 -9 12 0 0 Z";
const MIDRIB = "M-2.5 0 C-12 -1.2 -22 -1.2 -33 -0.8";
const VEINS = [
  "M-8 -0.8 C-11 -4.5 -14 -6.5 -17 -8",
  "M-15 -1 C-18 -4.5 -21 -6.5 -24 -8",
  "M-22 -1 C-24 -4 -27 -5.5 -29 -6.5",
  "M-8 -0.4 C-11 3 -14 5 -17 6.5",
  "M-15 -0.6 C-18 3 -21 5 -24 6.5",
  "M-22 -0.8 C-24 2.5 -27 4 -29 5",
];

type Pt = [number, number];
function bezier(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ];
}

export default function Flower({
  id,
  type,
  variant = "a",
  label,
  x,
  bottom,
  scale,
  z,
  depth,
  secret = false,
  opened = false,
  onOpen,
}: FlowerProps) {
  const spec = FLOWERS[type];
  const uid = useId();
  const stemGrad = `${uid}-stem`;
  const leafGrad = `${uid}-leaf`;

  const geo = useMemo(() => {
    const rand = mulberry32(hashString(id));
    const c = (rand() - 0.5) * 24;
    const p0: Pt = [60, 256];
    const p1: Pt = [60 + c, 205];
    const p2: Pt = [60 - c * 0.7, 140];
    const p3: Pt = [60, spec.tipY];
    const stemPath = `M${p0[0]} ${p0[1]} C${p1[0].toFixed(1)} ${p1[1]} ${p2[0].toFixed(1)} ${p2[1]} ${p3[0]} ${p3[1]}`;
    const [l1x, l1y] = bezier(p0, p1, p2, p3, 0.3);
    const [l2x, l2y] = bezier(p0, p1, p2, p3, 0.52);
    const mirrorFirst = rand() > 0.5;
    return {
      stemPath,
      leaves: [
        { x: l1x, y: l1y, mirror: mirrorFirst, rot: 26 + (rand() - 0.5) * 8, delay: 0.85 },
        { x: l2x, y: l2y, mirror: !mirrorFirst, rot: 20 + (rand() - 0.5) * 8, delay: 1.1 },
      ],
      swayDur: 6.5 + rand() * 4,
      swayDelay: -rand() * 9,
      xJitter: (rand() - 0.5) * 2,
      sparkleDelay: 1 + rand() * 5,
    };
  }, [id, spec.tipY]);

  const Bloom = spec.Bloom;
  const style: CSSVars = {
    "--x": `${(x + geo.xJitter).toFixed(2)}%`,
    "--b": `${bottom}%`,
    "--scale": scale,
    "--z": z,
    "--sway-dur": `${geo.swayDur.toFixed(2)}s`,
    "--sway-delay": `${geo.swayDelay.toFixed(2)}s`,
    "--tip": `${((spec.tipY / 260) * 100).toFixed(1)}%`,
    "--depth-opacity": 1 - depth * 0.12,
    "--sparkle-delay": `${geo.sparkleDelay.toFixed(2)}s`,
  };

  return (
    <button
      type="button"
      className={`flower${opened ? " is-opened" : ""}${secret ? " is-secret" : ""}`}
      style={style}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onOpen(id);
      }}
    >
      <span className="flower-halo" aria-hidden="true" />
      <span className="flower-sway">
        <svg viewBox="0 0 120 260" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={stemGrad} x1="0" y1="256" x2="0" y2={spec.tipY} gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor={spec.stem} />
              <stop offset="1" stopColor={spec.stemLight} />
            </linearGradient>
            <linearGradient id={leafGrad} x1="0" y1="-12" x2="0" y2="12" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor={spec.stemLight} />
              <stop offset="0.5" stopColor={spec.stem} />
              <stop offset="1" stopColor={spec.stem} stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <path className="stem" d={geo.stemPath} pathLength={1} style={{ stroke: `url(#${stemGrad})` }} />
          {geo.leaves.map((l, i) => (
            <g
              key={i}
              transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${(l.mirror ? -l.rot : l.rot).toFixed(1)}) scale(${l.mirror ? -spec.leafScale : spec.leafScale} ${spec.leafScale})`}
            >
              <g className="leaf" style={{ "--leaf-delay": `${l.delay}s` } as CSSVars}>
                <path d={LEAF} fill={`url(#${leafGrad})`} stroke="rgba(0,0,0,0.12)" strokeWidth="0.5" />
                <path d={MIDRIB} fill="none" stroke="rgba(243,233,216,0.28)" strokeWidth="0.8" />
                {VEINS.map((v, k) => (
                  <path key={k} d={v} fill="none" stroke="rgba(243,233,216,0.16)" strokeWidth="0.55" />
                ))}
              </g>
            </g>
          ))}
          <g transform={`translate(60 ${spec.tipY}) scale(${spec.bloomScale})`}>
            <g className="bloom">
              <circle className="hit" r="34" fill="rgba(0,0,0,0)" pointerEvents="all" />
              <Bloom variant={variant} />
            </g>
          </g>
        </svg>
      </span>
    </button>
  );
}
