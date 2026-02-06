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

<style scoped>
  .about-section {
    padding: 6rem 1rem;
    background: var(--color-surface);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    text-align: center;
    margin-bottom: 4rem;
    color: var(--color-text-primary);
  }

  .about-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
    gap: 3rem;
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
  }

  .visible .about-grid {
    opacity: 1;
    transform: translateY(0);
  }

  .story p {
    font-size: 1.125rem;
    line-height: 1.8;
    color: var(--color-text-secondary);
    margin-bottom: 1.5rem;
  }

  .strengths h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--color-text-primary);
  }

  .strengths ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .strengths li {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--color-text-secondary);
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    position: relative;
  }

  .strengths li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--color-primary);
    font-weight: 700;
  }

  .cv-download {
    text-align: center;
  }

  .download-cv {
    display: inline-block;
    padding: 1rem 2rem;
    background: var(--color-primary);
    color: white;
    font-size: 1.125rem;
    font-weight: 600;
    text-decoration: none;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }

  .download-cv:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 640px) {
    .about-section {
      padding: 4rem 1rem;
    }

    .about-grid {
      gap: 2rem;
    }
  }
</style>
