const asyncHandler = require("express-async-handler");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const cloud = require("../middleware/cloud");
const convertFilename = require("../utils/convertFilename");
const getFileExtension = require("../utils/getFileExtension");
const queries = require("../db/queries");
const https = require("node:https");

function uploadFileGet(req, res) {
  res.render("uploadFile");
}

const uploadFilePost = [
  upload.single("file"),
  cloud.uploadFile,
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.redirect(req.originalUrl);
    }
    await queries.addFileToFolder(
      req.params.folderId,
      convertFilename(req.file.originalname),
      getFileExtension(req.file.originalname),
      req.file.size,
      req.file.url.secure_url
    );

    return res.redirect(`/folder/${req.params.folderId}`);
  }),
];

const detailsGet = asyncHandler(async (req, res) => {
  res.locals.file = await queries.getFileById(req.params.fileId);
  res.render("fileDetails", { postUrl: req.originalUrl });
});

const detailsPost = asyncHandler(async (req, res) => {
  await queries.updateFile(req.params.fileId, req.body.name);
  res.redirect(req.originalUrl);
});

const downloadGet = asyncHandler(async (req, res) => {
  const fileQ = await queries.getFileById(req.params.fileId);
  https.get(fileQ.url, (file) => {
    res.set(
      "Content-disposition",
      "attachment; filename=" + encodeURI(fileQ.name + fileQ.extension)
    );
    res.set("Content-Type", "text/plain");
    file.pipe(res);
  });
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
  downloadGet,
};
