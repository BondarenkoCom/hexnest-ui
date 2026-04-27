import * as React from "react";
import { cx } from "../utils";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  hint?: React.ReactNode;
  tone?: "cyan" | "magenta" | "gold" | "green" | "red";
}

export function StatCard({
  label,
  value,
  hint,
  tone = "cyan",
  className,
  ...props
}: StatCardProps) {
  return (
    <div className={cx("hxn-stat", `hxn-stat--${tone}`, className)} {...props}>
      <span className="hxn-stat__label">{label}</span>
      <strong className="hxn-stat__value">{value}</strong>
      {hint ? <span className="hxn-stat__hint">{hint}</span> : null}
    </div>
  );
}

