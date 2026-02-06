import pkg from './package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    baseURL: '/',
    head: {
      title: 'JCCG Code',
      htmlAttrs: {
        lang: 'en',
        dir: 'ltr'
      }
    }
  },

  runtimeConfig: {
    public: {
      appVersion: pkg.version
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxt/image'
  ],

  colorMode: {
    preference: 'system',
    fallback: 'light',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
    dataValue: 'theme'
  },

  i18n: {
    locales: [
      {
        code: 'es',
        name: 'Español',
        file: 'es.json'
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json'
      }
    ],
    strategy: 'no_prefix',
    compilation: {
      strictMessage: false
    },
    defaultLocale: 'en',
    restructureDir: 'app',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      cookieSecure: true
    }
  },

  image: {
    quality: 80,
    format: ['webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  experimental: {
    componentIslands: true,
    viewTransition: true,
    headNext: true
  },

  routeRules: {
    '/': { prerender: true },
    '/projects/**': { prerender: true },
    '/_nuxt/**': {
      headers: { 'cache-control': 'public, max-age=31536000, immutable' }
    }
  },

  nitro: {
    compressPublicAssets: true,
    minify: true
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  css: ['~/assets/scss/main.scss'],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {}
    }
  }
})
