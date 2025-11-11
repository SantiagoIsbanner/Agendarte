-- Script para insertar usuarios de prueba en Agendarte
-- Contraseñas encriptadas con bcrypt (salt rounds: 10)

-- Insertar usuarios base
INSERT INTO usuario (mail, contraseña, nombre, apellido, numero_telefono, fecha_nacimiento, edad, rol, activo, dni, sexo, direccion) VALUES
-- Admin: admin@agendarte.com / admin
('admin@agendarte.com', '$2b$10$8K1p/a0dclxnGiGzb2WOL.eMhAkNFX8iJJ1aIkVFcPVMNiRW6hniq', 'Administrador', 'Sistema', '+54 11 1234-5678', '1990-01-01', 34, 'administrador', true, '12345678', 'masculino', 'Sistema Agendarte, CABA'),

-- Paciente: paciente@test.com / paciente123
('paciente@test.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Juan Carlos', 'Pérez', '+54 11 2345-6789', '1985-05-15', 39, 'usuario', true, '23456789', 'masculino', 'Av. Corrientes 1234, CABA'),

-- Profesional: profesional@test.com / profesional123
('profesional@test.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Dra. María', 'González', '+54 11 3456-7890', '1980-03-20', 44, 'profesional', true, '34567890', 'femenino', 'Av. Santa Fe 5678, CABA');

-- Insertar datos del profesional en la tabla profesional
INSERT INTO profesional (usuario_id, especialidad, sub_especialidad, honorarios, matricula, tiempo_consulta_minutos, bio) VALUES
((SELECT id FROM usuario WHERE mail = 'profesional@test.com'), 'Medicina General', 'Clínica Médica', 5000.00, 'MN12345', 30, 'Médica especialista en medicina general con 15 años de experiencia.');