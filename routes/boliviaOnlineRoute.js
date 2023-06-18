const express = require('express');
const router = express.Router();
const { getboliviaOnlineInmuebles } = require('../controllers/boliviaOnline');

router.get('/', getboliviaOnlineInmuebles);
module.exports = router;
