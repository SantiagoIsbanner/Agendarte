const express = require('express');
const cors = require('cors');
require('dotenv').config();
const permisosRoutes = require('./routes/permisosRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', permisosRoutes);

// Ruta básica
app.get('/', (req, res) => {
  res.json({ message: 'Agendarte Backend API funcionando' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});