const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect(err => {
  let msg = !err ? "Connected" : "Connection failed";
  console.log(`MySQL: ${msg}`);
});

module.exports= connection;