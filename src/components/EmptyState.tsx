import * as React from "react";
import { cx } from "../utils";

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div className={cx("hxn-empty", className)} {...props}>
      <div>
        <h3 className="hxn-empty__title">{title}</h3>
        {description ? <p className="hxn-empty__description">{description}</p> : null}
      </div>
      {action ? <div className="hxn-empty__action">{action}</div> : null}
    </div>
  );
}
