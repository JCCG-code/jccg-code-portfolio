import withNuxt from './.nuxt/eslint.config.mjs'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import tseslint from 'typescript-eslint'

export default withNuxt().append([
  {
    ignores: [
      '**/*.d.ts',
      '.nuxt/**',
      'dist/**',
      'node_modules/**',
      'app/components/**/*.vue',
      'app/pages/**/*.vue'
    ]
  },
  {
    plugins: {
      prettier: eslintPluginPrettier,
      '@typescript-eslint': tseslint.plugin
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // General
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',

      // TypeScript strict rules - NO ANY
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],

      // Vue specific
      'vue/multi-word-component-names': 'off'
    }
  }
])
