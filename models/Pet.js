const db = require("./db_conf");

function getPets() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM pets`, (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      const pets = rows.map((row) => row);
      resolve(pets);
    });
  });
}

function getOnePet(id) {
  return new Promise((resolve, reject) => {
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
}

function getOnePetWithOwner(id) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT p.pet_id, p.name AS pet_name, p.age AS pet_age, p.species, p.register_date AS pet_register_date, 
             o.owner_id, o.name AS owner_name, o.age AS owner_age, o.phone_number, o.address, o.register_date AS owner_register_date
      FROM pets p
      LEFT JOIN owners o ON p.owner_id = o.owner_id
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
}

function addOnePet(name, age, species, owner_id) {
  return new Promise((resolve, reject) => {
    const register_date = new Date().toLocaleDateString();
    db.run(
      `INSERT INTO pets (name, age, species, register_date, owner_id) VALUES (?, ?, ?, ?, ?)`,
      [name, age, species, register_date, owner_id],
      function (err) {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          const id = this.lastID;
          db.get(`SELECT * FROM pets WHERE pet_id = ?`, [id], (err, row) => {
            if (err) {
              console.error(err.message);
              reject(err);
            } else {
              resolve(row);
            }
          });
        }
      }
    );
  });
}

function deleteOnePet(id) {
  return new Promise((resolve, reject) => {
    getOnePet(id)
      .then((pet) => {
        if (!pet) {
          return reject(new Error("Pet not found"));
        }

        db.run(`DELETE FROM pets WHERE pet_id = ?`, [id], function (err) {
          if (err) {
            console.error(err.message);
            return reject(err);
          }

          resolve(pet);
        });
      })
      .catch(reject);
  });
}

function updatedPet(updatedPet) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE pets SET name = ?, age = ?, species = ?, register_date = ?, owner_id = ? WHERE pet_id = ?`,
      [
        updatedPet.name,
        updatedPet.age,
        updatedPet.species,
        updatedPet.register_date,
        updatedPet.owner_id,
        updatedPet.id,
      ],
      function (err) {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(updatedPet);
        }
      }
    );
  });
}

module.exports = {
  getPets,
  getOnePet,
  getOnePetWithOwner,
  addOnePet,
  deleteOnePet,
  updatedPet,
};
