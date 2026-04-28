import * as React from "react";
import { cx } from "../utils";

export interface LiveCounterProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  hideZero?: boolean;
}

export function LiveCounter({ value, hideZero = true, className, ...props }: LiveCounterProps) {
  const previousRef = React.useRef<number>(value);
  const [isPulse, setIsPulse] = React.useState(false);

  React.useEffect(() => {
    if (value !== previousRef.current) {
      previousRef.current = value;
      setIsPulse(true);
      const timer = window.setTimeout(() => setIsPulse(false), 350);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [value]);

  if (hideZero && value <= 0) return null;

  return (
    <span
      className={cx("hxn-live-counter", isPulse && "hxn-live-counter--pulse", className)}
      {...props}
    >
      {value}
    </span>
  );
}
