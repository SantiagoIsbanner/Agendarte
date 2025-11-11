# 🔧 Backend - Agendarte API

API REST para el sistema de gestión de turnos médicos desarrollada con Node.js y Express.

## 🏗️ Arquitectura

```
backend/
├── src/
│   ├── controllers/       # Controladores de rutas
│   ├── models/           # Modelos de base de datos
│   ├── routes/           # Definición de rutas API
│   ├── middleware/       # Middleware personalizado
│   ├── services/         # Lógica de negocio
│   └── server.js         # Servidor principal
├── .env.example          # Variables de entorno ejemplo
└── package.json          # Dependencias y scripts
```

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Ejecutar en desarrollo
npm run dev

# Ejecutar en producción
npm start
```

## 🔧 Variables de Entorno

Configura las siguientes variables en tu archivo `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5433
DB_NAME=agendarte2
DB_USER=postgres
DB_PASSWORD=admin123
JWT_SECRET=tu_jwt_secret
```

> **Nota**: Para configurar la base de datos, consulta [Database README](../database/README.md)

## 📡 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario

### Turnos
- `GET /api/turnos` - Listar turnos
- `POST /api/turnos` - Crear turno
- `PUT /api/turnos/:id` - Actualizar turno
- `DELETE /api/turnos/:id` - Eliminar turno

### Pacientes
- `GET /api/pacientes` - Listar pacientes
- `POST /api/pacientes` - Crear paciente
- `PUT /api/pacientes/:id` - Actualizar paciente

## 🛠️ Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **bcrypt** - Encriptación de contraseñas