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

module.exports = {
  getPets,
};
