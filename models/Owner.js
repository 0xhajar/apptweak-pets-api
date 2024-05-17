const db = require("./db_conf");

function getOwners() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM owners`, (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      const owners = rows.map((row) => row);
      resolve(owners);
    });
  });
}

function getOneOwner(id) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM owners WHERE owner_id = ?`, [id], (err, row) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function getOwnerWithPets(id) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT o.owner_id, o.name, o.age, o.phone_number, o.address, o.register_date, 
             p.pet_id, p.name AS pet_name, p.age AS pet_age, p.species, p.register_date AS pet_register_date
      FROM owners o
      LEFT JOIN pets p ON o.owner_id = p.owner_id
      WHERE o.owner_id = ?`;

    db.all(sql, [id], (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        if (rows.length === 0) {
          resolve(null); // No owner found
        } else {
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
          resolve(ownerData);
        }
      }
    });
  });
}

function addOneOwner(name, age, phone_number, address) {
  return new Promise((resolve, reject) => {
    const register_date = new Date().toLocaleDateString();
    db.run(
      `INSERT INTO owners (name, age, phone_number, address, register_date) VALUES (?, ?, ?, ?, ?)`,
      [name, age, phone_number, address, register_date],
      function (err) {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          const id = this.lastID;
          getOneOwner(id).then((owner) => {
            resolve(owner);
          });
        }
      }
    );
  });
}

function deleteOneOwner(id) {
  return new Promise((resolve, reject) => {
        db.run(`DELETE FROM pets WHERE owner_id = ?`, [id], function (err) {
          if (err) {
            console.error(err.message);
            return reject(err);
          }

          db.run(`DELETE FROM owners WHERE owner_id = ?`, [id], function (err) {
            if (err) {
              console.error(err.message);
              return reject(err);
            }

            resolve(ownerData);
          });
        });
      })
      .catch(reject);
}

function updateOneOwner(updatedOwner) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE owners SET name = ?, age = ?, phone_number = ?, address = ?, register_date = ? WHERE owner_id = ?`,
      [
        updatedOwner.name,
        updatedOwner.age,
        updatedOwner.phone_number,
        updatedOwner.address,
        updatedOwner.register_date,
        updatedOwner.owner_id,
      ],
      function (err) {
        if (err) {
          console.error(err.message);
          return reject(err);
        }
        resolve(updatedOwner);
      }
    );
  });
}

module.exports = {
  getOwners,
  getOneOwner,
  getOwnerWithPets,
  addOneOwner,
  deleteOneOwner,
  updateOneOwner,
};
