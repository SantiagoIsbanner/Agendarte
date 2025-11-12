# 🏥 Agendarte - Sistema de Gestión de Turnos Médicos

Sistema web completo para la gestión de turnos médicos con integración a Google Calendar, desarrollado con Angular, Node.js y PostgreSQL.

## 📋 Descripción

Agendarte es una aplicación web que permite la gestión integral de turnos médicos, con diferentes roles (Administrador, Profesional, Paciente) y funcionalidades específicas para cada uno.

## 🏗️ Arquitectura del Proyecto

```
Agendarte/
├── frontend/              # Aplicación Angular 20
├── backend/               # API REST Node.js/Express
└── database/              # Scripts SQL y configuración PostgreSQL
```

## ✨ Características Principales

### 🎨 Frontend (Angular 20)
- Interfaz moderna y responsive con diseño personalizado
- Sistema de autenticación con guards
- Gestión de usuarios por roles (Administrador, Profesional, Paciente)
- Integración completa con Google Calendar API
- Calendario interactivo con FullCalendar
- Selector de fechas en español (vanillajs-datepicker)
- Gestión de especialidades médicas
- Panel de control con estadísticas en tiempo real
- Modales de confirmación con animaciones

### 🔧 Backend (Node.js/Express)
- Arquitectura de 4 capas (Router → Controller → Service → Repository)
- Encriptación de contraseñas con bcryptjs
- API REST con 20+ endpoints CRUD
- Conexión a PostgreSQL con pool de conexiones
- Manejo de transacciones para integridad de datos
- CORS configurado para desarrollo

### 🗄️ Base de Datos (PostgreSQL)
- Tabla `usuario` con roles y permisos
- Tabla `profesional` con datos médicos
- Tabla `especialidad` con especialidades médicas
- Tabla `permisos_rol` para control de acceso
- Relaciones con foreign keys
- Scripts de setup automatizados

## 🚀 Instalación y Ejecución

### Prerequisitos
- Node.js 18+
- PostgreSQL 14+ (puerto 5433)
- npm o yarn
- Git

### 1. Clonar repositorio
```bash
git clone <repository-url>
cd Agendarte
```

### 2. Configurar Base de Datos
```bash
cd database
# Ejecutar script de setup
psql -U postgres -h localhost -p 5433 -f setup_database.sql
```

Ver [Database README](./database/README.md) para más detalles.

### 3. Configurar Backend
```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus configuraciones
npm start
```

El servidor estará en: http://localhost:3000

### 4. Configurar Frontend
```bash
cd frontend
npm install
npm start
```

La aplicación estará en: http://localhost:4200

## 👥 Usuarios de Prueba

- **Admin:** admin@agendarte.com / admin1
- **Paciente:** paciente@test.com / paciente123
- **Profesional:** profesional@test.com / profesional123

## 📡 API Endpoints Principales

### Autenticación
- `POST /api/auth/login` - Iniciar sesión

### Usuarios
- `GET /api/usuarios` - Listar usuarios
- `GET /api/usuarios/pacientes` - Listar pacientes
- `GET /api/usuarios/profesionales` - Listar profesionales
- `POST /api/usuarios` - Crear usuario
- `PUT /api/usuarios/:id` - Actualizar usuario
- `PUT /api/usuarios/:id/password` - Cambiar contraseña
- `DELETE /api/usuarios/:id` - Eliminar usuario (soft delete)

### Profesionales
- `GET /api/profesionales` - Listar profesionales con especialidades
- `POST /api/profesionales` - Crear profesional
- `PUT /api/profesionales/:id` - Actualizar profesional
- `DELETE /api/profesionales/:id` - Eliminar profesional

### Especialidades
- `GET /api/especialidades` - Listar especialidades
- `POST /api/especialidades` - Crear especialidad
- `PUT /api/especialidades/:id` - Actualizar especialidad
- `DELETE /api/especialidades/:id` - Eliminar especialidad

### Permisos
- `GET /api/permisos` - Obtener permisos por rol
- `PUT /api/permisos` - Actualizar permisos

Ver [API_DOCUMENTATION.md](./backend/API_DOCUMENTATION.md) para documentación completa.

## 🛠️ Tecnologías

### Frontend
- Angular 20
- TypeScript 5
- RxJS 7
- FullCalendar 6
- vanillajs-datepicker
- Google Calendar API

### Backend
- Node.js 18+
- Express 4
- PostgreSQL (pg)
- bcryptjs
- CORS
- dotenv

### Base de Datos
- PostgreSQL 14
- Docker (opcional)

## 📚 Documentación

- [Backend README](./backend/README.md) - Documentación del API
- [Frontend README](./frontend/README.md) - Documentación de Angular
- [Database README](./database/README.md) - Setup de base de datos
- [API Documentation](./backend/API_DOCUMENTATION.md) - Endpoints detallados

## 🎯 Funcionalidades por Rol

### Administrador
- Dashboard con estadísticas
- Gestión completa de usuarios
- Gestión de especialidades médicas
- Gestión de profesionales y pacientes
- Configuración de permisos por rol
- Cambio de contraseñas

### Profesional
- Panel profesional
- Gestión de turnos
- Edición de perfil profesional
- Integración con Google Calendar

### Paciente
- Panel de paciente
- Agendar citas médicas
- Ver mis turnos
- Integración con Google Calendar
- Editar perfil

## 🔐 Seguridad

- Contraseñas hasheadas con bcrypt (10 rounds)
- Guards de autenticación en rutas
- Validación de permisos por rol
- Tokens de Google Calendar por usuario
- Soft delete de usuarios

## 📄 Licencia

Este proyecto fue desarrollado como trabajo integrador académico.

## 🔗 Enlaces

- Frontend: http://localhost:4200
- Backend API: http://localhost:3000
- PostgreSQL: localhost:5433
