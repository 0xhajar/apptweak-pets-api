const { v4: uuidv4 } = require("uuid");
const db = require("./db_conf");

function getPets() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM pets`,
      (err, rows) => {
        if (err) {
          console.error(err.message);
        }
        const pets = rows.map(row => row);
        resolve(pets);
      }
    );
    });
}

function getOnePet(id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM pets WHERE pet_id = ?`,
        [id],
        (err, row) => {
          if (err) {
            console.error(err.message);
          }
          resolve(row);
        }
      );
    });
  }

module.exports = {
  getPets,
  getOnePet,
};
