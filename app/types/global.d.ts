/**
 * Global type declarations
 */

declare module '*.json' {
  const value: unknown
  export default value
}

declare module '~/shared/data/projects.json' {
  import type { Project } from '~/shared/types/portfolio'
  const projects: Project[]
  export default projects
}

declare module '~/shared/data/skills.json' {
  import type { SkillCategory } from '~/shared/types/portfolio'
  const skills: SkillCategory[]
  export default skills
}
