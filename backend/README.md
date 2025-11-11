# 🔧 Backend - Agendarte API

API REST para el sistema de gestión de turnos médicos desarrollada con Node.js y Express.

## 🏗️ Arquitectura de Capas

```
backend/
├── src/
│   ├── config/           # Configuración de base de datos
│   ├── models/           # Modelos de datos
│   ├── repositories/     # Capa de acceso a datos (Repository)
│   ├── services/         # Lógica de negocio (Service)
│   ├── controllers/      # Controladores HTTP (Controller)
│   ├── routes/           # Definición de rutas (Router)
│   ├── middleware/       # Middleware personalizado
│   └── server.js         # Servidor principal
├── .env.example          # Variables de entorno ejemplo
└── package.json          # Dependencias y scripts
```

**Flujo de datos**: Router → Controller → Service → Repository → Database

## 📡 API Endpoints Implementados

### Usuarios (CRUD Completo)
- `GET /api/usuarios` - Obtener todos los usuarios
- `GET /api/usuarios/pacientes` - Obtener pacientes
- `GET /api/usuarios/profesionales` - Obtener profesionales
- `GET /api/usuarios/:id` - Obtener usuario por ID
- `POST /api/usuarios` - Crear usuario
- `PUT /api/usuarios/:id` - Actualizar usuario
- `PUT /api/usuarios/:id/password` - Cambiar contraseña
- `DELETE /api/usuarios/:id` - Eliminar usuario

### Profesionales (CRUD Completo)
- `GET /api/profesionales` - Obtener todos los profesionales
- `GET /api/profesionales/:id` - Obtener profesional por ID
- `POST /api/profesionales` - Crear profesional
- `PUT /api/profesionales/:id` - Actualizar profesional
- `DELETE /api/profesionales/:id` - Eliminar profesional

### Permisos
- `GET /api/permisos` - Obtener permisos por rol
- `PUT /api/permisos` - Actualizar permisos

Ver [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) para detalles completos.

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

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5433
DB_NAME=agendarte
DB_USER=postgres
DB_PASSWORD=admin123
```

> **Nota**: Para configurar la base de datos, consulta [Database README](../database/README.md)

## 🛠️ Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **PostgreSQL** - Base de datos relacional
- **bcryptjs** - Encriptación de contraseñas
- **CORS** - Manejo de peticiones cross-origin
- **dotenv** - Variables de entorno

## ✅ Cumplimiento de Requisitos

### Arquitectura de Capas Implementada
✅ **Router** - Definición de rutas y endpoints  
✅ **Controller** - Manejo de peticiones HTTP  
✅ **Service** - Lógica de negocio  
✅ **Repository** - Acceso a base de datos  

### Métodos CRUD Implementados
✅ **CREATE** - POST endpoints  
✅ **READ** - GET endpoints  
✅ **UPDATE** - PUT endpoints  
✅ **DELETE** - DELETE endpoints  

### Persistencia de Datos
✅ Conexión a PostgreSQL separada en módulo config  
✅ Queries SQL en capa Repository  
✅ Modelos de datos definidos
