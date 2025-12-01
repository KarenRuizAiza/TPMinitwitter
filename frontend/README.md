# MiniTwitter - Frontend

Este directorio contiene el código fuente del frontend de MiniTwitter, construido con **React** y **Vite**.

## Tecnologías y Plugins

El proyecto utiliza las siguientes librerías y configuraciones clave:

### Core
- **React 19**: Biblioteca principal para la interfaz de usuario.
- **Vite**: Entorno de desarrollo y empaquetador (bundler) ultrarrápido.
- **React Router Dom**: Para el manejo de rutas (`/`, `/users`, `/user/:id`).
- **Axios**: Cliente HTTP para la comunicación con el backend.

### Estilado (UI)
- **Tailwind CSS v4**: Framework de CSS utilitario.
  - **Configuración**: Se utiliza la versión 4, configurada directamente en `src/index.css` con `@import "tailwindcss";`.
  - **PostCSS**: Procesador de CSS requerido por Tailwind (`postcss.config.js`).
- **DaisyUI**: Librería de componentes para Tailwind (botones, modales, avatares).
  - **Integración**: Configurada como plugin de PostCSS/Tailwind.
- **Iconos**: Se utilizan **SVGs nativos** (Heroicons style) directamente en los componentes para evitar dependencias externas pesadas como `react-icons`, optimizando el bundle final.

### Configuración de Estilos
El proyecto utiliza una configuración moderna de Tailwind CSS v4.
- **`src/index.css`**: Punto de entrada donde se importan Tailwind y DaisyUI.
- **`postcss.config.js`**: Configura `tailwindcss` y `autoprefixer` para asegurar compatibilidad entre navegadores.

## Configuración e Integración con Backend

### Comunicación API
La comunicación con el backend se centraliza en `src/services/api.js`.
- **Base URL**: `http://localhost:8080` (Puerto por defecto del backend Spring Boot).
- **CORS**: El frontend espera que el backend permita peticiones desde `http://localhost:5173`.

### Endpoints Consumidos
El frontend interactúa principalmente con estas rutas del backend:

- **`http://localhost:8080/tweets`**:
  - **Uso**: Obtener el feed de tweets y publicar nuevos tweets.
  - **Componentes**: `TweetFeed.jsx`, `CreateTweet.jsx`.

- **`http://localhost:8080/users`**:
  - **Uso**: Obtener la lista de usuarios y registrar nuevos usuarios.
  - **Componentes**: `UserList.jsx`, `CreateUserModal.jsx`.

### Ejecución

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```

2.  **Iniciar servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173`.

## Estructura de Directorios

- `src/components`: Componentes reutilizables (`TweetItem`, `UserCard`, `Header`).
- `src/pages`: Vistas principales (`Home`, `UserPage`, `UsersPage`).
- `src/context`: Manejo de estado global (`AppContext`) para usuarios y actualizaciones.
- `src/services`: Lógica de peticiones HTTP (`api.js`).
