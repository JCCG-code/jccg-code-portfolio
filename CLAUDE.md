### Git

- Usar **Conventional Commits** en inglés.
- Solo título, sin descripción larga (body).
- Formato: `type(scope?): subject`
- Tipos: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`, `perf`, `ci`, `build`

## Antes de Commit

1. Ejecutar `pnpm lint:fix`
2. Ejecutar `pnpm format`
3. Verificar que no haya errores de TypeScript

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

# Reglas

- Sigue el trabajo teniendo en cuenta: docs/PLAN_JCCGCode_Portfolio.md
- Sigue las fases de implementacion: docs/PLAN_Fases_Implementacion.md
- Cuando el proyecto este acabado, revisar: docs/Prelaunch_checklist.md
