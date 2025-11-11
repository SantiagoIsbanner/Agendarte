const pool = require('../config/database');

class ProfesionalRepository {
  async findAll() {
    const query = `
      SELECT p.*, u.nombre, u.apellido, u.mail, u.numero_telefono
      FROM profesional p
      INNER JOIN usuario u ON p.usuario_id = u.id
      WHERE u.activo = true
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async findById(id) {
    const query = `
      SELECT p.*, u.nombre, u.apellido, u.mail, u.numero_telefono
      FROM profesional p
      INNER JOIN usuario u ON p.usuario_id = u.id
      WHERE p.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  async findByUsuarioId(usuarioId) {
    const result = await pool.query('SELECT * FROM profesional WHERE usuario_id = $1', [usuarioId]);
    return result.rows[0];
  }

  async create(profesional) {
    const query = `
      INSERT INTO profesional (usuario_id, especialidad, sub_especialidad, honorarios, matricula, tiempo_consulta_minutos, bio)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [
      profesional.usuario_id,
      profesional.especialidad,
      profesional.sub_especialidad,
      profesional.honorarios,
      profesional.matricula,
      profesional.tiempo_consulta_minutos,
      profesional.bio
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async update(id, profesional) {
    const query = `
      UPDATE profesional 
      SET especialidad = $1, sub_especialidad = $2, honorarios = $3, 
          matricula = $4, tiempo_consulta_minutos = $5, bio = $6, updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING *
    `;
    const values = [
      profesional.especialidad,
      profesional.sub_especialidad,
      profesional.honorarios,
      profesional.matricula,
      profesional.tiempo_consulta_minutos,
      profesional.bio,
      id
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query('DELETE FROM profesional WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = new ProfesionalRepository();
