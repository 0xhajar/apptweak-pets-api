var express = require("express");
var router = express.Router();

const Pet = require("../models/Pet.js");
const Owner = require("../models/Owner.js");

/* GET all pets. */
router.get("/", function (req, res, next) {
  Pet.getPets().then((pets) => {
    res.json(pets);
  });
});

/* GET one pet by his id. */
router.get("/:id", function (req, res, next) {
  if (!req.params.id) return res.status(400).json({ error: "Missing pet id" });

  Pet.getOnePet(req.params.id).then((pet) => {
    if (!pet) return res.status(404).json({ error: "Pet not found" });
    res.json(pet);
  });
});

/* POST one pet. */
router.post("/", function (req, res, next) {
  const name = req?.body?.name?.length !== 0 ? req.body.name : undefined;
  const age = req?.body?.age > 0 ? req.body.age : undefined;
  const species =
    req?.body?.species?.length !== 0 ? req.body.species : undefined;
  const owner_id = req?.body?.owner_id > 0 ? req.body.owner_id : undefined;
  if (!name || !age || !species || !owner_id)
    return res.status(400).json({ error: "Missing pet data" });
  
  Owner.getOneOwner(owner_id).then((owner) => {
    if (!owner) return res.status(404).json({ error: "Owner not found" });
    Pet.addOnePet(name, age, species, owner_id).then((pet) => {
      if (!pet) return res.status(500).json({ error: "Failed to add pet" });
      res.json(pet);
    });
  });
  
});

/* DELETE one pet by his id. */
router.delete("/:id", function (req, res, next) {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: "Missing pet id" });

  Pet.getOnePet(id).then((pet) => {
    if (!pet) return res.status(404).json({ error: "Pet not found" });
    Pet.deleteOnePet(id).then((pet) => {
      if (!pet) return res.status(500).json({ error: "Failed to delete the pet" });
      res.json(pet);
    });
  });
});

module.exports = router;
