const express = require('express');
const router = express.Router();
const { getFirmaAnticretico } = require('../controllers/firmaAnticretico');

router.get('/', getFirmaAnticretico);
module.exports = router;
