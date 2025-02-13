const { verified } = require("./utils");

/**
 * Renders the login page.
 * @param {*} req
 * @param {*} res
 */
const getLoginPage = (req, res) => {
  res.render("login", { title: "Login", messages: req.flash() });
};

/**
 * Handles the login post request.
 * @param {*} req
 * @param {*} res
 */
const postLoginPage = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim().toLowerCase();
    password = password.trim();
    const user = await verified(email, password);

    if (user) {
      req.session.email = user.email;
      req.session.userId = user.id;
      res.redirect("/chatroom/chat");
    } else {
      req.flash("error", "Invalid email or password");
      req.flash("color", "text-danger");
      res.redirect("/login");
    }
  } catch (error) {
    console.error("Error during login:", error);
    req.flash("error", "Something went wrong. Please try again.");
    req.flash("color", "text-danger");
    res.redirect("/login");
  }
};

module.exports = {
  getLoginPage,
  postLoginPage,
};
