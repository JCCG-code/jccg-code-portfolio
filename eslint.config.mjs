import withNuxt from './.nuxt/eslint.config.mjs'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import tseslint from 'typescript-eslint'

export default withNuxt([
  {
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // General
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error'
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue', '**/*.mts', '**/*.cts'],
    plugins: {
      '@typescript-eslint': tseslint.plugin
    },
    rules: {
      // TypeScript strict rules - NO ANY
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ]
    }
  },
  {
    files: ['**/*.vue'],
    rules: {
      // Vue specific
      'vue/multi-word-component-names': 'off'
    }
  }
])
