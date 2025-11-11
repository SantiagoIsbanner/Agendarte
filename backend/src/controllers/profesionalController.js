const profesionalService = require('../services/profesionalService');

class ProfesionalController {
  async getAll(req, res) {
    try {
      const profesionales = await profesionalService.getAllProfesionales();
      res.json(profesionales);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const profesional = await profesionalService.getProfesionalById(req.params.id);
      res.json(profesional);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const profesional = await profesionalService.createProfesional(req.body);
      res.status(201).json(profesional);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const profesional = await profesionalService.updateProfesional(req.params.id, req.body);
      res.json(profesional);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const profesional = await profesionalService.deleteProfesional(req.params.id);
      res.json({ message: 'Profesional eliminado exitosamente', profesional });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ProfesionalController();
