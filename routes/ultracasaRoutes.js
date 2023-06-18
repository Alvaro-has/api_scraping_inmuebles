const express = require('express');
const router = express.Router();
const {getInmuebles}= require('../controllers/ultracasa');

router.get ('/', getInmuebles);
//router.post ('/buscar', buscarInmuebles);
module.exports = router;