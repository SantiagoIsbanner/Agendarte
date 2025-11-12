# 🏗️ Arquitectura del Sistema - Agendarte

## Visión General

Agendarte es una aplicación web de 3 capas con arquitectura cliente-servidor:

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Angular)                    │
│                   http://localhost:4200                  │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/REST API
                     │
┌────────────────────▼────────────────────────────────────┐
│                 BACKEND (Node.js/Express)                │
│                   http://localhost:3000                  │
└────────────────────┬────────────────────────────────────┘
                     │ SQL Queries
                     │
┌────────────────────▼────────────────────────────────────┐
│              BASE DE DATOS (PostgreSQL)                  │
│                    localhost:5433                        │
└──────────────────────────────────────────────────────────┘
```

---

## Frontend - Angular 20

### Arquitectura de Componentes

```
src/app/
├── components/          # Componentes de UI
│   ├── login/          # Autenticación
│   ├── admin-dashboard/
│   ├── panel-paciente/
│   ├── panel-profesional/
│   ├── editar-perfil/
│   ├── gestion-*/      # Gestión de entidades
│   └── mis-turnos/
├── services/           # Servicios de negocio
│   ├── usuario.service.ts
│   ├── permisos.service.ts
│   └── google-calendar.service.ts
├── guards/             # Protección de rutas
│   └── auth.guard.ts
└── app.routes.ts       # Configuración de rutas
```

### Flujo de Datos

```
Componente → Service → HTTP Client → Backend API
    ↓
  View (HTML + CSS)
```

### Tecnologías Clave

- **Angular 20** - Framework SPA
- **TypeScript** - Lenguaje tipado
- **RxJS** - Programación reactiva (Observables)
- **Angular Router** - Navegación
- **HttpClient** - Peticiones HTTP
- **FormsModule** - Formularios template-driven

### Patrón de Diseño

**Inyección de Dependencias:**
```typescript
export class PanelPacienteComponent {
  constructor(
    private usuarioService: UsuarioService,
    private googleCalendarService: GoogleCalendarService
  ) {}
}
```

**Observables (RxJS):**
```typescript
this.usuarioService.getUsuarios().subscribe({
  next: (usuarios) => { /* manejar datos */ },
  error: (error) => { /* manejar error */ }
});
```

---

## Backend - Node.js/Express

### Arquitectura de 4 Capas

```
HTTP Request
     ↓
┌─────────────────┐
│     ROUTER      │  Define rutas y métodos HTTP
└────────┬────────┘
         ↓
┌─────────────────┐
│   CONTROLLER    │  Maneja req/res, validaciones básicas
└────────┬────────┘
         ↓
┌─────────────────┐
│    SERVICE      │  Lógica de negocio, validaciones
└────────┬────────┘
         ↓
┌─────────────────┐
│   REPOSITORY    │  Acceso a datos, queries SQL
└────────┬────────┘
         ↓
    PostgreSQL
