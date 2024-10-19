function homepageGet(req, res) {
  console.log(req.user, "USER");
  res.render("index");
}

module.exports = {
  homepageGet,
};
