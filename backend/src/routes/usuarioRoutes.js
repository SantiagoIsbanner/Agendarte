const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/usuarios', usuarioController.getAll);
router.get('/usuarios/pacientes', usuarioController.getPacientes);
router.get('/usuarios/profesionales', usuarioController.getProfesionales);
router.get('/usuarios/:id', usuarioController.getById);
router.post('/usuarios', usuarioController.create);
router.put('/usuarios/:id', usuarioController.update);
router.put('/usuarios/:id/password', usuarioController.updatePassword);
router.delete('/usuarios/:id', usuarioController.delete);

module.exports = router;
