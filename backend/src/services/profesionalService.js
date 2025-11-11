const profesionalRepository = require('../repositories/profesionalRepository');

class ProfesionalService {
  async getAllProfesionales() {
    return await profesionalRepository.findAll();
  }

  async getProfesionalById(id) {
    const profesional = await profesionalRepository.findById(id);
    if (!profesional) {
      throw new Error('Profesional no encontrado');
    }
    return profesional;
  }

  async createProfesional(profesionalData) {
    return await profesionalRepository.create(profesionalData);
  }

  async updateProfesional(id, profesionalData) {
    const profesional = await profesionalRepository.findById(id);
    if (!profesional) {
      throw new Error('Profesional no encontrado');
    }
    return await profesionalRepository.update(id, profesionalData);
  }

  async deleteProfesional(id) {
    const profesional = await profesionalRepository.findById(id);
    if (!profesional) {
      throw new Error('Profesional no encontrado');
    }
    return await profesionalRepository.delete(id);
  }
}

module.exports = new ProfesionalService();
