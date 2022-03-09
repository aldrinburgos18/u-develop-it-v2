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
