<template>
  <section
    id="about"
    ref="sectionRef"
    class="about-section"
    :class="{ visible: isVisible }">
    <div class="container">
      <h2>{{ t('about.title') }}</h2>

      <div class="about-grid">
        <div class="story">
          <p>{{ t('about.intro') }}</p>
          <p>{{ t('about.journey') }}</p>
          <p>{{ t('about.focus') }}</p>
        </div>

        <div class="strengths">
          <h3>{{ t('about.core_strengths') }}</h3>
          <ul>
            <li>{{ t('about.strength_1') }}</li>
            <li>{{ t('about.strength_2') }}</li>
            <li>{{ t('about.strength_3') }}</li>
            <li>{{ t('about.strength_4') }}</li>
            <li>{{ t('about.strength_5') }}</li>
          </ul>
        </div>
      </div>

      <div class="cv-download">
        <a
          :href="`/cv/juan-carlos-cv-${locale}.pdf`"
          download
          class="download-cv">
          {{ t('about.download_cv') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const { t, locale } = useAppLocale()
  const { observeElement } = useScrollAnimation()

  const sectionRef = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  onMounted(() => {
    observeElement(sectionRef, () => {
      isVisible.value = true
    })
  })
</script>

<style lang="scss" scoped>
  @use '~/assets/scss/utils/mixins' as *;

  .about-section {
    padding: clamp(4rem, 12vw, 8rem) clamp(1rem, 4vw, 2rem);
    background: hsl(var(--card));
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  h2 {
    font-size: clamp(1.875rem, 6vw, 3rem);
    font-weight: 700;
    text-align: center;
    margin-bottom: clamp(2.5rem, 6vw, 4rem);
    color: hsl(var(--foreground));
    letter-spacing: -0.02em;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(2rem, 5vw, 3rem);
    margin-bottom: clamp(2rem, 5vw, 3rem);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease-out;

    @include md {
      grid-template-columns: 1.2fr 1fr;
      gap: clamp(2rem, 4vw, 3rem);
    }

    @include lg {
      grid-template-columns: repeat(2, 1fr);
      gap: clamp(2.5rem, 5vw, 3.5rem);
    }
  }

  .visible .about-grid {
    opacity: 1;
    transform: translateY(0);
  }

  .story p {
    font-size: clamp(1rem, 2vw, 1.125rem);
    line-height: 1.75;
    color: hsl(var(--muted-foreground));
    margin-bottom: clamp(1rem, 2.5vw, 1.5rem);

    &:last-child {
      margin-bottom: 0;
    }
  }

  .strengths h3 {
    font-size: clamp(1.25rem, 3vw, 1.5rem);
    font-weight: 600;
    margin-bottom: clamp(1rem, 2.5vw, 1.5rem);
    color: hsl(var(--foreground));
  }

  .strengths ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: clamp(0.75rem, 2vw, 1rem);
  }

  .strengths li {
    font-size: clamp(0.9375rem, 2vw, 1rem);
    line-height: 1.6;
    color: hsl(var(--muted-foreground));
    padding-left: clamp(1.25rem, 3vw, 1.5rem);
    position: relative;
  }

  .strengths li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: hsl(var(--primary));
    font-weight: 700;
    font-size: 1.1em;
  }

  .cv-download {
    text-align: center;
    margin-top: clamp(1rem, 3vw, 2rem);
  }

  .download-cv {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: clamp(0.875rem, 2.5vw, 1rem) clamp(1.5rem, 4vw, 2rem);
    background: hsl(var(--primary));
    color: white;
    font-size: clamp(1rem, 2vw, 1.125rem);
    font-weight: 600;
    text-decoration: none;
    border-radius: var(--radius);
    transition: all var(--transition-base);
    min-height: 48px;

    @include max-sm {
      width: 100%;
      min-height: 52px;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      background: hsl(var(--primary) / 0.9);
    }

    &:focus-visible {
      outline: 2px solid hsl(var(--ring));
      outline-offset: 2px;
    }

    &:active {
      transform: translateY(0);
    }
  }
</style>
