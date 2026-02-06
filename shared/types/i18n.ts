/**
 * Tipos compartidos para i18n
 * Usados tanto en cliente como en servidor
 */

export type Locale = 'es' | 'en'

export interface LocaleOption {
  code: Locale
  name: string
  flag: string
}

export const AVAILABLE_LOCALES: readonly LocaleOption[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
] as const

export type LocaleMessages = Record<string, string | Record<string, string>>
