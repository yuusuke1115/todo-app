const router = require("express").Router();
const pool = require("../config/db");

router.get("/", (_, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    };
    connection.query("SELECT * FROM task", (err, tasks) => {
      connection.release();
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
    connection.query("SELECT id, name FROM task WHERE id = ?", req.params.id, (err, task) => {
      connection.release();
      if (!err) {
        res.render("task", {task: task});
      };
    });
  });
});

router.post("/task/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    };
    connection.query("UPDATE task SET name = ? WHERE id = ?", [req.body.task, req.params.id], (err) => {
      connection.release();
      if (!err) {
        res.redirect("/home");
      };
    });
  });
});

module.exports = router;
