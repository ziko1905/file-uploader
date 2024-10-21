const { Router } = require("express");
const fileController = require("../controllers/fileController");
const isAuth = require("../middleware/isAuth");
const router = new Router();
const { isFileOwner } = require("../middleware/isOwner");

router.get("/:fileId/upload", isAuth, fileController.uploadFileGet);
router.post("/:fileId/upload", isAuth, fileController.uploadFilePost);
router.get(
  "/file/:fileId/details",
  isAuth,
  isFileOwner,
  fileController.detailsGet
);
router.post(
  "/file/:fileId/details",
  isAuth,
  isFileOwner,
  fileController.detailsPost
);
router.get(
  "/file/:fileId/delete",
  isAuth,
  isFileOwner,
  fileController.deleteGet
);

module.exports = router;
