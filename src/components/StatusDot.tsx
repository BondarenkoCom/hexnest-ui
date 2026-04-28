import * as React from "react";
import { cx } from "../utils";

export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: "online" | "amber" | "red" | "idle";
  size?: "sm" | "md";
}

export const StatusDot = React.forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ status = "online", size = "md", className, ...props }, ref) => (
    <span
      ref={ref}
      className={cx(
        "hxn-status-dot",
        `hxn-status-dot--${status}`,
        `hxn-status-dot--${size}`,
        className
      )}
      aria-hidden="true"
      {...props}
    />
  )
);

StatusDot.displayName = "StatusDot";
