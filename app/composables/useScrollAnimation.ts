import { onUnmounted, type Ref } from 'vue'

/**
 * Composable for scroll-triggered animations
 */
export function useScrollAnimation() {
  /**
   * Observe an element and trigger callback when it enters viewport
   */
  const observeElement = (
    el: Ref<HTMLElement | null>,
    onIntersect: () => void,
    options?: Record<string, unknown>
  ) => {
    if (!el.value) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, ...options }
    )

    observer.observe(el.value)

    onUnmounted(() => observer.disconnect())
  }

  return { observeElement }
}
