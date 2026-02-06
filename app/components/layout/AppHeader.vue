<template>
  <header :class="['app-header', { scrolled: isScrolled, hidden: isHidden }]">
    <div class="container">
      <div class="brand">JCCG Code</div>

      <nav class="desktop-nav">
        <a
          v-for="section in sections"
          :key="section.id"
          :class="{ active: activeSection === section.id }"
          @click.prevent="scrollToSection(section.id)">
          {{ t(`nav.${section.id}`) }}
        </a>
      </nav>

      <div class="controls">
        <ThemeToggle />
        <LocaleToggle />
      </div>

      <button
        class="mobile-menu-toggle"
        :aria-label="t('nav.menu')"
        @click="toggleMenu">
        <span
          class="hamburger"
          :class="{ open: menuOpen }" />
      </button>
    </div>

    <transition name="slide-down">
      <div
        v-if="menuOpen"
        class="mobile-menu">
        <nav>
          <a
            v-for="section in sections"
            :key="section.id"
            :class="{ active: activeSection === section.id }"
            @click="handleMobileNavClick(section.id)">
            {{ t(`nav.${section.id}`) }}
          </a>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
  const { t } = useAppLocale()
  const { isScrolled, isHidden, activeSection, scrollToSection } =
    useScrollNavigation()

  const menuOpen = ref(false)

  const sections = [
    { id: 'home' },
    { id: 'projects' },
    { id: 'about' },
    { id: 'skills' },
    { id: 'contact' }
  ]

  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
  }

  const handleMobileNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    menuOpen.value = false
  }

  onMounted(() => {
    watch(isScrolled, () => {
      if (menuOpen.value) {
        menuOpen.value = false
      }
    })
  })
</script>

<style scoped>
  .app-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 1rem 0;
    transition: all 0.3s ease;
    background: transparent;
  }

  .app-header.scrolled {
    background: var(--color-surface);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .app-header.hidden {
    transform: translateY(-100%);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .brand {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text-primary);
  }

  .desktop-nav {
    display: flex;
    gap: 2rem;
  }

  .desktop-nav a {
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    text-decoration: none;
    cursor: pointer;
    position: relative;
    transition: color 0.2s ease;
  }

  .desktop-nav a:hover {
    color: var(--color-text-primary);
  }

  .desktop-nav a.active {
    color: var(--color-primary);
  }

  .desktop-nav a.active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--color-primary);
  }

  .controls {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }

  .hamburger {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--color-text-primary);
    position: relative;
    transition: background 0.3s ease;
  }

  .hamburger::before,
  .hamburger::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background: var(--color-text-primary);
    transition: all 0.3s ease;
  }

  .hamburger::before {
    top: -8px;
  }

  .hamburger::after {
    bottom: -8px;
  }

  .hamburger.open {
    background: transparent;
  }

  .hamburger.open::before {
    top: 0;
    transform: rotate(45deg);
  }

  .hamburger.open::after {
    bottom: 0;
    transform: rotate(-45deg);
  }

  .mobile-menu {
    background: var(--color-surface);
    border-top: 1px solid var(--color-border);
    padding: 1rem 0;
  }

  .mobile-menu nav {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
  }

  .mobile-menu a {
    font-size: 1.125rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    text-decoration: none;
    cursor: pointer;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }

  .mobile-menu a:hover,
  .mobile-menu a.active {
    background: var(--color-background);
    color: var(--color-primary);
  }

  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: all 0.3s ease;
  }

  .slide-down-enter-from,
  .slide-down-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  @media (max-width: 768px) {
    .desktop-nav {
      display: none;
    }

    .mobile-menu-toggle {
      display: block;
    }
  }

  @media (min-width: 769px) {
    .mobile-menu {
      display: none;
    }
  }
</style>
