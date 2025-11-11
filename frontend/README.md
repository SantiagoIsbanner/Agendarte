# 🎨 Frontend - Agendarte

Aplicación web para el sistema de gestión de turnos médicos desarrollada con Angular 20.

## 🏗️ Estructura

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/       # Componentes de la aplicación
│   │   ├── services/         # Servicios para API
│   │   ├── models/          # Interfaces y modelos
│   │   └── guards/          # Guards de autenticación
│   ├── assets/              # Recursos estáticos
│   └── environments/        # Configuraciones de entorno
├── angular.json             # Configuración de Angular
└── package.json             # Dependencias y scripts
```

## 🚀 Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
ng serve
# Aplicación disponible en http://localhost:4200

# Build para producción
ng build

# Ejecutar tests
ng test
```

## 🔧 Comandos Angular CLI

### Generar componentes
```bash
ng generate component components/nombre-componente
ng generate service services/nombre-servicio
ng generate guard guards/auth
```

### Otros comandos útiles
```bash
ng generate --help          # Ver todas las opciones
ng build --prod            # Build optimizado
ng lint                    # Verificar código
```

## 🛠️ Tecnologías

- **Angular 20** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Angular Material** - Componentes UI
- **RxJS** - Programación reactiva
- **Angular Router** - Navegación

## 🌐 Configuración API

La aplicación se conecta al backend en `http://localhost:3000/api`

Configura la URL en `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

## 📱 Funcionalidades

- Gestión de turnos médicos
- Autenticación de usuarios
- Panel de administración
- Calendario de citas
- Gestión de pacientes
