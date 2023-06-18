const express = require('express');
const router = express.Router();
const { getMercadoPropInmuebles } = require('../controllers/mercadoPropVenta');

router.get('/', getMercadoPropInmuebles);
module.exports = router;
