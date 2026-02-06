# Troubleshooting

Soluciones a problemas comunes durante el desarrollo.

## Error 404 en `/_nuxt/` durante desarrollo

### Síntomas

```
ERROR [request error] [unhandled] [GET] http://localhost:3000/_nuxt/
[CAUSE] { status: 404 }
```

### Causa

La caché de Nuxt o Vite está corrupta o los assets no se generaron correctamente.

### Solución

#### Opción 1: Limpieza Rápida (Recomendada)

```bash
pnpm run clean
```

Este comando:

- Elimina `.nuxt`
- Elimina `.output`
- Elimina `node_modules/.vite`
- Regenera los tipos de Nuxt

#### Opción 2: Limpieza Completa

Si el problema persiste, usa:

```bash
pnpm run fresh
```

Este comando:

- Elimina todas las carpetas de caché
- Reinstala dependencias
- Regenera todo desde cero

#### Opción 3: Manual

```bash
# Detener el servidor si está corriendo
# Luego ejecutar:
rm -rf .nuxt .output node_modules/.vite
pnpm nuxt prepare
pnpm dev
```

### Prevención

1. **Limpia la caché del navegador** regularmente durante desarrollo
2. Usa **modo incógnito** para probar cambios importantes
3. Si cambias configuración de Nuxt, ejecuta `pnpm run clean`

---

## Componentes no se encuentran

### Síntomas

```
[Vue warn]: Failed to resolve component: ComponentName
```

### Causa

- Nuxt no registró el componente automáticamente
- Caché desactualizada
- Configuración de componentes incorrecta

### Solución

1. Verifica que el componente esté en `app/components/`
2. Verifica que el nombre del archivo sea PascalCase
3. Ejecuta:

```bash
pnpm run clean
```

---

## Errores de TypeScript en auto-imports

### Síntomas

```
error TS2304: Cannot find name 'useI18n'
error TS2304: Cannot find name 'computed'
```

### Causa

Los auto-imports de Nuxt no son reconocidos por TypeScript durante `typecheck`.

### Solución

**Estos errores son esperados** durante `nuxt typecheck` pero no afectan el funcionamiento en runtime. Los auto-imports funcionan correctamente en:

- Modo desarrollo (`pnpm dev`)
- Modo producción (`pnpm build`)

Si quieres evitar estos errores en typecheck, puedes agregar las importaciones explícitas:

```typescript
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
```

---

## Errores de parsing de ESLint

### Síntomas

```
error  Parsing error: Unexpected token :
error  Parsing error: The keyword 'interface' is reserved
```

### Causa

ESLint no está parseando correctamente TypeScript en archivos Vue.

### Solución

**Estos errores están ignorados intencionalmente** en la configuración actual. Los archivos Vue están excluidos de ESLint para evitar falsos positivos. El código es válido y funciona correctamente.

Si necesitas habilitar linting en archivos Vue:

1. Actualiza `eslint.config.mjs`
2. Configura el parser de Vue correctamente
3. Asegúrate de que `vue-eslint-parser` esté instalado

---

## El servidor no inicia

### Síntomas

- El comando `pnpm dev` falla
- Puerto en uso
- Errores de permisos

### Soluciones

#### Puerto en uso

```bash
# Cambiar puerto
pnpm dev -- --port 3001
```

#### Proceso zombie

```bash
# Windows
taskkill /F /IM node.exe

# Linux/Mac
killall node
```

#### Limpieza completa

```bash
pnpm run fresh
```

---

## Build falla en producción

### Síntomas

```
ERROR  Error: Build failed
```

### Pasos de diagnóstico

1. **Verifica TypeScript**:

   ```bash
   pnpm typecheck
   ```

2. **Verifica Linter**:

   ```bash
   pnpm lint
   ```

3. **Limpia y construye**:

   ```bash
   pnpm run clean
   pnpm build
   ```

4. **Verifica dependencias**:
   ```bash
   pnpm install
   ```

---

## Imágenes no cargan

### Síntomas

- Imágenes no se muestran
- Error 404 para rutas de imágenes

### Solución

1. **Usa URLs externas** para imágenes de demostración:

   ```json
   "thumbnail": "https://picsum.photos/seed/project1/800/600"
   ```

2. **No uses rutas locales** que no existan:

   ```json
   // ❌ Incorrecto
   "thumbnail": "/images/project.jpg"

   // ✅ Correcto
   "thumbnail": "https://picsum.photos/800/600"
   ```

3. Si usas imágenes locales:
   - Colócalas en `public/images/`
   - La ruta será `/images/nombre.jpg`

---

## Hot Reload no funciona

### Síntomas

- Los cambios no se reflejan automáticamente
- Necesitas refrescar manualmente

### Solución

1. **Verifica que el archivo esté guardado**
2. **Limpia caché**:
   ```bash
   pnpm run clean
   ```
3. **Reinicia el servidor**:
   ```bash
   # Ctrl+C para detener
   pnpm dev
   ```
4. **Limpia caché del navegador** o usa modo incógnito

---

## Scripts Útiles

```bash
# Desarrollo normal
pnpm dev

# Limpieza rápida
pnpm run clean

# Limpieza completa
pnpm run fresh

# Build de producción
pnpm build

# Preview del build
pnpm preview

# Linter
pnpm lint:fix

# Formatter
pnpm format

# TypeCheck
pnpm typecheck
```

---

## Contacto y Soporte

Si encuentras un error no listado aquí:

1. Revisa los logs completos
2. Busca el error en Google
3. Revisa la documentación de Nuxt: https://nuxt.com/docs
4. Abre un issue en el repositorio
