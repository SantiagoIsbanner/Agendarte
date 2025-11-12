# 🔧 Backend - Agendarte API

API REST para el sistema de gestión de turnos médicos desarrollada con Node.js, Express y PostgreSQL.

## 🏗️ Arquitectura de 4 Capas

```
backend/
├── src/
│   ├── config/           # Configuración (database.js)
│   ├── repositories/     # Capa de acceso a datos (SQL queries)
│   ├── services/         # Lógica de negocio
│   ├── controllers/      # Controladores HTTP
│   ├── routes/           # Definición de rutas
│   └── server.js         # Servidor principal
├── .env.example          # Variables de entorno ejemplo
└── package.json          # Dependencias
```

**Flujo de datos**: Router → Controller → Service → Repository → PostgreSQL

## 📡 API Endpoints

### Autenticación
- `POST /api/auth/login` - Login con email y contraseña

### Usuarios (CRUD Completo)
- `GET /api/usuarios` - Listar todos (con datos profesionales si aplica)
- `GET /api/usuarios/:id` - Obtener por ID
- `GET /api/usuarios/pacientes` - Listar pacientes
- `GET /api/usuarios/profesionales` - Listar profesionales
- `POST /api/usuarios` - Crear usuario
- `PUT /api/usuarios/:id` - Actualizar usuario y datos profesionales
- `PUT /api/usuarios/:id/password` - Cambiar contraseña
- `DELETE /api/usuarios/:id` - Soft delete

### Profesionales (CRUD Completo)
- `GET /api/profesionales` - Listar con especialidades
- `GET /api/profesionales/:id` - Obtener por ID
- `POST /api/profesionales` - Crear profesional
- `PUT /api/profesionales/:id` - Actualizar profesional
- `DELETE /api/profesionales/:id` - Eliminar profesional

### Especialidades (CRUD Completo)
- `GET /api/especialidades` - Listar todas
- `GET /api/especialidades/:id` - Obtener por ID
- `POST /api/especialidades` - Crear especialidad
- `PUT /api/especialidades/:id` - Actualizar especialidad
- `DELETE /api/especialidades/:id` - Eliminar especialidad

### Permisos
- `GET /api/permisos` - Obtener permisos por rol
- `PUT /api/permisos` - Actualizar permisos

Ver [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) para ejemplos de requests/responses.

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Ejecutar en desarrollo (con nodemon)
npm run dev

# Ejecutar en producción
npm start
```

## 🔧 Variables de Entorno (.env)

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5433
DB_NAME=agendarte2
DB_USER=postgres
DB_PASSWORD=tu_password
```

## 🛠️ Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express 4** - Framework web minimalista
- **PostgreSQL (pg)** - Cliente de base de datos
- **bcryptjs** - Hash de contraseñas (10 rounds)
- **CORS** - Manejo de peticiones cross-origin
- **dotenv** - Variables de entorno
- **nodemon** - Auto-reload en desarrollo

## 📦 Dependencias

```json
{
  "express": "^4.18.2",
  "pg": "^8.11.3",
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

## 🔐 Seguridad

- Contraseñas hasheadas con bcrypt (10 salt rounds)
- Validación de contraseña actual antes de cambiar
- Soft delete de usuarios (campo `activo`)
- Transacciones SQL para integridad de datos
- Validación de datos en capa Service

## 🗄️ Conexión a Base de Datos

El archivo `src/config/database.js` maneja el pool de conexiones:

```javascript
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});
```

## 📝 Ejemplos de Uso

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"mail":"admin@agendarte.com","contraseña":"admin1"}'
```

### Crear Usuario
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "mail":"nuevo@test.com",
    "contraseña":"password123",
    "nombre":"Juan",
    "apellido":"Pérez",
    "rol":"usuario"
  }'
```

### Actualizar Profesional
```bash
curl -X PUT http://localhost:3000/api/usuarios/4 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre":"María",
    "apellido":"González",
    "especialidad":"Cardiología",
    "matricula":"MP12345",
    "honorarios":5000
  }'
```

## ✅ Características Implementadas

### Arquitectura de Capas
✅ **Router** - Definición de rutas y métodos HTTP  
✅ **Controller** - Manejo de req/res  
✅ **Service** - Lógica de negocio y validaciones  
✅ **Repository** - Queries SQL y acceso a datos  

### Métodos CRUD
✅ **CREATE** - POST endpoints con validación  
✅ **READ** - GET endpoints con filtros  
✅ **UPDATE** - PUT endpoints con transacciones  
✅ **DELETE** - DELETE endpoints (soft delete)  

### Persistencia
✅ Conexión a PostgreSQL con pool  
✅ Queries SQL con parámetros ($1, $2...)  
✅ Transacciones para operaciones complejas  
✅ LEFT JOIN para datos relacionados  

## 🐛 Testing

Ver [TEST_ENDPOINTS.md](./TEST_ENDPOINTS.md) para ejemplos de testing con curl.

## 📚 Documentación Adicional

- [API Documentation](./API_DOCUMENTATION.md) - Documentación completa de endpoints
- [Database README](../database/README.md) - Setup de PostgreSQL
