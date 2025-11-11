const express = require('express');
const router = express.Router();
const { getPermisos, updatePermisos } = require('../controllers/permisosController');

router.get('/permisos', getPermisos);
router.put('/permisos', updatePermisos);

module.exports = router;
