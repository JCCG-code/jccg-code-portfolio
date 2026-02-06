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

<style scoped>
  .projects-section {
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
    margin-bottom: 1rem;
    color: hsl(var(--foreground));
  }

  .subtitle {
    font-size: 1.25rem;
    text-align: center;
    color: hsl(var(--muted-foreground));
    margin-bottom: 4rem;
  }

  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
    gap: 2rem;
  }

  .project-card-item {
    opacity: 0;
    transform: translateY(30px);
  }

  .visible .project-card-item {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 640px) {
    .projects-section {
      padding: 4rem 1rem;
    }

    .project-grid {
      gap: 1.5rem;
    }
  }
</style>
