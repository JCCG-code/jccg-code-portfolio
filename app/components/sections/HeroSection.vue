<template>
  <section
    id="home"
    class="hero">
    <div class="hero-grid">
      <!-- Left: Immediate action -->
      <div class="hero-primary">
        <span class="badge">Full Stack Developer</span>
        <h1 class="name">Juan Carlos Cuadra</h1>
        <p class="hook">{{ t('hero.hook') }}</p>

        <div class="actions">
          <button
            class="action-primary"
            @click="scrollToSection('projects')">
            {{ t('hero.cta_primary') }}
          </button>
          <button
            class="action-secondary"
            @click="scrollToSection('contact')">
            {{ t('hero.cta_secondary') }}
          </button>
        </div>
      </div>

      <!-- Right: Technical intro -->
      <div class="hero-secondary">
        <div class="tech-intro">
          <span class="label">// Current stack</span>
          <div class="stack-list">
            <span class="stack-item">Vue 3</span>
            <span class="stack-item">Nuxt 4</span>
            <span class="stack-item">TypeScript</span>
            <span class="stack-item">PostgreSQL</span>
          </div>
        </div>

        <div class="quick-metrics">
          <div class="metric">
            <span class="metric-value">2+</span>
            <span class="metric-label">Years Experience</span>
          </div>
          <div class="metric">
            <span class="metric-value">10+</span>
            <span class="metric-label">Projects Delivered</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const { t } = useAppLocale()
  const { scrollToSection } = useScrollNavigation()
</script>

<style lang="scss" scoped>
  @use '~/assets/scss/utils/mixins' as *;

  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: var(--space-8) var(--space-4);
  }

  .hero-grid {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: var(--space-16);
    align-items: center;

    @include tablet {
      grid-template-columns: 1fr;
      gap: var(--space-12);
    }
  }

  .hero-primary {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .badge {
    display: inline-block;
    width: fit-content;
    padding: var(--space-1) var(--space-3);
    font-family: var(--font-mono);
    font-size: var(--font-xs);
    color: hsl(var(--primary));
    background: hsl(var(--primary) / 0.1);
    border: 1px solid hsl(var(--primary) / 0.2);
    border-radius: var(--radius);
    letter-spacing: 0.05em;
  }

  .name {
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 700;
    line-height: 1.1;
    color: hsl(var(--foreground));
    letter-spacing: -0.02em;
  }

  .hook {
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    line-height: 1.6;
    color: hsl(var(--muted-foreground));
    max-width: 32rem;
  }

  .actions {
    display: flex;
    gap: var(--space-3);
    margin-top: var(--space-2);

    @include mobile {
      flex-direction: column;
    }
  }

  .action-primary,
  .action-secondary {
    padding: var(--space-3) var(--space-6);
    font-size: var(--font-base);
    font-weight: 600;
    border-radius: var(--radius);
    transition: all var(--transition-fast);
    cursor: pointer;
    border: none;

    &:focus-visible {
      outline: none;
      box-shadow: var(--shadow-focus);
    }
  }

  .action-primary {
    background: hsl(var(--primary));
    color: hsl(var(--primary-foreground));

    &:hover {
      background: hsl(var(--primary) / 0.9);
      box-shadow: var(--shadow-hover);
    }
  }

  .action-secondary {
    background: transparent;
    color: hsl(var(--foreground));
    border: 1px solid hsl(var(--border));

    &:hover {
      background: hsl(var(--accent));
      border-color: hsl(var(--primary));
    }
  }

  .hero-secondary {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
    padding: var(--space-8);
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: var(--radius-lg);

    @include mobile {
      padding: var(--space-6);
    }
  }

  .tech-intro {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .label {
    font-family: var(--font-mono);
    font-size: var(--font-sm);
    color: hsl(var(--muted-foreground));
  }

  .stack-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .stack-item {
    padding: var(--space-2) var(--space-3);
    font-family: var(--font-mono);
    font-size: var(--font-sm);
    background: hsl(var(--muted));
    color: hsl(var(--foreground));
    border: 1px solid hsl(var(--border));
    border-radius: var(--radius);
  }

  .quick-metrics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6);
    padding-top: var(--space-6);
    border-top: 1px solid hsl(var(--border));
  }

  .metric {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .metric-value {
    font-family: var(--font-mono);
    font-size: var(--font-3xl);
    font-weight: 700;
    color: hsl(var(--primary));
    line-height: 1;
  }

  .metric-label {
    font-size: var(--font-xs);
    color: hsl(var(--muted-foreground));
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
</style>
