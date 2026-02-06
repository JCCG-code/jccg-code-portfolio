<template>
  <div class="app-container">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<style>
  /* Variables CSS para temas */
  :root {
    --color-bg-primary: #ffffff;
    --color-bg-secondary: #f5f5f5;
    --color-text-primary: #1a1a1a;
    --color-text-secondary: #666666;
    --color-border: #e0e0e0;
    --color-accent: #3b82f6;
    --color-accent-hover: #2563eb;
  }

  [data-theme='dark'] {
    --color-bg-primary: #1a1a1a;
    --color-bg-secondary: #2d2d2d;
    --color-text-primary: #ffffff;
    --color-text-secondary: #a0a0a0;
    --color-border: #404040;
    --color-accent: #60a5fa;
    --color-accent-hover: #3b82f6;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif;
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
    line-height: 1.6;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
  }
</style>

<style scoped>
  .app-container {
    min-height: 100vh;
  }
</style>
