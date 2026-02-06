# Uso de APIs Externas

Este documento describe cómo usar APIs externas en el proyecto.

## Composable useApi

El proyecto incluye un composable `useApi()` que proporciona métodos configurados para hacer llamadas HTTP con axios.

### Ejemplo básico

```typescript
// En un componente o composable
const { get, post, put, delete: del } = useApi()

// GET request
const data = await get<MyType>('/endpoint')

// POST request
const result = await post<ResponseType>('/endpoint', { data: 'value' })

// PUT request
const updated = await put<ResponseType>('/endpoint/1', { data: 'updated' })

// DELETE request
await del('/endpoint/1')
```

### Usar instancia axios directamente

```typescript
const { axios } = useApi()

const response = await axios.get('/custom-endpoint', {
  headers: {
    'Custom-Header': 'value'
  }
})
```

## APIs Gratuitas Recomendadas

### Imágenes

#### Lorem Picsum (Sin API key)

```typescript
// Imagen aleatoria
const imageUrl = 'https://picsum.photos/800/600'

// Imagen con seed (siempre la misma)
const seededImage = 'https://picsum.photos/seed/project1/800/600'

// Imagen específica por ID
const specificImage = 'https://picsum.photos/id/237/800/600'
```

#### Unsplash API (Requiere API key gratuita)

```typescript
const { get } = useApi()

// Buscar fotos
const photos = await get('https://api.unsplash.com/search/photos', {
  params: {
    query: 'technology',
    client_id: 'YOUR_API_KEY'
  }
})

// Foto aleatoria
const random = await get('https://api.unsplash.com/photos/random', {
  params: {
    client_id: 'YOUR_API_KEY'
  }
})
```

### Datos Mock

#### JSONPlaceholder (Sin API key)

```typescript
const { get, post } = useApi()

// Obtener posts
const posts = await get('https://jsonplaceholder.typicode.com/posts')

// Obtener un post específico
const post = await get('https://jsonplaceholder.typicode.com/posts/1')

// Crear un post
const newPost = await post('https://jsonplaceholder.typicode.com/posts', {
  title: 'foo',
  body: 'bar',
  userId: 1
})
```

## Buenas Prácticas

1. **Siempre tipar las respuestas**

   ```typescript
   interface Post {
     id: number
     title: string
     body: string
   }

   const posts = await get<Post[]>('/posts')
   ```

2. **Manejar errores**

   ```typescript
   try {
     const data = await get('/endpoint')
   } catch (error) {
     console.error('Error fetching data:', error)
   }
   ```

3. **Usar variables de entorno para API keys**

   ```typescript
   // nuxt.config.ts
   export default defineNuxtConfig({
     runtimeConfig: {
       public: {
         unsplashApiKey: process.env.UNSPLASH_API_KEY
       }
     }
   })

   // En el código
   const config = useRuntimeConfig()
   const photos = await get('https://api.unsplash.com/photos/random', {
     params: {
       client_id: config.public.unsplashApiKey
     }
   })
   ```

4. **Cache de datos cuando sea apropiado**
   ```typescript
   const { data, error } = await useAsyncData('key', () => get('/endpoint'))
   ```

## APIs Configuradas

Las siguientes APIs están configuradas y listas para usar:

- **Lorem Picsum**: Imágenes placeholder (usada actualmente en proyectos)
- **Unsplash API**: Imágenes profesionales de alta calidad (requiere configuración)
- **JSONPlaceholder**: Datos mock para desarrollo y pruebas
