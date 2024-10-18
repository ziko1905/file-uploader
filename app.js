const express = require("express");
const app = express();
const path = require("path");
require("dotenv");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("<h1>Hello pretty</h1>");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Express app listening on port: ${PORT}`));
