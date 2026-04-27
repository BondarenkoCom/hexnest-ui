import * as React from "react";
import { cx } from "../utils";

export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
  dot?: boolean;
}

export function StatusPill({
  tone = "neutral",
  dot = true,
  className,
  children,
  ...props
}: StatusPillProps) {
  return (
    <span className={cx("hxn-pill", `hxn-pill--${tone}`, className)} {...props}>
      {dot ? <span className="hxn-pill__dot" aria-hidden="true" /> : null}
      <span>{children}</span>
    </span>
  );
}

