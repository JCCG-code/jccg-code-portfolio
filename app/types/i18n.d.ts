/**
 * Tipos de TypeScript para auto-completado de i18n
 * Estos tipos se generan automáticamente en base a los archivos de locales
 */

declare module '#app' {
  interface NuxtApp {
    $i18n: {
      locale: Ref<string>
      t: (key: string, params?: Record<string, unknown>) => string
    }
  }
}

export {}
