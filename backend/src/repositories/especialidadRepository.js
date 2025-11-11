const pool = require('../config/database');

class EspecialidadRepository {
  async findAll() {
    const result = await pool.query('SELECT * FROM especialidad ORDER BY nombre');
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query('SELECT * FROM especialidad WHERE id = $1', [id]);
    return result.rows[0];
  }

  async create(especialidad) {
    const query = 'INSERT INTO especialidad (nombre, descripcion) VALUES ($1, $2) RETURNING *';
    const result = await pool.query(query, [especialidad.nombre, especialidad.descripcion]);
    return result.rows[0];
  }

  async update(id, especialidad) {
    const query = 'UPDATE especialidad SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *';
    const result = await pool.query(query, [especialidad.nombre, especialidad.descripcion, id]);
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query('DELETE FROM especialidad WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = new EspecialidadRepository();
