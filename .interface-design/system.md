# Design System

## Direction

**Code Terminal Meets Notebook** — Precision of a development environment with the warmth of technical notes.

A developer portfolio that feels like the space where work actually happens: the crisp clarity of a terminal combined with the thoughtful warmth of handwritten technical notes.

## Signature

**Progress badge metrics** — Technical achievements displayed as progress indicators that developers recognize. Not generic number boxes, but badges that show percentage improvements with visual progress bars, monospace values, and technical context integrated immediately.

## Color Palette

**Foundation:**

- Graphite ink: `220 13% 18%` (foreground)
- Paper notebook: `45 25% 97%` (background light)
- Deep terminal: `220 13% 9%` (background dark)

**Technical accent:**

- Monitor blue: `217 91% 60%` (light) / `217 91% 65%` (dark)

**Supporting:**

- Subtle borders: `220 9% 46% / 0.2` (light) / `220 9% 46% / 0.15` (dark)
- Muted text: `220 9% 46%`

All colors use HSL for smooth theme transitions.

## Typography

**System:**

- **Narrative:** Inter, system sans-serif stack
- **Technical:** ui-monospace, Cascadia Code, Fira Code, Consolas

**Usage:**

- Headers, body text → Sans
- Code, metrics, tech tags, labels → Mono
- Mono for anything technical or data-driven

## Spacing

Base unit: **4px** (0.25rem)

Scale in multiples of 8:

- 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px

Variables: `--space-1` through `--space-24`

## Depth Strategy

**Borders-first approach:**

- Primary structure: 1px borders at `hsl(var(--border))`
- Hover elevation: Minimal shadow `0 2px 8px rgb(0 0 0 / 0.04)`
- Focus ring: `0 0 0 3px hsl(var(--ring) / 0.1)`

No dramatic shadows. Hierarchy comes from content, spacing, and whisper-quiet borders.

## Border Radius

- Small elements (tags, badges): `0.25rem` (`--radius`)
- Cards, panels: `0.5rem` (`--radius-lg`)

Technical precision over friendly roundness.

## Key Components

### Hero Section (Asymmetric)

- Grid: 1.2fr (primary) / 1fr (secondary)
- Left: Immediate action (name, hook, CTAs)
- Right: Technical context (stack list, quick metrics)
- Badge: Monospace role identifier with primary accent
- Metrics: Monospace values with uppercase labels

### Project Card

- Structure: Image (16:9) + content
- Metric badges: Progress bars showing percentages
  - Background: muted with subtle fill
  - Value: Monospace, positioned left
  - Bar: Primary color fill indicating progress
- Tech stack: Monospace tags, max 4 visible + counter
- Footer: Divided by border, links on opposite sides

### Progress Badge Pattern

```scss
.metric-badge {
  .badge-label: uppercase, monospace, xs, muted
  .badge-progress: relative container, border
  .badge-value: monospace, bold, positioned absolute
  .badge-bar: primary fill, dynamic width, border-right accent
}
```

### Segmented Control Pattern (Toggles)

Theme and locale toggles use segmented control pattern:

- **Track:** Muted background with subtle border
- **Options:** Monospace text labels showing all choices
- **Indicator:** Background-colored pill that slides
- **Active state:** Foreground color on text
- **Transition:** Fast cubic-bezier for technical precision

Used for: ThemeToggle (light/dark), LocaleToggle (en/es)

## Transitions

Fast micro-interactions: **150ms cubic-bezier(0.4, 0, 0.2, 1)**

No bouncy or spring easing. Technical precision.

## Interactive States

Every element requires:

- **default:** Base appearance
- **hover:** Border color shift or subtle shadow
- **focus-visible:** Ring shadow with primary color
- **active:** Slight scale or color intensity change

## Constraints

- No gradients or decorative color
- No dramatic drop shadows
- Borders must be subtle (almost invisible until needed)
- Surface differences whisper-quiet
- Monospace for anything technical/data
- Sans for narrative/explanation
- Every metric needs context, not just numbers

## Rejecting Defaults

1. ~~Centered hero with gradient background~~ → Asymmetric grid, action left / context right
2. ~~Metric as big number + small label in box~~ → Progress badge with technical context
3. ~~3-column card grid with floating shadows~~ → Fluid layout, borders-first depth

---

Last updated: 2026-02-06
