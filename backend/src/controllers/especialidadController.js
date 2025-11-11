const especialidadService = require('../services/especialidadService');

class EspecialidadController {
  async getAll(req, res) {
    try {
      const especialidades = await especialidadService.getAll();
      res.json(especialidades);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const especialidad = await especialidadService.getById(req.params.id);
      res.json(especialidad);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const especialidad = await especialidadService.create(req.body);
      res.status(201).json(especialidad);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const especialidad = await especialidadService.update(req.params.id, req.body);
      res.json(especialidad);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await especialidadService.delete(req.params.id);
      res.json({ message: 'Especialidad eliminada' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new EspecialidadController();
