"use client";

import { useId, useState } from "react";
import Sheet from "./Sheet";
import SequentialText from "./SequentialText";

interface FinalMessageProps {
  lines: string[];
  signOff: string;
  backLabel: string;
  onClose: () => void;
}

export default function FinalMessage({ lines, signOff, backLabel, onClose }: FinalMessageProps) {
  const id = useId();
  const [done, setDone] = useState(false);
  return (
    <Sheet variant="full" dismissible={false} onClose={onClose} labelledBy={id}>
      {(requestClose) => (
        <div className="final">
          <h2 id={id} className="sr-only">
            {lines[0]}
          </h2>
          <SequentialText
            lines={lines}
            mode="replace"
            hold={2700}
            fade={1200}
            startDelay={1500}
            keepLast
            onDone={() => setDone(true)}
          />
          {done && (
            <>
              {signOff && <p className="final-signoff">{signOff}</p>}
              <div className="final-actions">
                <button type="button" className="btn" onClick={requestClose}>
                  {backLabel}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Sheet>
  );
}
