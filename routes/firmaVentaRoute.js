const express = require('express');
const router = express.Router();
const { getFirmaVenta } = require('../controllers/firmaVenta');

router.get('/', getFirmaVenta);
module.exports = router;
