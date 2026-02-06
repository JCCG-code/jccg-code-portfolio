<template>
  <button
    v-if="isReady"
    type="button"
    :aria-label="t('theme.toggle')"
    :title="t('theme.toggle')"
    class="theme-toggle"
    @click="toggleTheme">
    <span class="toggle-track">
      <span
        class="toggle-option"
        :class="{ active: !isDark }">
        light
      </span>
      <span
        class="toggle-option"
        :class="{ active: isDark }">
        dark
      </span>
      <span
        class="toggle-indicator"
        :class="{ dark: isDark }" />
    </span>
  </button>
</template>

<script setup lang="ts">
  const { isDark, toggleTheme } = useAppTheme()
  const { t } = useAppLocale()

  const isReady = ref(false)

  onMounted(() => {
    isReady.value = true
  })
</script>

<style lang="scss" scoped>
  .theme-toggle {
    position: relative;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: var(--font-mono);

    &:focus-visible {
      outline: none;

      .toggle-track {
        box-shadow: var(--shadow-focus);
      }
    }
  }

  .toggle-track {
    position: relative;
    display: flex;
    gap: var(--space-1);
    padding: var(--space-1);
    background: hsl(var(--muted));
    border: 1px solid hsl(var(--border));
    border-radius: var(--radius);
    transition: all var(--transition-fast);
  }

  .toggle-option {
    position: relative;
    z-index: 2;
    padding: var(--space-1) var(--space-3);
    font-size: var(--font-xs);
    color: hsl(var(--muted-foreground));
    transition: color var(--transition-fast);
    letter-spacing: 0.02em;

    &.active {
      color: hsl(var(--foreground));
    }
  }

  .toggle-indicator {
    position: absolute;
    top: var(--space-1);
    left: var(--space-1);
    height: calc(100% - calc(var(--space-1) * 2));
    width: calc(50% - var(--space-1));
    background: hsl(var(--background));
    border: 1px solid hsl(var(--border));
    border-radius: calc(var(--radius) - 2px);
    transition: transform var(--transition-fast);
    z-index: 1;

    &.dark {
      transform: translateX(calc(100% + var(--space-1)));
    }
  }
</style>
