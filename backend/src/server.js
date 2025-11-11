const express = require('express');
const cors = require('cors');
require('dotenv').config();
const permisosRoutes = require('./routes/permisosRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const profesionalRoutes = require('./routes/profesionalRoutes');
const authRoutes = require('./routes/authRoutes');
const especialidadRoutes = require('./routes/especialidadRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', permisosRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', profesionalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', especialidadRoutes);

// Ruta básica
app.get('/', (req, res) => {
  res.json({ message: 'Agendarte Backend API funcionando' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});