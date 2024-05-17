import db from "./db_conf";

async function getOwners() {
  try {
    const rows = await db.all(`SELECT * FROM owners`);
    const owners = rows.map((row) => row);
    return owners;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

async function getOneOwner(id) {
  try {
    const owner = await db.get(`SELECT * FROM owners WHERE owner_id = ?`, [id]);
    return owner;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getOwnerWithPets(id) {
  try {
    const sql = `
      SELECT o.owner_id, o.name, o.age, o.phone_number, o.address, o.register_date, 
             p.pet_id, p.name AS pet_name, p.age AS pet_age, p.species, p.register_date AS pet_register_date
      FROM owners o
      LEFT JOIN pets p ON o.owner_id = p.owner_id
      WHERE o.owner_id = ?`;
    const rows = await db.all(sql, [id]);
    if (rows.length === 0) {
      return null; // Return null if no owner is found
    }
    const ownerData = {
      owner_id: rows[0].owner_id,
      name: rows[0].name,
      age: rows[0].age,
      phone_number: rows[0].phone_number,
      address: rows[0].address,
      register_date: rows[0].register_date,
      pets: rows
        .map((row) => {
          return {
            pet_id: row.pet_id,
            name: row.pet_name,
            age: row.pet_age,
            species: row.species,
            register_date: row.pet_register_date,
          };
        })
        .filter((pet) => pet.pet_id != null), // This filters out any null entries in case there are no pets
    };
    return ownerData;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

async function addOneOwner(name, age, phone_number, address) {
  const register_date = new Date().toLocaleDateString();
  try {
    await db.run(
      `INSERT INTO owners (name, age, phone_number, address, register_date) VALUES (?, ?, ?, ?, ?)`,
      [name, age, phone_number, address, register_date]
    );
    const id = this.lastID;
    const owner = await getOneOwner(id);
    return owner;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function deleteOneOwner(id) {
  try {
    const owner = await getOwnerWithPets(id);
    await db.run(`DELETE FROM pets WHERE owner_id = ?`, [id]);
    await db.run(`DELETE FROM owners WHERE owner_id = ?`, [id]);

    return owner;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

async function updateOneOwner(updatedOwner) {
  try {
    await db.run(
      `UPDATE owners SET name = ?, age = ?, phone_number = ?, address = ?, register_date = ? WHERE owner_id = ?`,
      [
        updatedOwner.name,
        updatedOwner.age,
        updatedOwner.phone_number,
        updatedOwner.address,
        updatedOwner.register_date,
        updatedOwner.owner_id,
      ]
    );
    return updatedOwner;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  getOwners,
  getOneOwner,
  getOwnerWithPets,
  addOneOwner,
  deleteOneOwner,
  updateOneOwner,
};
