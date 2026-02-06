<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="social-links">
          <a
            href="https://github.com/jccuadra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub">
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/jccuadra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn">
            LinkedIn
          </a>
          <a
            href="mailto:jccuadra@gmail.com"
            aria-label="Email">
            Email
          </a>
        </div>

        <div class="copyright">
          <p>
            &copy; {{ currentYear }} Juan Carlos Cuadra.
            {{ t('footer.copyright') }}
          </p>
          <p class="built-with">{{ t('footer.built_with') }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  const { t } = useAppLocale()
  const currentYear = new Date().getFullYear()
</script>

<style lang="scss" scoped>
  @use '~/assets/scss/utils/mixins' as *;

  .app-footer {
    padding: clamp(3rem, 8vw, 4rem) clamp(1rem, 4vw, 2rem);
    background: hsl(var(--card));
    border-top: 1px solid hsl(var(--border));
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    gap: clamp(1.5rem, 4vw, 2rem);
    align-items: center;
  }

  .social-links {
    display: flex;
    gap: clamp(1.5rem, 4vw, 2rem);
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .social-links a {
    font-family: var(--font-mono);
    font-size: clamp(0.875rem, 1.5vw, 0.9375rem);
    font-weight: 500;
    color: hsl(var(--muted-foreground));
    text-decoration: none;
    transition: color var(--transition-fast);
    padding: var(--space-2);
    border-radius: var(--radius);
    min-height: 44px;
    display: inline-flex;
    align-items: center;

    &:hover {
      color: hsl(var(--primary));
      background: hsl(var(--accent));
    }

    &:focus-visible {
      outline: 2px solid hsl(var(--ring));
      outline-offset: 2px;
    }
  }

  .copyright {
    text-align: center;

    p {
      font-size: clamp(0.8125rem, 1.5vw, 0.875rem);
      color: hsl(var(--muted-foreground));
      margin: clamp(0.25rem, 1vw, 0.5rem) 0;
      line-height: 1.5;
    }
  }

  .built-with {
    font-size: clamp(0.75rem, 1.5vw, 0.8125rem);
    opacity: 0.8;
  }
</style>
