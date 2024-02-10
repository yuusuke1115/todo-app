const router = require("express").Router();
const pool = require("../config/db");

router.get("/", (_, res) => {
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

router.post("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    };
    connection.query("INSERT INTO task VALUES (null, ?)", req.body.task, (err) => {
      connection.release();
      if (!err) {
        res.redirect("/home");
      };
    });
  });
});

router.get("/task/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    };
    connection.query("SELECT name FROM task WHERE id = ?", req.params.id, (err, name) => {
      connection.release();
      if (!err) {
        res.send(name);
      };
    });
  });
});

module.exports = router;
