# Plan: Portfolio Interactivo JCCG Code

## Objetivo

Transformar el proyecto JCCG Code Portfolio en un portfolio de desarrollador interactivo y memorable que pase el **test de 30 segundos**: los visitantes deben entender quién eres, qué haces, ver tu mejor trabajo y saber cómo contactarte en menos de 30 segundos.

---

## Contexto Actual

**Stack implementado:**

- Nuxt 4.3 + Vue 3 + TypeScript (strict, no 'any')
- Sistema de temas (light/dark/system) con CSS variables
- i18n (EN/ES) con estrategia no_prefix
- PostgreSQL en Docker (configurado pero sin usar)
- Performance optimizations: prerender, component islands, view transitions
- ESLint + Prettier configurados según CLAUDE.md

**Estado:**

- Solo ruta raíz (/) con contenido de demostración
- Componentes base: ThemeToggle, LocaleToggle
- Composables: useAppTheme, useAppLocale
- Sin páginas de portfolio real
- Sin datos de proyectos
- Sin formulario de contacto

---

## Principios de Interactive Portfolio

### Test de 30 Segundos

Los visitantes deben ver inmediatamente:

1. ✅ Quién eres
2. ✅ Qué haces
3. ✅ Tu mejor trabajo
4. ✅ Cómo contactarte

### Secciones Esenciales (Prioridad)

- **Hero** (CRÍTICO): Hook + identidad + CTA
- **Projects** (CRÍTICO): Prueba de habilidades con impacto medible
- **About** (IMPORTANTE): Personalidad + historia
- **Contact** (CRÍTICO): Conversión de interés
- **Skills** (OPCIONAL): Tech stack

### Portfolio de Developer - Must-Haves

- Enlaces a proyectos en vivo + GitHub
- Tech stack para cada proyecto
- Métricas de impacto (no "Built a website", sino "Increased conversions 40%")
- Contribución específica en cada proyecto
- Código limpio (snippets que demuestren arquitectura)

### Anti-Patterns a Evitar

- ❌ Template Portfolio (looks like everyone else)
- ❌ All Style No Substance (animaciones fancy, proyectos débiles)
- ❌ Resume Website (aburrido, sin personalidad)
- ❌ Tutorial Clones (proyectos de cursos)
- ❌ "Coming Soon" (proyectos incompletos)

---

## Arquitectura Seleccionada

### Opción: Hybrid (Single-Page Scroll + Multi-Route)

**Justificación:**

- ✅ Pasa el test de 30 segundos: Hero → Projects → About → Contact visibles via scroll
- ✅ Mobile-friendly: scroll natural en dispositivos móviles
- ✅ SEO: deep-links para proyectos individuales
- ✅ UX: sin fricción de navegación, impacto inmediato
- ✅ Aprovecha view transitions de Nuxt 4

**Estructura:**

```
pages/
  index.vue              # Single-page scroll (Hero → Projects → About → Skills → Contact)
  projects/
    [slug].vue           # Case studies detallados (deep-link desde cards)
```

**Navegación:**

- Fixed header con smart hide (se oculta al scroll down, aparece al scroll up)
- Links con smooth scroll a secciones
- Indicador de sección activa (Intersection Observer)
- Hamburger menu en mobile

---

## Sistema de Datos

### Fase 1 (MVP): JSON Files

**Rationale:**

- Simple, controlado por versiones
- No requiere queries a DB para portfolio estático
- Perfecto para prerendering
- Type-safe con TypeScript
- Lecturas rápidas via import

**Estructura:**

```
shared/data/
  projects.json         # Todos los proyectos con traducciones embebidas
  skills.json           # Tech stack
  about.json            # Contenido About section (opcional)
```

**Tipos TypeScript:**

```typescript
// shared/types/portfolio.ts
interface Project {
  id: string
  slug: string
  thumbnail: string
  heroImage: string
  techStack: string[]
  metrics?: Metric[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  order: number
  status: 'draft' | 'published' | 'archived'

  // Traducciones embebidas
  en: ProjectContent
  es: ProjectContent
}

interface ProjectContent {
  title: string
  oneLiner: string // Impacto en 1 línea
  overview: string
  challenge: string
  role: string
  timeline: string
  contributions: string[]
  processSteps: ProcessStep[]
  keyDecisions: KeyDecision[]
  results: Metric[]
  learnings?: string[]
}

interface Metric {
  value: string // "40%", "10 hours/week"
  label: string // "increase in conversions"
}
```

