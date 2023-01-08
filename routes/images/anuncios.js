'use strict';

const express = require('express');
const router = express.Router();



router.get('/:foto', function(req, res, next) {
  const foto = req.params.foto
  res.download('./public/images/' + foto, foto);
});

module.exports = router;
