import type { ColorMode } from '#shared/types/theme'

/**
 * Composable para gestionar el tema de la aplicación
 * Wrappea useColorMode con tipos seguros y funcionalidades adicionales
 */
export function useAppTheme() {
  const colorMode = useColorMode()

  const theme = computed<ColorMode>({
    get: () => colorMode.preference as ColorMode,
    set: (value: ColorMode) => {
      colorMode.preference = value
    }
  })

  const isDark = computed<boolean>(() => colorMode.value === 'dark')
  const isLight = computed<boolean>(() => colorMode.value === 'light')

  /**
   * Cambia el tema de la aplicación
   */
  const setTheme = (newTheme: ColorMode): void => {
    theme.value = newTheme
  }

  /**
   * Alterna entre modo claro y oscuro
   */
  const toggleTheme = (): void => {
    theme.value = isDark.value ? 'light' : 'dark'
  }

  /**
   * Obtiene el tema actual resuelto (light o dark, nunca system)
   */
  const resolvedTheme = computed<'light' | 'dark'>(
    () => colorMode.value as 'light' | 'dark'
  )

  return {
    theme,
    isDark,
    isLight,
    resolvedTheme,
    setTheme,
    toggleTheme
  }
}
