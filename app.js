"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;
const homeRouter = require("./routes/home.js");

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/home", homeRouter);

app.listen(PORT, () => {
  console.log("server is running!")
});
