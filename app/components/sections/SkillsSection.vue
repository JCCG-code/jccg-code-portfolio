<template>
  <section
    id="skills"
    ref="sectionRef"
    class="skills-section"
    :class="{ visible: isVisible }">
    <div class="container">
      <h2>{{ t('skills.title') }}</h2>

      <div class="skill-categories">
        <div
          v-for="(category, index) in categories"
          :key="category.name"
          class="category"
          :style="{ animationDelay: `${index * 0.1}s` }">
          <h3>{{ t(`skills.${category.name}`) }}</h3>
          <div class="tech-grid">
            <div
              v-for="tech in category.items"
              :key="tech.name"
              class="tech-item">
              <span>{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const { t } = useAppLocale()
  const { observeElement } = useScrollAnimation()

  const sectionRef = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  const categories = ref<
    Array<{ name: string; items: Array<{ name: string; logo?: string }> }>
  >([])

  const loadSkills = async () => {
    const data = await import('#shared/data/skills.json')
    categories.value = data.default
  }

  await loadSkills()

  onMounted(() => {
    observeElement(sectionRef, () => {
      isVisible.value = true
    })
  })
</script>

<style lang="scss" scoped>
  @use '~/assets/scss/utils/mixins' as *;

  .skills-section {
    padding: clamp(4rem, 12vw, 8rem) clamp(1rem, 4vw, 2rem);
    background: hsl(var(--background));
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

  .skill-categories {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(1.5rem, 4vw, 2rem);

    @include sm {
      grid-template-columns: repeat(2, 1fr);
      gap: clamp(1.25rem, 3vw, 1.75rem);
    }

    @include md {
      grid-template-columns: repeat(3, 1fr);
      gap: clamp(1.5rem, 3vw, 2rem);
    }

    @include lg {
      grid-template-columns: repeat(4, 1fr);
      gap: clamp(1.5rem, 3vw, 2rem);
    }

    @include xl {
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
    }
  }

  .category {
    opacity: 0;
    transform: translateY(20px);
    background: hsl(var(--card));
    padding: clamp(1.25rem, 3vw, 1.5rem);
    border-radius: var(--radius-lg);
    border: 1px solid hsl(var(--border));
  }

  .visible .category {
    animation: fadeInUp 0.5s ease-out forwards;
  }

  .category h3 {
    font-size: clamp(1.125rem, 2.5vw, 1.375rem);
    font-weight: 600;
    margin-bottom: clamp(1rem, 2.5vw, 1.5rem);
    color: hsl(var(--foreground));
    text-align: center;
    padding-bottom: clamp(0.75rem, 2vw, 1rem);
    border-bottom: 2px solid hsl(var(--border));
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: clamp(0.5rem, 1.5vw, 0.75rem);

    @include sm {
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }

    @include md {
      grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    }
  }

  .tech-item {
    padding: clamp(0.625rem, 2vw, 0.875rem) clamp(0.75rem, 2vw, 1rem);
    background: hsl(var(--background));
    border: 1px solid hsl(var(--border));
    border-radius: var(--radius);
    text-align: center;
    transition: all var(--transition-base);
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;

    @include sm {
      &:hover {
        border-color: hsl(var(--primary));
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        background: hsl(var(--card));
      }
    }

    &:focus-within {
      outline: 2px solid hsl(var(--ring));
      outline-offset: 2px;
    }
  }

  .tech-item span {
    font-size: clamp(0.8125rem, 1.5vw, 0.9375rem);
    font-weight: 500;
    color: hsl(var(--foreground));
    word-break: break-word;
    hyphens: auto;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
