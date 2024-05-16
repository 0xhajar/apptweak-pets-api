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
      }
      resolve(row);
    });
  });
}

function addOneOwner(name, age, phone_number, address) {
  return new Promise((resolve, reject) => {
    const register_date = new Date().toISOString().split("T")[0];
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
    db.run(`DELETE FROM owners WHERE owner_id = ?`, [id], function (err) {
      if (err) {
        console.error(err.message);
        reject(err);
      }
      resolve({ message: "Owner deleted"});
    });
  });
}

module.exports = {
  getOwners,
  getOneOwner,
  addOneOwner,
  deleteOneOwner,
};
