const router = require("express").Router();
const db = require("../../db/database");

const inputCheck = require("../../utils/inputCheck");

//get all candidates
router.get("/candidates", (req, res) => {
  const sql = `SELECT candidates.*, parties.name AS party_name
                 FROM candidates
                 LEFT JOIN parties
                 ON candidates.party_id = parties.id`;
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

//get a single candidate
router.get("/candidates/:id", (req, res) => {
  const sql = `SELECT candidates.*, parties.name AS party_name
                 FROM candidates
                 LEFT JOIN parties
                 ON candidates.party_id = parties.id
                 WHERE candidates.id = ?`;
  db.get(sql, req.params.id, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: "Success",
      data: row || "Candidate does not exist.",
    });
  });
});

//delete a candidate
router.delete("/candidates/:id", (req, res) => {
  const sql = `DELETE FROM candidates WHERE id =?`;
  db.run(sql, req.params.id, function (err, result) {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }

    res.json({
      message: "Candidate deleted successfully.",
      changes: this.changes,
    });
  });
});

//create a candidate
router.post("/candidates", ({ body }, res) => {
  const errors = inputCheck(
    body,
    "first_name",
    "last_name",
    "industry_connected"
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
                  VALUES (?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Candidate created successfully.",
      data: body,
      id: this.lastID,
    });
  });
});

//update a candidate's party
router.put("/candidates/:id", (req, res) => {
  const errors = inputCheck(req.body, "party_id");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `UPDATE candidates SET party_id = ?
                 WHERE id = ?`;
  const params = [req.body.party_id, req.params.id];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: "Candidate's party updated successfully.",
      data: req.body,
      changes: this.changes,
    });
  });
});

module.exports = router;
