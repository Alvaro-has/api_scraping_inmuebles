const express = require('express');
const router = express.Router();
const {getinfocasaInmuebles}= require('../controllers/infocasa');

router.get ('/', getinfocasaInmuebles);
   
   module.exports = router;
