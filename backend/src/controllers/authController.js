const usuarioRepository = require('../repositories/usuarioRepository');
const bcrypt = require('bcryptjs');

class AuthController {
  async login(req, res) {
    try {
      const { mail, contraseña } = req.body;
      console.log('Login attempt:', { mail, contraseña });

      if (!mail || !contraseña) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
      }

      const usuario = await usuarioRepository.findByEmail(mail);
      console.log('Usuario encontrado:', usuario ? 'Sí' : 'No');
      
      if (!usuario) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      const validPassword = await bcrypt.compare(contraseña, usuario.contraseña);
      console.log('Contraseña válida:', validPassword);
      
      if (!validPassword) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      delete usuario.contraseña;
      
      res.json({ 
        message: 'Login exitoso',
        usuario 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();
