var express = require('express');
var router = express.Router();

const Pet = require('../models/Pet.js');

/* GET all pets. */
router.get('/', function(req, res, next) {
  Pet.getPets().then(pets => {
    res.json(pets);
  });
});

/* GET one pet by his id. */
router.get('/:id', function(req, res, next) {
  if(!req.params.id) return res.status(400).json({ error: 'Missing pet id' });

  Pet.getOnePet(req.params.id).then(pet => {
    if(!pet) return res.status(404).json({ error: 'Pet not found' });
    res.json(pet);
  });
});

module.exports = router;
