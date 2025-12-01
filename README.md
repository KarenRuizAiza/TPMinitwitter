# MiniTwitter

MiniTwitter es una aplicación web simplificada inspirada en Twitter, desarrollada con un backend en Java (Spring Boot) y un frontend en React (Vite).

## Características

### 1. Menú de Encabezado (Header)
- **Nombre del Sistema**: "MiniTwitter" visible en la barra superior.
- **Navegación**: Enlaces rápidos a "Inicio" y "Usuarios".
- **Crear Tweet**: Botón accesible para publicar nuevos tweets.

### 2. Panel Principal (Main Content)
- **Feed de Inicio**:
  - Muestra los tweets más recientes de todos los usuarios.
  - Excluye retweets para una vista más limpia.
  - Paginación de 10 tweets por página con navegación "Anterior" / "Siguiente".
- **Detalle de Tweet**:
  - Muestra nombre del usuario, contenido y fecha de creación.

### 3. Panel Izquierdo (Sidebar)
- **Lista de Usuarios**: Muestra todos los usuarios registrados.
- **Perfil de Usuario**:
  - Al seleccionar un usuario, muestra sus últimos 15 tweets (incluyendo retweets).
  - Botón "Mostrar más" para cargar tweets antiguos.
  - Indicadores visuales para retweets (fecha original y usuario que retwitteó).

### 4. Creación de Tweets
- Formulario modal para crear nuevos tweets.
- Validación de campos y mensajes de éxito/error.

## Estructura del Proyecto

El proyecto está dividido en dos módulos principales:

```mermaid
graph TD
    Root[MiniTwitter]
    Root --> Backend[Backend (Java/Spring Boot)]
    Root --> Frontend[Frontend (React/Vite)]
    
    Backend --> Controllers[Controllers (API REST)]
    Backend --> Services[Services (Lógica de Negocio)]
    Backend --> Repositories[Repositories (JPA/H2)]
    
    Frontend --> Pages[Pages (Home, UserPage)]
    Frontend --> Components[Components (TweetItem, Feed, Header)]
    Frontend --> Context[Context (Estado Global)]
```

## Requisitos Previos

- **Java**: JDK 20 o superior.
- **Maven**: Para construir el backend.
- **Node.js**: Para ejecutar el frontend.

## Ejecución del Proyecto

### Backend

El backend corre en el puerto `8080` y utiliza una base de datos H2 en memoria.

```bash
cd backend
mvn spring-boot:run
```

Para ejecutar los tests de integración y unitarios:

```bash
cd backend
mvn test
```

### Frontend

El frontend corre en el puerto `5173` (por defecto con Vite).

1. Instalar dependencias:
   ```bash
   cd frontend
   npm install
   ```

2. Iniciar servidor de desarrollo:
   ```bash
   cd frontend
   npm run dev
   ```

## Tecnologías Utilizadas

- **Backend**: Java, Spring Boot, Spring Data JPA, H2 Database.
- **Frontend**: React, Vite, Tailwind CSS, DaisyUI, Axios, React Router.

## Decisiones de Diseño (Backend)

### Uso de Records para DTOs
Se optó por utilizar `record` (introducido en Java 14+) para los Objetos de Transferencia de Datos (DTOs) debido a:
- **Inmutabilidad**: Los records son inmutables por defecto, lo que garantiza la integridad de los datos mientras viajan entre capas.
- **Concisividad**: Reducen drásticamente el código repetitivo (boilerplate) al generar automáticamente constructores, getters, `equals()`, `hashCode()` y `toString()`.
- **Semántica**: Expresan claramente que su propósito es ser simples portadores de datos.

### Patrón DTO (Data Transfer Object)
Se implementó el patrón DTO para desacoplar el Modelo de Dominio (Entidades JPA) de la API REST:
- **Seguridad**: Evita exponer estructuras internas de la base de datos o campos sensibles.
- **Prevención de Ciclos**: Soluciona problemas de recursión infinita al serializar relaciones bidireccionales (común en JPA) a JSON.
- **Flexibilidad**: Permite modelar la respuesta de la API independientemente de cómo se guardan los datos.

### Interfaces para Repositorios
Se utilizaron interfaces que extienden `JpaRepository` (Spring Data JPA) porque:
- **Abstracción**: Oculta la complejidad del acceso a datos.
- **Productividad**: Spring genera automáticamente la implementación de métodos CRUD y consultas derivadas por nombre (ej: `findByOriginalTweetIsNull`), eliminando la necesidad de escribir SQL o JPQL manual para operaciones estándar.

## Decisiones de Diseño (Frontend)

### Componentes Funcionales y Hooks
Se utilizó React con componentes funcionales y Hooks (`useState`, `useEffect`) por ser el estándar moderno, ofreciendo un código más limpio y legible que las clases.

### Tailwind CSS
Se eligió Tailwind CSS para el estilado por:
- **Velocidad**: Permite construir interfaces complejas rápidamente sin salir del HTML (JSX).
- **Consistencia**: Utiliza un sistema de diseño predefinido (espaciado, colores, tipografía).

### Context API
Para el manejo del estado global (usuario actual, lista de usuarios, trigger de recarga) se optó por **Context API** nativa de React en lugar de librerías externas como Redux, ya que la complejidad de la aplicación es baja/media y no requiere una máquina de estados compleja.

## Estrategia de Testing

El proyecto incluye pruebas automatizadas para garantizar la calidad del software:

- **Tests de Integración**: Verifican el funcionamiento conjunto de los componentes (Controlador -> Servicio -> Repositorio -> Base de Datos H2). Se aseguran de que los endpoints HTTP respondan correctamente y persistan los datos esperados.
- **Tests Unitarios**: Se enfocan en probar la lógica de negocio aislada en los servicios, utilizando mocks para las dependencias externas si fuera necesario.

Para ejecutar todos los tests:
```bash
mvn test
```

## Endpoints Principales (API)

### Tweets (`/tweets`)
- `GET /tweets`: Obtiene el feed principal (paginado).
- `POST /tweets`: Crea un nuevo tweet.
- `POST /tweets/retweet`: Crea un retweet.
- `GET /tweets/user/{id}`: Obtiene los tweets de un usuario específico.

### Usuarios (`/users`)
- `GET /users`: Obtiene la lista de todos los usuarios.
- `POST /users`: Crea un nuevo usuario.
- `DELETE /users/{id}`: Elimina un usuario y sus tweets.

## Base de Datos (H2)

El proyecto utiliza **H2 Database** en memoria como solución de persistencia.

### ¿Por qué se eligió esta opción?
- **Simplicidad y Portabilidad**: Al ser una base de datos embebida en memoria, no requiere instalación ni configuración externa. El proyecto es autocontenido: "bajar y correr".
- **Agilidad en Desarrollo**: Permite prototipar rápidamente sin la sobrecarga de administrar un servidor de base de datos completo (como MySQL o PostgreSQL).
- **Entorno Limpio**: Al residir en memoria, los datos se reinician con cada ejecución, lo cual es ideal para fases de desarrollo y testing, asegurando que siempre se parte de un estado conocido.

## Autores
- **Karen Ruiz** - Desarrollo Full Stack (Spring Boot + React).
