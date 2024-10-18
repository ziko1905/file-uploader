const { Router } = require("express");
const router = new Router();
const authController = require("../controllers/authController");
const isNotAuthenticated = require("../middleware/isNotAuth");

router.get("/signup", isNotAuthenticated, authController.signupGet);
// router.get("/login");
// router.get("/logout");
router.post("/signup");
// router.post("/login");
// router.post("/logout");

module.exports = router;
