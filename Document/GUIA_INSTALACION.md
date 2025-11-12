# 📦 Guía de Instalación - Agendarte

## Requisitos Previos

### Software Necesario
- **Node.js** 18 o superior - [Descargar](https://nodejs.org/)
- **PostgreSQL** 14 o superior - [Descargar](https://www.postgresql.org/download/)
- **Git** - [Descargar](https://git-scm.com/)
- **Editor de código** (recomendado: VS Code)

### Verificar Instalaciones
```bash
node --version    # Debe mostrar v18.x.x o superior
npm --version     # Debe mostrar 9.x.x o superior
psql --version    # Debe mostrar 14.x o superior
git --version     # Debe mostrar 2.x.x o superior
```

## Paso 1: Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd Agendarte
```

## Paso 2: Configurar PostgreSQL

### Opción A: Instalación Local

1. **Instalar PostgreSQL** en puerto 5433
2. **Crear la base de datos:**
```bash
# Abrir terminal de PostgreSQL
psql -U postgres -h localhost -p 5433

# Ejecutar el script de setup
\i database/setup_database.sql
```

### Opción B: Docker (Opcional)

```bash
cd database
docker-compose up -d
```

### Verificar Base de Datos
```bash
psql -U postgres -h localhost -p 5433 -d agendarte2 -c "\dt"
```

Deberías ver las tablas:
- usuario
- profesional
- especialidad
- permisos_rol

## Paso 3: Configurar Backend

```bash
cd backend

# Instalar dependencias
npm install

# Crear archivo .env
copy .env.example .env    # Windows
# o
cp .env.example .env      # Linux/Mac

# Editar .env con tus configuraciones
notepad .env              # Windows
# o
nano .env                 # Linux/Mac
```

### Configuración del .env
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5433
DB_NAME=agendarte2
DB_USER=postgres
DB_PASSWORD=tu_password_aqui
```

### Iniciar Backend
```bash
npm start
```

Deberías ver:
```
Servidor corriendo en puerto 3000
```

## Paso 4: Configurar Frontend

**Abrir nueva terminal**

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

Deberías ver:
```
Application bundle generation complete.
Watch mode enabled. Watching for file changes...
```

## Paso 5: Acceder a la Aplicación

### URLs
- **Frontend:** http://localhost:4200
- **Backend API:** http://localhost:3000
- **PostgreSQL:** localhost:5433

### Usuarios de Prueba
- **Admin:** admin@agendarte.com / admin1
- **Paciente:** paciente@test.com / paciente123
- **Profesional:** profesional@test.com / profesional123

## Verificación de Instalación

### 1. Verificar Backend
```bash
curl http://localhost:3000/api/usuarios
```

Debe retornar JSON con usuarios.

### 2. Verificar Frontend
Abrir http://localhost:4200 en el navegador.

### 3. Verificar Login
1. Ir a http://localhost:4200/login
2. Ingresar: admin@agendarte.com / admin1
3. Debe redirigir a /panel

## Problemas Comunes

### Error: Puerto 3000 en uso
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Error: Puerto 4200 en uso
```bash
# Cambiar puerto en angular.json o usar:
ng serve --port 4201
```

### Error: No se puede conectar a PostgreSQL
- Verificar que PostgreSQL esté corriendo
- Verificar puerto en .env (5433)
- Verificar credenciales en .env

### Error: node_modules no encontrado
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: Base de datos no existe
```bash
psql -U postgres -h localhost -p 5433 -c "CREATE DATABASE agendarte2;"
psql -U postgres -h localhost -p 5433 -d agendarte2 -f database/setup_database.sql
```

## Comandos Útiles

### Backend
```bash
npm start          # Iniciar servidor
npm run dev        # Iniciar con nodemon (auto-reload)
```

### Frontend
```bash
npm start          # Iniciar servidor de desarrollo
npm run build      # Build para producción
npm run watch      # Build con watch mode
```

### Base de Datos
```bash
# Conectar a PostgreSQL
psql -U postgres -h localhost -p 5433 -d agendarte2

# Ver tablas
\dt

# Ver datos de una tabla
SELECT * FROM usuario;

# Salir
\q
```

## Siguiente Paso

Una vez instalado, consulta:
- [MANUAL_USUARIO.md](./MANUAL_USUARIO.md) - Cómo usar la aplicación
- [ARQUITECTURA.md](./ARQUITECTURA.md) - Arquitectura del sistema
- [API_DOCUMENTATION.md](../backend/API_DOCUMENTATION.md) - Documentación de API
