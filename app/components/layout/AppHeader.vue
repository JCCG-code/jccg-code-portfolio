<template>
  <header :class="['app-header', { scrolled: isScrolled, hidden: isHidden }]">
    <div class="header-container">
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

<style lang="scss" scoped>
  @use '~/assets/scss/utils/mixins' as *;

  .app-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: var(--z-sticky);
    padding: var(--space-4) 0;
    transition: all var(--transition-base);
    background: transparent;
  }

  .app-header.scrolled {
    background: hsl(var(--card) / 0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid hsl(var(--border));
  }

  .app-header.hidden {
    transform: translateY(-100%);
  }

  .header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-4);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-8);
  }

  .brand {
    font-family: var(--font-mono);
    font-size: var(--font-lg);
    font-weight: 700;
    color: hsl(var(--foreground));
    letter-spacing: -0.02em;
  }

  .desktop-nav {
    display: flex;
    gap: var(--space-6);
    flex: 1;
    justify-content: center;

    @include tablet {
      display: none;
    }
  }

  .desktop-nav a {
    font-size: var(--font-sm);
    font-weight: 500;
    color: hsl(var(--muted-foreground));
    text-decoration: none;
    cursor: pointer;
    position: relative;
    transition: color var(--transition-fast);
    padding: var(--space-2) 0;

    &:hover {
      color: hsl(var(--foreground));
    }

    &.active {
      color: hsl(var(--primary));
    }

    &.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: hsl(var(--primary));
    }
  }

  .controls {
    display: flex;
    gap: var(--space-2);
    align-items: center;
  }

  .mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--space-2);

    @include tablet {
      display: block;
    }
  }

  .hamburger {
    display: block;
    width: 24px;
    height: 2px;
    background: hsl(var(--foreground));
    position: relative;
    transition: background var(--transition-base);

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 24px;
      height: 2px;
      background: hsl(var(--foreground));
      transition: all var(--transition-base);
    }

    &::before {
      top: -8px;
    }

    &::after {
      bottom: -8px;
    }

    &.open {
      background: transparent;

      &::before {
        top: 0;
        transform: rotate(45deg);
      }

      &::after {
        bottom: 0;
        transform: rotate(-45deg);
      }
    }
  }

  .mobile-menu {
    background: hsl(var(--card));
    border-top: 1px solid hsl(var(--border));
    padding: var(--space-4) 0;

    nav {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      padding: 0 var(--space-4);
    }

    a {
      font-size: var(--font-base);
      font-weight: 500;
      color: hsl(var(--muted-foreground));
      text-decoration: none;
      cursor: pointer;
      padding: var(--space-3) var(--space-4);
      border-radius: var(--radius);
      transition: all var(--transition-fast);

      &:hover,
      &.active {
        background: hsl(var(--accent));
        color: hsl(var(--primary));
      }
    }
  }

  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: all var(--transition-base);
  }

  .slide-down-enter-from,
  .slide-down-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
</style>
