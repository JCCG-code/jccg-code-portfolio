<template>
  <button
    v-if="isReady"
    type="button"
    :aria-label="t('theme.toggle')"
    :title="t('theme.toggle')"
    class="theme-toggle"
    @click="toggleTheme">
    <span
      v-if="isDark"
      class="icon">
      🌙
    </span>
    <span
      v-else
      class="icon">
      ☀️
    </span>
    <span class="label">
      {{ isDark ? t('theme.dark') : t('theme.light') }}
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

<style scoped>
  .theme-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid currentColor;
    border-radius: 0.5rem;
    background: transparent;
    color: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .theme-toggle:hover {
    opacity: 0.8;
    transform: translateY(-2px);
  }

  .theme-toggle:active {
    transform: translateY(0);
  }

  .icon {
    font-size: 1.25rem;
    line-height: 1;
  }

  .label {
    font-size: 0.875rem;
    font-weight: 500;
  }
</style>
