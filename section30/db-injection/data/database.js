const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  database: "security",
  user: "root",
  password: "a1096a1096",
  //multipleStatements: true,
  multipleStatements: false,
});

module.exports = pool;
