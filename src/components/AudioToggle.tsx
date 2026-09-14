"use client";

import { useEffect, useRef, useState } from "react";

interface AudioToggleProps {
  src: string;
  /** Label while sound is playing (the action is to turn it off). */
  onLabel: string;
  /** Label while sound is off (the action is to turn it on). */
  offLabel: string;
}

/**
 * Discreet ambient-audio toggle. Nothing plays until she taps it.
 * Rendered only when `audio.src` is set in the config.
 */
export default function AudioToggle({ src, onLabel, offLabel }: AudioToggleProps) {
  const [on, setOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggle = async () => {
    if (!audioRef.current) {
      const a = new Audio(src);
      a.loop = true;
      a.preload = "auto";
      audioRef.current = a;
    }
    const a = audioRef.current;
    if (on) {
      a.pause();
      setOn(false);
      return;
    }
    try {
      a.volume = 0.6;
      await a.play();
      setOn(true);
    } catch {
      setOn(false);
    }
  };

  return (
    <button
      type="button"
      className="audio-toggle"
      aria-pressed={on}
      aria-label={on ? onLabel : offLabel}
      onClick={(e) => {
        e.stopPropagation();
        void toggle();
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 10v4h3l4 3.5v-11L7 10H4z" />
        {on ? (
          <>
            <path d="M15 9.5a3.5 3.5 0 0 1 0 5" />
            <path d="M17.5 7a7 7 0 0 1 0 10" />
          </>
        ) : (
          <path d="M16 9.5l5 5M21 9.5l-5 5" />
        )}
      </svg>
    </button>
  );
}
