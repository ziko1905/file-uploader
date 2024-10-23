const { v2 } = require("cloudinary");
const asyncHandler = require("express-async-handler");
require("dotenv").config();

v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

module.exports.uploadFile = asyncHandler(async function (req, res, next) {
  if (!req.file) {
    return res.redirect(req.originalUrl);
  }
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  req.file.url = await v2.uploader
    .upload(dataURI, { resource_type: "auto" })
    .catch((err) => next(err));
  next();
});
