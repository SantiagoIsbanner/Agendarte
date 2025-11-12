# Base de Datos Agendarte

## Configuración Inicial

### Requisitos
- PostgreSQL 12 o superior
- Puerto: 5433 (o modificar en `backend/src/config/database.js`)

### Instalación

1. **Crear la base de datos:**
```bash
psql -U postgres -h localhost -p 5433 -f setup_database.sql
```

2. **Crear usuarios con contraseñas reales:**
Ejecuta desde el backend:
```bash
cd backend
node scripts/create-test-users.js
```

O manualmente desde psql:
```sql
-- Conectar a la base de datos
\c agendarte2

-- Actualizar contraseñas (estos son los hashes correctos)
UPDATE usuario SET contraseña = '$2a$10$eFPigszzz2Aws3o..ifYC.swWJVwhyv4wTtZuW5yqhtH2DlhbwNOW' WHERE mail = 'admin@agendarte.com';
UPDATE usuario SET contraseña = '$2a$10$ejemplo_hash_paciente' WHERE mail = 'paciente@test.com';
UPDATE usuario SET contraseña = '$2a$10$ejemplo_hash_profesional' WHERE mail = 'profesional@test.com';
```

## Usuarios de Prueba

- **Admin:** admin@agendarte.com / admin1
- **Paciente:** paciente@test.com / paciente123
- **Profesional:** profesional@test.com / profesional123

## Backup y Restauración

### Exportar solo estructura:
```bash
pg_dump -U postgres -h localhost -p 5433 -d agendarte2 --schema-only > schema.sql
```

### Exportar datos completos (NO subir a Git):
```bash
pg_dump -U postgres -h localhost -p 5433 -d agendarte2 > backup_completo.sql
```

### Restaurar:
```bash
psql -U postgres -h localhost -p 5433 -d agendarte2 < backup_completo.sql
```

## Notas Importantes

⚠️ **NO subir a Git:**
- Backups completos con datos reales
- Archivos con contraseñas sin hashear
- Datos de usuarios reales

✅ **Sí subir a Git:**
- Scripts de estructura (schema)
- Scripts de datos de ejemplo
- Documentación
