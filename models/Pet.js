const db = require("./db_conf");

async function getPets() {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM pets`, (err, rows) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    const pets = rows.map((row) => row);
    return pets;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

async function getOnePet(id) {
  try {
    const row = await new Promise((resolve, reject) => {
      const sql = `SELECT * FROM pets WHERE pet_id = ?`;
      db.get(sql, [id], (err, row) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
    return row;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

async function getOnePetWithOwner(id) {
  try {
    const row = await new Promise((resolve, reject) => {
      const sql = `
        SELECT p.pet_id, p.name AS pet_name, p.age AS pet_age, p.species, p.register_date AS pet_register_date, 
          o.owner_id, o.name AS owner_name, o.age AS owner_age, o.phone_number, o.address, o.register_date AS owner_register_date
        FROM pets p
        INNER JOIN owners o ON p.owner_id = o.owner_id
        WHERE p.pet_id = ?`;
      db.get(sql, [id], (err, row) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          if (row) {
            const petWithOwner = {
              pet_id: row.pet_id,
              name: row.pet_name,
              age: row.pet_age,
              species: row.species,
              register_date: row.pet_register_date,
              owner: {
                owner_id: row.owner_id,
                name: row.owner_name,
                age: row.owner_age,
                phone_number: row.phone_number,
                address: row.address,
                register_date: row.owner_register_date,
              },
            };
            resolve(petWithOwner);
          } else {
            resolve(null);
          }
        }
      });
    });
    return row;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

async function addOnePet(name, age, species, owner_id) {
  const register_date = new Date().toLocaleDateString();

  try {
    const id = await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO pets (name, age, species, register_date, owner_id) VALUES (?, ?, ?, ?, ?)`,
        [name, age, species, register_date, owner_id],
        function (err) {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            resolve(this.lastID);
          }
        }
      );
    });
    const pet = await getOnePet(id);
    return pet;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

async function deleteOnePet(id) {
  try {
    const pet = await getOnePet(id);
    await new Promise((resolve, reject) => {
      db.run(`DELETE FROM pets WHERE pet_id = ?`, [id], function (err) {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve();
        }
      });
    });
    return pet;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

async function updateOnePet(updatedPet) {
  try {
    await new Promise((resolve, reject) => {
      db.run(
        `UPDATE pets SET name = ?, age = ?, species = ?, register_date = ?, owner_id = ? WHERE pet_id = ?`,
        [
          updatedPet.name,
          updatedPet.age,
          updatedPet.species,
          updatedPet.register_date,
          updatedPet.owner_id,
          updatedPet.pet_id,
        ],
        function (err) {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
    return await getOnePet(updatedPet.pet_id);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

module.exports = {
  getPets,
  getOnePet,
  getOnePetWithOwner,
  addOnePet,
  deleteOnePet,
  updateOnePet,
};
