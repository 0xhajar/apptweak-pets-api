var express = require('express');
var router = express.Router();

const Owner = require('../models/Owner.js');

/* GET owners. */
router.get('/', function(req, res, next) {
  Owner.getOwners().then(owners => {
    res.json(owners);
  });
});

/* GET one owner. */
router.get('/:id', function(req, res, next) {
  if(!req.params.id) return res.status(400).json({ error: 'Missing owner id' });

  Owner.getOneOwner(req.params.id).then(owner => {
    if(!owner) return res.status(404).json({ error: 'Owner not found' });
    res.json(owner);
  });
});

module.exports = router;
