const usuarioService = require('../services/usuarioService');

class UsuarioController {
  async getAll(req, res) {
    try {
      const usuarios = await usuarioService.getAllUsuarios();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const usuario = await usuarioService.getUsuarioById(req.params.id);
      res.json(usuario);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getPacientes(req, res) {
    try {
      const pacientes = await usuarioService.getPacientes();
      res.json(pacientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProfesionales(req, res) {
    try {
      const profesionales = await usuarioService.getProfesionales();
      res.json(profesionales);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const usuario = await usuarioService.createUsuario(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const usuario = await usuarioService.updateUsuario(req.params.id, req.body);
      res.json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updatePassword(req, res) {
    try {
      const { contraseñaActual, nuevaContraseña } = req.body;
      const usuario = await usuarioService.updatePassword(req.params.id, contraseñaActual, nuevaContraseña);
      res.json({ message: 'Contraseña actualizada exitosamente', usuario });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const usuario = await usuarioService.deleteUsuario(req.params.id);
      res.json({ message: 'Usuario eliminado exitosamente', usuario });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UsuarioController();
