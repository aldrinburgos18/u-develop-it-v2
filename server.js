const sqlite3 = require("sqlite3").verbose();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = new sqlite3.Database("./db/election.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the election database");
});

db.all(`SELECT * FROM candidates`, (err, rows) => {
  console.log(rows);
});

//GET a single candidate
db.get(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
  if (err) {
    console.log(err);
  }
  console.log(row);
});

//DELETE a candidate
db.run(`DELETE FROM candidates WHERE id = ?`, 1, function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log(result, this, this.changes);
});

//Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
             VALUES (?,?,?,?)`;
const params = [1, "Ronald", "Firbank", 1];
db.run(sql, params, function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log(result, this.lastID);
});

//catch all response(not found)
app.use((req, res) => {
  res.status(404).end();
});

//start server after DB connection
db.on("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
