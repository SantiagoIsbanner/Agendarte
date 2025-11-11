-- Crear base de datos Agendarte
CREATE DATABASE agendarte;
\c agendarte;

-- Crear tipo ENUM para roles
CREATE TYPE rol_type AS ENUM ('administrador', 'usuario', 'profesional');

-- Crear tipo ENUM para sexo
CREATE TYPE sexo_type AS ENUM ('masculino', 'femenino', 'otro');

-- Tabla Usuario (base para todos los perfiles)
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    mail VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    numero_telefono VARCHAR(20),
    fecha_nacimiento DATE,
    edad INTEGER,
    rol rol_type NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    dni VARCHAR(20) UNIQUE,
    sexo sexo_type,
    direccion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Profesional (extensión para usuarios con rol profesional)
CREATE TABLE profesional (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    especialidad VARCHAR(100) NOT NULL,
    sub_especialidad VARCHAR(100),
    honorarios DECIMAL(10,2),
    matricula VARCHAR(50) UNIQUE NOT NULL,
    tiempo_consulta_minutos INTEGER DEFAULT 30,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_usuario_updated_at BEFORE UPDATE ON usuario
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profesional_updated_at BEFORE UPDATE ON profesional
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Índices para optimización
CREATE INDEX idx_usuario_mail ON usuario(mail);
CREATE INDEX idx_usuario_rol ON usuario(rol);
CREATE INDEX idx_profesional_usuario_id ON profesional(usuario_id);
CREATE INDEX idx_profesional_especialidad ON profesional(especialidad);