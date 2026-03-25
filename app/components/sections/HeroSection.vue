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
    min-height: 100dvh;
    display: flex;
    align-items: center;
    padding: clamp(4rem, 10vh, 8rem) clamp(1rem, 4vw, 2rem);

    @include max-md {
      padding-top: clamp(6rem, 15vh, 8rem);
      padding-bottom: clamp(3rem, 8vh, 4rem);
    }
  }

  .hero-grid {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(2rem, 6vw, 4rem);
    align-items: center;

    @include md {
      grid-template-columns: 1fr 0.9fr;
      gap: clamp(2rem, 4vw, 3rem);
    }

    @include lg {
      grid-template-columns: 1.2fr 1fr;
      gap: clamp(3rem, 6vw, 4rem);
    }
  }

  .hero-primary {
    display: flex;
    flex-direction: column;
    gap: clamp(1rem, 3vw, 1.5rem);

    @include md {
      gap: clamp(1.25rem, 3vw, 1.75rem);
    }
  }

  .badge {
    display: inline-block;
    width: fit-content;
    padding: var(--space-1) var(--space-3);
    font-family: var(--font-mono);
    font-size: clamp(0.7rem, 1.5vw, 0.75rem);
    color: hsl(var(--primary));
    background: hsl(var(--primary) / 0.1);
    border: 1px solid hsl(var(--primary) / 0.2);
    border-radius: var(--radius);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .name {
    font-size: clamp(2rem, 8vw, 4rem);
    font-weight: 700;
    line-height: 1.1;
    color: hsl(var(--foreground));
    letter-spacing: -0.02em;
    word-break: break-word;

    @include md {
      font-size: clamp(2.5rem, 6vw, 4rem);
    }
  }

  .hook {
    font-size: clamp(1rem, 2.5vw, 1.375rem);
    line-height: 1.6;
    color: hsl(var(--muted-foreground));
    max-width: 36rem;

    @include md {
      font-size: clamp(1.125rem, 2vw, 1.375rem);
    }
  }

  .actions {
    display: flex;
    gap: clamp(0.75rem, 2vw, 1rem);
    margin-top: clamp(0.5rem, 2vw, 1rem);
    flex-wrap: wrap;

    @include max-sm {
      flex-direction: column;
      gap: var(--space-3);
    }
  }

  .action-primary,
  .action-secondary {
    padding: clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem);
    font-size: clamp(0.9375rem, 2vw, 1rem);
    font-weight: 600;
    border-radius: var(--radius);
    transition: all var(--transition-fast);
    cursor: pointer;
    border: none;
    min-height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;

    @include max-sm {
      width: 100%;
      min-height: 52px;
    }

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
    gap: clamp(1.5rem, 4vw, 2rem);
    padding: clamp(1.5rem, 4vw, 2rem);
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: var(--radius-lg);

    @include md {
      order: 2;
    }
  }

  .tech-intro {
    display: flex;
    flex-direction: column;
    gap: clamp(0.75rem, 2vw, 1rem);
  }

  .label {
    font-family: var(--font-mono);
    font-size: clamp(0.8125rem, 1.5vw, 0.875rem);
    color: hsl(var(--muted-foreground));
  }

  .stack-list {
    display: flex;
    flex-wrap: wrap;
    gap: clamp(0.5rem, 1.5vw, 0.625rem);
  }

  .stack-item {
    padding: clamp(0.5rem, 1.5vw, 0.625rem) clamp(0.75rem, 2vw, 1rem);
    font-family: var(--font-mono);
    font-size: clamp(0.8125rem, 1.5vw, 0.875rem);
    background: hsl(var(--muted));
    color: hsl(var(--foreground));
    border: 1px solid hsl(var(--border));
    border-radius: var(--radius);
    white-space: nowrap;
  }

</style>
