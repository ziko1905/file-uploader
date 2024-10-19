const asyncHandler = require("express-async-handler");
const multer = require("multer");
const path = require("node:path");
const upload = multer({ dest: path.join(__dirname, "media") });
const convertFilename = require("../utils/convertFilename");
const getFileExtension = require("../utils/getFileExtension");

function uploadFileGet(req, res) {
  res.render("uploadFile");
}

const uploadFilePost = [
  upload.single("file"),
  asyncHandler(async (req, res) => {
    console.log(req.file);
    console.log(req.body);
    fs.writeFile(req.file.destination);
    await queries.uploadFile(req.file.originalname);

    res.redirect("/");
  }),
];

module.exports = {
  uploadFileGet,
  uploadFilePost,
};
