const { Router } = require("express");
const mainController = require("../controllers/mainController");

const router = new Router();

router.get("/", mainController.homepageGet);

module.exports = router;
