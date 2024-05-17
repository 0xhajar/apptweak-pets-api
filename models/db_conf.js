const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const dbPath = path.resolve(process.env.DB_PATH);
const dbExists = fs.existsSync(dbPath);

let db;
if (!dbExists) {
  // Create a new database file and open a database in it.
  db = new sqlite3.Database(dbPath);

  // Read the SQL file
  const scriptSql = fs.readFileSync(path.resolve(__dirname, 'script.sql'), 'utf8');

  // Execute the SQL script
  db.exec(scriptSql, (err) => {
    if (err) {
      throw err;
    }
  });
} else {
  // Open the existing database
  db = new sqlite3.Database(dbPath);
}

module.exports = db;