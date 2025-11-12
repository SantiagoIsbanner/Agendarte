const pool = require('../config/database');

class UsuarioRepository {
  async findAll() {
    const query = `
      SELECT u.*, p.especialidad, p.sub_especialidad, p.honorarios, 
             p.matricula, p.tiempo_consulta_minutos, p.bio
      FROM usuario u
      LEFT JOIN profesional p ON u.id = p.usuario_id
      WHERE u.activo = true
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  async findById(id) {
    const query = `
      SELECT u.*, p.especialidad, p.sub_especialidad, p.honorarios, 
             p.matricula, p.tiempo_consulta_minutos, p.bio
      FROM usuario u
      LEFT JOIN profesional p ON u.id = p.usuario_id
      WHERE u.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  async findByEmail(mail) {
    const result = await pool.query('SELECT * FROM usuario WHERE mail = $1', [mail]);
    return result.rows[0];
  }

  async findByRol(rol) {
    const query = `
      SELECT u.*, p.especialidad, p.sub_especialidad, p.honorarios, 
             p.matricula, p.tiempo_consulta_minutos, p.bio
      FROM usuario u
      LEFT JOIN profesional p ON u.id = p.usuario_id
      WHERE u.rol = $1 AND u.activo = true
    `;
    const result = await pool.query(query, [rol]);
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
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const queryUsuario = `
        UPDATE usuario 
        SET nombre = $1, apellido = $2, numero_telefono = $3, fecha_nacimiento = $4, 
            edad = $5, dni = $6, sexo = $7, direccion = $8, updated_at = CURRENT_TIMESTAMP
        WHERE id = $9
        RETURNING *
      `;
      const valuesUsuario = [
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
      const resultUsuario = await client.query(queryUsuario, valuesUsuario);
      
      if (usuario.especialidad !== undefined) {
        const checkProfesional = await client.query('SELECT * FROM profesional WHERE usuario_id = $1', [id]);
        
        if (checkProfesional.rows.length > 0) {
          const queryProfesional = `
            UPDATE profesional 
            SET especialidad = $1, sub_especialidad = $2, honorarios = $3, 
                matricula = $4, tiempo_consulta_minutos = $5, bio = $6
            WHERE usuario_id = $7
            RETURNING *
          `;
          const valuesProfesional = [
            usuario.especialidad,
            usuario.sub_especialidad,
            usuario.honorarios,
            usuario.matricula,
            usuario.tiempo_consulta_minutos,
            usuario.bio,
            id
          ];
          await client.query(queryProfesional, valuesProfesional);
        } else {
          const queryInsertProfesional = `
            INSERT INTO profesional (usuario_id, especialidad, sub_especialidad, honorarios, matricula, tiempo_consulta_minutos, bio)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
          `;
          const valuesInsertProfesional = [
            id,
            usuario.especialidad,
            usuario.sub_especialidad,
            usuario.honorarios,
            usuario.matricula,
            usuario.tiempo_consulta_minutos,
            usuario.bio
          ];
          await client.query(queryInsertProfesional, valuesInsertProfesional);
        }
      }
      
      await client.query('COMMIT');
      return resultUsuario.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
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
