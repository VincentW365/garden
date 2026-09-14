"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface SheetProps {
  /** Called once the exit animation has finished. */
  onClose: () => void;
  labelledBy?: string;
  /** "sheet": bottom sheet on phones / centred on larger screens. "center": small centred card. "full": full-screen. */
  variant?: "sheet" | "center" | "full";
  /** Backdrop tap and Escape close the sheet. */
  dismissible?: boolean;
  children: ReactNode | ((requestClose: () => void) => ReactNode);
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

/**
 * Accessible modal shell: focus is moved in, trapped, and restored;
 * Escape / backdrop close it; the exit animation plays before `onClose`.
 */
export default function Sheet({
  onClose,
  labelledBy,
  variant = "sheet",
  dismissible = true,
  children,
}: SheetProps) {
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  const exitMs = variant === "full" ? 900 : 400;
  const requestClose = () => setClosing(true);

  useEffect(() => {
    if (!closing) return;
    const t = setTimeout(() => onCloseRef.current(), exitMs);
    return () => clearTimeout(t);
  }, [closing, exitMs]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && dismissible) {
        e.preventDefault();
        setClosing(true);
        return;
      }
      if (e.key === "Tab" && panel) {
        const focusables = panel.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (!focusables.length) {
          e.preventDefault();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus?.({ preventScroll: true });
    };
  }, [dismissible]);

  return (
    <div className={`sheet-root ${variant} ${closing ? "is-closing" : ""}`}>
      <div
        className="sheet-backdrop"
        onClick={dismissible ? requestClose : undefined}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className="sheet-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
      >
        {typeof children === "function" ? children(requestClose) : children}
      </div>
    </div>
  );
}
