var express = require("express");
var router = express.Router();

const Owner = require("../models/Owner.js");

/* GET all owners. */
router.get("/", function (req, res, next) {
  Owner.getOwners().then((owners) => {
    return res.json(owners);
  });
});

/* GET one owner by his id including his pets. */
router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Missing owner id" });
  }

  try {
    const owner = await Owner.getOwnerWithPets(id);
    if (!owner) {
      return res.status(404).json({ error: "Owner not found" });
    }
    res.json(owner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* POST add one owner. */
router.post("/", function (req, res, next) {
  const name = req?.body?.name?.length !== 0 ? req.body.name : undefined;
  const age = req?.body?.age > 0 ? req.body.age : undefined;
  const phone_number =
    req?.body?.phone_number.length !== 0 ? req.body.phone_number : undefined;
  const address =
    req?.body?.address?.length !== 0 ? req.body.address : undefined;

  if (!name || !age || !phone_number || !address)
    return res.status(400).json({ error: "Missing owner data" });

  Owner.addOneOwner(name, age, phone_number, address).then((owner) => {
    if (!owner) return res.status(500).json({ error: "Failed to add owner" });
    return res.json(owner);
  });
});

/* DELETE one owner by his id. */
router.delete("/:id", async function (req, res, next) {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Missing owner id" });
  }

  try {
    const owner = await Owner.getOwnerWithPets(id);
    if (!owner) {
      return res.status(404).json({ error: "Owner not found" });
    }

    const result = await Owner.deleteOneOwner(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* PUT update one owner by his id. */
router.put("/:id", async function (req, res, next) {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Missing owner id" });
  }

  try {
    const owner = await Owner.getOneOwner(id);
    if (!owner) {
      return res.status(404).json({ error: "Owner not found" });
    }

    const updatedOwner = {
      name: req?.body?.name !== undefined ? req.body.name : owner.name,
      age: req?.body?.age !== undefined ? req.body.age : owner.age,
      phone_number:
        req?.body?.phone_number !== undefined
          ? req.body.phone_number
          : owner.phone_number,
      address:
        req?.body?.address !== undefined ? req.body.address : owner.address,
      register_date: owner.register_date,
    };

    const modifiedOwner = await Owner.updateOneOwner(
      id,
      updatedOwner.name,
      updatedOwner.age,
      updatedOwner.phone_number,
      updatedOwner.address,
      updatedOwner.register_date
    );
    res.json(modifiedOwner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
