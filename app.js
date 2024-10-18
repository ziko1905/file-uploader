const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const app = express();
const authRouter = require("./routes/authRouter");
require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

require("./config/passport");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
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

app.use(authRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.send("An error occurred on server side");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Express app listening on port: ${PORT}`));
