"use client";

import { useEffect, useImperativeHandle, useMemo, useRef, useState, type Ref } from "react";
import SequentialText, { type SequentialTextHandle } from "./SequentialText";
import type { CSSVars } from "@/lib/css";
import { mulberry32 } from "@/lib/random";

export interface IntroHandle {
  advance: () => void;
}

export interface SealConfig {
  eyebrow: string;
  headline: string;
  to: string;
  from: string;
  monogram: string;
  prompt: string;
}

interface IntroProps {
  seal?: SealConfig;
  lines: string[];
  touchPrompt: string;
  leaving: boolean;
  onReady: () => void;
  ref?: Ref<IntroHandle>;
}

function Petals() {
  const petals = useMemo(() => {
    const rnd = mulberry32(14);
    return Array.from({ length: 18 }, (_, i) => ({
      key: i,
      style: {
        "--x": `${(rnd() * 100).toFixed(1)}%`,
        "--d": `${(9 + rnd() * 9).toFixed(1)}s`,
        "--delay": `${(-rnd() * 18).toFixed(1)}s`,
        "--s": (0.55 + rnd() * 0.75).toFixed(2),
        "--drift": `${(rnd() * 120 - 60).toFixed(0)}px`,
        "--spin": `${(rnd() * 540 + 180).toFixed(0)}deg`,
      } as CSSVars,
    }));
  }, []);
  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p) => (
        <span key={p.key} className="petal-fall" style={p.style} />
      ))}
    </div>
  );
}

function Seal({ config, broken }: { config: SealConfig; broken: boolean }) {
  return (
    <div className={`seal-screen${broken ? " is-broken" : ""}`} role="dialog" aria-live="polite">
      <Petals />
      <div className="seal-content">
        <p className="seal-eyebrow">{config.eyebrow}</p>
        <h1 className="seal-headline">{config.headline}</h1>
        <div className="seal-rule" aria-hidden="true">
          <span />
          <i>&#10087;</i>
          <span />
        </div>
        <p className="seal-to">{config.to}</p>
        <p className="seal-from">{config.from}</p>

        <div className="wax" aria-hidden="true">
          <div className="wax-half wax-left">
            <div className="wax-disc">
              <span>{config.monogram}</span>
            </div>
          </div>
          <div className="wax-half wax-right">
            <div className="wax-disc">
              <span>{config.monogram}</span>
            </div>
          </div>
          <div className="wax-glow" />
        </div>

        <p className="seal-prompt">{config.prompt}</p>
      </div>
    </div>
  );
}

export default function Intro({ seal, lines, touchPrompt, leaving, onReady, ref }: IntroProps) {
  const seqRef = useRef<SequentialTextHandle>(null);
  const [sealState, setSealState] = useState<"closed" | "breaking" | "gone">(
    seal ? "closed" : "gone",
  );
  const [ready, setReady] = useState(false);
  const onReadyRef = useRef(onReady);
  useEffect(() => {
    onReadyRef.current = onReady;
  });

  useEffect(() => {
    if (sealState !== "breaking") return;
    const t = setTimeout(() => setSealState("gone"), 2200);
    return () => clearTimeout(t);
  }, [sealState]);

  useImperativeHandle(
    ref,
    () => ({
      advance: () => {
        if (sealState === "closed") {
          setSealState("breaking");
          return;
        }
        if (sealState === "gone") seqRef.current?.advance();
      },
    }),
    [sealState],
  );

  return (
    <>
      {seal && sealState !== "gone" && <Seal config={seal} broken={sealState === "breaking"} />}
      <div className={`intro${leaving ? " is-leaving" : ""}`}>
        {sealState !== "gone" ? null : ready ? (
          <div className="seq">
            <p className="touch-prompt">{touchPrompt}</p>
          </div>
        ) : (
          <SequentialText
            ref={seqRef}
            lines={lines}
            mode="replace"
            hold={2600}
            fade={1100}
            startDelay={700}
            onDone={() => {
              setReady(true);
              onReadyRef.current();
            }}
          />
        )}
      </div>
    </>
  );
}
