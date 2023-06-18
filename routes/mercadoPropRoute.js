const express = require('express');
const router = express.Router();
const { getMercadoPropalquilerInmuebles } = require('../controllers/mercadoProp');

router.get('/', getMercadoPropalquilerInmuebles);
module.exports = router;
