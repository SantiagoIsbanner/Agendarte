const express = require('express');
const router = express.Router();
const especialidadController = require('../controllers/especialidadController');

router.get('/especialidades', especialidadController.getAll);
router.get('/especialidades/:id', especialidadController.getById);
router.post('/especialidades', especialidadController.create);
router.put('/especialidades/:id', especialidadController.update);
router.delete('/especialidades/:id', especialidadController.delete);

module.exports = router;
