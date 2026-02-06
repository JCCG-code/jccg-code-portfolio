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

    <section class="cs-results">
      <div class="container">
        <h2>{{ t('case_study.results') }}</h2>
        <div class="metrics-grid">
          <div
            v-for="(metric, index) in project.results"
            :key="index"
            class="metric">
            <span class="value">{{ metric.value }}</span>
            <span class="label">{{ metric.label }}</span>
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

<style scoped>
  .case-study {
    min-height: 100vh;
  }

  .cs-hero {
    margin-top: 60px;
    width: 100%;
    max-height: 60vh;
    overflow: hidden;
    background: var(--color-background);
  }

  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  section {
    padding: 4rem 1rem;
  }

  .container {
    max-width: 900px;
    margin: 0 auto;
  }

  h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--color-text-primary);
  }

  h2 {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    margin-bottom: 2rem;
    color: var(--color-text-primary);
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--color-text-primary);
  }

  h4 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: var(--color-text-primary);
  }

  p {
    font-size: 1.125rem;
    line-height: 1.8;
    color: var(--color-text-secondary);
    margin-bottom: 1rem;
  }

  .cs-overview {
    background: var(--color-surface);
  }

  .lead {
    font-size: 1.375rem;
    line-height: 1.7;
    margin-bottom: 2rem;
    color: var(--color-text-primary);
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 1.5rem;
    background: var(--color-background);
    border-radius: 0.5rem;
    border: 1px solid var(--color-border);
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .meta-item strong {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .meta-item span {
    font-size: 1rem;
    color: var(--color-text-primary);
  }

  .cs-challenge {
    background: var(--color-background);
  }

  .cs-contributions ul,
  .cs-learnings ul {
    list-style: none;
    padding: 0;
  }

  .cs-contributions li,
  .cs-learnings li {
    padding-left: 2rem;
    margin-bottom: 1rem;
    position: relative;
  }

  .cs-contributions li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--color-primary);
    font-weight: 700;
    font-size: 1.25rem;
  }

  .cs-learnings li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--color-primary);
    font-weight: 700;
    font-size: 1.25rem;
  }

  .cs-process {
    background: var(--color-background);
  }

  .process-steps {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .process-step img {
    width: 100%;
    border-radius: 0.5rem;
    margin-top: 1rem;
  }

  .cs-decisions {
    background: var(--color-surface);
  }

  .decision-cards {
    display: grid;
    gap: 1.5rem;
  }

  .decision-card {
    padding: 1.5rem;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    border-left: 4px solid var(--color-primary);
  }

  .cs-results {
    background: var(--color-background);
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }

  .metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem;
    background: var(--color-surface);
    border-radius: 0.5rem;
    border: 1px solid var(--color-border);
  }

  .metric .value {
    font-size: 3rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 0.5rem;
  }

  .metric .label {
    font-size: 1rem;
    color: var(--color-text-secondary);
  }

  .cs-links {
    background: var(--color-surface);
  }

  .link-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn {
    padding: 1rem 2rem;
    font-size: 1.125rem;
    font-weight: 600;
    text-decoration: none;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
    min-width: 160px;
    text-align: center;
  }

  .btn-primary {
    background: var(--color-primary);
    color: white;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .btn-secondary {
    background: transparent;
    color: var(--color-text-primary);
    border: 2px solid var(--color-border);
  }

  .btn-secondary:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
    transform: translateY(-2px);
  }

  .cs-navigation {
    background: var(--color-background);
  }

  .cs-navigation .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .back-link,
  .next-link {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text-primary);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .back-link:hover,
  .next-link:hover {
    color: var(--color-primary);
  }

  @media (max-width: 640px) {
    section {
      padding: 3rem 1rem;
    }

    .meta {
      flex-direction: column;
      gap: 1rem;
    }

    .metrics-grid {
      grid-template-columns: 1fr;
    }

    .cs-navigation .container {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
