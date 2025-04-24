# Short URL Backend

## 🚦 Cómo levantar el proyecto

1. Clona el repositorio:
   ```bash
   git clone <repo-url>
   cd short-url-back-end
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Copia el archivo de variables de entorno:
   ```bash
   cp .env.example .env
   # Edita .env con tus valores personalizados
   ```
4. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

El backend estará corriendo en el puerto configurado en tu archivo `.env` (por defecto 3000).


Backend en TypeScript para acortar URLs, siguiendo principios de arquitectura limpia y buenas prácticas de desarrollo.

## 🏗️ Arquitectura

```
src/
├── app.ts
├── config/
│   └── envs.ts
├── data/
│   └── sqlite/
├── datasources/
├── domain/
│   ├── dtos/
│   ├── entities/
│   ├── errors/
│   ├── repositories/
│   └── use-cases/
├── infrastructure/
│   ├── datasource/
│   └── repositories/
└── presentation/
    ├── routes.ts
    ├── server.ts
    └── short/
```

## 🧩 Diagrama de Componentes

```
[Cliente] ⇄ [Express Server] ⇄ [Rutas] ⇄ [Controlador] ⇄ [Caso de Uso] ⇄ [Repositorio] ⇄ [Datasource] ⇄ [Turso DB]
```

## 🚀 Instalación

```bash
git clone <repo-url>
cd short-url-back-end
npm install
cp .env.example .env
# Edita .env con tus valores
npm run dev
```

## 🔑 Variables de entorno

- `PORT` — Puerto del servidor Express
- `PUBLIC_PATH` — Carpeta pública para archivos estáticos
- `TURSO_DATABASE_URL` — URL de la base de datos Turso
- `TURSO_AUTH_TOKEN` — Token de autenticación para Turso

## 📚 Endpoints principales

- `POST /api/short` — Crea una URL corta
- `GET /api/short/:code` — Redirige a la URL original (implementación sugerida)

## 🛠️ Tecnologías

- Node.js + TypeScript
- Express
- Turso (SQLite)
- Clean Architecture
- env-var, dotenv, valid-url

## 📂 Estructura de carpetas

- `config/` — Configuración y variables de entorno
- `data/` — Adaptadores de base de datos
- `datasources/` — Contratos para fuentes de datos
- `domain/` — Entidades, DTOs, errores, repositorios y casos de uso
- `infrastructure/` — Implementaciones concretas de datasources y repositorios
- `presentation/` — Rutas, controladores y servidor Express

## 👤 Autor

Angel Contreras

## 📄 Licencia

MIT
