const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const app = express();
require("dotenv");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

require("./config/passport");

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14,
    },
  })
);
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("<h1>Hello pretty</h1>");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Express app listening on port: ${PORT}`));
