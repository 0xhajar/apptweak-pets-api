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

/* GET one pet by his id including owner's info. */
router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Missing pet id" });
  }

  try {
    const pet = await Pet.getOnePetWithOwner(id);
    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* POST register one pet. */
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

/* DELETE delete one pet by his id. */
router.delete("/:id", async function (req, res, next) {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Missing pet id" });
  }

  try {
    const pet = await Pet.getOnePet(id);
    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    const deletedPet = await Pet.deleteOnePet(id);
    res.json(deletedPet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* PUT edit one pet by his id. */
router.put("/:id", async function (req, res, next) {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Missing pet id" });
  }

  try {
    const pet = await Pet.getOnePet(id);
    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    const updatedPet = {
      id,
      name: req?.body?.name !== undefined ? req.body.name : pet.name,
      age: req?.body?.age !== undefined ? req.body.age : pet.age,
      species: req?.body?.species !== undefined ? req.body.species : pet.species,
      register_date: pet.register_date,
      owner_id: req?.body?.owner_id !== undefined ? req.body.owner_id : pet.owner_id,
    };

    const modifiedPet = await Pet.updateOneOwner(
      updatedPet
    );
    res.json(modifiedPet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
