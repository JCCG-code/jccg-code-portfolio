<template>
  <button
    v-if="currentLocale"
    type="button"
    :aria-label="t('language.toggle')"
    :title="t('language.toggle')"
    class="locale-toggle"
    @click="toggleLocale">
    <span class="flag">
      {{ currentLocale.flag }}
    </span>
    <span class="label">
      {{ currentLocale.name }}
    </span>
  </button>
</template>

<script setup lang="ts">
  const { currentLocale, toggleLocale, t } = useAppLocale()
</script>

<style scoped>
  .locale-toggle {
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

  .locale-toggle:hover {
    opacity: 0.8;
    transform: translateY(-2px);
  }

  .locale-toggle:active {
    transform: translateY(0);
  }

  .flag {
    font-size: 1.25rem;
    line-height: 1;
  }

  .label {
    font-size: 0.875rem;
    font-weight: 500;
  }
</style>
