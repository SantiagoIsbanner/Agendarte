# 🎨 Frontend - Agendarte

Aplicación web para gestión de turnos médicos desarrollada con Angular 20 y TypeScript.

## 🏗️ Estructura del Proyecto

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/       # 15+ componentes
│   │   │   ├── login/
│   │   │   ├── admin-dashboard/
│   │   │   ├── panel-paciente/
│   │   │   ├── panel-profesional/
│   │   │   ├── editar-perfil/
│   │   │   ├── gestion-usuarios/
│   │   │   ├── gestion-profesionales/
│   │   │   ├── gestion-pacientes/
│   │   │   ├── gestion-especialidades/
│   │   │   ├── mis-turnos/
│   │   │   └── ...
│   │   ├── services/         # Servicios
│   │   │   ├── usuario.service.ts
│   │   │   ├── permisos.service.ts
│   │   │   └── google-calendar.service.ts
│   │   ├── guards/           # Guards de autenticación
│   │   │   └── auth.guard.ts
│   │   └── app.routes.ts     # Configuración de rutas
│   ├── styles.css            # Estilos globales
│   └── index.html
├── angular.json
└── package.json
```

## 🚀 Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm start
# Aplicación en http://localhost:4200

# Build para producción
npm run build

# Build con watch
npm run watch
```

## 📱 Componentes Principales

### Autenticación
- **LoginComponent** - Login con roles y redirección
- **RegisterPacienteComponent** - Registro de pacientes
- **RegisterProfesionalComponent** - Registro de profesionales

### Dashboards
- **AdminDashboardComponent** - Panel principal con estadísticas
- **PanelPacienteComponent** - Panel de paciente con Google Calendar
- **PanelProfesionalComponent** - Panel de profesional

### Gestión
- **GestionUsuariosComponent** - CRUD de usuarios
- **GestionProfesionalesComponent** - Lista de profesionales
- **GestionPacientesComponent** - Lista de pacientes
- **GestionEspecialidadesComponent** - CRUD de especialidades
- **AdminRolesComponent** - Configuración de permisos

### Perfil y Turnos
- **EditarPerfilComponent** - Edición de perfil (usuario y profesional)
- **MisTurnosComponent** - Gestión de turnos con Google Calendar

## 🔐 Sistema de Autenticación

### Auth Guard
Protege rutas que requieren autenticación:

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const usuario = localStorage.getItem('usuario');
  if (!usuario) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
```

### Permisos por Rol
El `PermisosService` filtra el menú según el rol del usuario:

- **Administrador**: Acceso completo
- **Profesional**: Panel profesional + Mis turnos
- **Usuario/Paciente**: Panel paciente + Mis turnos

## 📅 Integración con Google Calendar

### GoogleCalendarService
- Autenticación OAuth2
- Tokens por usuario (localStorage)
- CRUD de eventos
- Sincronización automática

```typescript
// Autenticar
await googleCalendarService.authenticate();

// Crear evento
await googleCalendarService.createEvent({
  summary: 'Cita - Dr. Juan Pérez',
  start: { dateTime: '2024-01-15T10:00:00' },
  end: { dateTime: '2024-01-15T11:00:00' }
});

// Obtener eventos
const events = await googleCalendarService.getEvents();
```

## 🎨 Estilos y Diseño

### Paleta de Colores
- **Primary**: #415c6b (azul grisáceo)
- **Secondary**: #2d4a57 (azul oscuro)
- **Background**: #f8fafc (gris claro)
- **Success**: #48bb78 (verde)
- **Danger**: #f56565 (rojo)

### Características de Diseño
- Diseño responsive
- Gradientes modernos
- Animaciones CSS
- Modales con backdrop blur
- Cards con sombras suaves
- Botones con hover effects

## 🛠️ Tecnologías y Librerías

### Core
- **Angular 20** - Framework principal
- **TypeScript 5** - Lenguaje tipado
- **RxJS 7** - Programación reactiva

### UI/UX
- **FullCalendar 6** - Calendario interactivo
- **vanillajs-datepicker** - Selector de fechas en español
- **Google Calendar API** - Integración de calendario

### Routing y Forms
- **Angular Router** - Navegación SPA
- **FormsModule** - Formularios template-driven
- **HttpClient** - Peticiones HTTP

## 🌐 Configuración de API

La aplicación consume el backend en `http://localhost:3000/api`

Configurado en cada servicio:
```typescript
private apiUrl = 'http://localhost:3000/api';
```

## 📋 Rutas Principales

```typescript
const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'panel', component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: 'panel-paciente', component: PanelPacienteComponent, canActivate: [authGuard] },
  { path: 'panel-profesional', component: PanelProfesionalComponent, canActivate: [authGuard] },
  { path: 'mis-turnos', component: MisTurnosComponent, canActivate: [authGuard] },
  { path: 'editar-perfil', component: EditarPerfilComponent, canActivate: [authGuard] },
  // ... más rutas
];
```

## 🔧 Servicios

### UsuarioService
- CRUD de usuarios
- Actualización de contraseñas
- Filtros por rol

### PermisosService
- Gestión de permisos por rol
- Filtrado de menú
- Carga desde backend

### GoogleCalendarService
- Autenticación OAuth2
- CRUD de eventos
- Persistencia de tokens

## 📦 Dependencias Principales

```json
{
  "@angular/core": "^20.0.0",
  "@angular/common": "^20.0.0",
  "@angular/router": "^20.0.0",
  "@angular/forms": "^20.0.0",
  "rxjs": "^7.8.0",
  "fullcalendar": "^6.1.10",
  "vanillajs-datepicker": "^1.3.4"
}
```

## 🎯 Funcionalidades Destacadas

### Dashboard con Estadísticas Reales
- Citas del día desde Google Calendar
- Total de profesionales
- Total de pacientes
- Actualización en tiempo real

### Gestión de Perfil Profesional
- Edición de datos personales
- Edición de datos profesionales (especialidad, matrícula, honorarios)
- Selector de especialidades desde BD
- Validación de campos

### Calendario Interactivo
- Vista mensual/semanal/diaria
- Eventos desde Google Calendar
- Crear/editar/eliminar citas
- Filtrado de citas médicas

### Sistema de Permisos
- Menú dinámico según rol
- Rutas protegidas con guards
- Configuración desde admin

## 🚀 Comandos Útiles

```bash
# Generar componente
ng generate component components/nombre

# Generar servicio
ng generate service services/nombre

# Generar guard
ng generate guard guards/nombre

# Linting
ng lint

# Tests
ng test
```

## 📚 Documentación Adicional

- [Backend API](../backend/README.md) - Documentación del API
- [Database](../database/README.md) - Setup de base de datos
