import * as React from "react";
import { cx } from "../utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "secondary",
      size = "md",
      fullWidth = false,
      iconLeft,
      iconRight,
      className,
      children,
      type = "button",
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      className={cx(
        "hxn-button",
        `hxn-button--${variant}`,
        `hxn-button--${size}`,
        fullWidth && "hxn-button--full",
        className
      )}
      {...props}
    >
      {iconLeft ? <span className="hxn-button__icon">{iconLeft}</span> : null}
      <span className="hxn-button__label">{children}</span>
      {iconRight ? <span className="hxn-button__icon">{iconRight}</span> : null}
    </button>
  )
);

Button.displayName = "Button";

