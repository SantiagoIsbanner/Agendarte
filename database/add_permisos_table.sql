-- Agregar tabla de permisos

-- Crear tipo ENUM para roles si no existe
DO $$ BEGIN
    CREATE TYPE rol_type AS ENUM ('administrador', 'usuario', 'profesional');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Tabla de permisos por rol
CREATE TABLE IF NOT EXISTS permisos_rol (
    id SERIAL PRIMARY KEY,
    rol rol_type NOT NULL UNIQUE,
    admin BOOLEAN DEFAULT FALSE,
    panel_paciente BOOLEAN DEFAULT FALSE,
    mis_turnos BOOLEAN DEFAULT FALSE,
    panel_profesional BOOLEAN DEFAULT FALSE,
    administrador BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para updated_at
DO $$ BEGIN
    CREATE TRIGGER update_permisos_rol_updated_at BEFORE UPDATE ON permisos_rol
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Insertar permisos por defecto
INSERT INTO permisos_rol (rol, admin, panel_paciente, mis_turnos, panel_profesional, administrador) 
VALUES 
    ('administrador', TRUE, TRUE, TRUE, TRUE, TRUE),
    ('profesional', FALSE, FALSE, TRUE, TRUE, FALSE),
    ('usuario', FALSE, TRUE, TRUE, FALSE, FALSE)
ON CONFLICT (rol) DO NOTHING;
