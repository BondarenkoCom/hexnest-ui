import * as React from "react";
import { cx } from "../utils";

export interface TabItem {
  key: string;
  label: React.ReactNode;
  count?: number;
  disabled?: boolean;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  ariaLabel?: string;
}

export function Tabs({
  items,
  activeKey,
  onChange,
  ariaLabel = "Tabs",
  className,
  ...props
}: TabsProps) {
  return (
    <div className={cx("hxn-tabs", className)} role="tablist" aria-label={ariaLabel} {...props}>
      {items.map((item) => {
        const active = item.key === activeKey;
        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={item.disabled}
            className={cx("hxn-tab", active && "hxn-tab--active")}
            onClick={() => {
              if (!item.disabled) {
                onChange(item.key);
              }
            }}
          >
            <span>{item.label}</span>
            {typeof item.count === "number" ? <span className="hxn-tab__count">{item.count}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
