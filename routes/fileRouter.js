const { Router } = require("express");
const fileController = require("../controllers/fileController");
const isAuth = require("../middleware/isAuth");
const router = new Router();

router.get("/upload", isAuth, fileController.uploadFileGet);
router.post("/upload", isAuth, fileController.uploadFilePost);

module.exports = router;
