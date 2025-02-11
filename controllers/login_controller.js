const bcrypt = require("bcrypt");
const { Contact } = require("../models/contact");

const saltRounds = 10;

const getLoginPage = (req, res) => {
  res.render("login", { title: "Login" });
};

module.exports = {
  getLoginPage,
};
