const getSearchPage = (req, res) => {
  res.render("search", { title: "Search", clientCode: "searchFunction.js" });
};

module.exports = {
  getSearchPage,
};
