# 🏥 Agendarte - Sistema de Gestión de Citas Médicas

**Sistema integral para la gestión de citas médicas con interfaz moderna y funcionalidades avanzadas**

## 📋 Descripción del Proyecto

Agendarte es una aplicación web desarrollada en Angular para la gestión completa de citas médicas, diseñada para facilitar la administración de consultorios, clínicas y centros médicos.

## 🚀 Estado del Desarrollo

**Progreso General: 60% Completado**

- ✅ **Módulo Administrador** - Dashboard y gestión básica
- ✅ **Perfil Profesional** - Calendario y gestión de citas
- ✅ **Layout Global** - Navegación consistente
- 🔄 **En Desarrollo** - Módulo Pacientes
- 📋 **Planificado** - Reportes y estadísticas

## 🏗️ Arquitectura del Sistema

```
src/app/
├── components/
│   ├── admin-dashboard/       # 🔐 Módulo Administrador
│   └── panel-profesional/     # 👨‍⚕️ Perfil Profesional
├── services/
│   ├── app.ts                 # Componente principal
│   ├── app.html              # Layout global
│   ├── app.css               # Estilos globales
│   └── app.routes.ts         # Configuración de rutas
└── README-*.md               # Documentación específica
```

## 🎯 Funcionalidades Principales

### 🔐 **Módulo Administrador** (`/admin`)
- ✅ Dashboard con estadísticas
- ✅ Menú hamburguesa lateral
- ✅ Cards de métricas básicas
- ✅ Diseño glassmorphism
- 📋 Gestión de profesionales (próximamente)
- 📋 Gestión de pacientes (próximamente)

### 👨‍⚕️ **Perfil Profesional** (`/panel-profesional`)
- ✅ Calendario FullCalendar v6.1.10
- ✅ Integración Google Calendar (simulada)
- ✅ Vistas: Mes, Semana, Día
- ✅ Eventos interactivos
- ✅ Diseño diferenciado con colores sobrios
- ✅ Botón conexión Google en azul eléctrico

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

- **Framework**: Angular 20.3.9
- **Lenguaje**: TypeScript
- **Estilos**: CSS3 con efectos modernos
- **Calendario**: FullCalendar v6.1.10
- **Arquitectura**: Standalone Components
- **Señales**: Angular Signals
- **Responsive**: Mobile-first design

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js (versión 18+)
- Angular CLI

### Instalación
```bash
# Clonar el repositorio
git clone [repository-url]

# Navegar al directorio
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

- **`/`** - Página principal
- **`/admin`** - Dashboard administrativo
- **`/panel-profesional`** - Panel del profesional médico

## 📚 Documentación Específica

- **[README-ADMIN.md](./agendarte-app/README-ADMIN.md)** - Módulo Administrador
- **[README-PROFESIONAL.md](./agendarte-app/README-PROFESIONAL.md)** - Perfil Profesional

## 🔄 Próximas Funcionalidades

### 📋 **Módulo Pacientes**
- [ ] Panel de paciente
- [ ] Solicitud de citas
- [ ] Historial médico
- [ ] Notificaciones

### 📊 **Reportes y Estadísticas**
- [ ] Dashboard avanzado
- [ ] Métricas de ocupación
- [ ] Reportes financieros
- [ ] Análisis de tendencias

### 🔔 **Sistema de Notificaciones**
- [ ] Email automático
- [ ] SMS recordatorios
- [ ] Push notifications
- [ ] Alertas del sistema

### 🔐 **Autenticación y Seguridad**
- [ ] Login/registro
- [ ] Roles y permisos
- [ ] Autenticación JWT
- [ ] Integración OAuth

## 🤝 Contribución

Este proyecto sigue un desarrollo incremental con implementación paso a paso de funcionalidades.

## 📄 Licencia

Proyecto desarrollado para gestión médica.

---

**🏥 Sistema médico moderno y eficiente**