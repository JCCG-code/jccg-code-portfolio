## Fases de Implementación

### Fase 1: MVP Core (3-4 días)

**Objetivo:** Portfolio funcional que pasa el test de 30 segundos

**Día 1: Layout + Hero + Navigation**

1. Crear `app/components/layout/AppHeader.vue`
2. Crear `app/composables/useScrollNavigation.ts`
3. Crear `app/components/sections/HeroSection.vue`
4. Crear `app/components/layout/AppFooter.vue`
5. Actualizar `pages/index.vue` con layout básico
6. Agregar traducciones hero y nav

**Día 2: Tipos + Datos + Projects Section**

1. Crear `shared/types/portfolio.ts`
2. Crear `shared/data/projects.json` con 2-3 proyectos reales
3. Crear `app/composables/useProjects.ts`
4. Crear `app/components/project/ProjectCard.vue`
5. Crear `app/components/sections/ProjectsSection.vue`
6. Agregar traducciones projects

**Día 3: About + Contact + Responsive**

1. Crear `app/components/sections/AboutSection.vue`
2. Crear `app/components/sections/ContactSection.vue`
3. Agregar traducciones about y contact
4. CSS responsive (mobile-first)
5. Testing en móvil

**Día 4: Animaciones + Polish**

1. Crear `app/composables/useScrollAnimation.ts`
2. Implementar fade-in animations al scroll
3. Refinar estilos y spacing
4. Verificar accesibilidad
5. Testing cross-browser

**Deliverable:** Portfolio funcional single-page con Hero → Projects → About → Contact

---

### Fase 2: Case Studies + Enhancement (2-3 días)

**Día 5: Case Study Pages**

1. Crear `pages/projects/[slug].vue`
2. Implementar estructura completa de case study
3. Agregar traducciones case_study
4. View transitions entre rutas
5. Navegación next/previous project

**Día 6: Skills + Image Optimization**

1. Crear `shared/data/skills.json`
2. Crear `app/components/sections/SkillsSection.vue`
3. Instalar y configurar `@nuxt/image`
4. Optimizar todas las imágenes
5. Agregar traducciones skills

**Día 7: Performance + SEO**

1. Performance audit (Lighthouse)
2. Meta tags y Open Graph
3. Sitemap generation
4. Component islands optimization
5. Final testing

**Deliverable:** Portfolio completo con case studies detallados

---

### Fase 3: Advanced Features (Opcional, 2-3 días)

**Día 8-9: Contact Form**

1. Crear `app/components/contact/ContactForm.vue`
2. Crear `server/api/contact.post.ts`
3. Integrar email service (Resend/SendGrid)
4. Spam protection (honeypot)
5. Success/error states

**Día 10: Analytics + Final Polish**

1. Analytics integration (Google Analytics / Plausible)
2. Error tracking (Sentry)
3. A/B testing setup (opcional)
4. Final QA pass

**Deliverable:** Portfolio production-ready con todas las features

---
