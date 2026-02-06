import { ref, readonly } from 'vue'
import type { Project } from '#shared/types/portfolio'
import { useAppLocale } from './useAppLocale'

/**
 * Composable for managing project data
 */
export function useProjects() {
  const { locale } = useAppLocale()
  const projects = ref<Project[]>([])

  /**
   * Fetch all projects from JSON data
   */
  const fetchProjects = async () => {
    const data = await import('#shared/data/projects.json')
    projects.value = data.default as Project[]
  }

  /**
   * Get featured projects sorted by order
   */
  const getFeaturedProjects = () => {
    return projects.value
      .filter((p: Project) => p.featured && p.status === 'published')
      .sort((a: Project, b: Project) => a.order - b.order)
  }

  /**
   * Get project by slug with current locale content
   */
  const getProjectBySlug = (slug: string) => {
    const project = projects.value.find((p: Project) => p.slug === slug)
    if (!project) return null

    const currentLocale = locale.value as 'en' | 'es'

    // Combine base data with current locale translation
    return {
      ...project,
      ...project[currentLocale]
    }
  }

  return {
    projects: readonly(projects),
    fetchProjects,
    getFeaturedProjects,
    getProjectBySlug
  }
}
