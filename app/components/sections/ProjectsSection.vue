<template>
  <section
    id="projects"
    ref="sectionRef"
    class="projects-section"
    :class="{ visible: isVisible }">
    <div class="container">
      <h2>{{ t('projects.title') }}</h2>
      <p class="subtitle">{{ t('projects.subtitle') }}</p>

      <div class="project-grid">
        <ProjectCard
          v-for="(project, index) in featuredProjects"
          :key="project.id"
          :project="project"
          :style="{ animationDelay: `${index * 0.1}s` }"
          class="project-card-item" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const { t } = useAppLocale()
  const { fetchProjects, getFeaturedProjects } = useProjects()
  const { observeElement } = useScrollAnimation()

  const sectionRef = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  await fetchProjects()
  const featuredProjects = getFeaturedProjects()

  onMounted(() => {
    observeElement(sectionRef, () => {
      isVisible.value = true
    })
  })
</script>

<style lang="scss" scoped>
  @use '~/assets/scss/utils/mixins' as *;

  .projects-section {
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
    margin-bottom: clamp(0.75rem, 2vw, 1rem);
    color: hsl(var(--foreground));
    letter-spacing: -0.02em;
  }

  .subtitle {
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    text-align: center;
    color: hsl(var(--muted-foreground));
    margin-bottom: clamp(2.5rem, 6vw, 4rem);
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }

  .project-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(1.5rem, 4vw, 2rem);

    @include sm {
      grid-template-columns: repeat(2, 1fr);
      gap: clamp(1.25rem, 3vw, 1.75rem);
    }

    @include lg {
      grid-template-columns: repeat(3, 1fr);
      gap: clamp(1.5rem, 3vw, 2rem);
    }

    @include xl {
      gap: 2rem;
    }
  }

  .project-card-item {
    opacity: 0;
    transform: translateY(20px);
  }

  .visible .project-card-item {
    animation: fadeInUp 0.5s ease-out forwards;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
