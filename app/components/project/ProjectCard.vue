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
    </div>

    <div class="content">
      <h3 class="title">{{ localizedProject.title }}</h3>
      <p class="one-liner">{{ localizedProject.oneLiner }}</p>

      <!-- Progress badges for metrics -->
      <div
        v-if="project.metrics && project.metrics.length > 0"
        class="metric-badges">
        <div
          v-for="metric in project.metrics"
          :key="metric.label"
          class="metric-badge">
          <span class="badge-label">{{ metric.label }}</span>
          <div class="badge-progress">
            <span class="badge-value">{{ metric.value }}</span>
            <div
              class="badge-bar"
              :style="{ width: getProgressWidth(metric.value) }"></div>
          </div>
        </div>
      </div>

      <!-- Tech stack -->
      <div class="tech-stack">
        <span
          v-for="tech in project.techStack.slice(0, 4)"
          :key="tech"
          class="tech-tag">
          {{ tech }}
        </span>
        <span
          v-if="project.techStack.length > 4"
          class="tech-more">
          +{{ project.techStack.length - 4 }}
        </span>
      </div>

      <div class="card-footer">
        <NuxtLink
          :to="`/projects/${project.slug}`"
          class="link-view">
          View case study →
        </NuxtLink>
        <div class="external-links">
          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="link-external"
            @click.stop>
            Live
          </a>
          <a
            v-if="project.githubUrl"
            :href="project.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="link-external"
            @click.stop>
            GitHub
          </a>
        </div>
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

  const { locale } = useAppLocale()
  const router = useRouter()

  const localizedProject = computed(() => {
    const currentLocale = locale.value as 'en' | 'es'
    return props.project[currentLocale]
  })

  const navigateToCaseStudy = () => {
    router.push(`/projects/${props.project.slug}`)
  }

  /**
   * Convert metric value to progress width
   * Extracts percentage or creates visual representation
   */
  const getProgressWidth = (value: string): string => {
    const match = value.match(/(\d+)%/)
    if (match) {
      return match[1] + '%'
    }
    // For non-percentage values, return a visual indicator
    return '75%'
  }
</script>

