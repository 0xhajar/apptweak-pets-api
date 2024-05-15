const { v4: uuidv4 } = require("uuid");
const db = require("./db_conf");

function getOwners() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM owners`,
      (err, rows) => {
        if (err) {
          console.error(err.message);
        }
        const owners = rows.map(row => row);
        resolve(owners);
      }
    );
    });
}

module.exports = {
  getOwners,
};
