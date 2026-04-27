export const hexnestTokens = {
  color: {
    bg: "#050b12",
    surface: "#07131f",
    panel: "rgba(7, 20, 32, 0.86)",
    panelStrong: "rgba(9, 27, 43, 0.94)",
    border: "rgba(55, 200, 245, 0.28)",
    borderStrong: "rgba(81, 217, 255, 0.58)",
    cyan: "#41d9ff",
    cyanSoft: "#8be8ff",
    magenta: "#ff4fa3",
    gold: "#ffc65a",
    green: "#55f7a1",
    red: "#ff5b70",
    text: "#e5f7ff",
    muted: "#90a5b8"
  },
  radius: {
    sm: "6px",
    md: "8px",
    lg: "12px"
  },
  shadow: {
    glow: "0 0 30px rgba(65, 217, 255, 0.16)",
    inset: "inset 0 0 32px rgba(65, 217, 255, 0.05)"
  },
  font: {
    mono: "'JetBrains Mono', 'SFMono-Regular', Consolas, monospace",
    sans: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  }
} as const;

export type HexNestTokens = typeof hexnestTokens;

