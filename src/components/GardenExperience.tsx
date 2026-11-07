"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import type { FlowerType, FlowerVariant, GardenConfig } from "@/lib/types";
import type { CSSVars } from "@/lib/css";
import { SLOTS, extraSlot, pickSlot, slotStyle, type Slot } from "@/lib/slots";
import { hashString, mulberry32 } from "@/lib/random";
import { fill } from "@/lib/text";
import { useIsTouchDevice } from "@/hooks/useMediaQuery";
import Sky, { Fireflies, RareFirefly } from "./Sky";
import Ground from "./Ground";
import Bench from "./Bench";
import Flower from "./Flower";
import { FLOWERS } from "./flowers";
import Intro, { type IntroHandle } from "./Intro";
import MessageCard, { NoteCard, SecretCard } from "./MessageCard";
import MoodCheckIn from "./MoodCheckIn";
import FinalMessage from "./FinalMessage";
import AudioToggle from "./AudioToggle";

type Phase = "intro" | "garden";
type Overlay =
  | { kind: "flower"; id: string }
  | { kind: "secret" }
  | { kind: "bench" }
  | { kind: "star" }
  | { kind: "mood" }
  | { kind: "final" }
  | null;

interface OrderItem {
  kind: "message" | "secret";
  id: string;
  flowerType: FlowerType;
  variant: FlowerVariant;
  title: string;
}

interface PlantedFlower {
  id: string;
  slot: Slot;
}

const RARE_LIFETIME = 16000;

/** The planting order: message flowers, with the secret flower slotted in. */
function buildOrder(config: GardenConfig): OrderItem[] {
  const items: OrderItem[] = config.flowers.map((f) => ({
    kind: "message",
    id: f.id,
    flowerType: f.flowerType,
    variant: f.variant ?? "a",
    title: f.title,
  }));
  const at = Math.max(0, Math.min(config.secretFlower.plantAt, items.length));
  items.splice(at, 0, {
    kind: "secret",
    id: config.secretFlower.id,
    flowerType: config.secretFlower.flowerType,
    variant: "a",
    title: config.ui.secretFlowerLabel,
  });
  return items;
}

function initial(name: string): string {
  const m = name.match(/[A-Za-z]/);
  return m ? m[0].toUpperCase() : "";
}

