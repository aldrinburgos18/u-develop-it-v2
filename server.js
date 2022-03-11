const db = require("./db/database");
const apiRoutes = require("./routes/apiRoutes");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", apiRoutes);

//turn on foreign key constraint
db.get("PRAGMA foreign_keys = ON");

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
