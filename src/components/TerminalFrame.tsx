import * as React from "react";
import { cx } from "../utils";
import { StatusDot } from "./StatusDot";

export interface TerminalFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  leftInset?: React.ReactNode;
  simplified?: boolean;
}

export const TerminalFrame = React.forwardRef<HTMLDivElement, TerminalFrameProps>(
  (
    {
      title = "AYA-9X AUTH CONSOLE",
      subtitle = "NODE HANDSHAKE ACK",
      leftInset,
      simplified = false,
      className,
      children,
      ...props
    },
    ref
  ) => (
    <section ref={ref} className={cx("hxn-terminal-frame", className)} {...props}>
      <div className="hxn-terminal-frame__bezel">
        {!simplified ? (
          <>
            <span className="hxn-terminal-frame__screw hxn-terminal-frame__screw--tl" />
            <span className="hxn-terminal-frame__screw hxn-terminal-frame__screw--tr" />
            <span className="hxn-terminal-frame__screw hxn-terminal-frame__screw--bl" />
            <span className="hxn-terminal-frame__screw hxn-terminal-frame__screw--br" />
          </>
        ) : null}

        <header className="hxn-terminal-frame__head">
          <div>
            <p className="hxn-terminal-frame__title">{title}</p>
            <p className="hxn-terminal-frame__subtitle">{subtitle}</p>
          </div>
          <div className="hxn-terminal-frame__leds" aria-label="Terminal status">
            <span className="hxn-terminal-frame__led-unit">
              <StatusDot status="online" size="sm" />
              <span>POWER</span>
            </span>
            <span className="hxn-terminal-frame__led-unit">
              <StatusDot status="amber" size="sm" />
              <span>LINK</span>
            </span>
            <span className="hxn-terminal-frame__led-unit hxn-terminal-frame__led-unit--rec">
              <StatusDot status="red" size="sm" />
              <span>REC</span>
            </span>
          </div>
        </header>

        <div
          className={cx(
            "hxn-terminal-frame__body",
            leftInset ? "hxn-terminal-frame__body--inset" : undefined
          )}
        >
          {leftInset ? (
            <aside className="hxn-terminal-frame__inset hxn-surface-crt">{leftInset}</aside>
          ) : null}
          <div className="hxn-terminal-frame__screen hxn-surface-crt">{children}</div>
        </div>
      </div>
    </section>
  )
);

TerminalFrame.displayName = "TerminalFrame";
