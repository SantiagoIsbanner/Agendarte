const usuarioRepository = require('../repositories/usuarioRepository');
const bcrypt = require('bcryptjs');

class UsuarioService {
  async getAllUsuarios() {
    return await usuarioRepository.findAll();
  }

  async getUsuarioById(id) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    return usuario;
  }

  async getPacientes() {
    return await usuarioRepository.findByRol('usuario');
  }

  async getProfesionales() {
    return await usuarioRepository.findByRol('profesional');
  }

  async createUsuario(usuarioData) {
    const existente = await usuarioRepository.findByEmail(usuarioData.mail);
    if (existente) {
      throw new Error('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(usuarioData.contraseña, 10);
    usuarioData.contraseña = hashedPassword;

    return await usuarioRepository.create(usuarioData);
  }

  async updateUsuario(id, usuarioData) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    return await usuarioRepository.update(id, usuarioData);
  }

  async updatePassword(id, contraseñaActual, nuevaContraseña) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const validPassword = await bcrypt.compare(contraseñaActual, usuario.contraseña);
    if (!validPassword) {
      throw new Error('Contraseña actual incorrecta');
    }

    const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);
    return await usuarioRepository.updatePassword(id, hashedPassword);
  }

  async deleteUsuario(id) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    return await usuarioRepository.delete(id);
  }
}

module.exports = new UsuarioService();
