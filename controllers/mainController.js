const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");

const homepageGet = asyncHandler(async (req, res) => {
  const children = await queries.getChildren(req.folder.id);
  res.render("index", { title: req.folder.name, files: children });
});

module.exports = {
  homepageGet,
};
