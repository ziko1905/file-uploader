const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");

function makeFolderGet(req, res) {
  res.render("makeFolder");
}

const makeFolderPost = asyncHandler(async (req, res) => {
  await queries.makeFolder(
    +req.params.folderId,
    req.body.folderName,
    req.user.id
  );

  res.redirect("/");
});

module.exports = {
  makeFolderGet,
  makeFolderPost,
};
