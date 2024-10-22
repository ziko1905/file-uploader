const { Router } = require("express");
const isAuth = require("../middleware/isAuth");
const { isFolderOwner } = require("../middleware/isOwner");
const router = new Router();
const folderController = require("../controllers/folderController");
const setFolder = require("../middleware/setFolder");
const { homepageGet } = require("../controllers/mainController");

router.get(
  "/:folderId/make-folder",
  isAuth,
  setFolder,
  folderController.makeFolderGet
);
router.post("/:folderId/make-folder", isAuth, folderController.makeFolderPost);
router.get(
  "/folder/:folderId/details",
  isAuth,
  isFolderOwner,
  setFolder,
  folderController.detailsGet
);
router.post(
  "/folder/:folderId/details",
  isAuth,
  isFolderOwner,
  folderController.detailsPost
);
router.get(
  "/folder/:folderId/delete",
  isAuth,
  isFolderOwner,
  setFolder,
  folderController.deleteGet
);
router.get("/folder/:folderId", isAuth, isFolderOwner, setFolder, homepageGet);

module.exports = router;
