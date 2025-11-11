const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password123',
  database: process.env.DB_NAME || 'agendarte'
});

async function initDatabase() {
  try {
    console.log('Conectando a PostgreSQL...');
    
    // Crear tabla users
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'patient' CHECK (role IN ('admin', 'professional', 'patient')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Tabla users creada exitosamente');
    
    // Insertar usuario administrador
    await pool.query(`
      INSERT INTO users (email, password, name, role) 
      VALUES ('admprueba@gmail.com', 'password123', 'Admin Prueba', 'admin')
      ON CONFLICT (email) DO NOTHING
    `);
    
    console.log('Usuario administrador creado: admprueba@gmail.com');
    
    // Verificar usuarios
    const result = await pool.query('SELECT email, name, role FROM users');
    console.log('Usuarios en la base de datos:');
    console.table(result.rows);
    
    await pool.end();
    console.log('Base de datos inicializada correctamente');
    
  } catch (error) {
    console.error('Error inicializando base de datos:', error.message);
    process.exit(1);
  }
}

initDatabase();