const express = require("express");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");
const path = require("path");
const app = express();
const indexRouter = require("./routes/indexRouter");
const authRouter = require("./routes/authRouter");
const fileRouter = require("./routes/fileRouter");
const queries = require("./db/queries");
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
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(passport.session());

app.use(async (req, res, next) => {
  res.locals.user = req.user;
  if (req.user) {
    req.folder = await queries.getMainFolder(req.user.id);
    res.locals.folderId = req.folder.id;
  }
  next();
});

app.use(indexRouter);
app.use(authRouter);
app.use(fileRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.send("An error occurred on server side");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Express app listening on port: ${PORT}`));
