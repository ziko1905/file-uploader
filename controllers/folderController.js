const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");

function makeFolderGet(req, res) {
  res.render("makeFolder");
}

const makeFolderPost = asyncHandler(async (req, res) => {
  await queries.makeFolder(
    req.params.folderId,
    req.body.folderName,
    req.user.id
  );

  res.redirect("/");
});

const detailsGet = asyncHandler(async (req, res) => {
  res.locals.folder = await queries.getFolderById(req.params.folderId);
  res.render("folderDetails");
});

const detailsPost = asyncHandler(async (req, res) => {
  await queries.updateFolder(req.params.folderId, req.body.name);
  res.redirect(req.originalUrl);
});

const deleteGet = asyncHandler(async (req, res) => {
  await queries.deleteFolder(req.params.folderId);
  res.redirect("/");
});

module.exports = {
  makeFolderGet,
  makeFolderPost,
  detailsGet,
  detailsPost,
  deleteGet,
};
