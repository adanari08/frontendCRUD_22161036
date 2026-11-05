# Frontend CRUD con Vue

Kelly Cruz - 22161036

Proyecto en Vue 3 que consume la API de backend_for_students (rama BFS-0002).
Tiene el CRUD de roles, usuarios y empleados.

## Endpoints que se consumen

- Roles: GET, GET por id, POST, PUT, DELETE en `/api/v2/roles`
- Usuarios: GET, GET por id, POST, PUT, DELETE en `/api/v2/usuarios`
- Empleados: GET, GET por id, POST, PUT, DELETE en `/api/v2/employees`

## Cómo correrlo

1. Tener el backend corriendo en `http://localhost:3000`
2. Instalar dependencias: `npm install`
3. En el archivo `.env` poner la URL de la API:
   `VITE_API_URL=http://localhost:3000/api/v2`
   (si se usa Render, poner la URL de Render terminada en `/api/v2`)
4. Correr: `npm run dev`
