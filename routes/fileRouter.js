const { Router } = require("express");
const fileController = require("../controllers/fileController");
const isAuth = require("../middleware/isAuth");
const router = new Router();

router.get("/:folderId/upload", isAuth, fileController.uploadFileGet);
router.post("/:folderId/upload", isAuth, fileController.uploadFilePost);

module.exports = router;
