-- Script para crear la base de datos agendarte2 desde cero
-- Ejecutar: psql -U postgres -h localhost -p 5433 < setup_database.sql

-- Crear base de datos
CREATE DATABASE agendarte2;

-- Conectar a la base de datos
\c agendarte2

-- Crear tabla usuario
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    mail VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    numero_telefono VARCHAR(20),
    fecha_nacimiento DATE,
    edad INTEGER,
    rol VARCHAR(20) CHECK (rol IN ('administrador', 'profesional', 'usuario')) NOT NULL,
    activo BOOLEAN DEFAULT true,
    dni VARCHAR(20),
    sexo VARCHAR(20) CHECK (sexo IN ('masculino', 'femenino', 'otro')),
    direccion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla especialidad
CREATE TABLE especialidad (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla profesional
CREATE TABLE profesional (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuario(id) ON DELETE CASCADE,
    especialidad_id INTEGER REFERENCES especialidad(id),
    sub_especialidad VARCHAR(100),
    honorarios DECIMAL(10, 2),
    matricula VARCHAR(50),
    tiempo_consulta_minutos INTEGER DEFAULT 30,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla permisos_rol
CREATE TABLE permisos_rol (
    id SERIAL PRIMARY KEY,
    rol VARCHAR(20) NOT NULL,
    permiso VARCHAR(50) NOT NULL,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar especialidades
INSERT INTO especialidad (nombre, descripcion) VALUES
('Cardiología', 'Especialidad médica del corazón'),
('Pediatría', 'Especialidad médica infantil'),
('Dermatología', 'Especialidad de la piel'),
('Traumatología', 'Especialidad de huesos y articulaciones'),
('Ginecología', 'Especialidad de salud femenina'),
('Oftalmología', 'Especialidad de los ojos'),
('Odontología', 'Especialidad dental'),
('Psiquiatría', 'Especialidad de salud mental'),
('Psicologia', 'Especialidad de psicología');

-- Insertar usuarios de prueba (contraseñas hasheadas con bcrypt)
-- admin@agendarte.com / admin1
INSERT INTO usuario (mail, contraseña, nombre, apellido, rol) VALUES
('admin@agendarte.com', '$2a$10$ejemplo_hash_admin', 'Admin', 'Sistema', 'administrador');

-- paciente@test.com / paciente123
INSERT INTO usuario (mail, contraseña, nombre, apellido, numero_telefono, rol) VALUES
('paciente@test.com', '$2a$10$ejemplo_hash_paciente', 'Juan', 'Pérez', '+54 11 1111-1111', 'usuario');

-- profesional@test.com / profesional123
INSERT INTO usuario (mail, contraseña, nombre, apellido, numero_telefono, rol) VALUES
('profesional@test.com', '$2a$10$ejemplo_hash_profesional', 'María', 'González', '+54 11 2222-2222', 'profesional');

-- Insertar permisos por rol
INSERT INTO permisos_rol (rol, permiso, activo) VALUES
('administrador', 'admin', true),
('administrador', 'panel-paciente', true),
('administrador', 'mis-turnos', true),
('administrador', 'panel-profesional', true),
('administrador', 'administrador', true),
('profesional', 'admin', false),
('profesional', 'panel-paciente', false),
('profesional', 'mis-turnos', true),
('profesional', 'panel-profesional', true),
('profesional', 'administrador', false),
('usuario', 'admin', false),
('usuario', 'panel-paciente', true),
('usuario', 'mis-turnos', true),
('usuario', 'panel-profesional', false),
('usuario', 'administrador', false);

-- NOTA: Las contraseñas de ejemplo no funcionarán
-- Debes ejecutar el script de creación de usuarios con contraseñas reales
-- O cambiar las contraseñas desde la aplicación
