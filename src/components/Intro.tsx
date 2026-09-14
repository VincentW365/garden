"use client";

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import SequentialText, { type SequentialTextHandle } from "./SequentialText";

export interface IntroHandle {
  advance: () => void;
}

interface IntroProps {
  lines: string[];
  touchPrompt: string;
  leaving: boolean;
  onReady: () => void;
  ref?: Ref<IntroHandle>;
}

export default function Intro({ lines, touchPrompt, leaving, onReady, ref }: IntroProps) {
  const seqRef = useRef<SequentialTextHandle>(null);
  const [ready, setReady] = useState(false);
  const onReadyRef = useRef(onReady);
  useEffect(() => {
    onReadyRef.current = onReady;
  });

  useImperativeHandle(ref, () => ({ advance: () => seqRef.current?.advance() }), []);

  return (
    <div className={`intro${leaving ? " is-leaving" : ""}`}>
      {ready ? (
        <div className="seq">
          <p className="touch-prompt">{touchPrompt}</p>
        </div>
      ) : (
        <SequentialText
          ref={seqRef}
          lines={lines}
          mode="replace"
          hold={2500}
          fade={1000}
          startDelay={1300}
          onDone={() => {
            setReady(true);
            onReadyRef.current();
          }}
        />
      )}
    </div>
  );
}
