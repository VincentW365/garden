"use client";

import { useEffect, useRef, useState } from "react";
import type { GardenConfig } from "@/lib/types";
import { fill, paragraphs } from "@/lib/text";
import Sky, { Fireflies } from "./Sky";
import Ground from "./Ground";
import { Seal } from "./Intro";

/** Fades a block in the first time it scrolls into view. */
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal${shown ? " is-shown" : ""} ${className}`}>
      {children}
    </div>
  );
}

export default function ApologyExperience({ config }: { config: GardenConfig }) {
  const seal = config.intro.seal;
  const apology = config.apology;
  const [sealState, setSealState] = useState<"closed" | "breaking" | "gone">(
    seal ? "closed" : "gone",
  );

  useEffect(() => {
    if (sealState !== "breaking") return;
    const t = setTimeout(() => setSealState("gone"), 2200);
    return () => clearTimeout(t);
  }, [sealState]);

  const f = (s: string) => fill(s, config);
  const stanzas = paragraphs(f(apology.body));

  return (
    <>
      <div className="stage" data-phase="garden" data-atmosphere="moonlit">
        <Sky atmosphere="moonlit" moonLabel="" starLabel="" onMoon={() => {}} onStar={() => {}} />
        <Ground />
        <Fireflies extra />
      </div>

      {sealState !== "closed" && (
        <main className={`letter-scroll${sealState === "gone" ? " is-open" : ""}`}>
          <article className="apology">
            <header className="apology-head">
              {apology.eyebrow && <p className="seal-eyebrow">{f(apology.eyebrow)}</p>}
              <h1 className="apology-title">{f(apology.title)}</h1>
              <div className="seal-rule" aria-hidden="true">
                <span />
                <i>&#10087;</i>
                <span />
              </div>
            </header>

            <Reveal>
              <p className="apology-greeting">{f(apology.greeting)}</p>
            </Reveal>

            {stanzas.map((s, i) => (
              <Reveal key={i}>
                <p className="apology-stanza">{s}</p>
              </Reveal>
            ))}

            {apology.closing.length > 0 || apology.signOff ? (
              <Reveal className="apology-closing">
                <div className="apology-flourish" aria-hidden="true">
                  &#10087;
                </div>
                {apology.closing.map((line, i) => (
                  <p key={i} className="apology-close-line" style={{ animationDelay: `${0.5 + i * 1.1}s` }}>
                    {f(line)}
                  </p>
                ))}
                {apology.signOff && <p className="apology-signoff">{f(apology.signOff)}</p>}
              </Reveal>
            ) : (
              <Reveal>
                <div className="apology-flourish apology-end" aria-hidden="true">
                  &#10087;
                </div>
              </Reveal>
            )}
          </article>
        </main>
      )}

      {seal && sealState !== "gone" && (
        <div
          className="seal-tap"
          onClick={() => setSealState((s) => (s === "closed" ? "breaking" : s))}
        >
          <Seal
            broken={sealState === "breaking"}
            config={{
              eyebrow: f(seal.eyebrow),
              headline: f(seal.headline),
              to: f(seal.to),
              from: f(seal.from),
              monogram: f(seal.monogram),
              prompt: f(seal.prompt),
            }}
          />
        </div>
      )}
    </>
  );
}
