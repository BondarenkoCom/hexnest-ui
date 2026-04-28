import * as React from "react";
import { cx } from "../utils";

export interface ScanlinesProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: "soft" | "medium" | "hard";
}

export const Scanlines = React.forwardRef<HTMLDivElement, ScanlinesProps>(
  ({ intensity = "soft", className, ...props }, ref) => (
    <div
      ref={ref}
      className={cx("hxn-scanlines", `hxn-scanlines--${intensity}`, className)}
      aria-hidden="true"
      {...props}
    />
  )
);

Scanlines.displayName = "Scanlines";
