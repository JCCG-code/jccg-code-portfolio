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

    &:hover {
      border-color: hsl(var(--primary) / 0.3);
      box-shadow: var(--shadow-hover);

      .thumbnail {
        transform: scale(1.02);
      }

      .link-view {
        color: hsl(var(--primary));
      }
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--shadow-focus);
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
    padding: var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    flex: 1;
  }

  .title {
    font-size: var(--font-xl);
    font-weight: 700;
    line-height: 1.3;
    color: hsl(var(--foreground));
    margin: 0;
  }

  .one-liner {
    font-size: var(--font-sm);
    line-height: 1.6;
    color: hsl(var(--muted-foreground));
    margin: 0;
  }

  .metric-badges {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-4);
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
    font-size: var(--font-xs);
    font-family: var(--font-mono);
    color: hsl(var(--muted-foreground));
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .badge-progress {
    position: relative;
    height: 24px;
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
    font-size: var(--font-sm);
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
    transition: width var(--transition-base);
  }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .tech-tag {
    padding: var(--space-1) var(--space-3);
    font-family: var(--font-mono);
    font-size: var(--font-xs);
    background: hsl(var(--background));
    color: hsl(var(--muted-foreground));
    border: 1px solid hsl(var(--border));
    border-radius: var(--radius);
    letter-spacing: 0.02em;
  }

  .tech-more {
    padding: var(--space-1) var(--space-3);
    font-family: var(--font-mono);
    font-size: var(--font-xs);
    color: hsl(var(--primary));
    background: hsl(var(--primary) / 0.1);
    border: 1px solid hsl(var(--primary) / 0.2);
    border-radius: var(--radius);
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    margin-top: auto;
    padding-top: var(--space-4);
    border-top: 1px solid hsl(var(--border));

    @include mobile {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .link-view {
    font-size: var(--font-sm);
    font-weight: 600;
    color: hsl(var(--foreground));
    text-decoration: none;
    transition: color var(--transition-fast);

    &:hover {
      color: hsl(var(--primary));
    }
  }

  .external-links {
    display: flex;
    gap: var(--space-2);
  }

  .link-external {
    padding: var(--space-1) var(--space-3);
    font-family: var(--font-mono);
    font-size: var(--font-xs);
    color: hsl(var(--muted-foreground));
    background: transparent;
    border: 1px solid hsl(var(--border));
    border-radius: var(--radius);
    text-decoration: none;
    transition: all var(--transition-fast);

    &:hover {
      color: hsl(var(--primary));
      border-color: hsl(var(--primary));
      background: hsl(var(--primary) / 0.05);
    }
  }
</style>
