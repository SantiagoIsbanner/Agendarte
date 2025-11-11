const especialidadRepository = require('../repositories/especialidadRepository');

class EspecialidadService {
  async getAll() {
    return await especialidadRepository.findAll();
  }

  async getById(id) {
    return await especialidadRepository.findById(id);
  }

  async create(data) {
    return await especialidadRepository.create(data);
  }

  async update(id, data) {
    return await especialidadRepository.update(id, data);
  }

  async delete(id) {
    return await especialidadRepository.delete(id);
  }
}

module.exports = new EspecialidadService();