**Composable de acceso:**

```typescript
// app/composables/useProjects.ts
export function useProjects() {
  const { locale } = useAppLocale()

  const projects = ref<Project[]>([])

  const fetchProjects = async () => {
    const data = await import('~/shared/data/projects.json')
    projects.value = data.default
  }

  const getFeaturedProjects = () => {
    return projects.value
      .filter((p) => p.featured && p.status === 'published')
      .sort((a, b) => a.order - b.order)
  }

  const getProjectBySlug = (slug: string) => {
    const project = projects.value.find((p) => p.slug === slug)
    if (!project) return null

    // Combinar datos base con traducción actual
    return {
      ...project,
      ...project[locale.value]
    }
  }

  return {
    projects: readonly(projects),
    fetchProjects,
    getFeaturedProjects,
    getProjectBySlug
  }
}
```

---

## Componentes a Crear

### 1. Layout Components

#### `app/components/layout/AppHeader.vue`

**Responsabilidad:** Navegación principal con scroll inteligente

**Features:**

- Fixed position con backdrop blur
- Smart hide: oculta al scroll down, muestra al scroll up
- Background transparente arriba, sólido al scroll
- Links a secciones con smooth scroll
- Indicador de sección activa (underline/dot)
- Theme + Locale toggles
- Hamburger menu en mobile

**Composables usados:**

- `useScrollNavigation()` - tracking de scroll y sección activa

**Estructura:**

```vue
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
        @click="toggleMenu">
        <span class="hamburger"></span>
      </button>
    </div>

    <MobileMenu
      v-if="menuOpen"
      @close="menuOpen = false" />
  </header>
</template>
```

#### `app/components/layout/AppFooter.vue`

**Responsabilidad:** Footer con links sociales y copyright

**Contenido:**

- Copyright con año dinámico
- Social links (GitHub, LinkedIn, Email)
- "Built with Nuxt 4 + TypeScript"
- Legal links (opcional: Privacy, Terms)

---

### 2. Section Components

#### `app/components/sections/HeroSection.vue` (CRÍTICO)

**Responsabilidad:** Primera impresión - Hook en 30 segundos

**Formula:**

```
[Greeting] → [Hook] → [Sub-hook] → [CTA]
```

**Contenido:**

```
Hi, I'm Juan Carlos
↓
I build web apps that users actually enjoy using
↓
Full-stack developer specializing in Vue, Nuxt, and TypeScript
↓
[View My Work] [Let's Talk]
```

**Features:**

- Viewport height (min-h-screen)
- Centered content
- Fade-in + slide-up entrance animation
- Responsive typography con clamp()
- Gradient background animado (sutil)
- CTAs con scroll suave a secciones

**i18n keys:**

```json
"hero": {
  "greeting": "Hi, I'm Juan Carlos",
  "hook": "I build web apps that users actually enjoy using",
  "subhook": "Full-stack developer specializing in Vue, Nuxt, and TypeScript",
  "cta_primary": "View My Work",
  "cta_secondary": "Let's Talk"
}
```

---

#### `app/components/sections/ProjectsSection.vue` (CRÍTICO)

**Responsabilidad:** Showcase de proyectos con impacto medible

**Features:**

- Grid responsivo (2 cols desktop, 1 col mobile)
- ProjectCard components
- Filter tabs (opcional): "All", "Web Apps", "Open Source"
- Stagger animation al scroll into view

**Estructura:**

```vue
<template>
  <section
    id="projects"
    class="projects-section">
    <div class="container">
      <h2>{{ t('projects.title') }}</h2>
      <p class="subtitle">{{ t('projects.subtitle') }}</p>

      <div class="project-grid">
        <ProjectCard
          v-for="project in featuredProjects"
          :key="project.id"
          :project="project" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const { getFeaturedProjects } = useProjects()
  const { t } = useAppLocale()

  const featuredProjects = await getFeaturedProjects()
</script>
```

---

#### `app/components/project/ProjectCard.vue` (CRÍTICO)

**Responsabilidad:** Card individual de proyecto con elementos clave

**Elementos según interactive-portfolio:**

