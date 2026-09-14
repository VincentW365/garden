import type { CSSProperties } from "react";

/** CSSProperties that also allows custom properties like `--warmth`. */
export type CSSVars = CSSProperties & Record<`--${string}`, string | number>;
