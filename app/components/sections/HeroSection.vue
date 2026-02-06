<template>
  <section
    id="home"
    class="hero-section">
    <div class="container">
      <div class="hero-content">
        <h1 class="greeting">{{ t('hero.greeting') }}</h1>
        <p class="hook">{{ t('hero.hook') }}</p>
        <p class="subhook">{{ t('hero.subhook') }}</p>

        <div class="cta-group">
          <button
            class="btn btn-primary"
            @click="scrollToSection('projects')">
            {{ t('hero.cta_primary') }}
          </button>
          <button
            class="btn btn-secondary"
            @click="scrollToSection('contact')">
            {{ t('hero.cta_secondary') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const { t } = useAppLocale()
  const { scrollToSection } = useScrollNavigation()
</script>

<style scoped>
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 2rem 1rem;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    animation: fadeInUp 0.8s ease-out;
  }

  .greeting {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--color-text-primary);
  }

  .hook {
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    color: var(--color-text-primary);
  }

  .subhook {
    font-size: clamp(1.125rem, 3vw, 1.5rem);
    color: var(--color-text-secondary);
    margin-bottom: 3rem;
    line-height: 1.6;
  }

  .cta-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn {
    padding: 1rem 2rem;
    font-size: 1.125rem;
    font-weight: 600;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 160px;
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

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 640px) {
    .cta-group {
      flex-direction: column;
      align-items: stretch;
    }

    .btn {
      width: 100%;
    }
  }
</style>
