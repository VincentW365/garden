/**
 * Where flowers can stand. `x` is % of the stage width; `depth` runs from
 * 0 (front, large) to 1 (back, small). The bench lives around x 60-94% at
 * mid depth, so no mid-depth slot is placed there.
 */
export interface Slot {
  id: number;
  x: number;
  depth: number;
}

/*
 * Rows are interleaved horizontally and separated vertically so that on a
 * 375px-wide phone no bloom's centre is ever covered by a nearer flower's
 * tap area, and the bench (x ~55-93%, mid depth) stays visible.
 */
export const SLOTS: Slot[] = [
  // front row (large)
  { id: 0, x: 12, depth: 0.08 },
  { id: 1, x: 32, depth: 0.14 },
  { id: 2, x: 54, depth: 0.04 },
  { id: 3, x: 88, depth: 0.12 },
  // middle row (the bench sits to the right)
  { id: 4, x: 21, depth: 0.5 },
  { id: 5, x: 43, depth: 0.56 },
  { id: 6, x: 61, depth: 0.53 },
  // back row (small)
  { id: 7, x: 10, depth: 0.8 },
  { id: 8, x: 23, depth: 0.85 },
  { id: 9, x: 36, depth: 0.78 },
  { id: 10, x: 49, depth: 0.84 },
  { id: 11, x: 63, depth: 0.8 },
  { id: 12, x: 77, depth: 0.85 },
  { id: 13, x: 91, depth: 0.82 },
];

export interface SlotStyle {
  bottom: number; // % of stage height
  scale: number;
  z: number;
}

export function slotStyle(depth: number): SlotStyle {
  return {
    bottom: 3 + depth * 30,
    scale: 1 - depth * 0.36,
    z: 70 - Math.round(depth * 40),
  };
}

/** Extra slot for gardens that outgrow the fixed layout. */
export function extraSlot(index: number, rand: () => number): Slot {
  return {
    id: 100 + index,
    x: 10 + rand() * 80,
    depth: 0.1 + rand() * 0.75,
  };
}

/**
 * Pick the free slot closest to where she touched.
 * @param tapX % of stage width
 * @param tapY % of stage height, measured from the top
 */
export function pickSlot(
  free: Slot[],
  tapX: number | undefined,
  tapY: number | undefined,
  maxDepth = 1,
): Slot | undefined {
  const candidates = free.filter((s) => s.depth <= maxDepth);
  const pool = candidates.length ? candidates : free;
  if (!pool.length) return undefined;
  if (tapX === undefined || tapY === undefined) {
    return pool[Math.floor(pool.length / 2)];
  }
  let best = pool[0];
  let bestD = Infinity;
  for (const s of pool) {
    const { bottom, scale } = slotStyle(s.depth);
    const centerY = 100 - bottom - 20 * scale; // roughly where the bloom sits
    const d = Math.abs(s.x - tapX) + 0.6 * Math.abs(centerY - Math.max(tapY, 40));
    if (d < bestD) {
      bestD = d;
      best = s;
    }
  }
  return best;
}
