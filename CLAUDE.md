# Workflow

- Be sure to typecheck when you're done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance
- No usar tipos de datos 'any' bajo ningun concepto.
- Documentar el código en inglés usando TSDoc
- No poner comentarios 'inline'.

# APIs Externas

- **SIEMPRE usar axios** para llamadas a APIs externas
- Usar el composable `useApi()` que proporciona métodos configurados
- Usar APIs gratuitas cuando sea posible:
  - **Imágenes**: Lorem Picsum (https://picsum.photos/) - No requiere API key
  - **Imágenes profesionales**: Unsplash API (https://unsplash.com/developers)
  - **Datos mock**: JSONPlaceholder (https://jsonplaceholder.typicode.com/)
- Nunca hardcodear rutas locales de imágenes que no existan
- Preferir URLs externas o placeholders para assets de demostración

# Estilos (SCSS + Tailwind + shadcn)

## Estructura

- Todos los estilos SCSS en `app/assets/scss/`
- Estructura organizada:
  - `base/` - Reset, typography, variables
  - `utils/` - Mixins, functions
  - `themes/` - Light, dark themes
  - `layouts/` - App, header, footer
  - `components/` - Buttons, cards, forms, etc.

## Reglas de Estilos

### Prioridad de Uso

1. **Tailwind classes** - Para utilidades simples (padding, margin, colors)
2. **SCSS modules** - Para componentes complejos o estilos reutilizables
3. **Scoped styles** - Solo cuando sea estrictamente necesario

### shadcn Components

- Usar Radix Vue para componentes base
- Aplicar estilos con Tailwind + CSS variables
- Componentes en `app/components/ui/`

## Temas

- Usar HSL colors con CSS variables
- Soportar light y dark modes
- Variables en `themes/_light.scss` y `themes/_dark.scss`
- Cambio de tema mediante `[data-theme='dark']`

## NO Hacer

- ❌ No usar estilos inline
- ❌ No mezclar CSS variables custom con las de shadcn
- ❌ No duplicar estilos (usar mixins/extends)
- ❌ No usar `!important` (excepto casos extremos)
- ❌ No crear archivos SCSS fuera de `app/assets/scss/`

# Reglas

- Sigue el trabajo teniendo en cuenta: docs/PLAN_JCCGCode_Portfolio.md
- Sigue las fases de implementacion: docs/PLAN_Fases_Implementacion.md
- Cuando el proyecto este acabado, revisar: docs/Prelaunch_checklist.md
