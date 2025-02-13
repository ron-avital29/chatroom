/**
 * Renders the 404 page
 * @param {*} req
 * @param {*} res
 */
const renderNotFoundPage = (req, res) => {
  res.render("notfound", { title: "404 - Page Not Found" });
};

module.exports = { renderNotFoundPage };
