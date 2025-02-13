/**
 * This function is used to render the search page.
 * @param {*} req
 * @param {*} res
 */
const getSearchPage = (req, res) => {
  res.render("search", { title: "Search", clientCode: "searchFunction.js" });
};

module.exports = {
  getSearchPage,
};
