const { verified } = require("./utils");

/**
 * Handles GET requests to the login page.
 * Redirects to the chatroom if the user is already logged in.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const getLoginPage = (req, res) => {
  res.render("login", { title:"Login", messages: req.flash() });
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
