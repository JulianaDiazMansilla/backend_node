'use strict';

const express = require('express');
const router = express.Router();



router.get('/', function(req, res, next) {
  res.download('./public/images/bici.jpeg','bici.jpeg');
});

module.exports = router;
