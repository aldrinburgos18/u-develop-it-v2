const router = require("express").Router();
const db = require("../../db/database");

const inputCheck = require("../../utils/inputCheck");

//get all voters
router.get("/voters", (req, res) => {
  const sql = `SELECT * FROM voters ORDER BY last_name`;
  const params = [];

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "Success",
      data: rows,
    });
  });
});

//get a single voter
router.get("/voters/:id", (req, res) => {
  const sql = `SELECT * FROM voters WHERE id = ?`;

  db.get(sql, req.params.id, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Success",
      data: rows || "Voter does not exist.",
    });
  });
});

//add a voter
router.post("/voters/", ({ body }, res) => {
  const errors = inputCheck(body, "first_name", "last_name", "email");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO voters (first_name, last_name, email)
                 VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.email];

  db.run(sql, params, function (err, data) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Voter created successfully.",
      data: body,
      id: this.lastID,
    });
  });
});

//update a voter's email
router.put("/voters/:id", (req, res) => {
  const errors = inputCheck(req.body, "email");
  if (errors) {
    res.status(400).json({ error: err.errors });
    return;
  }

  const sql = `UPDATE voters SET email = ? WHERE id = ?`;
  const params = [req.body.email, req.body.id];
  db.run(sql, params, function (err, data) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Voter's email updated successfully.",
    });
  });
});

//delete a voter
router.delete("/voters/:id", (req, res) => {
  const sql = `DELETE FROM voters WHERE id = ?`;
  db.run(sql, req.params.id, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Voter deleted successfully.",
      changes: this.changes,
    });
  });
});

module.exports = router;
