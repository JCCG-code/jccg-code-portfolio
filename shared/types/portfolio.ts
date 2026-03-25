/**
 * Portfolio data type definitions
 */

/**
 * Process step in project development
 */
export interface ProcessStep {
  /** Step title */
  title: string
  /** Step description */
  description: string
  /** Optional image illustrating the step */
  image?: string
}

/**
 * Key technical or architectural decision
 */
export interface KeyDecision {
  /** Decision title */
  title: string
  /** Rationale behind the decision */
  rationale: string
}

/**
 * Localized project content
 */
export interface ProjectContent {
  /** Project title */
  title: string
  /** Project overview (2-3 sentences) */
  overview: string
  /** Challenge description */
  challenge: string
  /** Your role in the project */
  role: string
  /** Project timeline */
  timeline: string
  /** List of your contributions */
  contributions: string[]
  /** Process steps taken */
  processSteps: ProcessStep[]
  /** Key technical decisions made */
  keyDecisions: KeyDecision[]
  /** Optional learnings */
  learnings?: string[]
}

/**
 * Project with embedded translations
 */
export interface Project {
  /** Unique project ID */
  id: string
  /** URL-friendly slug */
  slug: string
  /** Thumbnail image path */
  thumbnail: string
  /** Hero image path for case study */
  heroImage: string
  /** Tech stack used */
  techStack: string[]
  /** Live project URL */
  liveUrl?: string
  /** GitHub repository URL */
  githubUrl?: string
  /** Whether project is featured */
  featured: boolean
  /** Display order */
  order: number
  /** Project status */
  status: 'draft' | 'published' | 'archived'
  /** English content */
  en: ProjectContent
  /** Spanish content */
  es: ProjectContent
}

/**
 * Skill category
 */
export interface SkillCategory {
  /** Category name key (for i18n) */
  name: string
  /** Skills in this category */
  items: Skill[]
}

/**
 * Individual skill/technology
 */
export interface Skill {
  /** Technology name */
  name: string
  /** Optional logo path */
  logo?: string
}
