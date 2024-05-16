const config = require('../config.js');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(config.dbPath);

module.exports = db;