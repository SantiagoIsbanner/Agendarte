# 👤 Manual de Usuario - Agendarte

## Índice
1. [Inicio de Sesión](#inicio-de-sesión)
2. [Roles y Permisos](#roles-y-permisos)
3. [Panel de Administrador](#panel-de-administrador)
4. [Panel de Profesional](#panel-de-profesional)
5. [Panel de Paciente](#panel-de-paciente)

---

## Inicio de Sesión

### Acceder al Sistema
1. Abrir http://localhost:4200
2. Click en "Iniciar Sesión"
3. Ingresar email y contraseña
4. Click en "Iniciar Sesión"

### Registro de Nuevo Usuario
1. En la página de login, click en "Registrarse"
2. Seleccionar tipo de usuario:
   - **Paciente** - Para agendar citas
   - **Profesional** - Para médicos/especialistas
3. Completar formulario
4. Click en "Registrarse"

---

## Roles y Permisos

### 👨‍💼 Administrador
**Acceso completo al sistema:**
- Dashboard con estadísticas
- Gestión de usuarios
- Gestión de profesionales
- Gestión de pacientes
- Gestión de especialidades
- Configuración de permisos

### 👨‍⚕️ Profesional
**Gestión de consultas:**
- Panel profesional
- Mis turnos
- Editar perfil profesional
- Integración con Google Calendar

### 👤 Paciente
**Agendar y gestionar citas:**
- Panel de paciente
- Agendar citas
- Mis turnos
- Editar perfil
- Integración con Google Calendar

---

## Panel de Administrador

### Dashboard Principal
**Estadísticas en tiempo real:**
- Citas del día
- Total de profesionales
- Total de pacientes

**Acciones rápidas:**
- Editar perfil
- Cambiar contraseña

### Gestión de Usuarios
**Acceso:** Menú → Administrador → Gestión de Usuarios

**Funciones:**
- Ver lista de todos los usuarios
- Buscar por nombre, apellido o email
- Filtrar por rol (Administrador, Profesional, Paciente)
- Cambiar contraseña de usuarios
- Activar/Desactivar usuarios
- Eliminar usuarios

**Pasos para cambiar contraseña:**
1. Click en icono 🔑 del usuario
2. Ingresar nueva contraseña
3. Confirmar contraseña
4. Click en "Cambiar Contraseña"

### Gestión de Especialidades
**Acceso:** Menú → Administrador → Gestión de Especialidades

**Funciones:**
- Ver lista de especialidades
- Crear nueva especialidad
- Editar especialidad existente
- Eliminar especialidad

**Crear especialidad:**
1. Click en "Nueva Especialidad"
2. Ingresar nombre
3. Ingresar descripción (opcional)
4. Click en "Guardar"

### Gestión de Profesionales
**Acceso:** Menú → Administrador → Gestión de Profesionales

**Funciones:**
- Ver lista de profesionales
- Filtrar por especialidad
- Buscar por nombre o email
- Ver matrícula y especialidad

### Gestión de Pacientes
**Acceso:** Menú → Administrador → Gestión de Pacientes

**Funciones:**
- Ver lista de pacientes
- Buscar por nombre o email
- Ver datos de contacto

### Configuración de Permisos
**Acceso:** Menú → Administrador → Admin Roles

**Funciones:**
- Configurar permisos por rol
- Activar/desactivar acceso a secciones
- Guardar cambios

---

## Panel de Profesional

### Dashboard Profesional
**Acceso:** Menú → Panel Profesional

**Funciones:**
- Ver agenda del día
- Gestionar turnos
- Ver próximas citas

### Mis Turnos
**Acceso:** Menú → Mis Turnos

**Funciones:**
- Ver todos los turnos programados
- Conectar con Google Calendar
- Actualizar turnos desde Google
- Ver detalles de cada turno
- Cancelar turnos

**Conectar Google Calendar:**
1. Click en "Conectar Google Calendar"
2. Autorizar acceso a Google
3. Click en "Actualizar Turnos"

### Editar Perfil Profesional
**Acceso:** Menú → Inicio → Editar Perfil

**Datos personales:**
- Nombre y apellido
- Email (no editable)
- DNI
- Teléfono
- Fecha de nacimiento
- Sexo
- Dirección

**Datos profesionales:**
- Especialidad (seleccionar de lista)
- Sub-especialidad
- Matrícula
- Honorarios
- Tiempo de consulta (minutos)
- Biografía

**Guardar cambios:**
1. Completar campos
2. Click en "Guardar Cambios"
3. Esperar confirmación (2 segundos)

---

## Panel de Paciente

### Dashboard Paciente
**Acceso:** Menú → Panel Paciente

**Funciones:**
- Ver calendario de citas
- Agendar nueva cita
- Conectar con Google Calendar
- Ver citas próximas

### Agendar Nueva Cita
**Pasos:**
1. Click en "Nueva Cita"
2. Seleccionar especialidad (opcional)
3. Seleccionar profesional
4. Seleccionar fecha
5. Seleccionar hora
6. Seleccionar duración (30 min, 1h, 1.5h)
7. Agregar notas (opcional)
8. Click en "Crear Cita"

**Nota:** Se enviará invitación por email al profesional.

### Gestionar Citas
**Ver detalles:**
- Click en evento del calendario
- Ver información completa

**Editar cita:**
1. Click en evento
2. Click en "Editar"
3. Modificar datos
4. Click en "Guardar"

**Eliminar cita:**
1. Click en evento
2. Click en "Eliminar"
3. Confirmar eliminación

### Mis Turnos
**Acceso:** Menú → Mis Turnos

**Funciones:**
- Ver lista de turnos programados
- Filtrar solo citas médicas
- Ver turnos del día
- Conectar con Google Calendar
- Actualizar desde Google
- Ver detalles
- Cancelar turnos

**Estados de turnos:**
- 🔴 **En progreso** - Turno actual
- 🟠 **Próximo** - Dentro de 24 horas
- 🟡 **Pendiente** - Más de 24 horas

### Editar Perfil
**Acceso:** Menú → Inicio → Editar Perfil

**Datos editables:**
- Nombre y apellido
- DNI
- Teléfono
- Fecha de nacimiento
- Sexo
- Dirección

---

## Integración con Google Calendar

### Conectar Cuenta
1. Click en "Conectar Google Calendar"
2. Seleccionar cuenta de Google
3. Autorizar permisos
4. Esperar confirmación

### Sincronizar Eventos
- Los eventos se cargan automáticamente al conectar
- Click en "Actualizar Turnos" para sincronizar manualmente
- Solo se muestran citas creadas desde Agendarte

### Desconectar
- Cerrar sesión en Agendarte
- Los tokens se eliminan automáticamente

---

## Cambiar Contraseña

### Desde el Dashboard
1. Click en "Cambiar Contraseña"
2. Ingresar contraseña actual
3. Ingresar nueva contraseña (mínimo 6 caracteres)
4. Confirmar nueva contraseña
5. Click en "Guardar"

---

## Cerrar Sesión

1. Abrir menú hamburguesa (☰)
2. Click en "Cerrar Sesión"
3. Se limpiará la sesión y tokens de Google

---

## Consejos y Buenas Prácticas

### Seguridad
- Usar contraseñas seguras (mínimo 6 caracteres)
- No compartir credenciales
- Cerrar sesión al terminar

### Citas
- Agendar con anticipación
- Verificar datos del profesional
- Agregar notas relevantes (síntomas, alergias)
- Confirmar fecha y hora antes de guardar

### Google Calendar
- Mantener sincronizado
- No eliminar eventos directamente desde Google
- Usar la aplicación para gestionar citas

---

## Soporte

Para problemas técnicos o dudas:
- Consultar [GUIA_INSTALACION.md](./GUIA_INSTALACION.md)
- Consultar [ARQUITECTURA.md](./ARQUITECTURA.md)
- Revisar logs del sistema
