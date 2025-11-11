# API Documentation - Agendarte Backend

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### Usuarios

#### GET /usuarios
Obtener todos los usuarios activos
```
Response: Usuario[]
```

#### GET /usuarios/pacientes
Obtener todos los pacientes (usuarios con rol 'usuario')
```
Response: Usuario[]
```

#### GET /usuarios/profesionales
Obtener todos los profesionales (usuarios con rol 'profesional')
```
Response: Usuario[]
```

#### GET /usuarios/:id
Obtener un usuario por ID
```
Response: Usuario
```

#### POST /usuarios
Crear un nuevo usuario
```json
Request Body:
{
  "mail": "usuario@example.com",
  "contraseña": "password123",
  "nombre": "Juan",
  "apellido": "Pérez",
  "numero_telefono": "+54 11 1234-5678",
  "fecha_nacimiento": "1990-01-01",
  "edad": 34,
  "rol": "usuario",
  "dni": "12345678",
  "sexo": "masculino",
  "direccion": "Calle 123, CABA"
}

Response: Usuario
```

#### PUT /usuarios/:id
Actualizar un usuario
```json
Request Body:
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "numero_telefono": "+54 11 1234-5678",
  "fecha_nacimiento": "1990-01-01",
  "edad": 34,
  "dni": "12345678",
  "sexo": "masculino",
  "direccion": "Calle 123, CABA"
}

Response: Usuario
```

#### PUT /usuarios/:id/password
Cambiar contraseña de un usuario
```json
Request Body:
{
  "contraseñaActual": "oldpassword",
  "nuevaContraseña": "newpassword"
}

Response: { message: string, usuario: Usuario }
```

#### DELETE /usuarios/:id
Eliminar (desactivar) un usuario
```
Response: { message: string, usuario: Usuario }
```

### Profesionales

#### GET /profesionales
Obtener todos los profesionales con información del usuario
```
Response: Profesional[]
```

#### GET /profesionales/:id
Obtener un profesional por ID
```
Response: Profesional
```

#### POST /profesionales
Crear un nuevo profesional
```json
Request Body:
{
  "usuario_id": 1,
  "especialidad": "Cardiología",
  "sub_especialidad": "Electrofisiología",
  "honorarios": 5000.00,
  "matricula": "MN12345",
  "tiempo_consulta_minutos": 30,
  "bio": "Especialista en cardiología con 10 años de experiencia"
}

Response: Profesional
```

#### PUT /profesionales/:id
Actualizar un profesional
```json
Request Body:
{
  "especialidad": "Cardiología",
  "sub_especialidad": "Electrofisiología",
  "honorarios": 5000.00,
  "matricula": "MN12345",
  "tiempo_consulta_minutos": 30,
  "bio": "Especialista en cardiología con 10 años de experiencia"
}

Response: Profesional
```

#### DELETE /profesionales/:id
Eliminar un profesional
```
Response: { message: string, profesional: Profesional }
```

### Permisos

#### GET /permisos
Obtener todos los permisos por rol
```
Response: { [rol: string]: Permisos }
```

#### PUT /permisos
Actualizar permisos
```json
Request Body:
{
  "permisos": {
    "administrador": {
      "admin": true,
      "panel-paciente": false,
      "mis-turnos": false,
      "panel-profesional": false,
      "administrador": true
    }
  }
}

Response: { message: string }
```

## Arquitectura

El backend sigue una arquitectura de capas:

```
Routes → Controllers → Services → Repositories → Database
```

- **Routes**: Define los endpoints y métodos HTTP
- **Controllers**: Maneja las peticiones HTTP y respuestas
- **Services**: Contiene la lógica de negocio
- **Repositories**: Interactúa con la base de datos
- **Database**: PostgreSQL

## Tecnologías

- Node.js
- Express
- PostgreSQL
- bcryptjs (encriptación de contraseñas)
- CORS
- dotenv
