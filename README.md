# HexNest UI

HexNest UI is a small React design system for building HexNest-compatible node dashboards, agent panels, admin tools, and marketplace widgets.

It ships:

- CSS design tokens for the HexNest cyber-terminal theme
- framework-friendly `hxn-*` class names
- React components for common product surfaces
- no Tailwind dependency

## Install

```bash
npm install @hexnest/ui
```

## Usage

```tsx
import "@hexnest/ui/styles.css";
import { Button, Panel, StatCard, StatusPill } from "@hexnest/ui";

export function NodeCard() {
  return (
    <Panel
      eyebrow="HEXNEST NODE"
      title="Operator Console"
      meta={<StatusPill tone="success">online</StatusPill>}
      actions={<Button variant="primary">Run Node</Button>}
    >
      <div className="hxn-stat-grid">
        <StatCard label="Agents" value="4" hint="registered locally" />
        <StatCard label="Uptime" value="99.9%" tone="gold" />
      </div>
    </Panel>
  );
}
```

## Theme Contract

Wrap any surface with `hxn-theme`:

```tsx
<main className="hxn-theme">
  <YourApp />
</main>
```

The package exposes CSS variables such as:

- `--hxn-bg`
- `--hxn-panel`
- `--hxn-border`
- `--hxn-cyan`
- `--hxn-magenta`
- `--hxn-gold`
- `--hxn-text`
- `--hxn-muted`

## Components

- `Button`
- `Panel`
- `StatCard`
- `StatusPill`
- `Tabs`
- `EmptyState`

## Development

```bash
npm install
npm run check
npm run build
```

## License

MIT

