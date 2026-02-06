<template>
  <section
    id="contact"
    ref="sectionRef"
    class="contact-section"
    :class="{ visible: isVisible }">
    <div class="container">
      <h2>{{ t('contact.title') }}</h2>
      <p class="cta-text">{{ t('contact.cta') }}</p>

      <div class="contact-methods">
        <a
          href="mailto:jccuadra@gmail.com"
          class="contact-btn primary">
          {{ t('contact.email') }}
        </a>
        <a
          href="https://github.com/jccuadra"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-btn secondary">
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/jccuadra"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-btn secondary">
          LinkedIn
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const { t } = useAppLocale()
  const { observeElement } = useScrollAnimation()

  const sectionRef = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  onMounted(() => {
    observeElement(sectionRef, () => {
      isVisible.value = true
    })
  })
</script>

<style scoped>
  .contact-section {
    padding: clamp(4rem, 12vw, 8rem) clamp(1rem, 4vw, 2rem);
    background: hsl(var(--card));
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease-out;
  }

  .visible .container {
    opacity: 1;
    transform: translateY(0);
  }

  h2 {
    font-size: clamp(1.875rem, 6vw, 3rem);
    font-weight: 700;
    margin-bottom: clamp(1rem, 2.5vw, 1.5rem);
    color: hsl(var(--foreground));
    letter-spacing: -0.02em;
  }

  .cta-text {
    font-size: clamp(1.0625rem, 2.5vw, 1.25rem);
    color: hsl(var(--muted-foreground));
    margin-bottom: clamp(2rem, 5vw, 3rem);
    line-height: 1.6;
    max-width: 36rem;
    margin-left: auto;
    margin-right: auto;
  }

  .contact-methods {
    display: flex;
    gap: clamp(0.75rem, 2vw, 1rem);
    justify-content: center;
    flex-wrap: wrap;

    @include max-sm {
      flex-direction: column;
      gap: var(--space-3);
    }
  }

  .contact-btn {
    padding: clamp(0.875rem, 2.5vw, 1rem) clamp(1.5rem, 4vw, 2rem);
    font-size: clamp(1rem, 2vw, 1.125rem);
    font-weight: 600;
    text-decoration: none;
    border-radius: var(--radius);
    transition: all var(--transition-base);
    min-width: 140px;
    min-height: 48px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;

    @include max-sm {
      width: 100%;
      min-height: 52px;
    }

    &:focus-visible {
      outline: 2px solid hsl(var(--ring));
      outline-offset: 2px;
    }

    &:active {
      transform: scale(0.98);
    }
  }

  .contact-btn.primary {
    background: hsl(var(--primary));
    color: white;

    @include sm {
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        background: hsl(var(--primary) / 0.9);
      }
    }
  }

  .contact-btn.secondary {
    background: transparent;
    color: hsl(var(--foreground));
    border: 2px solid hsl(var(--border));

    @include sm {
      &:hover {
        border-color: hsl(var(--primary));
        color: hsl(var(--primary));
        transform: translateY(-2px);
        background: hsl(var(--primary) / 0.05);
      }
    }
  }
</style>
