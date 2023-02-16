const express = require('express');
const router = express.Router();
const { getRemaxInmuebles } = require('../controllers/remax');

router.get('/', getRemaxInmuebles);
module.exports = router;
