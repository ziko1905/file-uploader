const { Router } = require("express");
const isAuth = require("../middleware/isAuth");
const router = new Router();
const folderController = require("../controllers/folderController");

router.get("/:folderId/make-folder", isAuth, folderController.makeFolderGet);
router.post("/:folderId/make-folder", isAuth, folderController.makeFolderPost);

module.exports = router;
