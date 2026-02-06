import type { Locale, LocaleOption } from '#shared/types/i18n'
import { AVAILABLE_LOCALES } from '#shared/types/i18n'

/**
 * Composable para gestionar el idioma de la aplicación
 * Wrappea useI18n con tipos seguros y funcionalidades adicionales
 */
export function useAppLocale() {
  const i18n = useI18n()
  const locale = computed(() => i18n.locale.value as Locale)

  const availableLocales = computed<readonly LocaleOption[]>(
    () => AVAILABLE_LOCALES
  )

  const currentLocale = computed<LocaleOption | undefined>(() =>
    AVAILABLE_LOCALES.find((l) => l.code === locale.value)
  )

  /**
   * Cambia el idioma de la aplicación
   */
  const setLocale = async (newLocale: Locale): Promise<void> => {
    if (locale.value === newLocale) return
    await i18n.setLocale(newLocale)
  }

  /**
   * Alterna entre los idiomas disponibles
   */
  const toggleLocale = async (): Promise<void> => {
    const currentIndex = AVAILABLE_LOCALES.findIndex(
      (l) => l.code === locale.value
    )
    const nextIndex = (currentIndex + 1) % AVAILABLE_LOCALES.length
    const nextLocale = AVAILABLE_LOCALES[nextIndex]
    if (nextLocale) {
      await setLocale(nextLocale.code)
    }
  }

  return {
    locale,
    availableLocales,
    currentLocale,
    setLocale,
    toggleLocale,
    t: i18n.t,
    te: i18n.te
  }
}
