# Test de Endpoints - Agendarte API

## Prerequisitos
1. Base de datos PostgreSQL corriendo
2. Backend corriendo: `npm start` o `npm run dev`
3. Puerto: http://localhost:3000

## Pruebas con cURL o Postman

### 1. Verificar servidor
```bash
curl http://localhost:3000/
```

### 2. Crear Usuario (Paciente)
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "mail": "paciente@test.com",
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
  }'
```

### 3. Obtener todos los usuarios
```bash
curl http://localhost:3000/api/usuarios
```

### 4. Obtener solo pacientes
```bash
curl http://localhost:3000/api/usuarios/pacientes
```

### 5. Crear Usuario Profesional
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "mail": "doctor@test.com",
    "contraseña": "password123",
    "nombre": "María",
    "apellido": "González",
    "numero_telefono": "+54 11 9876-5432",
    "fecha_nacimiento": "1985-05-15",
    "edad": 39,
    "rol": "profesional",
    "dni": "87654321",
    "sexo": "femenino",
    "direccion": "Av. Corrientes 1234, CABA"
  }'
```

### 6. Crear Profesional (usar ID del usuario creado)
```bash
curl -X POST http://localhost:3000/api/profesionales \
  -H "Content-Type: application/json" \
  -d '{
    "usuario_id": 2,
    "especialidad": "Cardiología",
    "sub_especialidad": "Electrofisiología",
    "honorarios": 5000.00,
    "matricula": "MN12345",
    "tiempo_consulta_minutos": 30,
    "bio": "Especialista en cardiología con 10 años de experiencia"
  }'
```

### 7. Obtener todos los profesionales
```bash
curl http://localhost:3000/api/profesionales
```

### 8. Actualizar usuario
```bash
curl -X PUT http://localhost:3000/api/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Carlos",
    "apellido": "Pérez",
    "numero_telefono": "+54 11 1234-5678",
    "fecha_nacimiento": "1990-01-01",
    "edad": 34,
    "dni": "12345678",
    "sexo": "masculino",
    "direccion": "Calle 456, CABA"
  }'
```

### 9. Cambiar contraseña
```bash
curl -X PUT http://localhost:3000/api/usuarios/1/password \
  -H "Content-Type: application/json" \
  -d '{
    "contraseñaActual": "password123",
    "nuevaContraseña": "newpassword456"
  }'
```

### 10. Obtener permisos
```bash
curl http://localhost:3000/api/permisos
```

## Pruebas desde el Frontend

1. Iniciar backend: `cd backend && npm start`
2. Iniciar frontend: `cd frontend && npm start`
3. Abrir: http://localhost:4200
4. Navegar a panel profesional
5. Verificar que se carguen los pacientes desde la API

## Verificación de Arquitectura

### Router → Controller → Service → Repository → Database

1. **Router** (`usuarioRoutes.js`): Define `GET /api/usuarios`
2. **Controller** (`usuarioController.js`): Método `getAll()` recibe request
3. **Service** (`usuarioService.js`): Método `getAllUsuarios()` aplica lógica
4. **Repository** (`usuarioRepository.js`): Método `findAll()` ejecuta query SQL
5. **Database** (PostgreSQL): Retorna datos de tabla `usuario`

## Códigos de Respuesta Esperados

- `200 OK` - Operación exitosa (GET, PUT)
- `201 Created` - Recurso creado (POST)
- `400 Bad Request` - Error en datos enviados
- `404 Not Found` - Recurso no encontrado
- `500 Internal Server Error` - Error del servidor
