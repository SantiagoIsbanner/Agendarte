-- Crear tabla de especialidades
CREATE TABLE IF NOT EXISTS especialidad (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT,
    activa BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar especialidades por defecto
INSERT INTO especialidad (nombre, descripcion) VALUES
('Medicina General', 'Atención médica integral y preventiva'),
('Cardiología', 'Especialidad médica del corazón y sistema cardiovascular'),
('Dermatología', 'Especialidad médica de la piel y anexos'),
('Pediatría', 'Especialidad médica de la salud infantil'),
('Ginecología', 'Especialidad médica de la salud femenina'),
('Traumatología', 'Especialidad médica del sistema musculoesquelético'),
('Oftalmología', 'Especialidad médica de los ojos y la visión'),
('Neurología', 'Especialidad médica del sistema nervioso')
ON CONFLICT (nombre) DO NOTHING;