const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

connection.connect(err => {
  let msg = !err ? "Connected" : "Connection failed";
  console.log(`MySQL: ${msg}`);
});

module.exports= connection;