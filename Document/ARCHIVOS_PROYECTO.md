# 📁 Estructura de Archivos del Proyecto

## ✅ Archivos Necesarios (Mantener)

### Raíz del Proyecto
- `README.md` - Documentación principal ✅
- `.gitignore` - Archivos a ignorar en Git ✅
- `.env.example` - Ejemplo de variables de entorno ✅

### Backend
- `backend/src/` - Todo el código fuente ✅
- `backend/package.json` - Dependencias ✅
- `backend/package-lock.json` - Lock de dependencias ✅
- `backend/.env.example` - Variables de entorno ejemplo ✅
- `backend/README.md` - Documentación del backend ✅
- `backend/API_DOCUMENTATION.md` - Documentación de API ✅
- `backend/TEST_ENDPOINTS.md` - Tests de endpoints ✅

### Frontend
- `frontend/src/` - Todo el código fuente ✅
- `frontend/package.json` - Dependencias ✅
- `frontend/package-lock.json` - Lock de dependencias ✅
- `frontend/angular.json` - Configuración de Angular ✅
- `frontend/tsconfig.json` - Configuración de TypeScript ✅
- `frontend/README.md` - Documentación del frontend ✅
- `frontend/.gitignore` - Ignorar archivos específicos ✅

### Database
- `database/setup_database.sql` - Script principal de setup ✅
- `database/README.md` - Documentación de base de datos ✅
- `database/docker-compose.yml` - Docker para PostgreSQL (opcional) ✅

## ⚠️ Archivos Redundantes (Pueden eliminarse)

### Database (Scripts antiguos/duplicados)
- `database/create_database.sql` - Redundante con setup_database.sql
- `database/agendarte2_schema.sql` - Redundante con setup_database.sql
- `database/setup_agendarte2.sql` - Redundante con setup_database.sql
- `database/add_permisos_table.sql` - Ya incluido en setup_database.sql
- `database/create_especialidades_table.sql` - Ya incluido en setup_database.sql
- `database/create_permisos_table.sql` - Ya incluido en setup_database.sql
- `database/fix_passwords.sql` - Script temporal, no necesario
- `database/insert_users.sql` - Ya incluido en setup_database.sql

### Backend
- `backend/test_login.js` - Script de prueba temporal

### Frontend
- `frontend/.angular/cache/` - Cache de Angular (auto-generado)
- `frontend/Document/README-ADMIN.md` - Documentación antigua
- `frontend/Document/README-PROFESIONAL.md` - Documentación antigua

## 🗑️ Comandos para Limpiar

```bash
# Eliminar archivos redundantes de database
cd database
del create_database.sql
del agendarte2_schema.sql
del setup_agendarte2.sql
del add_permisos_table.sql
del create_especialidades_table.sql
del create_permisos_table.sql
del fix_passwords.sql
del insert_users.sql

# Eliminar archivos temporales de backend
cd ../backend
del test_login.js

# Eliminar documentación antigua de frontend
cd ../frontend/Document
del README-ADMIN.md
del README-PROFESIONAL.md
```

## 📦 Archivos que NO se suben a Git

Estos archivos están en `.gitignore`:
- `.env` - Variables de entorno reales
- `node_modules/` - Dependencias (se instalan con npm install)
- `.angular/cache/` - Cache de Angular
- `*.dump`, `*.backup` - Backups de base de datos
- `dist/`, `build/` - Builds compilados

## 📋 Checklist antes de Commit

- [ ] Actualizar README.md si hay cambios importantes
- [ ] Verificar que .env no esté en el commit
- [ ] Verificar que node_modules no esté en el commit
- [ ] Verificar que backups de BD no estén en el commit
- [ ] Actualizar package.json si hay nuevas dependencias
- [ ] Documentar cambios en API_DOCUMENTATION.md si aplica

## 🚀 Para Clonar el Proyecto

Otra persona solo necesita:
1. Clonar el repositorio
2. Ejecutar `npm install` en backend y frontend
3. Crear archivo `.env` basado en `.env.example`
4. Ejecutar `setup_database.sql` en PostgreSQL
5. Iniciar backend y frontend

## 📊 Tamaño del Proyecto

Sin node_modules y archivos temporales:
- Backend: ~50 KB
- Frontend: ~200 KB
- Database: ~5 KB
- Total: ~255 KB

Con node_modules:
- Backend: ~50 MB
- Frontend: ~400 MB
- Total: ~450 MB
