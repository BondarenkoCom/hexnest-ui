import * as React from "react";
import { cx } from "../utils";

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "soft" | "deep" | "hot";
  crt?: boolean;
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ tone = "soft", crt = false, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cx(
        "hxn-glass-panel",
        tone === "deep" && "hxn-glass-panel--deep",
        tone === "hot" && "hxn-glass-panel--hot",
        crt && "hxn-glass-panel--crt",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

GlassPanel.displayName = "GlassPanel";
