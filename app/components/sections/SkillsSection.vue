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

<style scoped>
  .skills-section {
    padding: 6rem 1rem;
    background: hsl(var(--background));
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
    color: hsl(var(--foreground));
  }

  .skill-categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
    gap: 2rem;
  }

  .category {
    opacity: 0;
    transform: translateY(30px);
  }

  .visible .category {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  .category h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: hsl(var(--foreground));
    text-align: center;
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.75rem;
  }

  .tech-item {
    padding: 0.75rem 1rem;
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 0.5rem;
    text-align: center;
    transition: all 0.2s ease;
  }

  .tech-item:hover {
    border-color: hsl(var(--primary));
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .tech-item span {
    font-size: 0.9375rem;
    font-weight: 500;
    color: hsl(var(--foreground));
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 640px) {
    .skills-section {
      padding: 4rem 1rem;
    }

    .tech-grid {
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 0.5rem;
    }

    .tech-item {
      padding: 0.5rem 0.75rem;
    }
  }
</style>
