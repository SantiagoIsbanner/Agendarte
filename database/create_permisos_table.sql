-- Crear tabla de permisos por rol
CREATE TABLE IF NOT EXISTS permisos_rol (
    id SERIAL PRIMARY KEY,
    rol VARCHAR(50) UNIQUE NOT NULL,
    admin BOOLEAN DEFAULT FALSE,
    panel_paciente BOOLEAN DEFAULT FALSE,
    mis_turnos BOOLEAN DEFAULT FALSE,
    panel_profesional BOOLEAN DEFAULT FALSE,
    administrador BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar permisos por defecto
INSERT INTO permisos_rol (rol, admin, panel_paciente, mis_turnos, panel_profesional, administrador) VALUES
('administrador', true, true, true, true, true),
('usuario', false, true, true, false, false),
('profesional', false, false, false, true, false)
ON CONFLICT (rol) DO NOTHING;