# 🏥 Agendarte - Sistema de Gestión de Turnos Médicos

Sistema completo para la gestión de turnos médicos con backend en Node.js/Express y frontend en Angular.

## 📁 Estructura del Proyecto

```
Agendarte/
├── backend/                    # API REST - Node.js + Express
│   ├── src/
│   │   ├── controllers/       # Controladores de rutas
│   │   ├── models/           # Modelos de base de datos
│   │   ├── routes/           # Definición de rutas API
│   │   ├── middleware/       # Middleware personalizado
│   │   ├── services/         # Lógica de negocio
│   │   └── server.js         # Servidor principal
│   ├── package.json
│   └── .env.example
├── frontend/                  # Angular App (Angular 20)
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Componentes Angular
│   │   │   └── services/     # Servicios Angular
│   │   └── assets/           # Recursos estáticos
│   ├── angular.json
│   └── package.json
├── database/                  # Scripts SQL
│   └── create_database.sql
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- Angular CLI (v20)
- PostgreSQL

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configurar variables de entorno en .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
ng serve
```

### Base de Datos
```bash
cd database
docker-compose up -d
```

> **Documentación completa**: [Database README](./database/README.md)

## 🔧 Desarrollo

- **Backend**: Puerto 3000 (API REST)
- **Frontend**: Puerto 4200 (Angular Dev Server)
- **Base de Datos**: PostgreSQL

## 🎆 Funcionalidades

- 📅 **Gestión de Turnos** - Crear, modificar y cancelar citas médicas
- 👥 **Gestión de Pacientes** - Registro y administración de pacientes
- 👨‍⚕️ **Gestión de Profesionales** - Administración de médicos y especialistas
- 🔐 **Autenticación** - Sistema de login seguro con JWT
- 📈 **Dashboard** - Panel de control con estadísticas
- 📅 **Calendario** - Vista de calendario para turnos

## 📚 Documentación

Consulta los README específicos en cada carpeta:
- [Backend README](./backend/README.md) - API REST y configuración
- [Frontend README](./frontend/README.md) - Aplicación Angular
- [Database README](./database/README.md) - Base de datos PostgreSQL