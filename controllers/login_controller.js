const { verified } = require("./utils");

const getLoginPage = (req, res) => {
  res.render("login", { title: "Login", messages: req.flash() });
};

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
    res.redirect("/login"); //we need to make an error page to redirect to - do we? we get here when trying to manipulate the frontend name len validation (by makin it 1 instead of 3 e.g)
  }
};

module.exports = {
  getLoginPage,
  postLoginPage,
};
