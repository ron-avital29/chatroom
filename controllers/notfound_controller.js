const renderNotFoundPage = (req, res) => {
  res.render("notfound", {title: "404 - Page Not Found"});
};

module.exports = { renderNotFoundPage };
