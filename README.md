# 🏥 Agendarte - Sistema de Gestión de Citas Médicas

**Sistema integral para la gestión de citas médicas con interfaz moderna y funcionalidades avanzadas**

## 📋 Descripción del Proyecto

Agendarte es una aplicación web desarrollada en Angular para la gestión completa de citas médicas, diseñada para facilitar la administración de consultorios, clínicas y centros médicos.

## 🚀 Estado del Desarrollo

**Progreso General: 75% Completado**

- ✅ **Módulo Administrador** - Dashboard y panel de administración completo
- ✅ **Perfil Profesional** - Calendario con Google Calendar integrado
- ✅ **Panel de Administración** - Gestión de usuarios, profesionales y pacientes
- ✅ **Layout Global** - Navegación consistente
- 🔄 **En Desarrollo** - Funcionalidades específicas de gestión
- 📋 **Planificado** - Backend y base de datos

## 🏗️ Arquitectura del Sistema

```
src/app/
├── components/
│   ├── admin-dashboard/       # 🔐 Módulo Administrador
│   ├── panel-profesional/     # 👨⚕️ Perfil Profesional
│   └── administrador/         # ⚙️ Panel de Administración
├── services/
│   ├── app.ts                 # Componente principal
│   ├── app.html              # Layout global
│   ├── app.css               # Estilos globales
│   ├── app.routes.ts         # Configuración de rutas
│   └── google-calendar.service.ts # Servicio Google Calendar
└── README-*.md               # Documentación específica
```

## 🎯 Funcionalidades Principales

### 🔐 **Módulo Administrador** (`/admin`)
- ✅ Dashboard con estadísticas
- ✅ Menú hamburguesa lateral
- ✅ Cards de métricas básicas
- ✅ Diseño glassmorphism

### ⚙️ **Panel de Administración** (`/administrador`)
- ✅ Gestión de usuarios del sistema
- ✅ Gestión de profesionales médicos
- ✅ Gestión de pacientes
- ✅ Interfaz moderna con cards de acción

### 👨⚕️ **Perfil Profesional** (`/panel-profesional`)
- ✅ Calendario FullCalendar v6.1.10
- ✅ Integración Google Calendar REAL
- ✅ Vistas: Mes, Semana, Día
- ✅ Crear, modificar y eliminar citas
- ✅ Sincronización bidireccional con Google Calendar
- ✅ Invitaciones automáticas por email
- ✅ Modal de detalles de eventos
- ✅ Diseño moderno con hero section

### 🎨 **Layout Global**
- ✅ Header consistente en todas las páginas
- ✅ Menú hamburguesa unificado
- ✅ Navegación: Inicio, Panel Paciente, Mis Turnos, Panel Profesional, Administrador
- ✅ Diseño responsive

## 🎨 Diseño y UX

### 🎨 **Paleta de Colores**
- **Primario**: #415c6b (azul oscuro)
- **Secundario**: #eaffff (azul claro)
- **Accent**: #0080ff (azul eléctrico)
- **Fondo**: Gradiente #415c6b → #eaffff

### 🖼️ **Estilo Visual**
- **Header**: Azul oscuro con texto blanco
- **Componentes**: Azul oscuro con texto blanco
- **Calendario**: Fondo blanco con colores sobrios
- **Efectos**: Glassmorphism y backdrop-filter

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Framework**: Angular 20.3.9
- **Lenguaje**: TypeScript
- **Estilos**: CSS3 con efectos modernos
- **Calendario**: FullCalendar v6.1.10
- **Arquitectura**: Standalone Components
- **Señales**: Angular Signals
- **Responsive**: Mobile-first design

### Backend (Planificado)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Base de Datos**: PostgreSQL
- **ORM**: Prisma/TypeORM
- **Autenticación**: JWT

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js (versión 18+)
- Angular CLI

### Instalación
```bash
# Clonar el repositorio
git clone [repository-url]

# Navegar al directorio frontend
cd agendarte-app

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve
```

### Servidor de Desarrollo
```bash
ng serve
```
Navegar a `http://localhost:4200/`

### Construcción
```bash
ng build
```
Los archivos se generarán en `dist/`

## 📱 Rutas Principales

- **`/`** - Página principal (redirige a /admin)
- **`/admin`** - Dashboard administrativo
- **`/panel-profesional`** - Panel del profesional médico
- **`/administrador`** - Panel de administración del sistema

## 📚 Documentación Específica

- **[README-ADMIN.md](./agendarte-app/README-ADMIN.md)** - Módulo Administrador
- **[README-PROFESIONAL.md](./agendarte-app/README-PROFESIONAL.md)** - Perfil Profesional

## 🔄 Próximas Funcionalidades

### 🗄️ **Backend y Base de Datos**
- [ ] API REST con Node.js/Express
- [ ] Base de datos PostgreSQL
- [ ] Autenticación JWT
- [ ] CRUD de usuarios, profesionales y pacientes

### 📋 **Funcionalidades Específicas**
- [ ] Formularios de alta de usuarios
- [ ] Listados y edición de profesionales
- [ ] Gestión completa de pacientes
- [ ] Historial médico

### 🔔 **Sistema de Notificaciones**
- [ ] Email automático mejorado
- [ ] SMS recordatorios
- [ ] Push notifications
- [ ] Alertas del sistema

### 📊 **Reportes y Analytics**
- [ ] Dashboard con métricas avanzadas
- [ ] Reportes de ocupación
- [ ] Análisis de tendencias
- [ ] Exportación de datos

## 🤝 Contribución

Este proyecto sigue un desarrollo incremental con implementación paso a paso de funcionalidades.

## 📄 Licencia

Proyecto desarrollado para gestión médica.

---

**🏥 Sistema médico moderno y eficiente**