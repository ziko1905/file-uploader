const { Router } = require("express");
const router = new Router();
const authController = require("../controllers/authController");
const isNotAuthenticated = require("../middleware/isNotAuth");
const passport = require("passport");

router.get("/signup", isNotAuthenticated, authController.signupGet);
// router.get("/login");
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
// router.post("/login");
// router.post("/logout");

module.exports = router;
