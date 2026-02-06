/**
 * Tipos compartidos para temas
 * Usados tanto en cliente como en servidor
 */

export type ColorMode = 'light' | 'dark' | 'system'

export interface ThemeConfig {
  preference: ColorMode
  fallback: 'light' | 'dark'
  storageKey: string
}

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  preference: 'system',
  fallback: 'light',
  storageKey: 'nuxt-color-mode'
} as const
