const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");

const homepageGet = asyncHandler(async (req, res) => {
  res.render("index");
});

module.exports = {
  homepageGet,
};
