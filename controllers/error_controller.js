const getErrorPage = (req, res) => {
  res.render("error", { title: "Error!" });
};

module.exports = {
  getErrorPage,
};
