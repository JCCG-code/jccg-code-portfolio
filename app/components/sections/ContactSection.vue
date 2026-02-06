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
    padding: 6rem 1rem;
    background: var(--color-surface);
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
  }

  .visible .container {
    opacity: 1;
    transform: translateY(0);
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--color-text-primary);
  }

  .cta-text {
    font-size: 1.25rem;
    color: var(--color-text-secondary);
    margin-bottom: 3rem;
    line-height: 1.6;
  }

  .contact-methods {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .contact-btn {
    padding: 1rem 2rem;
    font-size: 1.125rem;
    font-weight: 600;
    text-decoration: none;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
    min-width: 160px;
    text-align: center;
  }

  .contact-btn.primary {
    background: var(--color-primary);
    color: white;
  }

  .contact-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .contact-btn.secondary {
    background: transparent;
    color: var(--color-text-primary);
    border: 2px solid var(--color-border);
  }

  .contact-btn.secondary:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
    transform: translateY(-2px);
  }

  @media (max-width: 640px) {
    .contact-section {
      padding: 4rem 1rem;
    }

    .contact-methods {
      flex-direction: column;
      align-items: stretch;
    }

    .contact-btn {
      width: 100%;
    }
  }
</style>