<style lang="scss" scoped>
  @use '~/assets/scss/utils/mixins' as *;

  .project-card {
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: var(--radius-lg);
    overflow: hidden;
    cursor: pointer;
    transition: all var(--transition-base);
    display: flex;
    flex-direction: column;
    height: 100%;

    @include sm {
      &:hover {
        border-color: hsl(var(--primary) / 0.3);
        box-shadow: var(--shadow-hover);
        transform: translateY(-4px);

        .thumbnail {
          transform: scale(1.03);
        }

        .link-view {
          color: hsl(var(--primary));
        }
      }
    }

    &:focus-visible {
      outline: 2px solid hsl(var(--ring));
      outline-offset: 2px;
    }

    &:active {
      transform: scale(0.98);
    }
  }

  .thumbnail-wrapper {
    position: relative;
    width: 100%;
    padding-top: 56.25%; // 16:9 ratio
    overflow: hidden;
    background: hsl(var(--muted));
  }

  .thumbnail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-base);
  }

  .content {
    padding: clamp(1rem, 3vw, 1.5rem);
    display: flex;
    flex-direction: column;
    gap: clamp(0.75rem, 2vw, 1rem);
    flex: 1;
  }

  .title {
    font-size: clamp(1.125rem, 2.5vw, 1.375rem);
    font-weight: 700;
    line-height: 1.3;
    color: hsl(var(--foreground));
    margin: 0;
    word-break: break-word;
  }

  .one-liner {
    font-size: clamp(0.875rem, 1.5vw, 0.9375rem);
    line-height: 1.6;
    color: hsl(var(--muted-foreground));
    margin: 0;
  }

  .metric-badges {
    display: flex;
    flex-direction: column;
    gap: clamp(0.625rem, 2vw, 0.75rem);
    padding: clamp(0.875rem, 2.5vw, 1rem);
    background: hsl(var(--muted) / 0.3);
    border: 1px solid hsl(var(--border));
    border-radius: var(--radius);
  }

  .metric-badge {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .badge-label {
    font-size: clamp(0.7rem, 1.5vw, 0.75rem);
    font-family: var(--font-mono);
    color: hsl(var(--muted-foreground));
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .badge-progress {
    position: relative;
    height: clamp(20px, 3vw, 24px);
    background: hsl(var(--background));
    border: 1px solid hsl(var(--border));
    border-radius: var(--radius);
    overflow: hidden;
  }

  .badge-value {
    position: absolute;
    top: 50%;
    left: var(--space-2);
    transform: translateY(-50%);
    font-family: var(--font-mono);
    font-size: clamp(0.8125rem, 1.5vw, 0.875rem);
    font-weight: 700;
    color: hsl(var(--foreground));
    z-index: 2;
  }

  .badge-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: hsl(var(--primary) / 0.15);
    border-right: 2px solid hsl(var(--primary));
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: clamp(0.375rem, 1.5vw, 0.5rem);
  }

  .tech-tag {
    padding: clamp(0.25rem, 1vw, 0.375rem) clamp(0.625rem, 2vw, 0.75rem);
    font-family: var(--font-mono);
    font-size: clamp(0.7rem, 1.5vw, 0.75rem);
    background: hsl(var(--background));
    color: hsl(var(--muted-foreground));
    border: 1px solid hsl(var(--border));
    border-radius: var(--radius);
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  .tech-more {
    padding: clamp(0.25rem, 1vw, 0.375rem) clamp(0.625rem, 2vw, 0.75rem);
    font-family: var(--font-mono);
    font-size: clamp(0.7rem, 1.5vw, 0.75rem);
    color: hsl(var(--primary));
    background: hsl(var(--primary) / 0.1);
    border: 1px solid hsl(var(--primary) / 0.2);
    border-radius: var(--radius);
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: clamp(0.75rem, 2vw, 1rem);
    margin-top: auto;
    padding-top: clamp(0.875rem, 2.5vw, 1rem);
    border-top: 1px solid hsl(var(--border));
    flex-wrap: wrap;

    @include max-sm {
      flex-direction: column;
      align-items: stretch;
      gap: var(--space-3);
    }
  }

  .link-view {
    font-size: clamp(0.875rem, 1.5vw, 0.9375rem);
    font-weight: 600;
    color: hsl(var(--foreground));
    text-decoration: none;
    transition: color var(--transition-fast);
    white-space: nowrap;

    &:hover {
      color: hsl(var(--primary));
    }

    &:focus-visible {
      outline: 2px solid hsl(var(--ring));
      outline-offset: 2px;
      border-radius: var(--radius);
    }
  }

  .external-links {
    display: flex;
    gap: clamp(0.5rem, 1.5vw, 0.625rem);
    flex-wrap: wrap;

    @include max-sm {
      width: 100%;
    }
  }

  .link-external {
    padding: clamp(0.375rem, 1.5vw, 0.5rem) clamp(0.75rem, 2vw, 1rem);
    font-family: var(--font-mono);
    font-size: clamp(0.7rem, 1.5vw, 0.75rem);
    color: hsl(var(--muted-foreground));
    background: transparent;
    border: 1px solid hsl(var(--border));
    border-radius: var(--radius);
    text-decoration: none;
    transition: all var(--transition-fast);
    min-height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;

    @include max-sm {
      flex: 1;
      min-height: 44px;
    }

    &:hover {
      color: hsl(var(--primary));
      border-color: hsl(var(--primary));
      background: hsl(var(--primary) / 0.05);
    }

    &:focus-visible {
      outline: 2px solid hsl(var(--ring));
      outline-offset: 2px;
    }
  }
</style>
