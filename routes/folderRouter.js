const { Router } = require("express");
const isAuth = require("../middleware/isAuth");
const isOwner = require("../middleware/isOwner");
const router = new Router();
const folderController = require("../controllers/folderController");

router.get("/:folderId/make-folder", isAuth, folderController.makeFolderGet);
router.post("/:folderId/make-folder", isAuth, folderController.makeFolderPost);
router.get(
  "/folder/:folderId/details",
  isAuth,
  isOwner,
  folderController.detailsGet
);
router.post(
  "/folder/:folderId/details",
  isAuth,
  isOwner,
  folderController.detailsPost
);
router.get(
  "/folder/:folderId/delete",
  isAuth,
  isOwner,
  folderController.deleteGet
);

module.exports = router;
