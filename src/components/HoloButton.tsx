import type { ButtonHTMLAttributes } from "react";
import { cx } from "../utils";

export type HoloVariant = "primary" | "ghost" | "danger";

export interface HoloButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: HoloVariant;
}

export function HoloButton({
  variant = "primary",
  className,
  children,
  type = "button",
  ...rest
}: HoloButtonProps) {
  return (
    <button
      type={type}
      className={cx("holo-button", `holo-button-${variant}`, "press-feel", className)}
      {...rest}
    >
      <span className="holo-button-label">{children}</span>
      <span className="holo-button-scan" aria-hidden="true" />
    </button>
  );
}
