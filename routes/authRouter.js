const { Router } = require("express");
const router = new Router();
const authController = require("../controllers/authController");
const isNotAuth = require("../middleware/isNotAuth");
const isAuth = require("../middleware/isAuth");
const passport = require("passport");

router.get("/signup", isNotAuth, authController.signupGet);
router.get("/login", isNotAuth, authController.loginGet);
router.get("/logout", isAuth, authController.logoutGet);
router.post(
  "/signup",
  isNotAuth,
  authController.signupPost,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signup",
  })
);
router.post("/login", isNotAuth, authController.loginPost);

module.exports = router;
