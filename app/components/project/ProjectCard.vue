<template>
  <article
    class="project-card"
    @click="navigateToCaseStudy">
    <div class="thumbnail-wrapper">
      <img
        :src="project.thumbnail"
        :alt="localizedProject.title"
        loading="lazy"
        class="thumbnail" />
      <div class="overlay">
        <span>{{ t('projects.view_case_study') }}</span>
      </div>
    </div>

    <div class="content">
      <h3>{{ localizedProject.title }}</h3>
      <p class="one-liner">{{ localizedProject.oneLiner }}</p>

      <div class="tech-tags">
        <span
          v-for="tech in project.techStack"
          :key="tech"
          class="tech-tag">
          {{ tech }}
        </span>
      </div>

      <div
        v-if="project.metrics && project.metrics.length > 0"
        class="impact-metrics">
        <div
          v-for="metric in project.metrics"
          :key="metric.label"
          class="metric">
          <strong>{{ metric.value }}</strong>
          <span>{{ metric.label }}</span>
        </div>
      </div>

      <div class="links">
        <NuxtLink
          :to="`/projects/${project.slug}`"
          class="link-primary">
          {{ t('projects.view_case_study') }}
        </NuxtLink>
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="link-secondary"
          @click.stop>
          {{ t('projects.live_demo') }}
        </a>
        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="link-secondary"
          @click.stop>
          {{ t('projects.github') }}
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
  interface ProjectProp {
    id: string
    slug: string
    thumbnail: string
    techStack: string[]
    metrics?: Array<{ value: string; label: string }>
    liveUrl?: string
    githubUrl?: string
    en: {
      title: string
      oneLiner: string
      [key: string]: unknown
    }
    es: {
      title: string
      oneLiner: string
      [key: string]: unknown
    }
    [key: string]: unknown
  }

  const props = defineProps<{
    project: ProjectProp
  }>()

  const { t, locale } = useAppLocale()
  const router = useRouter()

  const localizedProject = computed(() => {
    const currentLocale = locale.value as 'en' | 'es'
    return props.project[currentLocale]
  })

  const navigateToCaseStudy = () => {
    router.push(`/projects/${props.project.slug}`)
  }
</script>

<style scoped>
  .project-card {
    background: var(--color-surface);
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid var(--color-border);
  }

  .project-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }

  .thumbnail-wrapper {
    position: relative;
    width: 100%;
    padding-top: 66.67%;
    overflow: hidden;
    background: var(--color-background);
  }

  .thumbnail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .project-card:hover .thumbnail {
    transform: scale(1.05);
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .project-card:hover .overlay {
    opacity: 1;
  }

  .overlay span {
    color: white;
    font-size: 1.125rem;
    font-weight: 600;
  }

  .content {
    padding: 1.5rem;
  }

  .content h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: var(--color-text-primary);
  }

  .one-liner {
    font-size: 1rem;
    color: var(--color-text-secondary);
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .tech-tag {
    padding: 0.25rem 0.75rem;
    background: var(--color-background);
    color: var(--color-text-secondary);
    font-size: 0.875rem;
    border-radius: 0.25rem;
    border: 1px solid var(--color-border);
  }

  .impact-metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: var(--color-background);
    border-radius: 0.5rem;
  }

  .metric {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .metric strong {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary);
  }

  .metric span {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .link-primary,
  .link-secondary {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    border-radius: 0.375rem;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .link-primary {
    background: var(--color-primary);
    color: white;
  }

  .link-primary:hover {
    opacity: 0.9;
  }

  .link-secondary {
    background: transparent;
    color: var(--color-text-primary);
    border: 1px solid var(--color-border);
  }

  .link-secondary:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  @media (max-width: 640px) {
    .links {
      flex-direction: column;
    }

    .link-primary,
    .link-secondary {
      text-align: center;
    }
  }
</style>
