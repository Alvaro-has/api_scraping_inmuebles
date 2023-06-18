const express = require('express');
const router = express.Router();
const {getInfoVentaInmuebles}= require('../controllers/infocasaVentaCompra');

router.get ('/', getInfoVentaInmuebles);
   
   module.exports = router;
