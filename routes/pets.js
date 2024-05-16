var express = require('express');
var router = express.Router();

const Pet = require('../models/Pet.js');

/* GET pets. */
router.get('/', function(req, res, next) {
  Pet.getPets().then(pets => {
    res.json(pets);
  });
});

module.exports = router;
