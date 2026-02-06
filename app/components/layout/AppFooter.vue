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

<style scoped>
  .app-footer {
    padding: 3rem 1rem;
    background: var(--color-surface);
    border-top: 1px solid var(--color-border);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }

  .social-links {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .social-links a {
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .social-links a:hover {
    color: var(--color-primary);
  }

  .copyright {
    text-align: center;
  }

  .copyright p {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    margin: 0.25rem 0;
  }

  .built-with {
    font-size: 0.8125rem;
    opacity: 0.8;
  }

  @media (max-width: 640px) {
    .app-footer {
      padding: 2rem 1rem;
    }

    .social-links {
      gap: 1rem;
    }
  }
</style>
