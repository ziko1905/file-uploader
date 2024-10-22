const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");

module.exports.isFileOwner = asyncHandler(async (req, res, next) => {
  if (await queries.checkFileOwner(req.params.fileId, req.user.id)) {
    return next();
  }
  res.redirect("/");
});

module.exports.isFolderOwner = asyncHandler(async (req, res, next) => {
  if (await queries.checkFolderOwner(req.params.folderId, req.user.id)) {
    return next();
  }
  res.redirect("/");
});
