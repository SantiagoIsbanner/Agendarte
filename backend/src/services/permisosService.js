const pool = require('../config/database');

class PermisosService {
  async getPermisosByRol(rol) {
    const query = 'SELECT * FROM permisos WHERE rol = $1';
    const result = await pool.query(query, [rol]);
    return result.rows;
  }

  async getAllPermisos() {
    const result = await pool.query('SELECT * FROM permisos');
    return result.rows;
  }
}

module.exports = new PermisosService();
