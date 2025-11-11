const express = require('express');
const cors = require('cors');
require('dotenv').config();
const permisosRoutes = require('./routes/permisosRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const profesionalRoutes = require('./routes/profesionalRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', permisosRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', profesionalRoutes);

// Ruta básica
app.get('/', (req, res) => {
  res.json({ message: 'Agendarte Backend API funcionando' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});