1. ✅ Thumbnail (Visual hook)
2. ✅ Title (Qué es)
3. ✅ One-liner (Tu contribución + impacto)
4. ✅ Tech tags (Quick scan)
5. ✅ Results/metrics (Proof of impact)
6. ✅ Links (Live demo, GitHub, case study)

**Estructura:**

```vue
<template>
  <article
    class="project-card"
    @click="navigateToCaseStudy">
    <!-- Thumbnail con overlay al hover -->
    <div class="thumbnail-wrapper">
      <NuxtImg
        :src="project.thumbnail"
        :alt="project.title"
        loading="lazy"
        format="webp"
        quality="80"
        width="600"
        height="400" />
      <div class="overlay">
        <span>{{ t('projects.view_case_study') }}</span>
      </div>
    </div>

    <!-- Contenido -->
    <div class="content">
      <h3>{{ project.title }}</h3>
      <p class="one-liner">{{ project.oneLiner }}</p>

      <!-- Tech stack -->
      <div class="tech-tags">
        <span
          v-for="tech in project.techStack"
          :key="tech">
          {{ tech }}
        </span>
      </div>

      <!-- Métricas de impacto -->
      <div
        v-if="project.metrics"
        class="impact-metrics">
        <div
          v-for="metric in project.metrics"
          :key="metric.label">
          <strong>{{ metric.value }}</strong>
          <span>{{ metric.label }}</span>
        </div>
      </div>

      <!-- Links -->
      <div class="links">
        <NuxtLink :to="`/projects/${project.slug}`">
          {{ t('projects.view_case_study') }}
        </NuxtLink>
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank">
          {{ t('projects.live_demo') }}
        </a>
        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank">
          {{ t('projects.github') }}
        </a>
      </div>
    </div>
  </article>
</template>
```

**Interacciones:**

- Hover: lift + shadow increase
- Thumbnail zoom al hover
- Click: navega a case study con view transition
- Links: event.stopPropagation() para evitar double navigation

---

#### `app/components/sections/AboutSection.vue` (IMPORTANTE)

**Responsabilidad:** Personalidad + historia

**Contenido:**

- Story hook: "I started coding because..."
- Current focus: "Right now, I'm building..."
- What makes you different: Skills + personality
- Core strengths (3-5 puntos clave)
- Link a CV (PDF download)

**Evitar:**

- ❌ Generic statements ("passionate developer")
- ❌ Listing every technology ever touched
- ❌ Resume-style bullet points

**Incluir:**

- ✅ Specific story moments
- ✅ What drives your work
- ✅ Clear value proposition

**Estructura:**

```vue
<template>
  <section
    id="about"
    class="about-section">
    <div class="container">
      <h2>{{ t('about.title') }}</h2>

      <div class="about-grid">
        <div class="story">
          <p>{{ t('about.intro') }}</p>
          <p>{{ t('about.journey') }}</p>
          <p>{{ t('about.focus') }}</p>
        </div>

        <div class="strengths">
          <h3>{{ t('about.core_strengths') }}</h3>
          <ul>
            <li
              v-for="strength in coreStrengths"
              :key="strength">
              {{ strength }}
            </li>
          </ul>
        </div>
      </div>

      <a
        :href="`/cv/juan-carlos-cv-${locale}.pdf`"
        download
        class="download-cv">
        {{ t('about.download_cv') }}
      </a>
    </div>
  </section>
</template>
```

---

#### `app/components/sections/SkillsSection.vue` (OPCIONAL)

**Responsabilidad:** Tech stack showcase

**Approach: Categorizado, visual, honesto**

**Estructura:**

```vue
<template>
  <section
    id="skills"
    class="skills-section">
    <div class="container">
      <h2>{{ t('skills.title') }}</h2>

      <div class="skill-categories">
        <div
          v-for="category in categories"
          :key="category.name"
          class="category">
          <h3>{{ t(`skills.${category.name}`) }}</h3>
          <div class="tech-grid">
            <div
              v-for="tech in category.items"
              :key="tech.name"
              class="tech-item">
              <img
                :src="tech.logo"
                :alt="tech.name" />
              <span>{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

**Categories:**

- Frontend: Vue, Nuxt, TypeScript, etc.
- Backend: Node.js, PostgreSQL, etc.
- DevOps & Tools: Docker, Git, etc.

**Evitar:**

- ❌ Progress bars (subjetivos, sin significado)

---

#### `app/components/sections/ContactSection.vue` (CRÍTICO)

**Responsabilidad:** Conversión de interés

**MVP: Direct Links (Fase 1)**

```vue
<template>
  <section
    id="contact"
    class="contact-section">
    <div class="container">
      <h2>{{ t('contact.title') }}</h2>
      <p class="cta-text">{{ t('contact.cta') }}</p>

      <div class="contact-methods">
        <a
          href="mailto:your@email.com"
          class="contact-btn primary">
          {{ t('contact.email') }}
        </a>
        <a
          href="https://github.com/yourname"
          class="contact-btn secondary">
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/yourname"
          class="contact-btn secondary">
          LinkedIn
        </a>
      </div>
    </div>
  </section>
