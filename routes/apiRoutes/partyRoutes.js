const router = require("express").Router();
const db = require("../../db/database");

//get all parties
router.get("/parties", (req, res) => {
  const sql = `SELECT * FROM parties`;
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: "success",
      data: rows,
    });
  });
});

//get a single party
router.get("/parties/:id", (req, res) => {
  const sql = `SELECT * FROM parties WHERE id = ?`;
  db.get(sql, req.params.id, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "Success",
      data: row || "Party does not exist.",
    });
  });
});

//delete a party
router.delete("/parties/:id", (req, res) => {
  const sql = `DELETE FROM parties WHERE id = ?`;
  db.run(sql, req.params.id, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "Party deleted successfully.", changes: this.changes });
  });
});

module.exports = router;
