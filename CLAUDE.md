## Reglas de Código

### TypeScript - Reglas Estrictas

- **NO usar `any`**: Está prohibido. Usar tipos específicos o `unknown`.
- Usar TSDoc siempre cuando sea posible en todas las funciones.
- **Tipos explícitos**: Preferir tipos explícitos en funciones públicas.
- **No assertions innecesarias**: Evitar `as` cuando sea posible.
- **Variables no usadas**: Prefijo `_` para ignorar (ej: `_unused`).

### Vue/Nuxt

- Usar Composition API con `<script setup lang="ts">`.
- Componentes en PascalCase.
- Props y emits tipados explícitamente.
- Usar auto-imports de Nuxt (no importar `ref`, `computed`, etc.).

### Estructura de Carpetas

```
.github/                # CI/CD
.vscode/                # Configuración de depuración y extensiones
app/                    # 🟢 Source Code (Nuxt 4 root)
├── assets/             # SCSS global, fuentes
├── components/         # Componentes Vue (AppHero, ProjectList...)
│   └── ui/             # Componentes Shadcn
├── composables/        # Lógica de negocio (useProjects, useContact)
├── layouts/            # default.vue
├── locales/            # Archivos i18n (es.json, en.json)
├── pages/              # index.vue
├── stores/             # Pinia stores
├── app.vue             # Entry point
├── error.vue           # Página de error
drizzle/                # Migraciones SQL generadas
server/                 # 🔵 Backend (Nitro)
├── api/                # Endpoints (projects.get.ts...)
├── db/                 # Conexión Drizzle y Schemas
├── middleware/         # OpenApi Validator middleware
└── utils/              # Loggers, helpers de servidor
shared/                 # 🟡 Código Isomórfico
├── schemas/            # Zod Schemas (ContactFormSchema, ProjectSchema)
└── types/              # Interfaces TypeScript compartidas
public/                 # Favicon, robots.txt
tests/                  # Tests E2E (Playwright)
CLAUDE.md               # 🟣 Reglas del proyecto para IA
docker-compose.yml      # DB Service
nuxt.config.ts          # Configuración principal
package.json
```

### Convenciones de Nombres

- **Archivos**: kebab-case (`my-archive.docx`)
- **Componentes**: PascalCase (`MyComponent`)
- **Composables**: camelCase con prefijo `use` (`useMyComposable`)
- **Tipos/Interfaces**: PascalCase (`MyInterface`)
- **Constantes**: SCREAMING_SNAKE_CASE (`MY_CONSTANT`)

### Git

- Usar **Conventional Commits** en inglés.
- Solo título, sin descripción larga (body).
- Formato: `type(scope?): subject`
- Tipos: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`, `perf`, `ci`, `build`

## Antes de Commit

1. Ejecutar `pnpm lint:fix`
2. Ejecutar `pnpm format`
3. Verificar que no haya errores de TypeScript
