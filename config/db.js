const mysql = require("mysql");

require("dotenv").config();
const pool = mysql.createPool({
  connectionLimit: process.env.CONNECTION_LIMIT, 
  host: process.env.HOST, 
  user: process.env.USER, 
  password: process.env.PASSWORD, 
  database: process.env.DATABASE, 
  port: process.env.PORT, 
});

module.exports = pool;
