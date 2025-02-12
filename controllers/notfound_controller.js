/**
 * Handles GET requests to the root path.
 * Renders the "notfound" view when the page is not found.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const renderNotFoundPage = async (req, res) => {
  res.render("notfound", {});
};

module.exports = { renderNotFoundPage };
