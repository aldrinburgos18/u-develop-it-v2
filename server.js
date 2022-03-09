const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//catch all response(not found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
