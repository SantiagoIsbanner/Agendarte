-- Actualizar contraseñas con hashes correctos
UPDATE usuario SET contraseña = '$2a$10$VjMtUkeWtaiV4gCqxDz0M.z8BaLCHInaiPJDZ.QmPXdakBGVjmXVi' WHERE mail = 'admin@agendarte.com';
UPDATE usuario SET contraseña = '$2a$10$VjMtUkeWtaiV4gCqxDz0M.z8BaLCHInaiPJDZ.QmPXdakBGVjmXVi' WHERE mail = 'paciente@test.com';
UPDATE usuario SET contraseña = '$2a$10$VjMtUkeWtaiV4gCqxDz0M.z8BaLCHInaiPJDZ.QmPXdakBGVjmXVi' WHERE mail = 'profesional@test.com';