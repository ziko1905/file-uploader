const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");

const homepageGet = asyncHandler(async (req, res) => {
  console.log(
    await queries.getChildren(res.locals.folderId),
    "OVER HERE",
    res.locals.folderId
  );
  res.render("index");
});

module.exports = {
  homepageGet,
};
