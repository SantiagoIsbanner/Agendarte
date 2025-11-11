const pool = require('../config/database');

class UsuarioRepository {
  async findAll() {
    const result = await pool.query('SELECT * FROM usuario WHERE activo = true');
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]);
    return result.rows[0];
  }

  async findByEmail(mail) {
    const result = await pool.query('SELECT * FROM usuario WHERE mail = $1', [mail]);
    return result.rows[0];
  }

  async findByRol(rol) {
    const result = await pool.query('SELECT * FROM usuario WHERE rol = $1 AND activo = true', [rol]);
    return result.rows;
  }

  async create(usuario) {
    const query = `
      INSERT INTO usuario (mail, contraseña, nombre, apellido, numero_telefono, fecha_nacimiento, edad, rol, dni, sexo, direccion)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;
    const values = [
      usuario.mail,
      usuario.contraseña,
      usuario.nombre,
      usuario.apellido,
      usuario.numero_telefono,
      usuario.fecha_nacimiento,
      usuario.edad,
      usuario.rol,
      usuario.dni,
      usuario.sexo,
      usuario.direccion
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async update(id, usuario) {
    const query = `
      UPDATE usuario 
      SET nombre = $1, apellido = $2, numero_telefono = $3, fecha_nacimiento = $4, 
          edad = $5, dni = $6, sexo = $7, direccion = $8, updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
      RETURNING *
    `;
    const values = [
      usuario.nombre,
      usuario.apellido,
      usuario.numero_telefono,
      usuario.fecha_nacimiento,
      usuario.edad,
      usuario.dni,
      usuario.sexo,
      usuario.direccion,
      id
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async updatePassword(id, nuevaContraseña) {
    const query = 'UPDATE usuario SET contraseña = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *';
    const result = await pool.query(query, [nuevaContraseña, id]);
    return result.rows[0];
  }

  async delete(id) {
    const query = 'UPDATE usuario SET activo = false WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = new UsuarioRepository();
