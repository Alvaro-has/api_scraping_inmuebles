const express = require('express');
const router = express.Router();
const { getboliviaOnlineVentaInmuebles  } = require('../controllers/boliviaOnlineVenta');

router.get('/',  getboliviaOnlineVentaInmuebles);
module.exports = router;