```

### Ejemplo de Flujo

**1. Router** (`src/routes/usuarioRoutes.js`):
```javascript
router.get('/usuarios', usuarioController.getAll);
router.post('/usuarios', usuarioController.create);
```

**2. Controller** (`src/controllers/usuarioController.js`):
```javascript
async getAll(req, res) {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

**3. Service** (`src/services/usuarioService.js`):
```javascript
async getAllUsuarios() {
  return await usuarioRepository.findAll();
}

async createUsuario(usuarioData) {
  // Validaciones
  const hashedPassword = await bcrypt.hash(usuarioData.contraseña, 10);
  usuarioData.contraseña = hashedPassword;
  return await usuarioRepository.create(usuarioData);
}
```

**4. Repository** (`src/repositories/usuarioRepository.js`):
```javascript
async findAll() {
  const query = `
    SELECT u.*, e.nombre as especialidad, p.matricula
    FROM usuario u
    LEFT JOIN profesional p ON u.id = p.usuario_id
    LEFT JOIN especialidad e ON p.especialidad_id = e.id
    WHERE u.activo = true
  `;
  const result = await pool.query(query);
  return result.rows;
}
```

### Tecnologías Clave

- **Express** - Framework web
- **pg (node-postgres)** - Cliente PostgreSQL
- **bcryptjs** - Hash de contraseñas
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Variables de entorno

---

## Base de Datos - PostgreSQL

### Modelo de Datos

```
┌─────────────────┐
│     usuario     │
├─────────────────┤
│ id (PK)         │
│ mail (UNIQUE)   │
│ contraseña      │
│ nombre          │
│ apellido        │
│ rol (ENUM)      │
│ activo          │
│ ...             │
└────────┬────────┘
         │ 1
         │
         │ 0..1
┌────────▼────────┐       ┌──────────────────┐
│  profesional    │   N   │   especialidad   │
├─────────────────┤───────┤──────────────────┤
│ id (PK)         │   1   │ id (PK)          │
│ usuario_id (FK) │       │ nombre (UNIQUE)  │
│ especialidad_id │       │ descripcion      │
│ matricula       │       └──────────────────┘
│ honorarios      │
│ bio             │
└─────────────────┘

┌──────────────────┐
│  permisos_rol    │
├──────────────────┤
│ id (PK)          │
│ rol              │
│ permiso          │
│ activo           │
└──────────────────┘
```

### Relaciones

- **usuario → profesional**: 1 a 0..1 (Un usuario puede ser profesional)
- **profesional → especialidad**: N a 1 (Muchos profesionales, una especialidad)
- **permisos_rol**: Tabla independiente para control de acceso

### Tipos de Datos

```sql
-- ENUM para roles
CREATE TYPE rol_enum AS ENUM ('administrador', 'profesional', 'usuario');

-- ENUM para sexo
CREATE TYPE sexo_enum AS ENUM ('masculino', 'femenino', 'otro');
```

---

## Flujo de Autenticación

```
1. Usuario ingresa credenciales
         ↓
2. Frontend → POST /api/auth/login
         ↓
3. Backend valida con bcrypt
         ↓
4. Backend retorna datos de usuario
         ↓
5. Frontend guarda en localStorage
         ↓
6. Frontend redirige según rol
```

### Almacenamiento de Sesión

**localStorage:**
```javascript
{
  "usuario": {
    "id": 1,
    "mail": "admin@agendarte.com",
    "nombre": "Admin",
    "rol": "administrador"
  },
  "google_token_1": "ya29.a0AfH6SMB..."
}
```

---

## Sistema de Permisos

### Configuración por Rol

```javascript
permisos = {
  administrador: {
    admin: true,
    'panel-paciente': true,
    'mis-turnos': true,
    'panel-profesional': true,
    administrador: true
  },
  profesional: {
    admin: false,
    'panel-paciente': false,
    'mis-turnos': true,
    'panel-profesional': true,
    administrador: false
  },
  usuario: {
    admin: false,
    'panel-paciente': true,
    'mis-turnos': true,
    'panel-profesional': false,
    administrador: false
  }
}
```

### Guard de Autenticación

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

---

## Integración con Google Calendar

### Flujo de Autenticación OAuth2

```
1. Usuario click "Conectar Google"
         ↓
2. Frontend → Google OAuth2
         ↓
3. Usuario autoriza permisos
         ↓
4. Google retorna access_token
         ↓
5. Frontend guarda token en localStorage
         ↓
6. Frontend usa token para API calls
```

### Almacenamiento de Tokens

```javascript
// Token por usuario
localStorage.setItem(`google_token_${userId}`, accessToken);

// Al cerrar sesión
localStorage.removeItem(`google_token_${userId}`);
```

### API Calls

```typescript
// Crear evento
await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(event)
});
```

---

## Seguridad

### Contraseñas

**Hash con bcrypt:**
```javascript
// Al crear usuario
const hashedPassword = await bcrypt.hash(password, 10);

// Al validar login
const isValid = await bcrypt.compare(password, hashedPassword);
```

### Validaciones

**Frontend:**
- Validación de formularios
- Longitud mínima de contraseña (6 caracteres)
- Formato de email

**Backend:**
- Validación de datos en Service
- Verificación de duplicados
- Validación de contraseña actual

### Soft Delete

```sql
-- No se eliminan registros, se marcan como inactivos
UPDATE usuario SET activo = false WHERE id = $1;
```

---

## Transacciones

Para operaciones que afectan múltiples tablas:

```javascript
const client = await pool.connect();
try {
  await client.query('BEGIN');
  
  // Actualizar usuario
  await client.query(queryUsuario, valuesUsuario);
  
  // Actualizar profesional
  await client.query(queryProfesional, valuesProfesional);
  
  await client.query('COMMIT');
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  client.release();
}
```

---

## Escalabilidad

### Consideraciones Futuras

**Backend:**
- Implementar JWT para autenticación stateless
- Agregar Redis para caché
- Implementar rate limiting
- Agregar logging estructurado

**Frontend:**
- Lazy loading de módulos
- State management (NgRx)
- Service Workers para PWA
- Optimización de bundles

**Base de Datos:**
- Índices en columnas frecuentes
- Particionamiento de tablas grandes
- Réplicas de lectura
- Connection pooling optimizado

---

## Diagrama de Despliegue

```
┌──────────────────────────────────────────────┐
│              Navegador Web                    │
│         (Chrome, Firefox, Edge)               │
└────────────────┬─────────────────────────────┘
                 │ HTTPS
                 │
┌────────────────▼─────────────────────────────┐
│           Servidor Web (Nginx)                │
│         Proxy reverso + SSL                   │
└────────┬─────────────────────┬────────────────┘
         │                     │
         │ :4200              │ :3000
         │                     │
┌────────▼────────┐   ┌────────▼────────┐
│  Angular App    │   │  Node.js API    │
│  (Frontend)     │   │  (Backend)      │
└─────────────────┘   └────────┬────────┘
                               │ :5433
                               │
                      ┌────────▼────────┐
                      │   PostgreSQL    │
                      │   (Database)    │
                      └─────────────────┘
```

---

## Tecnologías Resumen

| Capa | Tecnología | Versión | Propósito |
|------|-----------|---------|-----------|
| Frontend | Angular | 20 | Framework SPA |
| Frontend | TypeScript | 5 | Lenguaje tipado |
| Frontend | RxJS | 7 | Programación reactiva |
| Backend | Node.js | 18+ | Runtime JavaScript |
| Backend | Express | 4 | Framework web |
| Backend | bcryptjs | 2.4 | Hash de contraseñas |
| Database | PostgreSQL | 14+ | Base de datos relacional |
| API | Google Calendar | v3 | Integración calendario |

---

## Referencias

- [Angular Documentation](https://angular.io/docs)
- [Express Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Google Calendar API](https://developers.google.com/calendar)
