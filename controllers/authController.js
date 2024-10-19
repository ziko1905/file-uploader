const { body, validationResult } = require("express-validator");
const queries = require("../db/queries");
const passport = require("passport");
const asyncHandler = require("express-async-handler");

validateUser = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isAlpha((locale = "en-US"))
    .withMessage("Please use english alphabet")
    .withMessage("First name must not contain special characters"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isAlpha((locale = "en-US"))
    .withMessage("Please use english alphabet")
    .withMessage("Last name must not contain special characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be in (example@example.com) form")
    .custom(async (value, { req }) => {
      const email = await queries.getUserByEmail(req.body.email);

      if (email) {
        throw new Error("Email is already in use");
      }
    }),
  body("password").notEmpty().withMessage("Password is required"),
  body("passwordConf")
    .notEmpty()
    .withMessage("Password confirmation is required")
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("Passwords must match");
      }
      return true;
    }),
];

function signupGet(req, res) {
  res.render("signup");
}

const signupPost = [
  validateUser,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("signup", { errors: errors.array() });
    }

    await queries.addUser(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password
    );
    next();
  }),
];

module.exports = {
  signupGet,
  signupPost,
};
