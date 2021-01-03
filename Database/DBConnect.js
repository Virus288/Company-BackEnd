const mysql = require("mysql");
require("dotenv").config()

const con = mysql.createConnection({
    host: process.env.DBHost,
    user: process.env.DBUser,
    password: process.env.DBPassword,
    database: process.env.DBBase
  });

module.exports = {con}