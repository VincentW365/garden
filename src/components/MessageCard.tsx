"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import Sheet from "./Sheet";
import { paragraphs } from "@/lib/text";
import type { CSSVars } from "@/lib/css";

interface MessageCardProps {
  title: string;
  message: string;
  accent: string;
  quote?: { text: string; author: string };
  image?: { src: string; alt: string };
  closeLabel: string;
  onClose: () => void;
}

function Body({ text }: { text: string }) {
  return (
    <div className="card-body">
      {paragraphs(text).map((p, i) => (
        <p key={i} style={{ whiteSpace: "pre-line" }}>
          {p}
        </p>
      ))}
    </div>
  );
}

export default function MessageCard({
  title,
  message,
  accent,
  quote,
  image,
  closeLabel,
  onClose,
}: MessageCardProps) {
  const id = useId();
  const accentStyle: CSSVars = { "--accent": accent, "--accent-glow": `${accent}59` };
  return (
    <Sheet onClose={onClose} labelledBy={id}>
      {(requestClose) => (
        <>
          <div className="card-accent" style={accentStyle} aria-hidden="true" />
          {image && (
            <div className="card-image">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, 540px"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
          <h2 id={id} className="card-title">
            {title}
          </h2>
          {quote && (
            <blockquote className="card-quote">
              <p>&ldquo;{quote.text}&rdquo;</p>
              <footer>&mdash; {quote.author}</footer>
            </blockquote>
          )}
          <Body text={message} />
          <div className="card-actions">
            <button type="button" className="btn" onClick={requestClose}>
              {closeLabel}
            </button>
          </div>
        </>
      )}
    </Sheet>
  );
}

interface SecretCardProps {
  foundText: string;
  letter: string;
  closeLabel: string;
  onClose: () => void;
}

/** "You found this one." — then the letter. */
export function SecretCard({ foundText, letter, closeLabel, onClose }: SecretCardProps) {
  const id = useId();
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 2800);
    return () => clearTimeout(t);
  }, []);
  return (
    <Sheet onClose={onClose} labelledBy={id}>
      {(requestClose) =>
        revealed ? (
          <div className="letter">
            <h2 id={id} className="card-title">
              {foundText}
            </h2>
            <Body text={letter} />
            <div className="card-actions">
              <button type="button" className="btn" onClick={requestClose}>
                {closeLabel}
              </button>
            </div>
          </div>
        ) : (
          <p id={id} className="found">
            {foundText}
          </p>
        )
      }
    </Sheet>
  );
}

interface NoteCardProps {
  text: string;
  closeLabel: string;
  onClose: () => void;
}

/** Small centred card for the bench and the star. */
export function NoteCard({ text, closeLabel, onClose }: NoteCardProps) {
  const id = useId();
  return (
    <Sheet onClose={onClose} labelledBy={id} variant="center">
      {(requestClose) => (
        <>
          <p id={id} className="star-message">
            {text}
          </p>
          <div className="card-actions" style={{ justifyContent: "center" }}>
            <button type="button" className="btn" onClick={requestClose}>
              {closeLabel}
            </button>
          </div>
        </>
      )}
    </Sheet>
  );
}
