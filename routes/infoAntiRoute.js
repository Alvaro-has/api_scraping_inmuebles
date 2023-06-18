const express = require('express');
const router = express.Router();
const {getInfoAntiInmuebles}= require('../controllers/infocasaAnticretico');

router.get ('/', getInfoAntiInmuebles);
   
   module.exports = router;
