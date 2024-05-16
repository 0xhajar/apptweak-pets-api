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
    db.get(`SELECT * FROM pets WHERE pet_id = ?`, [id], (err, row) => {
      if (err) {
        console.error(err.message);
      }
      resolve(row);
    });
  });
}

function addOnePet(name, age, species, owner_id) {
  return new Promise((resolve, reject) => {
    const register_date = new Date().toISOString().split("T")[0];
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

module.exports = {
  getPets,
  getOnePet,
  addOnePet,
};
