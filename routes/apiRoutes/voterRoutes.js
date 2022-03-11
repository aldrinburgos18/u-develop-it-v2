const router = require("express").Router();
const db = require("../../db/database");

const inputCheck = require("../../utils/inputCheck");

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

router.get("/voters/:id", (req, res) => {
  const sql = `SELECT * FROM voters WHERE id = ?`;
  const params = [req.params.id];

  db.get(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

module.exports = router;
