const express = require('express');
const router = express.Router();
const { getFirmapropiedades } = require('../controllers/FirmaPropiedades');

router.get('/', getFirmapropiedades);
module.exports = router;
