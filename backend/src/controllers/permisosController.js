const pool = require('../config/database');
const permisosService = require('../services/permisosService');

const getPermisos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM permisos_rol ORDER BY rol');
    const permisos = {};
    
    result.rows.forEach(row => {
      permisos[row.rol] = {
        admin: row.admin,
        'panel-paciente': row.panel_paciente,
        'mis-turnos': row.mis_turnos,
        'panel-profesional': row.panel_profesional,
        administrador: row.administrador
      };
    });
    
    res.json(permisos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePermisos = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { permisos } = req.body;
    
    for (const [rol, perms] of Object.entries(permisos)) {
      await client.query(
        `UPDATE permisos_rol 
         SET admin = $1, panel_paciente = $2, mis_turnos = $3, 
             panel_profesional = $4, administrador = $5
         WHERE rol = $6`,
        [perms.admin, perms['panel-paciente'], perms['mis-turnos'], 
         perms['panel-profesional'], perms.administrador, rol]
      );
    }
    
    await client.query('COMMIT');
    res.json({ message: 'Permisos actualizados correctamente' });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};

const getAllPermisos = async (req, res) => {
  try {
    const permisos = await permisosService.getAllPermisos();
    res.json(permisos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPermisos, updatePermisos, getAllPermisos };
