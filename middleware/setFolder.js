const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");

module.exports = asyncHandler(async (req, res, next) => {
  const folder = await queries.getFolderById(req.params.folderId);
  req.folder = folder;
  res.locals.folderId = req.folder.id;
  next();
});
