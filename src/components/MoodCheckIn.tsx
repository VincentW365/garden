"use client";

import { useId, useState } from "react";
import Sheet from "./Sheet";
import SequentialText from "./SequentialText";
import type { MoodConfig, MoodKey } from "@/lib/types";

interface MoodCheckInProps {
  config: MoodConfig;
  phoneNumber: string;
  isTouch: boolean;
  onClose: () => void;
}

const KEYS: MoodKey[] = ["bad", "meh", "better", "needYou"];

export default function MoodCheckIn({ config, phoneNumber, isTouch, onClose }: MoodCheckInProps) {
  const id = useId();
  const [choice, setChoice] = useState<MoodKey | null>(null);
  const [done, setDone] = useState(false);

  const showCall = choice === "needYou" && isTouch && phoneNumber.trim() !== "";

  return (
    <Sheet onClose={onClose} labelledBy={id}>
      {(requestClose) =>
        choice === null ? (
          <>
            <h2 id={id} className="mood-q">
              {config.prompt}
            </h2>
            <div className="mood-grid">
              {KEYS.map((k) => (
                <button key={k} type="button" className="mood-opt" onClick={() => setChoice(k)}>
                  <span className="emoji" aria-hidden="true">
                    {config.options[k].emoji}
                  </span>
                  {config.options[k].label}
                </button>
              ))}
            </div>
            <div className="mood-foot">
              <button type="button" className="btn-link" onClick={requestClose}>
                {config.actions.notNow}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 id={id} className="sr-only">
              {config.prompt}
            </h2>
            <div className="mood-resp">
              <SequentialText
                mode="stack"
                lines={config.responses[choice]}
                hold={2000}
                fade={900}
                startDelay={400}
                onDone={() => setDone(true)}
              />
            </div>
            {done && (
              <div
                className="card-actions"
                style={{ justifyContent: "center", animation: "fade-in 1s ease forwards" }}
              >
                {showCall && (
                  <a className="btn btn-primary" href={`tel:${phoneNumber.replace(/\s+/g, "")}`}>
                    {config.actions.callMe}
                  </a>
                )}
                <button type="button" className="btn" onClick={requestClose}>
                  {choice === "meh" ? config.actions.findAnother : config.actions.backToGarden}
                </button>
              </div>
            )}
          </>
        )
      }
    </Sheet>
  );
}
