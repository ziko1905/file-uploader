const { Router } = require("express");
const router = new Router();
const authController = require("../controllers/authController");
const isNotAuthenticated = require("../middleware/isNotAuth");
const passport = require("passport");

router.get("/signup", isNotAuthenticated, authController.signupGet);
router.get("/login", isNotAuthenticated, authController.loginGet);
// router.get("/logout");
router.post(
  "/signup",
  isNotAuthenticated,
  authController.signupPost,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signup",
  })
);
router.post("/login", isNotAuthenticated, authController.loginPost);
// router.post("/logout");

module.exports = router;
