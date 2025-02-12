const { Contact } = require("../models/contact");
const bcrypt = require("bcrypt");

//maybe have it in a different file -utils
const verified = async (email, password) => {
  const user = await Contact.findOne({ where: { email } });
  if (!user) {
    console.log("User not found");
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    return user;
  } else {
    return null;
  }
};

/**
 * Handles GET requests to the login page.
 * Redirects to the chatroom if the user is already logged in.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const getLoginPage = (req, res) => {
  res.render("login", { messages: req.flash() });
};

const postLoginPage = async (req, res) => {
  const { email, password } = req.body;
  const user = await verified(email, password);
  if (user) {
    req.session.email = user.email;
    req.session.userId = user.id;
    res.redirect("/chatroom");
  } else {
    req.flash("error", "Invalid email or password");
    req.flash("color", "text-danger");
    res.redirect("/login");
  }
};

module.exports = {
  getLoginPage,
  postLoginPage,
};
