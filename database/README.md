# 🗄️ Base de Datos - Agendarte

Base de datos PostgreSQL para el sistema de gestión de turnos médicos.

## 📋 Estructura de la Base de Datos

### Tablas Principales
- **usuarios** - Información de usuarios del sistema
- **turnos** - Gestión de citas y turnos médicos
- **pacientes** - Datos de pacientes
- **profesionales** - Información de médicos y especialistas

### Tipos de Datos
- **estado_turno** - Estados: pendiente, confirmado, cancelado, completado
- **tipo_usuario** - Tipos: admin, profesional, recepcionista

## 🐳 Configuración con Docker

### Prerrequisitos
- Docker Desktop instalado y ejecutándose

### Levantar la Base de Datos
```bash
cd database
docker-compose up -d
```

### Verificar Estado
```bash
# Ver contenedores activos
docker-compose ps

# Ver logs
docker-compose logs postgres
```

## 🔗 Datos de Conexión

- **Host**: `localhost`
- **Puerto**: `5433`
- **Base de datos**: `agendarte2`
- **Usuario**: `postgres`
- **Contraseña**: `admin123`

### String de Conexión
```
postgresql://postgres:admin123@localhost:5433/agendarte2
```

## 🛠️ Comandos Útiles

```bash
# Parar la base de datos
docker-compose down

# Conectar desde terminal
docker exec -it agendarte-db psql -U postgres -d agendarte2

# Reiniciar con datos limpios
docker-compose down -v
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f postgres
```

## 📁 Archivos

- `create_database.sql` - Script de creación de tablas y estructura
- `docker-compose.yml` - Configuración de Docker para PostgreSQL
- `README.md` - Esta documentación

## 🔧 Configuración Manual (Alternativa)

Si prefieres instalar PostgreSQL localmente:

```bash
# Ejecutar script SQL
psql -U postgres -f create_database.sql

# Configurar conexión en puerto 5432
```