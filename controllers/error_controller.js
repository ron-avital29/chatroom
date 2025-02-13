/**
 * Controller for rendering the error page
 * @param {*} req
 * @param {*} res
 */
const getErrorPage = (req, res) => {
  res.render("error", { title: "Error!" });
};

module.exports = {
  getErrorPage,
};
