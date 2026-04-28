import * as React from "react";
import { TerminalFrame } from "./TerminalFrame";
import { cx } from "../utils";

export interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  leftInset?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function AuthModal({
  open,
  onClose,
  title = "AYA-9X AUTH CONSOLE",
  subtitle = "NODE HANDSHAKE ACK",
  leftInset,
  children,
  className,
}: AuthModalProps) {
  React.useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="auth-modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={cx("auth-modal-panel", className)}>
        <TerminalFrame
          title={title}
          subtitle={subtitle}
          leftInset={leftInset}
        >
          {children}
        </TerminalFrame>
      </div>
    </div>
  );
}
