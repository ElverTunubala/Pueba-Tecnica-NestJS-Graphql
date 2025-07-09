
# 🛠️ Gestor de Notas - Backend

API del gestor de notas personales, desarrollada con **NestJS**, **GraphQL**, **TypeORM** y **JWT**. Proporciona una capa segura para la autenticación de usuarios y gestión de notas.

---

## 🚀 Tecnologías

- **Framework:** NestJS 11+
- **API:** GraphQL (Apollo)
- **ORM:** TypeORM
- **Base de datos:** SQL Server
- **Autenticación:** JWT

---

## ⚙️ Instalación

### 1. Ir al directorio del backend

cd notes-backend

### 2. Instalar dependencias.

npm install

### 4. Crear archivo .env
env
DATABASE_URL=aqui va la url de aws

JWT_SECRET=una_clave_secreta

### 5. Crear base de datos

sql

CREATE DATABASE notasdb;

Asegúrate de que SQL Server está corriendo y los datos de acceso coinciden con los del .env.

### 6. Levantar el servidor
npm run start:dev
La API estará disponible en:

📍 http://localhost:3000/graphql (GraphQL Playground)

📦 Endpoints (GraphQL)
Mutaciones
register(email, password) → crea usuario

login(email, password) → retorna JWT

createNote(input) → crea nueva nota

updateNote(id, input) → actualiza nota

deleteNote(id) → elimina nota

Consultas
me → datos del usuario autenticado

notes → lista de notas del usuario

note(id) → detalle de una nota

🔐 Seguridad
Todas las rutas relacionadas con notas están protegidas con JWT.

El backend valida que cada usuario solo acceda a sus propias notas.

Los tokens se envían vía header:

Authorization: Bearer <token>
🧠 Autor
Desarrollado por Elver Tunubala – Prueba técnica backend.


