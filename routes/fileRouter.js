const { Router } = require("express");
const fileController = require("../controllers/fileController");
const isAuth = require("../middleware/isAuth");
const router = new Router();
const { isFileOwner, isFolderOwner } = require("../middleware/isOwner");
const setFolder = require("../middleware/setFolder");

// First param is not file id, it represents folder of insertion
router.get(
  "/:folderId/upload",
  isAuth,
  isFolderOwner,
  setFolder,
  fileController.uploadFileGet
);
router.post(
  "/:folderId/upload",
  isAuth,
  isFolderOwner,
  setFolder,
  fileController.uploadFilePost
);
router.get(
  "/file/:fileId/delete",
  isAuth,
  isFileOwner,
  fileController.deleteGet
);
router.get(
  "/file/:fileId",
  isAuth,
  isFileOwner,
  setFolder,
  fileController.detailsGet
);
router.post("/file/:fileId", isAuth, isFileOwner, fileController.detailsPost);
module.exports = router;
