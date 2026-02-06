<template>
  <div class="error-container">
    <div class="error-content">
      <div class="error-icon">
        <span v-if="error.statusCode === 404">🔍</span>
        <span v-else>⚠️</span>
      </div>

      <h1 class="error-title">
        {{ error.statusCode }}
      </h1>

      <p class="error-message">
        {{ errorMessage }}
      </p>

      <div class="error-actions">
        <button
          class="btn-primary"
          @click="handleError">
          {{ t('error.goHome') }}
        </button>

        <button
          v-if="error.statusCode !== 404"
          class="btn-secondary"
          @click="() => clearError()">
          {{ t('error.tryAgain') }}
        </button>
      </div>

      <details
        v-if="isDev && error.stack"
        class="error-details">
        <summary>{{ t('error.details') }}</summary>
        <pre>{{ error.stack }}</pre>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { clearError } from '#app'

  const props = defineProps({
    error: {
      type: Object,
      required: true
    }
  })

  const { t } = useI18n()
  const isDev = import.meta.dev

  const errorMessage = computed(() => {
    const statusCode = props.error?.statusCode
    if (statusCode === 404) {
      return t('error.notFound')
    }
    if (statusCode === 500) {
      return t('error.serverError')
    }
    return props.error?.message || t('error.unexpected')
  })

  const handleError = () => clearError({ redirect: '/' })
</script>

<style scoped>
  .error-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background-color: var(--color-bg-primary);
  }

  .error-content {
    max-width: 600px;
    width: 100%;
    text-align: center;
  }

  .error-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  .error-title {
    font-size: 4rem;
    font-weight: 700;
    color: var(--color-accent);
    margin-bottom: 1rem;
  }

  .error-message {
    font-size: 1.25rem;
    color: hsl(var(--muted-foreground));
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .error-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-primary,
  .btn-secondary {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-primary {
    background-color: var(--color-accent);
    color: white;
  }

  .btn-primary:hover {
    background-color: var(--color-accent-hover);
    transform: translateY(-2px);
  }

  .btn-secondary {
    background-color: var(--color-bg-secondary);
    color: hsl(var(--foreground));
    border: 1px solid hsl(var(--border));
  }

  .btn-secondary:hover {
    background-color: hsl(var(--border));
    transform: translateY(-2px);
  }

  .error-details {
    margin-top: 2rem;
    text-align: left;
    background-color: var(--color-bg-secondary);
    border: 1px solid hsl(var(--border));
    border-radius: 0.5rem;
    padding: 1rem;
  }

  .error-details summary {
    cursor: pointer;
    font-weight: 500;
    color: var(--color-accent);
    margin-bottom: 0.5rem;
  }

  .error-details pre {
    overflow-x: auto;
    font-size: 0.875rem;
    color: hsl(var(--muted-foreground));
    white-space: pre-wrap;
    word-wrap: break-word;
  }
</style>
