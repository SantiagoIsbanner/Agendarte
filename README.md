# 🏥 Agendarte - Sistema de Gestión de Turnos Médicos

## 📁 Estructura del Proyecto

```
Agendarte/
├── backend/                    # API REST - Node.js + Express
│   ├── src/
│   │   ├── controllers/       # Controladores de rutas
│   │   ├── models/           # Modelos de base de datos
│   │   ├── routes/           # Definición de rutas API
│   │   ├── middleware/       # Middleware personalizado
│   │   └── services/         # Lógica de negocio
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

## 🚀 Instalación

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configurar variables de entorno
npm run dev
```

### Frontend
```bash
cd frontend
npm install
ng serve
```

## 🗄️ Base de Datos
Ejecutar el script SQL en PostgreSQL:
```bash
psql -U postgres -f database/create_database.sql
```