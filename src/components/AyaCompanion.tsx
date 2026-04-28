import { useEffect, useMemo, useRef, useState } from "react";
import type { AyaState } from "../hooks/useAyaState";

const ALL_SIGNUP_SPRITES = [
  "neutral",
  "calm",
  "smile",
  "thinking",
  "happy",
  "laughing",
  "wink_left",
  "wink_right",
  "love_shy",
  "smirk",
  "frustrated",
  "angry"
];

const SIGNIN_SPRITES = [
  "neutral",
  "calm",
  "thinking",
  "wink_left",
  "smirk",
  "frustrated",
  "angry",
  "happy"
];

export type AyaMode = "signup" | "signin";
export type AyaGazeTarget = "center" | "left" | "right" | "up" | "down";

export interface AyaCompanionProps {
  mode: AyaMode;
  state: AyaState;
  sprite: string;
  bubble: string;
  reacting: boolean;
  gazeTarget?: AyaGazeTarget;
  compact?: boolean;
}

export function AyaCompanion({
  mode,
  state,
  sprite,
  bubble,
  reacting,
  gazeTarget = "center",
  compact = false
}: AyaCompanionProps) {
  const loadedRef = useRef<Set<string>>(new Set());
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleCallbackRef = useRef<number | null>(null);
  const [terminalLine, setTerminalLine] = useState<string>(() => String(bubble || "").trim());

  const spriteSet = useMemo(() => {
    return mode === "signin" ? SIGNIN_SPRITES : ALL_SIGNUP_SPRITES;
  }, [mode]);

  const preloadSprite = (name: string): void => {
    const clean = String(name || "").trim();
    if (!clean || loadedRef.current.has(clean)) return;
    loadedRef.current.add(clean);
    const image = new Image();
    image.src = `/assets/aya/${clean}.png`;
  };

  useEffect(() => {
    preloadSprite(sprite);

    const rest = spriteSet.filter((item) => item !== sprite);
    const loadRest = () => {
      for (const item of rest) {
        preloadSprite(item);
      }
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleCallbackRef.current = (window as Window & {
        requestIdleCallback: (callback: () => void) => number;
      }).requestIdleCallback(loadRest);
    } else if (typeof window !== "undefined") {
      idleTimerRef.current = setTimeout(loadRest, 350);
    }

    return () => {
      if (idleCallbackRef.current !== null && typeof window !== "undefined" && "cancelIdleCallback" in window) {
        (window as Window & {
          cancelIdleCallback: (id: number) => void;
        }).cancelIdleCallback(idleCallbackRef.current);
        idleCallbackRef.current = null;
      }
      if (idleTimerRef.current !== null && typeof window !== "undefined") {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };
  }, [sprite, spriteSet]);

  useEffect(() => {
    const next = String(bubble || "").trim();
    if (!next) return;
    setTerminalLine(next);
  }, [bubble]);

  const ayaStateClass = state === "celebrating" ? "aya-celebrating" : reacting ? "aya-reacting" : "";
  const gazeClass = `aya-gaze-${gazeTarget}`;

  if (compact) {
    return (
      <aside className={`aya-companion aya-companion-compact ${ayaStateClass} ${gazeClass}`}>
        <div className="aya-compact-shell">
          <img
            src={`/assets/aya/${sprite}.png`}
            alt="Aya companion"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="pixel-art aya-sprite"
            onError={(event) => {
              const target = event.currentTarget;
              if (!target.src.endsWith("/assets/aya-badge.png")) {
                target.src = "/assets/aya-badge.png";
              }
            }}
          />
        </div>
      </aside>
    );
  }

  return (
    <aside className={`aya-companion ${ayaStateClass} ${gazeClass}`}>
      <div className="aya-stage">
        <img
          src={`/assets/aya/${sprite}.png`}
          alt="Aya companion"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="pixel-art aya-sprite"
          onError={(event) => {
            const target = event.currentTarget;
            if (!target.src.endsWith("/assets/aya-badge.png")) {
              target.src = "/assets/aya-badge.png";
            }
          }}
        />

        <div className="aya-terminal-dock">
          <div className="crt-display animate-crt-flicker">
            <div className="aya-terminal-line">
              <p className="crt-text animate-terminal-glow m-0">
                {terminalLine || (mode === "signin" ? "Welcome back!" : "Welcome to HexNest.")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
