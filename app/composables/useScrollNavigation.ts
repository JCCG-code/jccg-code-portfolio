import { ref, onMounted, onUnmounted, readonly } from 'vue'

/**
 * Composable for scroll-based navigation tracking
 *
 * Features:
 * - Smart header hide/show on scroll
 * - Active section detection via Intersection Observer
 * - Smooth scroll to sections
 */
export function useScrollNavigation() {
  const isScrolled = ref(false)
  const isHidden = ref(false)
  const activeSection = ref<string>('')

  let lastScrollY = 0
  const threshold = 100

  /**
   * Handle scroll events for smart hide/show
   */
  const handleScroll = () => {
    const currentScrollY = window.scrollY

    // Detect if scrolled past threshold
    isScrolled.value = currentScrollY > 50

    // Smart hide: hide on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > threshold) {
      isHidden.value = true
    } else {
      isHidden.value = false
    }

    lastScrollY = currentScrollY
  }

  /**
   * Scroll smoothly to a section by ID
   */
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  /**
   * Set up Intersection Observer for active section detection
   */
  const observeSections = () => {
    const sections = document.querySelectorAll('section[id]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id
          }
        })
      },
      { threshold: 0.3, rootMargin: '-100px 0px -60% 0px' }
    )

    sections.forEach((section) => observer.observe(section))

    return observer
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    const observer = observeSections()

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    })
  })

  return {
    isScrolled: readonly(isScrolled),
    isHidden: readonly(isHidden),
    activeSection: readonly(activeSection),
    scrollToSection
  }
}
