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
    padding: var(--space-12) var(--space-4);
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
    gap: var(--space-8);
    align-items: center;
  }

  .social-links {
    display: flex;
    gap: var(--space-8);
    flex-wrap: wrap;
    justify-content: center;
  }

  .social-links a {
    font-family: var(--font-mono);
    font-size: var(--font-sm);
    font-weight: 500;
    color: hsl(var(--muted-foreground));
    text-decoration: none;
    transition: color var(--transition-fast);

    &:hover {
      color: hsl(var(--primary));
    }
  }

  .copyright {
    text-align: center;

    p {
      font-size: var(--font-sm);
      color: hsl(var(--muted-foreground));
      margin: var(--space-1) 0;
    }
  }

  .built-with {
    font-size: var(--font-xs);
    opacity: 0.8;
  }

  @include mobile {
    .app-footer {
      padding: var(--space-8) var(--space-4);
    }

    .social-links {
      gap: var(--space-4);
    }
  }
</style>
