-- Crear tabla de usuarios para PostgreSQL
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'patient' CHECK (role IN ('admin', 'professional', 'patient')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar usuarios de prueba
INSERT INTO users (email, password, name, role) 
VALUES 
('admin@agendarte.com', 'password123', 'Administrador', 'admin'),
('admprueba@gmail.com', 'password123', 'Admin Prueba', 'admin')
ON CONFLICT (email) DO NOTHING;