</template>
```

**Fase 2 (Opcional): Contact Form**

- Form component con Name, Email, Message
- API route `/api/contact` usando Nitro
- Email service: Resend, SendGrid, o Mailgun
- Spam protection: honeypot o reCAPTCHA
- Success/error states

---

### 3. Page Components

#### `pages/index.vue`

**Responsabilidad:** Single-page scroll layout

**Estructura:**

```vue
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
  // SEO
  useHead({
    title: 'Juan Carlos - Full Stack Developer',
    meta: [
      {
        name: 'description',
        content:
          'Full-stack developer specializing in Vue, Nuxt, and TypeScript. View my portfolio of web applications with real impact.'
      },
      { property: 'og:title', content: 'Juan Carlos - Full Stack Developer' },
      {
        property: 'og:description',
        content: 'Portfolio of web applications with real impact'
      },
      { property: 'og:image', content: '/og-image.jpg' }
    ]
  })
</script>
```

---

#### `pages/projects/[slug].vue`

**Responsabilidad:** Case study detallado

**Estructura según interactive-portfolio:**

1. Hero image/video
2. Project overview (2-3 sentences)
3. The challenge
4. Your role
5. Process highlights
6. Key decisions
7. Results/impact
8. Learnings (optional)
9. Links (live, GitHub)

```vue
<template>
  <div class="case-study">
    <!-- Hero -->
    <section class="cs-hero">
      <NuxtImg
        :src="project.heroImage"
        :alt="project.title" />
    </section>

    <!-- Overview -->
    <section class="cs-overview">
      <div class="container">
        <h1>{{ project.title }}</h1>
        <p class="lead">{{ project.overview }}</p>

        <div class="meta">
          <span>{{ t('case_study.role') }}: {{ project.role }}</span>
          <span>{{ project.timeline }}</span>
        </div>
      </div>
    </section>

    <!-- Challenge -->
    <section class="cs-challenge">
      <div class="container">
        <h2>{{ t('case_study.challenge') }}</h2>
        <p>{{ project.challenge }}</p>
      </div>
    </section>

    <!-- Contributions -->
    <section class="cs-contributions">
      <div class="container">
        <h2>{{ t('case_study.role') }}</h2>
        <ul>
          <li
            v-for="contrib in project.contributions"
            :key="contrib">
            {{ contrib }}
          </li>
        </ul>
      </div>
    </section>

    <!-- Process -->
    <section class="cs-process">
      <div class="container">
        <h2>{{ t('case_study.process') }}</h2>
        <div class="process-steps">
          <div
            v-for="(step, index) in project.processSteps"
            :key="index">
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
            <NuxtImg
              v-if="step.image"
              :src="step.image"
              loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Decisions -->
    <section class="cs-decisions">
      <div class="container">
        <h2>{{ t('case_study.decisions') }}</h2>
        <div class="decision-cards">
          <div
            v-for="decision in project.keyDecisions"
            :key="decision.title">
            <h4>{{ decision.title }}</h4>
            <p>{{ decision.rationale }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Results -->
    <section class="cs-results">
      <div class="container">
        <h2>{{ t('case_study.results') }}</h2>
        <div class="metrics-grid">
          <div
            v-for="metric in project.results"
            :key="metric.label">
            <span class="value">{{ metric.value }}</span>
            <span class="label">{{ metric.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Learnings (opcional) -->
    <section
      v-if="project.learnings"
      class="cs-learnings">
      <div class="container">
        <h2>{{ t('case_study.learnings') }}</h2>
        <ul>
          <li
            v-for="learning in project.learnings"
            :key="learning">
            {{ learning }}
          </li>
        </ul>
      </div>
    </section>

    <!-- Links -->
    <section class="cs-links">
      <div class="container">
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank">
          {{ t('projects.live_demo') }}
        </a>
        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank">
          {{ t('projects.github') }}
        </a>
      </div>
    </section>

    <!-- Navigation -->
    <section class="cs-navigation">
      <div class="container">
        <NuxtLink to="/#projects">
          {{ t('case_study.back') }}
        </NuxtLink>
        <NuxtLink
          v-if="nextProject"
          :to="`/projects/${nextProject.slug}`">
          {{ t('case_study.next') }}: {{ nextProject.title }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
  const { getProjectBySlug, getFeaturedProjects } = useProjects()
  const { t } = useAppLocale()

  const project = await getProjectBySlug(route.params.slug as string)

  if (!project) {
    throw createError({ statusCode: 404, message: 'Project not found' })
  }

  // Next project para navegación
  const allProjects = await getFeaturedProjects()
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug)
  const nextProject = allProjects[currentIndex + 1] || allProjects[0]

  // SEO
  useHead({
    title: `${project.title} - Case Study`,
    meta: [{ name: 'description', content: project.overview }]
  })
</script>
```

---

### 4. Composables

#### `app/composables/useScrollNavigation.ts`

**Responsabilidad:** Tracking de scroll y sección activa

```typescript
import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollNavigation() {
  const isScrolled = ref(false)
  const isHidden = ref(false)
  const activeSection = ref<string>('')

  let lastScrollY = 0
  const threshold = 100

  const handleScroll = () => {
    const currentScrollY = window.scrollY

    // Detectar si está scrolled
    isScrolled.value = currentScrollY > 50

    // Smart hide: ocultar al scroll down, mostrar al scroll up
    if (currentScrollY > lastScrollY && currentScrollY > threshold) {
      isHidden.value = true
    } else {
      isHidden.value = false
    }

    lastScrollY = currentScrollY
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  // Intersection Observer para detectar sección activa
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
```

---

#### `app/composables/useScrollAnimation.ts`

**Responsabilidad:** Animaciones al scroll into view

```typescript
import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useScrollAnimation() {
  const observeElement = (
    el: Ref<HTMLElement | null>,
    onIntersect: () => void,
    options?: IntersectionObserverInit
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
```

**Uso en componente:**

```vue
<script setup lang="ts">
  const sectionRef = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  const { observeElement } = useScrollAnimation()

  onMounted(() => {
    observeElement(sectionRef, () => {
      isVisible.value = true
    })
  })
</script>

<template>
  <section
    ref="sectionRef"
    :class="{ 'fade-in': isVisible }">
    <!-- content -->
  </section>
</template>
```

---

## Performance & UX

### Animaciones

**Scroll-triggered animations:**

- Fade-in + slide-up al scroll into view
- Stagger effect para project cards (delay incremental)
- Smooth scroll para navegación

**View Transitions (ya habilitado):**

- Cross-fade entre rutas
- Shared element transitions para project images

**Hover effects:**

- Project cards: `transform: translateY(-8px)` + `box-shadow` increase
- Buttons: slight scale + color shift
- Links: underline slide-in

**Evitar:**

- ❌ Heavy parallax (mal en mobile)
- ❌ Autoplay videos (performance hit)
- ❌ Animaciones excesivas (distractoras)

### Optimización de Imágenes

**Instalar @nuxt/image:**

```bash
pnpm add -D @nuxt/image
```

**Configurar en nuxt.config.ts:**

```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/image'],
  image: {
    quality: 80,
    format: ['webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  }
})
```

**Uso:**

```vue
<NuxtImg
  src="/images/projects/app/hero.jpg"
  alt="Project hero"
  width="1200"
  height="800"
  loading="lazy"
  format="webp"
  quality="80"
  sizes="sm:100vw md:50vw lg:800px" />
```

### Lazy Loading

**Component Islands (ya habilitado):**

```vue
<!-- Skills section como island -->
<SkillsSection nuxt-client />
```

**Async Components:**

```vue
<script setup>
  const ContactForm = defineAsyncComponent(
    () => import('~/components/contact/ContactForm.vue')
  )
</script>
```

**Imágenes:**

- Hero: `loading="eager"` (crítico, above the fold)
- Project thumbnails: `loading="lazy"`
- Case study images: `loading="lazy"`

### Mobile-First

**Breakpoints:**

```css
/* Mobile: 320px - 640px */
/* Tablet: 641px - 1024px */
/* Desktop: 1025px+ */
```

**Consideraciones:**

- Touch targets mínimo 44px
- Texto legible sin zoom (16px base)
- Hamburger menu en mobile
- Single column layout en mobile
- Horizontal scroll para tech tags si necesario

---

## i18n Implementation

### Nuevas Translation Keys

**Expandir `app/locales/en.json` y `es.json`:**

```json
{
  "nav": {
    "home": "Home",
    "projects": "Projects",
    "about": "About",
    "skills": "Skills",
    "contact": "Contact"
  },
  "hero": {
    "greeting": "Hi, I'm Juan Carlos",
    "hook": "I build web apps that users actually enjoy using",
    "subhook": "Full-stack developer specializing in Vue, Nuxt, and TypeScript",
    "cta_primary": "View My Work",
    "cta_secondary": "Let's Talk"
  },
  "projects": {
    "title": "Selected Work",
    "subtitle": "Projects with real impact",
    "view_case_study": "View Case Study",
    "live_demo": "Live Demo",
    "github": "View Code",
    "filter_all": "All Projects",
    "filter_web": "Web Apps",
    "filter_oss": "Open Source"
  },
  "about": {
    "title": "About Me",
    "core_strengths": "Core Strengths",
    "download_cv": "Download CV",
    "intro": "[Your intro paragraph]",
    "journey": "[Your journey paragraph]",
    "focus": "[Current focus paragraph]"
  },
  "skills": {
    "title": "Tech Stack",
    "frontend": "Frontend",
    "backend": "Backend",
    "devops": "DevOps & Tools"
  },
  "contact": {
    "title": "Let's Work Together",
    "cta": "Got a project in mind? Looking for a developer? Let's chat.",
    "email": "Send Email"
  },
  "case_study": {
    "overview": "Overview",
    "challenge": "The Challenge",
    "role": "My Contribution",
    "process": "How I Approached It",
    "decisions": "Technical Decisions",
    "results": "Results",
    "learnings": "What I Learned",
    "back": "Back to Projects",
    "next": "Next Project"
  },
  "footer": {
    "copyright": "All rights reserved",
    "built_with": "Built with Nuxt 4 + TypeScript"
  }
}
```

## Archivos Críticos

### Crear - Components

```
app/components/
  layout/
    AppHeader.vue              # Navegación principal
    AppFooter.vue              # Footer con social links
  sections/
    HeroSection.vue            # Hero con hook + CTA
    ProjectsSection.vue        # Grid de proyectos
    AboutSection.vue           # About story
    SkillsSection.vue          # Tech stack
    ContactSection.vue         # Contact CTA
  project/
    ProjectCard.vue            # Card individual de proyecto
```

### Crear - Pages

```
pages/
  index.vue                    # Single-page scroll principal
  projects/
    [slug].vue                 # Template de case study
```

### Crear - Composables

```
app/composables/
  useProjects.ts              # Gestión de datos de proyectos
  useScrollNavigation.ts      # Scroll tracking + nav activa
  useScrollAnimation.ts       # Animaciones al scroll
```

### Crear - Data & Types

```
shared/
  types/
    portfolio.ts              # Project, Skill, Metric interfaces
  data/
    projects.json             # Datos de proyectos con traducciones
    skills.json               # Tech stack
```

### Modificar - Existing

```
app/app.vue                   # Reemplazar demo content con layout real
app/locales/en.json          # Agregar todas las traducciones
app/locales/es.json          # Agregar todas las traducciones
nuxt.config.ts               # Agregar @nuxt/image module
```

### Crear - Assets

```
public/
  images/
    projects/
      [project-slug]/
        hero.jpg
        thumb.jpg
        process-*.jpg
  cv/
    juan-carlos-cv-en.pdf
    juan-carlos-cv-es.pdf
```

## Comandos de Verificación

```bash
# Antes de commit (según CLAUDE.md)
pnpm lint:fix
pnpm format
pnpm typecheck

# Performance
pnpm analyze

# Build para producción
pnpm build
pnpm preview

# Limpiar caché
pnpm cleanup
```

---

## Consideraciones Especiales

### Selección de Proyectos (Content Strategy)

**Antes de codear, preparar:**

1. ✅ Escribir hook del hero (formula: greeting → hook → subhook)
2. ✅ Seleccionar 3-5 proyectos con métricas reales
3. ✅ Escribir one-liners enfocados en impacto
4. ✅ Reunir screenshots/images para cada proyecto
5. ✅ Escribir historia del about section
6. ✅ Elegir 3 core strengths para highlight

**Ejemplos de impacto (INCLUDE):**

- "Reduced page load time from 3.2s to 0.8s, improving conversion by 15%"
- "Built automation that saved 10 hours/week for the team"
- "Open source library with 500+ stars and 20+ contributors"
- "Redesigned checkout flow, increasing completion rate by 23%"

**Evitar (EXCLUDE):**

- "Built a website" (genérico, sin impacto)
- Tutorial clones
- Proyectos incompletos
- "Coming soon"
- Apps CRUD básicas sin usuarios reales

### Design System

**Color Palette:**

- Usar CSS variables existentes
- Agregar accent colors para CTAs
- Asegurar contraste WCAG AA
- Probar en light y dark modes

**Typography:**

- System font stack (ya implementado)
- Scale: 12px, 14px, 16px, 20px, 24px, 32px, 48px
- Line heights: 1.2 (headings), 1.6 (body)
- Responsive con clamp()

**Spacing:**

- Escala consistente: 4px, 8px, 16px, 24px, 32px, 48px, 64px
- Padding/margin múltiplos de 8px

---

## Post-Launch

**Iterar basado en analytics:**

- Trackear qué proyectos reciben más views
- Ver si visitantes scrollean hasta contact
- Monitorear bounce rate en case studies
- A/B test hero copy

**Mejora continua:**

- Agregar nuevos proyectos según se construyen
- Actualizar métricas según mejoran
- Refrescar copy cada 6 meses
- Mantener tech stack actualizado

**Marketing:**

- Compartir en Twitter/LinkedIn
- Enviar a portfolio galleries
- Agregar a GitHub profile
- Incluir en email signature

---

## Anti-Patterns a Evitar Durante Implementación

1. **❌ Template Portfolio Syndrome**
   - No usar temas off-the-shelf
   - Diseño custom que refleje tu estilo
   - Único pero no over-diseñado

2. **❌ All Style, No Substance**
   - Proyectos primero, estética segundo
   - Animaciones deben mejorar, no distraer
   - Cada decisión de diseño debe servir al contenido

3. **❌ Resume Website**
   - Evitar listar cada job/skill
   - Contar historias, no listas
   - Enfoque en impacto, no tareas

4. **❌ Tutorial Clone Showcase**
   - No mostrar proyectos de cursos
   - Solo trabajo real con resultados reales
   - Calidad sobre cantidad (3-5 proyectos fuertes)

5. **❌ Coming Soon Hell**
   - Nunca mostrar proyectos incompletos
   - Mejor 3 proyectos grandes que 10 mediocres
   - Lanzar con contenido completo

6. **❌ Generic Copy**
   - Evitar: "Passionate developer who loves clean code"
   - Usar: Historias específicas y voz única
   - Mostrar personalidad a través de escritura

---

## Rutas Críticas de Archivos

**Top 5 archivos más críticos para empezar:**

1. `shared/types/portfolio.ts`
   - Foundation de TypeScript para todo el sistema

2. `shared/data/projects.json`
   - Source of truth de contenido, drive toda la sección de proyectos

3. `pages/index.vue`
   - Layout principal single-page scroll

4. `app/components/sections/HeroSection.vue`
   - Primera impresión (30-second test)

5. `app/components/project/ProjectCard.vue`
   - Proof of skills, patrón de showcase de impacto

---

## Resumen

Este plan transforma el proyecto base en un portfolio interactivo de desarrollador que:

✅ Pasa el **test de 30 segundos**
✅ Muestra **impacto medible** en proyectos
✅ Cuenta una **historia personal**
✅ Facilita **conversión** (contacto)
✅ Mantiene **performance** óptimo
✅ Sigue **best practices** de Nuxt 4
✅ Respeta **estándares del proyecto** (CLAUDE.md)

**Arquitectura:** Hybrid (single-page scroll + case studies deep-link)
**Data:** JSON files con traducciones embebidas
**Fases:** MVP (3-4 días) → Enhancement (2-3 días) → Advanced (opcional)
**Enfoque:** Projects first, style second. Real impact, real metrics.
