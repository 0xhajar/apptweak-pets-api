var express = require('express');
var router = express.Router();

const Owner = require('../models/Owner.js');

/* GET all owners. */
router.get('/', function(req, res, next) {
  Owner.getOwners().then(owners => {
    res.json(owners);
  });
});

/* GET one owner by his id. */
router.get('/:id', function(req, res, next) {
  if(!req.params.id) return res.status(400).json({ error: 'Missing owner id' });

  Owner.getOneOwner(req.params.id).then(owner => {
    if(!owner) return res.status(404).json({ error: 'Owner not found' });
    res.json(owner);
  });
});

/* POST add one owner. */
router.post('/', function(req, res, next) {
  const name = req?.body?.name?.length !== 0 ? req.body.name : undefined;
  const age = req?.body?.age > 0 ? req.body.age : undefined;
  const phone_number = req?.body?.phone_number.length !== 0 ? req.body.phone_number : undefined;
  const address = req?.body?.address?.length !== 0 ? req.body.address : undefined;

  if(!name || !age || !phone_number || !address) return res.status(400).json({ error: 'Missing owner data' });

  Owner.addOneOwner (
    name,
    age,
    phone_number,
    address,
  ).then(owner => {
    if(!owner) return res.status(500).json({ error: 'Failed to add owner' });
    return res.json(owner);
  });
});

module.exports = router;