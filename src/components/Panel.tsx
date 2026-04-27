import * as React from "react";
import { cx } from "../utils";

export interface PanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export function Panel({
  eyebrow,
  title,
  meta,
  actions,
  children,
  className,
  ...props
}: PanelProps) {
  const hasHeader = eyebrow || title || meta || actions;

  return (
    <section className={cx("hxn-panel", className)} {...props}>
      {hasHeader ? (
        <header className="hxn-panel__header">
          <div className="hxn-panel__title-wrap">
            {eyebrow ? <p className="hxn-eyebrow">{eyebrow}</p> : null}
            {title ? <h2 className="hxn-panel__title">{title}</h2> : null}
            {meta ? <div className="hxn-panel__meta">{meta}</div> : null}
          </div>
          {actions ? <div className="hxn-panel__actions">{actions}</div> : null}
        </header>
      ) : null}
      <div className="hxn-panel__body">{children}</div>
    </section>
  );
}
