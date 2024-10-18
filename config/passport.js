const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const queries = require("../db/queries");
const bcrypt = require("bcrypt");

const filedOptions = {
  usernameField: "email",
};

const validationFunction = async (email, password, done) => {
  try {
    const user = await queries.getUserByEmail(email);

    if (!user) {
      return done(null, false, { message: "Invalid email or password" });
    }

    const match = bcrypt.compareSync(password, user.password);

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
    const user = queries.getUserById(done);
  } catch (err) {
    done(err);
  }
});
