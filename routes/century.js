const express = require('express');
const router = express.Router();
const { getCenturyInmuebles } = require('../controllers/century');

router.get('/', getCenturyInmuebles);
module.exports = router;
