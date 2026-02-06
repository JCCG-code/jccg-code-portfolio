# Guía de Estilos

Este documento describe cómo trabajar con estilos en el proyecto usando SCSS, Tailwind CSS y shadcn.

## 📁 Estructura de Archivos

```
app/assets/scss/
├── main.scss              # Punto de entrada principal
├── base/
│   ├── _reset.scss        # CSS reset
│   ├── _typography.scss   # Tipografía
│   └── _variables.scss    # Variables CSS
├── utils/
│   ├── _mixins.scss       # Mixins reutilizables
│   └── _functions.scss    # Funciones SCSS
├── themes/
│   ├── _light.scss        # Tema claro
│   └── _dark.scss         # Tema oscuro
├── layouts/
│   ├── _app.scss          # Layout principal
│   ├── _header.scss       # Header
│   └── _footer.scss       # Footer
└── components/
    ├── _buttons.scss      # Botones
    ├── _cards.scss        # Cards
    └── _forms.scss        # Formularios
```

## 🎨 Sistema de Diseño

### Variables CSS (HSL Colors)

El proyecto usa HSL colors con CSS variables para soportar temas:

```scss
// Light theme
:root {
  --primary: 221.2 83.2% 53.3%;
  --foreground: 222.2 84% 4.9%;
  --background: 0 0% 100%;
}

// Dark theme
[data-theme='dark'] {
  --primary: 217.2 91.2% 59.8%;
  --foreground: 210 40% 98%;
  --background: 222.2 84% 4.9%;
}

// Uso
.element {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
}
```

### Espaciado

```scss
--space-xs: 0.25rem; // 4px
--space-sm: 0.5rem; // 8px
--space-md: 1rem; // 16px
--space-lg: 1.5rem; // 24px
--space-xl: 2rem; // 32px
--space-2xl: 3rem; // 48px
```

### Tipografía

```scss
--font-xs: 0.75rem; // 12px
--font-sm: 0.875rem; // 14px
--font-base: 1rem; // 16px
--font-lg: 1.125rem; // 18px
--font-xl: 1.25rem; // 20px
--font-2xl: 1.5rem; // 24px
```

## 🔧 Mixins Útiles

### Responsive

```scss
@include mobile {
  // Estilos para móvil (max-width: 639px)
}

@include tablet {
  // Estilos para tablet (640px - 1023px)
}

@include desktop {
  // Estilos para desktop (min-width: 1024px)
}

@include large-desktop {
  // Estilos para pantallas grandes (min-width: 1280px)
}
```

### Flexbox

```scss
.container {
  @include flex-center; // Centro completo
  @include flex-between; // Space between
  @include flex-column; // Columna
}
```

### Texto

```scss
.title {
  @include text-truncate; // Una línea con ellipsis
  @include text-clamp(3); // Máximo 3 líneas
}
```

### Efectos Hover

```scss
.card {
  @include hover-lift; // Se eleva al hover
  @include hover-scale; // Escala al hover
}
```

### Focus

```scss
.button {
  @include focus-visible; // Outline en focus-visible
}
```

## 🎯 Tailwind CSS

### Clases Básicas

```vue
<template>
  <!-- Spacing -->
  <div class="p-4 m-2">Padding y Margin</div>

  <!-- Flexbox -->
  <div class="flex items-center justify-between">Layout</div>

  <!-- Typography -->
  <h1 class="text-2xl font-bold text-foreground">Título</h1>

  <!-- Colors (usando variables de shadcn) -->
  <div class="bg-primary text-primary-foreground">Primario</div>
  <div class="bg-secondary text-secondary-foreground">Secundario</div>

  <!-- Border y radius -->
  <div class="border border-border rounded-lg">Card</div>
</template>
```

### Función `cn()` para Clases Condicionales

```typescript
import { cn } from '~/utils/cn'

// Ejemplo básico
const buttonClass = cn('btn', 'btn-primary', 'btn-lg')

// Con condicionales
const cardClass = cn(
  'card',
  isActive && 'card-active',
  { 'card-disabled': isDisabled }
)

// En componente
<button :class="cn('btn', variant === 'primary' && 'btn-primary')">
  Click me
</button>
```

## 🎭 Componentes con SCSS

### Ejemplo: Card Component

