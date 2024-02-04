const express = require("express");
const app = express();
const PORT = 3000;

const todos = [];

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home", {todos: todos});
})

app.listen(PORT, () => {
  console.log("server is running!")
});
