<template>
  <button
    v-if="currentLocale"
    type="button"
    :aria-label="t('language.toggle')"
    :title="t('language.toggle')"
    class="locale-toggle"
    @click="toggleLocale">
    <span class="toggle-track">
      <span
        v-for="loc in availableLocales"
        :key="loc.code"
        class="toggle-option"
        :class="{ active: currentLocale.code === loc.code }">
        {{ loc.code }}
      </span>
      <span
        class="toggle-indicator"
        :style="indicatorStyle" />
    </span>
  </button>
</template>

<script setup lang="ts">
  const { currentLocale, availableLocales, toggleLocale, t } = useAppLocale()

  const indicatorStyle = computed(() => {
    const index = availableLocales.value.findIndex(
      (loc) => loc.code === currentLocale.value?.code
    )
    return {
      transform: `translateX(calc(${index * 100}% + ${index * 4}px))`
    }
  })
</script>

<style lang="scss" scoped>
  .locale-toggle {
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
    text-transform: uppercase;

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
  }
</style>
