const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");

const homepageGet = asyncHandler(async (req, res) => {
  if (req.user) {
    const children = await queries.getChildren(req.folder.id);
    return res.render("index", {
      title: req.folder.name,
      files: children,
      includeType: req.originalUrl == "/",
    });
  }
  res.render("index", { title: "File Uploader" });
});

module.exports = {
  homepageGet,
};
