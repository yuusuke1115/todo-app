"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = 3000;

app.set("view engine", "ejs");

const pool = mysql.createPool({
  connectionLimit: process.env.CONNECTION_LIMIT, 
  host: process.env.HOST, 
  user: process.env.USER, 
  password: process.env.PASSWORD, 
  database: process.env.DATABASE, 
  port: process.env.PORT, 
});

app.get("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    };
    connection.query("SELECT * FROM task", (err, tasks) => {
      connection.release();
      console.log(tasks);
      if (!err) {
        res.render("home", {tasks: tasks});
      };
    });
  });
});

app.listen(PORT, () => {
  console.log("server is running!")
});