```vue
<template>
  <div class="custom-card">
    <div class="custom-card__header">
      <h3>{{ title }}</h3>
    </div>
    <div class="custom-card__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  // Import mixins to use them in component
  @use '~/assets/scss/utils/mixins' as *;

  .custom-card {
    background: hsl(var(--card));
    border: var(--border-width) solid hsl(var(--border));
    border-radius: var(--radius);
    @include hover-lift;

    &__header {
      padding: var(--space-lg);
      border-bottom: var(--border-width) solid hsl(var(--border));

      @include mobile {
        padding: var(--space-md);
      }
    }

    &__content {
      padding: var(--space-lg);

      @include mobile {
        padding: var(--space-md);
      }
    }
  }
</style>
```

## 🧩 shadcn Components

### Instalación de Componentes

Los componentes de shadcn se crean en `app/components/ui/` con:

1. **Base de Radix Vue** - Componentes accesibles
2. **Estilos de Tailwind** - Clases utilitarias
3. **Variables CSS** - Temas y colores

### Ejemplo: Button Component

```vue
<script setup lang="ts">
  import { type HTMLAttributes } from 'vue'
  import { cn } from '~/utils/cn'

  interface ButtonProps {
    variant?: 'default' | 'destructive' | 'outline' | 'ghost'
    size?: 'default' | 'sm' | 'lg'
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<ButtonProps>(), {
    variant: 'default',
    size: 'default'
  })

  const buttonVariants = cn(
    'inline-flex items-center justify-center rounded-md font-medium transition',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    {
      'bg-primary text-primary-foreground hover:bg-primary/90':
        props.variant === 'default',
      'bg-destructive text-destructive-foreground hover:bg-destructive/90':
        props.variant === 'destructive',
      'border border-input bg-background hover:bg-accent hover:text-accent-foreground':
        props.variant === 'outline',
      'hover:bg-accent hover:text-accent-foreground': props.variant === 'ghost'
    },
    {
      'h-10 px-4 py-2': props.size === 'default',
      'h-9 rounded-md px-3': props.size === 'sm',
      'h-11 rounded-md px-8': props.size === 'lg'
    },
    props.class
  )
</script>

<template>
  <button :class="buttonVariants">
    <slot />
  </button>
</template>
```

## 📝 Mejores Prácticas

### 1. Prioridad de Estilos

```vue
<!-- ✅ Correcto: Tailwind para utilidades simples -->
<div class="flex items-center gap-4 p-4">

<!-- ✅ Correcto: SCSS para componentes complejos -->
<style lang="scss" scoped>
.complex-component {
  @include flex-center;
  padding: var(--space-lg);

  &__child {
    @include hover-lift;
  }
}
</style>

<!-- ❌ Incorrecto: Estilos inline -->
<div style="display: flex; padding: 16px;">
```

### 2. Variables CSS vs Valores Fijos

```scss
// ✅ Correcto
.element {
  color: hsl(var(--foreground));
  padding: var(--space-md);
}

// ❌ Incorrecto
.element {
  color: #333;
  padding: 16px;
}
```

### 3. Responsive Design

```scss
// ✅ Correcto: Mobile-first con Tailwind
<div class="p-4 md:p-8 lg:p-12">

// ✅ Correcto: SCSS con mixins
.element {
  padding: var(--space-md);

  @include desktop {
    padding: var(--space-xl);
  }
}
```

### 4. Temas

```vue
<template>
  <!-- ✅ Usar variables CSS -->
  <div class="bg-background text-foreground">Texto con tema automático</div>
</template>

<style lang="scss" scoped>
  // ✅ Variables CSS para temas
  .element {
    background: hsl(var(--card));
    color: hsl(var(--card-foreground));
  }

  // ❌ Colores fijos
  .element {
    background: #fff;
    color: #000;
  }
</style>
```

## 🔍 Debugging

### Ver Variables CSS en DevTools

```javascript
// En la consola del navegador
getComputedStyle(document.documentElement).getPropertyValue('--primary')
```

### Hot Reload Issues

Si los estilos no se actualizan:

```bash
pnpm run clean
pnpm dev
```

## 📚 Recursos

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix Vue](https://www.radix-vue.com/)
- [shadcn-vue](https://www.shadcn-vue.com/)
- [SCSS Basics](https://sass-lang.com/guide)
