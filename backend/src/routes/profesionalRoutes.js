const express = require('express');
const router = express.Router();
const profesionalController = require('../controllers/profesionalController');

router.get('/profesionales', profesionalController.getAll);
router.get('/profesionales/:id', profesionalController.getById);
router.post('/profesionales', profesionalController.create);
router.put('/profesionales/:id', profesionalController.update);
router.delete('/profesionales/:id', profesionalController.delete);

module.exports = router;
