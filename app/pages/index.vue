<template>
  <div class="portfolio-page">
    <AppHeader />

    <main>
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
  const { t } = useAppLocale()

  useHead({
    title: 'Juan Carlos Cuadra - Full Stack Developer',
    meta: [
      {
        name: 'description',
        content: t('hero.hook')
      },
      {
        property: 'og:title',
        content: 'Juan Carlos Cuadra - Full Stack Developer'
      },
      {
        property: 'og:description',
        content: t('hero.hook')
      },
      {
        property: 'og:type',
        content: 'website'
      }
    ]
  })
</script>

<style scoped>
  .portfolio-page {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  main {
    padding-top: clamp(60px, 12vw, 80px);
    flex: 1;
  }
</style>
