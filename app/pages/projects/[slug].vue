<template>
  <div
    v-if="project"
    class="case-study">
    <AppHeader />

    <section class="cs-hero">
      <img
        :src="projectData.heroImage"
        :alt="project.title"
        class="hero-image" />
    </section>

    <section class="cs-overview">
      <div class="container">
        <h1>{{ project.title }}</h1>
        <p class="lead">{{ project.overview }}</p>

        <div class="meta">
          <div class="meta-item">
            <strong>{{ t('case_study.role') }}:</strong>
            <span>{{ project.role }}</span>
          </div>
          <div class="meta-item">
            <strong>{{ t('nav.skills') }}:</strong>
            <span>{{ project.timeline }}</span>
          </div>
          <div class="meta-item">
            <strong>Tech Stack:</strong>
            <span>{{ projectData.techStack.join(', ') }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="cs-challenge">
      <div class="container">
        <h2>{{ t('case_study.challenge') }}</h2>
        <p>{{ project.challenge }}</p>
      </div>
    </section>

    <section class="cs-contributions">
      <div class="container">
        <h2>{{ t('case_study.role') }}</h2>
        <ul>
          <li
            v-for="(contrib, index) in project.contributions"
            :key="index">
            {{ contrib }}
          </li>
        </ul>
      </div>
    </section>

    <section
      v-if="project.processSteps.length > 0"
      class="cs-process">
      <div class="container">
        <h2>{{ t('case_study.process') }}</h2>
        <div class="process-steps">
          <div
            v-for="(step, index) in project.processSteps"
            :key="index"
            class="process-step">
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
            <img
              v-if="step.image"
              :src="step.image"
              :alt="step.title"
              loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <section
      v-if="project.keyDecisions.length > 0"
      class="cs-decisions">
      <div class="container">
        <h2>{{ t('case_study.decisions') }}</h2>
        <div class="decision-cards">
          <div
            v-for="(decision, index) in project.keyDecisions"
            :key="index"
            class="decision-card">
            <h4>{{ decision.title }}</h4>
            <p>{{ decision.rationale }}</p>
          </div>
        </div>
      </div>
    </section>

    <section
      v-if="project.learnings && project.learnings.length > 0"
      class="cs-learnings">
      <div class="container">
        <h2>{{ t('case_study.learnings') }}</h2>
        <ul>
          <li
            v-for="(learning, index) in project.learnings"
            :key="index">
            {{ learning }}
          </li>
        </ul>
      </div>
    </section>

    <section class="cs-links">
      <div class="container">
        <div class="link-buttons">
          <a
            v-if="projectData.liveUrl"
            :href="projectData.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary">
            {{ t('projects.live_demo') }}
          </a>
          <a
            v-if="projectData.githubUrl"
            :href="projectData.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-secondary">
            {{ t('projects.github') }}
          </a>
        </div>
      </div>
    </section>

    <section class="cs-navigation">
      <div class="container">
        <NuxtLink
          to="/#projects"
          class="back-link">
          ← {{ t('case_study.back') }}
        </NuxtLink>
        <NuxtLink
          v-if="nextProject"
          :to="`/projects/${nextProject.slug}`"
          class="next-link">
          {{ t('case_study.next') }}: {{ nextProject[locale].title }} →
        </NuxtLink>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
  const { t, locale } = useAppLocale()
  const { fetchProjects, getProjectBySlug, getFeaturedProjects } = useProjects()

  await fetchProjects()

  const slug = String(route.params.slug)
  const projectData = getProjectBySlug(slug)

  if (!projectData) {
    throw createError({ statusCode: 404, message: 'Project not found' })
  }

  const project = computed(() => {
    const currentLocale =
      locale.value === 'en' || locale.value === 'es' ? locale.value : 'en'
    return projectData[currentLocale]
  })

  const allProjects = getFeaturedProjects()
  const currentIndex = allProjects.findIndex(
    (p: { slug: string }) => p.slug === slug
  )
  const nextProject = allProjects[currentIndex + 1] || allProjects[0]

  useHead({
    title: `${project.value.title} - Case Study | Juan Carlos Cuadra`,
    meta: [
      {
        name: 'description',
        content: project.value.overview
      },
      {
        property: 'og:title',
        content: `${project.value.title} - Case Study`
      },
      {
        property: 'og:description',
        content: project.value.oneLiner
      }
    ]
  })
</script>

<style lang="scss" scoped>
  @use '~/assets/scss/utils/mixins' as *;

  .case-study {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  .cs-hero {
    margin-top: clamp(60px, 12vw, 80px);
    width: 100%;
    max-height: 60vh;
    overflow: hidden;
    background: hsl(var(--background));
  }

  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 16/9;
  }

  section {
    padding: clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 2rem);
  }

  .container {
    max-width: 900px;
    margin: 0 auto;
    width: 100%;
  }

  h1 {
    font-size: clamp(1.875rem, 6vw, 3rem);
    font-weight: 700;
    margin-bottom: clamp(1rem, 3vw, 1.5rem);
    color: hsl(var(--foreground));
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  h2 {
    font-size: clamp(1.5rem, 5vw, 2.25rem);
    font-weight: 700;
    margin-bottom: clamp(1.25rem, 3vw, 2rem);
    color: hsl(var(--foreground));
    letter-spacing: -0.01em;
    line-height: 1.3;
  }

  h3 {
    font-size: clamp(1.25rem, 3vw, 1.5rem);
    font-weight: 600;
    margin-bottom: clamp(0.75rem, 2vw, 1rem);
    color: hsl(var(--foreground));
    line-height: 1.4;
  }

  h4 {
    font-size: clamp(1.125rem, 2.5vw, 1.375rem);
    font-weight: 600;
    margin-bottom: clamp(0.625rem, 1.5vw, 0.75rem);
    color: hsl(var(--foreground));
    line-height: 1.4;
  }

  p {
    font-size: clamp(1rem, 2vw, 1.125rem);
    line-height: 1.75;
    color: hsl(var(--muted-foreground));
    margin-bottom: clamp(0.875rem, 2vw, 1rem);
  }

  .cs-overview {
    background: hsl(var(--card));
  }

  .lead {
    font-size: clamp(1.125rem, 2.5vw, 1.375rem);
    line-height: 1.6;
    margin-bottom: clamp(1.5rem, 3vw, 2rem);
    color: hsl(var(--foreground));
  }

  .meta {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(1rem, 3vw, 1.5rem);
    padding: clamp(1.25rem, 3vw, 1.5rem);
    background: hsl(var(--background));
    border-radius: var(--radius-lg);
    border: 1px solid hsl(var(--border));

    @include sm {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: clamp(0.375rem, 1vw, 0.5rem);
  }

  .meta-item strong {
    font-size: clamp(0.8125rem, 1.5vw, 0.875rem);
    font-weight: 600;
    color: hsl(var(--muted-foreground));
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .meta-item span {
    font-size: clamp(0.9375rem, 1.5vw, 1rem);
    color: hsl(var(--foreground));
    line-height: 1.5;
  }

  .cs-challenge {
    background: hsl(var(--background));
  }

  .cs-contributions ul,
  .cs-learnings ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: clamp(0.75rem, 2vw, 1rem);
  }

  .cs-contributions li,
  .cs-learnings li {
    padding-left: clamp(1.5rem, 3vw, 2rem);
    position: relative;
    font-size: clamp(1rem, 2vw, 1.125rem);
    line-height: 1.6;
  }

  .cs-contributions li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: hsl(var(--primary));
    font-weight: 700;
    font-size: clamp(1.125rem, 2.5vw, 1.375rem);
  }

  .cs-learnings li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: hsl(var(--primary));
    font-weight: 700;
    font-size: clamp(1.125rem, 2.5vw, 1.375rem);
  }

  .cs-process {
    background: hsl(var(--background));
  }

  .process-steps {
    display: flex;
    flex-direction: column;
    gap: clamp(2rem, 5vw, 3rem);
  }

  .process-step img {
    width: 100%;
    height: auto;
    border-radius: var(--radius-lg);
    margin-top: clamp(0.875rem, 2vw, 1rem);
    border: 1px solid hsl(var(--border));
  }

  .cs-decisions {
    background: hsl(var(--card));
  }

  .decision-cards {
    display: grid;
    gap: clamp(1rem, 3vw, 1.5rem);
  }

  .decision-card {
    padding: clamp(1.25rem, 3vw, 1.5rem);
    background: hsl(var(--background));
    border: 1px solid hsl(var(--border));
    border-radius: var(--radius-lg);
    border-left: 4px solid hsl(var(--primary));
    transition: all var(--transition-base);

    @include sm {
      &:hover {
        transform: translateX(4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }
    }
  }

  .cs-links {
    background: hsl(var(--card));
  }

  .link-buttons {
    display: flex;
    gap: clamp(0.75rem, 2vw, 1rem);
    justify-content: center;
    flex-wrap: wrap;

    @media (max-width: 480px) {
      flex-direction: column;
    }
  }

  .btn {
    padding: clamp(0.875rem, 2.5vw, 1rem) clamp(1.5rem, 4vw, 2rem);
    font-size: clamp(1rem, 2vw, 1.125rem);
    font-weight: 600;
    text-decoration: none;
    border-radius: var(--radius);
    transition: all var(--transition-base);
    min-width: 140px;
    min-height: 48px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 480px) {
      width: 100%;
      min-height: 52px;
    }

    &:focus-visible {
      outline: 2px solid hsl(var(--ring));
      outline-offset: 2px;
    }
  }

  .btn-primary {
    background: hsl(var(--primary));
    color: white;

    @include sm {
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        background: hsl(var(--primary) / 0.9);
      }
    }

    &:active {
      transform: scale(0.98);
    }
  }

  .btn-secondary {
    background: transparent;
    color: hsl(var(--foreground));
    border: 2px solid hsl(var(--border));

    @include sm {
      &:hover {
        border-color: hsl(var(--primary));
        color: hsl(var(--primary));
        transform: translateY(-2px);
        background: hsl(var(--primary) / 0.05);
      }
    }

    &:active {
      transform: scale(0.98);
    }
  }

  .cs-navigation {
    background: hsl(var(--background));
  }

  .cs-navigation .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: clamp(0.875rem, 2vw, 1rem);

    @include max-sm {
      flex-direction: column;
      align-items: stretch;
    }
  }

  .back-link,
  .next-link {
    font-size: clamp(0.9375rem, 1.5vw, 1rem);
    font-weight: 600;
    color: hsl(var(--foreground));
    text-decoration: none;
    transition: all var(--transition-fast);
    padding: var(--space-2);
    border-radius: var(--radius);
    min-height: 44px;
    display: inline-flex;
    align-items: center;

    @include sm {
      &:hover {
        color: hsl(var(--primary));
        background: hsl(var(--accent));
      }
    }

    &:focus-visible {
      outline: 2px solid hsl(var(--ring));
      outline-offset: 2px;
    }
  }
</style>
