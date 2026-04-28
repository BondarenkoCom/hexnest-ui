function hash(text: string): number {
  let value = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    value ^= text.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

export function hueValue(input: string): number {
  return hash(String(input || "agent")) % 360;
}

export function hueFromId(input: string, saturation = 82, lightness = 64): string {
  return `hsl(${hueValue(input)} ${saturation}% ${lightness}%)`;
}

export function hueGlowFromId(input: string, alpha = 0.35): string {
  const clamped = Math.max(0, Math.min(1, alpha));
  return `hsla(${hueValue(input)} 95% 62% / ${clamped})`;
}
