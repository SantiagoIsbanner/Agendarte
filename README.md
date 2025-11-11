# 🏥 Agendarte - Sistema de Gestión de Turnos Médicos

Sistema web completo para la gestión de turnos médicos desarrollado con Angular, Node.js y PostgreSQL.

## 📋 Descripción

Agendarte es una aplicación web que permite la gestión integral de turnos médicos, con diferentes roles (Administrador, Profesional, Paciente) y funcionalidades específicas para cada uno.

## 🏗️ Arquitectura del Proyecto

```
Agendarte/
├── frontend/              # Aplicación Angular
├── backend/               # API REST Node.js/Express
└── database/              # Scripts SQL y configuración
```

## ✨ Características Principales

### Frontend (Angular)
- 🎨 Interfaz moderna y responsive
- 🔐 Sistema de autenticación
- 👥 Gestión de usuarios y roles
- 📅 Integración con Google Calendar
- 📝 Formularios de registro y edición de perfil
- 🗓️ Selector de fechas personalizado

### Backend (Node.js/Express)
- 🏛️ Arquitectura de capas (Router → Controller → Service → Repository)
- 🔒 Encriptación de contraseñas con bcryptjs
- 📡 API REST con 15 endpoints CRUD
- 🗄️ Conexión a PostgreSQL
- 🌐 CORS habilitado

### Base de Datos (PostgreSQL)
- 👤 Tabla de usuarios
- 👨‍⚕️ Tabla de profesionales
- 🔑 Tabla de permisos por rol
- 🐳 Docker Compose para desarrollo

## 🚀 Instalación y Ejecución

### Prerequisitos
- Node.js 18+
- PostgreSQL 14+
- npm o yarn

### 1. Clonar repositorio
```bash
git clone https://github.com/SantiagoIsbanner/Agendarte.git
cd Agendarte
```

### 2. Configurar Base de Datos
```bash
cd database
docker-compose up -d
# O ejecutar scripts SQL manualmente
psql -U postgres -f create_database.sql
```

### 3. Configurar Backend
```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus configuraciones
npm start
```

### 4. Configurar Frontend
```bash
cd frontend
npm install
npm start
```

### 5. Acceder a la aplicación
- Frontend: http://localhost:4200
- Backend API: http://localhost:3000

## 📡 API Endpoints

### Usuarios
- `GET /api/usuarios` - Listar usuarios
- `GET /api/usuarios/pacientes` - Listar pacientes
- `GET /api/usuarios/profesionales` - Listar profesionales
- `POST /api/usuarios` - Crear usuario
- `PUT /api/usuarios/:id` - Actualizar usuario
- `PUT /api/usuarios/:id/password` - Cambiar contraseña
- `DELETE /api/usuarios/:id` - Eliminar usuario

### Profesionales
- `GET /api/profesionales` - Listar profesionales
- `POST /api/profesionales` - Crear profesional
- `PUT /api/profesionales/:id` - Actualizar profesional
- `DELETE /api/profesionales/:id` - Eliminar profesional

Ver [API_DOCUMENTATION.md](./backend/API_DOCUMENTATION.md) para más detalles.

## 🛠️ Tecnologías

### Frontend
- Angular 20
- TypeScript
- RxJS
- Angular Router
- FormsModule
- HttpClient
- vanillajs-datepicker

### Backend
- Node.js
- Express
- PostgreSQL (pg)
- bcryptjs
- CORS
- dotenv

### Base de Datos
- PostgreSQL 14
- Docker

## 📚 Documentación

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
- [Database README](./database/README.md)
- [API Documentation](./backend/API_DOCUMENTATION.md)
- [Test Endpoints](./backend/TEST_ENDPOINTS.md)
- [Cumplimiento de Requisitos](./CUMPLIMIENTO_REQUISITOS.md)

## ✅ Cumplimiento de Requisitos Académicos

Este proyecto cumple con todos los requisitos del trabajo integrador:

✅ Frontend con Angular (diseño UX, componentes, consumo de APIs)  
✅ Backend con NodeJS y Express (arquitectura de capas completa)  
✅ API REST con métodos CRUD (15 endpoints)  
✅ Persistencia en PostgreSQL  
✅ Versionado con GIT y GitHub  
✅ Aplicación funcional

Ver [CUMPLIMIENTO_REQUISITOS.md](./CUMPLIMIENTO_REQUISITOS.md) para detalles completos.

## 👥 Equipo

- Desarrollo Frontend y Backend
- Diseño de Base de Datos
- Integración y Testing

## 📄 Licencia

Este proyecto fue desarrollado como trabajo integrador para IFTS N° 11 - Tecnicatura Superior en Desarrollo de Software.

## 🔗 Enlaces

- Repositorio: https://github.com/SantiagoIsbanner/Agendarte
- Frontend: http://localhost:4200
- Backend API: http://localhost:3000
