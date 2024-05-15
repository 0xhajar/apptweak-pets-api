var express = require('express');
var router = express.Router();

const Owner = require('../models/Owner.js');

/* GET owners. */
router.get('/', function(req, res, next) {
  Owner.getOwners().then(owners => {
    res.json(owners);
  });
});

module.exports = router;
