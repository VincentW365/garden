"use client";

import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type Ref,
} from "react";
import type { CSSVars } from "@/lib/css";

export interface SequentialTextHandle {
  /** Skip ahead to the next line, if the current one has been visible long enough. */
  advance: () => void;
}

interface Props {
  lines: string[];
  /** "replace": one line at a time. "stack": lines accumulate. */
  mode?: "replace" | "stack";
  /** ms a line stays fully visible (replace) / interval between lines (stack). */
  hold?: number;
  /** ms for each fade. */
  fade?: number;
  startDelay?: number;
  /** replace mode: keep the last line on screen instead of fading it out. */
  keepLast?: boolean;
  /** replace mode: minimum visible time before `advance()` is honoured. */
  minHold?: number;
  onDone?: () => void;
  className?: string;
  lineClassName?: string;
  ref?: Ref<SequentialTextHandle>;
}

export default function SequentialText({
  lines,
  mode = "replace",
  hold = 2300,
  fade = 900,
  startDelay = 600,
  keepLast = false,
  minHold = 900,
  onDone,
  className = "",
  lineClassName = "",
  ref,
}: Props) {
  const total = lines.length;
  // replace mode: -1 = initial pause; even = showing line (stage / 2); odd = fading out.
  const [stage, setStage] = useState(-1);
  // stack mode: how many lines are on screen.
  const [count, setCount] = useState(0);

  const onDoneRef = useRef(onDone);
  const shownAtRef = useRef(0);
  useEffect(() => {
    onDoneRef.current = onDone;
  });

  const idx = stage < 0 ? -1 : Math.floor(stage / 2);
  const showing = stage >= 0 && stage % 2 === 0;

  useImperativeHandle(
    ref,
    () => ({
      advance() {
        if (mode !== "replace" || !showing) return;
        if (Date.now() - shownAtRef.current < minHold) return;
        if (idx === total - 1 && keepLast) return;
        setStage((s) => (s % 2 === 0 ? s + 1 : s));
      },
    }),
    [mode, showing, idx, total, keepLast, minHold],
  );

  useEffect(() => {
    if (showing) shownAtRef.current = Date.now();
  }, [showing, stage]);

  // replace mode timeline
  useEffect(() => {
    if (mode !== "replace" || total === 0) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    if (stage === -1) {
      t = setTimeout(() => setStage(0), startDelay);
    } else if (idx >= total) {
      return;
    } else if (showing) {
      const isLast = idx === total - 1;
      if (isLast && keepLast) {
        t = setTimeout(() => onDoneRef.current?.(), fade + hold);
      } else {
        t = setTimeout(() => setStage(stage + 1), fade + hold);
      }
    } else {
      const isLast = idx === total - 1;
      t = setTimeout(() => {
        setStage(stage + 1);
        if (isLast) onDoneRef.current?.();
      }, fade);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [mode, stage, idx, showing, total, startDelay, hold, fade, keepLast]);

  // stack mode timeline
  useEffect(() => {
    if (mode !== "stack" || count >= total) return;
    const t = setTimeout(() => setCount(count + 1), count === 0 ? startDelay : hold);
    return () => clearTimeout(t);
  }, [mode, count, total, startDelay, hold]);

  useEffect(() => {
    if (mode !== "stack" || total === 0 || count < total) return;
    const t = setTimeout(() => onDoneRef.current?.(), fade);
    return () => clearTimeout(t);
  }, [mode, count, total, fade]);

  const style: CSSVars = { "--fade": `${fade}ms` };

  if (mode === "stack") {
    return (
      <div className={`seq-stack ${className}`} style={style} aria-live="polite">
        {lines.slice(0, count).map((line, i) => (
          <p key={i} className={`seq-line is-in ${lineClassName}`}>
            {line}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className={`seq ${className}`} style={style} aria-live="polite">
      {idx >= 0 && idx < total && (
        <p key={idx} className={`seq-line ${showing ? "is-in" : "is-out"} ${lineClassName}`}>
          {lines[idx]}
        </p>
      )}
    </div>
  );
}
