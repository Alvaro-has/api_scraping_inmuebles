const express = require('express');
const router = express.Router();
const {getInmuebles}= require('../controllers/ultracasa');

router.get ('/', getInmuebles);
module.exports = router;