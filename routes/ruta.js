const { next }= require('cheerio/lib/api/traversing');
const express = require('express');
const router = express.Router();


router.get ('/', (req, res, next) => {
 res.status(200).json({
  ok: true,
   data: 'calentando motores',
 });
});

module.exports = router;