export default function GardenExperience({ config }: { config: GardenConfig }) {
  const isTouch = useIsTouchDevice();
  const order = useMemo(() => buildOrder(config), [config]);
  const byId = useMemo(() => new Map(order.map((o) => [o.id, o])), [order]);
  const total = order.length;

  const [phase, setPhase] = useState<Phase>("intro");
  const [introReady, setIntroReady] = useState(false);
  const [introMounted, setIntroMounted] = useState(true);
  const [planted, setPlanted] = useState<PlantedFlower[]>([]);
  const [opened, setOpened] = useState<string[]>([]);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [moodDone, setMoodDone] = useState(false);
  const [finalState, setFinalState] = useState<"locked" | "ready" | "done">("locked");
  const [atmosphere, setAtmosphere] = useState<"night" | "moonlit">("night");
  const [hint, setHint] = useState<{ text: string; key: number } | null>(null);
  const [rare, setRare] = useState<{ x: number; y: number; fading: boolean } | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<IntroHandle>(null);
  const hintsShown = useRef({ flower: false, ground: false });
  const rareTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const warmth = total ? planted.length / total : 0;
  const allPlanted = planted.length >= total;
  // Never let a threshold exceed the number of flowers, so removing flowers can't lock the final message.
  const moodAfter = Math.max(1, Math.min(config.mood.afterFlowersOpened, total));
  const finalAfter = Math.max(1, Math.min(config.finalMessage.afterFlowersOpened, total));
  const carving =
    config.bench.carving.trim() ||
    [initial(config.myName), initial(config.herName)].filter(Boolean).join(" + ");

  // --- intro -> garden -------------------------------------------------
  useEffect(() => {
    if (phase !== "garden") return;
    const t = setTimeout(() => setIntroMounted(false), 1300);
    return () => clearTimeout(t);
  }, [phase]);

  // --- gentle hints ----------------------------------------------------
  useEffect(() => {
    if (planted.length !== 1 || opened.length > 0 || hintsShown.current.flower) return;
    const t = setTimeout(() => {
      hintsShown.current.flower = true;
      setHint({ text: config.ui.touchFlowerHint, key: Date.now() });
    }, 4500);
    return () => clearTimeout(t);
  }, [planted.length, opened.length, config.ui.touchFlowerHint]);

  useEffect(() => {
    if (!hint) return;
    const t = setTimeout(() => setHint(null), 4600);
    return () => clearTimeout(t);
  }, [hint]);

  // --- rare firefly timers --------------------------------------------
  useEffect(() => {
    const timers = rareTimers.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const spawnRare = (x: number, y: number) => {
    rareTimers.current.forEach(clearTimeout);
    rareTimers.current = [
      setTimeout(() => setRare((r) => (r ? { ...r, fading: true } : r)), RARE_LIFETIME - 1600),
      setTimeout(() => setRare(null), RARE_LIFETIME),
    ];
    setRare({ x, y, fading: false });
  };

  // --- planting --------------------------------------------------------
  const plant = (tapX?: number, tapY?: number) => {
    setPlanted((prev) => {
      if (prev.length >= order.length) return prev;
      const used = new Set(prev.map((p) => p.slot.id));
      let free = SLOTS.filter((s) => !used.has(s.id));
      if (!free.length) {
        free = [extraSlot(prev.length, mulberry32(hashString(`extra-${prev.length}`)))];
      }
      const slot = pickSlot(free, tapX, tapY, prev.length === 0 ? 0.2 : 1) ?? free[0];
      return [...prev, { id: order[prev.length].id, slot }];
    });
  };

  const stagePoint = (e: MouseEvent | PointerEvent) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return {
      px: e.clientX - rect.left,
      py: e.clientY - rect.top,
      xPct: ((e.clientX - rect.left) / rect.width) * 100,
      yPct: ((e.clientY - rect.top) / rect.height) * 100,
      rect,
    };
  };

  const handleStageClick = (e: MouseEvent<HTMLDivElement>) => {
    if (overlay) return;
    const pt = stagePoint(e);

    if (phase === "intro") {
      if (!introReady) {
        introRef.current?.advance();
        return;
      }
      setPhase("garden");
      plant(pt?.xPct, pt?.yPct);
      return;
    }

    if (rare && pt) setRare({ x: pt.px, y: pt.py, fading: false });
    if (allPlanted) return;

    plant(pt?.xPct, pt?.yPct);
    if (planted.length + 1 === 4 && !rare && pt) spawnRare(pt.px, pt.py);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || isTouch) return;
    const pt = stagePoint(e);
    const el = stageRef.current;
    if (!pt || !el) return;
    el.style.setProperty("--px", (pt.xPct / 50 - 1).toFixed(3));
    el.style.setProperty("--py", (pt.yPct / 50 - 1).toFixed(3));
  };

  // --- flowers ---------------------------------------------------------
  const openFlower = (id: string) => {
    const item = byId.get(id);
    if (!item) return;
    setOpened((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setOverlay(item.kind === "secret" ? { kind: "secret" } : { kind: "flower", id });
  };

  const closeOverlay = () => {
    const wasFlower = overlay?.kind === "flower" || overlay?.kind === "secret";
    setOverlay(null);
    if (!wasFlower) return;

    const n = opened.length;
    if (!moodDone && n >= moodAfter) {
      setTimeout(() => setOverlay((o) => o ?? { kind: "mood" }), 900);
      return;
    }
    if (finalState === "locked" && n >= finalAfter) {
      setTimeout(() => setFinalState("ready"), 1200);
      return;
    }
    if (!allPlanted && !hintsShown.current.ground) {
      hintsShown.current.ground = true;
      setHint({ text: config.ui.touchGroundHint, key: Date.now() });
    }
  };

  const handleMoon = () => {
    setAtmosphere((a) => (a === "night" ? "moonlit" : "night"));
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rare && rect) spawnRare(rect.width * 0.74, rect.height * 0.11 + 40);
  };

  const showGrowControls = opened.length >= 1;
  const activeFlower =
    overlay?.kind === "flower" ? config.flowers.find((f) => f.id === overlay.id) : undefined;

  return (
    <>
      <div
        ref={stageRef}
        className="stage"
        data-phase={phase}
        data-atmosphere={atmosphere}
        style={{ "--warmth": warmth.toFixed(3) } as CSSVars}
        onClick={handleStageClick}
        onPointerMove={handlePointerMove}
      >
        <Sky
          atmosphere={atmosphere}
          moonLabel={config.ui.moonLabel}
          starLabel={config.ui.starLabel}
          onMoon={handleMoon}
          onStar={() => setOverlay({ kind: "star" })}
        />
        <Ground />
        <Bench
          label={config.ui.benchLabel}
          carving={carving}
          date={config.importantDate}
          onOpen={() => setOverlay({ kind: "bench" })}
        />

        {planted.map((p) => {
          const item = byId.get(p.id);
          if (!item) return null;
          const st = slotStyle(p.slot.depth);
          return (
            <Flower
              key={p.id}
              id={p.id}
              type={item.flowerType}
              variant={item.variant}
              label={item.title}
              x={p.slot.x}
              bottom={st.bottom}
              scale={st.scale}
              z={st.z}
              depth={p.slot.depth}
              secret={item.kind === "secret"}
              opened={opened.includes(p.id)}
              onOpen={openFlower}
            />
          );
        })}

        <Fireflies extra={atmosphere === "moonlit"} />
        {rare && <RareFirefly x={rare.x} y={rare.y} fading={rare.fading} />}

        {introMounted && (
          <Intro
            ref={introRef}
            seal={
              config.intro.seal && {
                eyebrow: fill(config.intro.seal.eyebrow, config),
                headline: fill(config.intro.seal.headline, config),
                to: fill(config.intro.seal.to, config),
                from: fill(config.intro.seal.from, config),
                monogram: fill(config.intro.seal.monogram, config),
                prompt: fill(config.intro.seal.prompt, config),
              }
            }
            lines={config.intro.lines.map((l) => fill(l, config))}
            touchPrompt={config.intro.touchPrompt}
            leaving={phase === "garden"}
            onReady={() => setIntroReady(true)}
          />
        )}

        {phase === "garden" && (
          <div className="controls">
            {hint && (
              <p key={hint.key} className="hint" role="status">
                {hint.text}
              </p>
            )}
            {finalState === "ready" && overlay?.kind === "final" ? null : finalState === "ready" ? (
              <button
                type="button"
                className="prompt-final"
                onClick={(e) => {
                  e.stopPropagation();
                  setOverlay({ kind: "final" });
                }}
              >
                {fill(config.finalMessage.prompt, config)}
              </button>
            ) : showGrowControls ? (
              <>
                {allPlanted ? (
                  <p className="note">{config.growing.allPlantedNote}</p>
                ) : (
                  <button
                    type="button"
                    className="pill"
                    onClick={(e) => {
                      e.stopPropagation();
                      plant(10 + ((planted.length * 37) % 80), 78);
                    }}
                  >
                    {config.growing.buttonLabel}
                  </button>
                )}
                <p className="note">{config.growing.note}</p>
              </>
            ) : null}
          </div>
        )}

        {config.audio.src && (
          <AudioToggle
            src={config.audio.src}
            onLabel={config.ui.audioOn}
            offLabel={config.ui.audioOff}
          />
        )}
      </div>

      {activeFlower && (
        <MessageCard
          title={fill(activeFlower.title, config)}
          message={fill(activeFlower.message, config)}
          accent={FLOWERS[activeFlower.flowerType].accent[activeFlower.variant ?? "a"]}
          quote={
            activeFlower.quote
              ? { text: fill(activeFlower.quote.text, config), author: activeFlower.quote.author }
              : undefined
          }
          image={activeFlower.image}
          closeLabel={config.ui.close}
          onClose={closeOverlay}
        />
      )}
      {overlay?.kind === "secret" && (
        <SecretCard
          foundText={fill(config.secretFlower.foundText, config)}
          letter={fill(config.secretFlower.letter, config)}
          closeLabel={config.ui.close}
          onClose={closeOverlay}
        />
      )}
      {overlay?.kind === "bench" && (
        <NoteCard
          text={fill(config.bench.message, config)}
          closeLabel={config.ui.close}
          onClose={closeOverlay}
        />
      )}
      {overlay?.kind === "star" && (
        <NoteCard
          text={fill(config.hiddenDetails.starMessage, config)}
          closeLabel={config.ui.close}
          onClose={closeOverlay}
        />
      )}
      {overlay?.kind === "mood" && (
        <MoodCheckIn
          config={config.mood}
          phoneNumber={config.phoneNumber}
          isTouch={isTouch}
          onClose={() => {
            setMoodDone(true);
            closeOverlay();
          }}
        />
      )}
      {overlay?.kind === "final" && (
        <FinalMessage
          lines={config.finalMessage.lines.map((l) => fill(l, config))}
          signOff={fill(config.finalMessage.signOff, config)}
          backLabel={config.ui.backToGarden}
          onClose={() => {
            setFinalState("done");
            closeOverlay();
          }}
        />
      )}
    </>
  );
}
