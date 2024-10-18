const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userDb = require("../db/userDb");
const bcrypt = require("bcrypt");

const filedOptions = {
  usernameField: "email",
};

const validationFunction = async (email, password, done) => {
  try {
    const user = await userDb.getByEmail(email);

    if (!user) {
      return done(null, false, { message: "Invalid email or password" });
    }

    const match = bcrypt.compareSync(user.password, password);

    if (!match) {
      return done(null, false, { message: "Invalid email or password" });
    }

    done(null, user);
  } catch (err) {
    done(err);
  }
};

const strategy = new LocalStrategy(filedOptions, validationFunction);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = userDb.getById(done);
  } catch (err) {
    done(err);
  }
});
