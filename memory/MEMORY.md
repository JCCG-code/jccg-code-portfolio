# Portfolio Project - Memory

## Project Stack
- Nuxt 4+ (app/ directory structure)
- SCSS + Tailwind + shadcn/radix-vue
- TypeScript
- pnpm

## Key Paths
- Styles: `app/assets/scss/` (main.scss entry point)
- Components: `app/components/`
- Pages: `app/pages/`
- Composables: `app/composables/`
- Shared data: `shared/data/`

## SCSS Architecture
- `base/` → _reset.scss, _variables.scss, _typography.scss
- `utils/` → _mixins.scss (breakpoints: sm/md/lg/xl/xxl/max-sm/max-md/max-lg), _functions.scss
- `themes/` → _light.scss, _dark.scss (HSL vars: --background, --foreground, --card, --primary, --muted-foreground, --border, --ring, --accent)
- `layouts/` → _app.scss
- `components/` → _buttons.scss, _cards.scss, _forms.scss

## CSS Variables (authoritative - from themes)
shadcn system: --background, --foreground, --card, --card-foreground, --primary, --primary-foreground, --secondary, --secondary-foreground, --muted, --muted-foreground, --accent, --accent-foreground, --destructive, --border, --input, --ring

Additional tokens (from _variables.scss): --radius, --radius-lg, --space-*, --font-*, --shadow-*, --transition-fast, --transition-base, --z-*

## Style Rules (CLAUDE.md)
- All Vue components: `<style lang="scss" scoped>` with `@use '~/assets/scss/utils/mixins' as *;`
- Theme change via `[data-theme='dark']`
- NO inline styles, NO !important, NO custom CSS vars mixed with shadcn vars

## Typecheck Note
`nuxt typecheck` fails with auto-import errors (useI18n, computed, useColorMode) unless `.nuxt/` types are generated first via `nuxt prepare` or `nuxt dev`. These are pre-existing, not style-related.

## Style Unification (done 2026-03-02)
Fixed 6 files:
1. `app/app.vue` - Removed duplicate --color-* variables (unused), fixed body bg to use `hsl(var(--background))`
2. `app/components/sections/ProjectsSection.vue` - Added `lang="scss"`, import mixins, replaced @media with @include sm/lg/xl
3. `app/components/sections/AboutSection.vue` - Added `lang="scss"` + mixin import
4. `app/components/sections/SkillsSection.vue` - Added `lang="scss"` + mixin import
5. `app/components/sections/ContactSection.vue` - Added `lang="scss"` + mixin import
6. `app/pages/projects/[slug].vue` - Added `lang="scss"`, import mixins, replaced most @media with @include (kept 480px as raw media query - no mixin for that breakpoint)
