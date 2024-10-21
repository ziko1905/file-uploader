const asyncHandler = require("express-async-handler");
const multer = require("multer");
const path = require("node:path");
const upload = multer({ dest: path.join(__dirname, "../media/") });
const convertFilename = require("../utils/convertFilename");
const getFileExtension = require("../utils/getFileExtension");
const queries = require("../db/queries");

function uploadFileGet(req, res) {
  res.render("uploadFile");
}

const uploadFilePost = [
  upload.single("file"),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.redirect(req.originalUrl);
    }
    await queries.addFileToFolder(
      req.params.folderId,
      convertFilename(req.file.originalname),
      getFileExtension(req.file.originalname),
      req.file.size
    );

    return res.redirect("/");
  }),
];

const detailsGet = asyncHandler(async (req, res) => {
  res.locals.file = await queries.getFileById(req.params.fileId);
  res.render("fileDetails");
});

const detailsPost = asyncHandler(async (req, res) => {
  await queries.updateFile(req.params.fileId, req.body.name);
  res.redirect(req.originalUrl);
});

const deleteGet = asyncHandler(async (req, res) => {
  await queries.deleteFile(req.params.fileId);
  res.redirect("/");
});

module.exports = {
  uploadFileGet,
  uploadFilePost,
  detailsGet,
  detailsPost,
  deleteGet,
};
