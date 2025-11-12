# 📚 Documentación - Agendarte

Bienvenido a la documentación completa del sistema Agendarte.

## 📖 Índice de Documentación

### 🚀 Para Empezar
- **[GUIA_INSTALACION.md](./GUIA_INSTALACION.md)** - Guía paso a paso para instalar y configurar el proyecto
  - Requisitos previos
  - Instalación de dependencias
  - Configuración de base de datos
  - Solución de problemas comunes

### 👤 Para Usuarios
- **[MANUAL_USUARIO.md](./MANUAL_USUARIO.md)** - Manual completo de uso de la aplicación
  - Inicio de sesión y registro
  - Funcionalidades por rol (Admin, Profesional, Paciente)
  - Gestión de citas y turnos
  - Integración con Google Calendar
  - Consejos y buenas prácticas

### 🏗️ Para Desarrolladores
- **[ARQUITECTURA.md](./ARQUITECTURA.md)** - Arquitectura técnica del sistema
  - Arquitectura de 3 capas
  - Frontend: Componentes y servicios Angular
  - Backend: Arquitectura de 4 capas
  - Base de datos: Modelo de datos
  - Flujos de autenticación y permisos
  - Integración con APIs externas

### 📡 API y Backend
- **[../backend/API_DOCUMENTATION.md](../backend/API_DOCUMENTATION.md)** - Documentación completa de la API REST
  - Endpoints disponibles
  - Ejemplos de requests/responses
  - Códigos de estado HTTP
  - Autenticación

- **[../backend/TEST_ENDPOINTS.md](../backend/TEST_ENDPOINTS.md)** - Ejemplos de testing con curl
  - Tests de usuarios
  - Tests de profesionales
  - Tests de especialidades

### 🗄️ Base de Datos
- **[../database/README.md](../database/README.md)** - Configuración de PostgreSQL
  - Setup de base de datos
  - Scripts SQL
  - Backup y restauración

## 🎯 Guías Rápidas

### Para Instalar el Proyecto
```bash
# 1. Clonar repositorio
git clone <url>
cd Agendarte

# 2. Instalar dependencias
cd backend && npm install
cd ../frontend && npm install

# 3. Configurar base de datos
psql -U postgres -h localhost -p 5433 -f database/setup_database.sql

# 4. Configurar .env
cp backend/.env.example backend/.env
# Editar backend/.env con tus configuraciones

# 5. Iniciar servicios
cd backend && npm start
cd frontend && npm start
```

Ver [GUIA_INSTALACION.md](./GUIA_INSTALACION.md) para detalles completos.

### Para Usar la Aplicación

**Usuarios de prueba:**
- Admin: admin@agendarte.com / admin1
- Paciente: paciente@test.com / paciente123
- Profesional: profesional@test.com / profesional123

Ver [MANUAL_USUARIO.md](./MANUAL_USUARIO.md) para guía completa.

### Para Desarrollar

**Estructura del proyecto:**
```
Agendarte/
├── frontend/     # Angular 20
├── backend/      # Node.js/Express
└── database/     # PostgreSQL
```

Ver [ARQUITECTURA.md](./ARQUITECTURA.md) para detalles técnicos.

## 🔗 Enlaces Útiles

### Aplicación
- Frontend: http://localhost:4200
- Backend API: http://localhost:3000
- PostgreSQL: localhost:5433

### Repositorios
- Código fuente: [GitHub](https://github.com/SantiagoIsbanner/Agendarte)

### Tecnologías
- [Angular](https://angular.io/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Google Calendar API](https://developers.google.com/calendar)

## 📋 Checklist de Documentación

### Para Nuevos Desarrolladores
- [ ] Leer [GUIA_INSTALACION.md](./GUIA_INSTALACION.md)
- [ ] Leer [ARQUITECTURA.md](./ARQUITECTURA.md)
- [ ] Revisar [API_DOCUMENTATION.md](../backend/API_DOCUMENTATION.md)
- [ ] Configurar entorno de desarrollo
- [ ] Probar endpoints con [TEST_ENDPOINTS.md](../backend/TEST_ENDPOINTS.md)

### Para Nuevos Usuarios
- [ ] Leer [MANUAL_USUARIO.md](./MANUAL_USUARIO.md)
- [ ] Crear cuenta en la aplicación
- [ ] Conectar Google Calendar
- [ ] Agendar primera cita de prueba

### Para Administradores
- [ ] Leer sección de Administrador en [MANUAL_USUARIO.md](./MANUAL_USUARIO.md)
- [ ] Configurar permisos por rol
- [ ] Crear especialidades médicas
- [ ] Gestionar usuarios del sistema

## 🆘 Soporte

### Problemas Comunes
Ver sección "Problemas Comunes" en [GUIA_INSTALACION.md](./GUIA_INSTALACION.md)

### Reportar Bugs
1. Verificar que no esté ya reportado
2. Incluir pasos para reproducir
3. Incluir logs de error
4. Incluir versión del sistema

### Contribuir
1. Fork del repositorio
2. Crear branch para feature
3. Commit de cambios
4. Push al branch
5. Crear Pull Request

## 📝 Notas de Versión

### Versión Actual: 1.0.0

**Características:**
- Sistema de autenticación con roles
- Gestión de usuarios, profesionales y pacientes
- Gestión de especialidades médicas
- Integración con Google Calendar
- Dashboard con estadísticas en tiempo real
- Sistema de permisos configurable

**Tecnologías:**
- Angular 20
- Node.js 18+
- Express 4
- PostgreSQL 14+
- Google Calendar API v3

## 📄 Licencia

Este proyecto fue desarrollado como trabajo integrador académico.

---

**Última actualización:** Noviembre 2025
