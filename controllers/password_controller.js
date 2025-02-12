const getPasswordPage = (req, res) => {
  let det = req.flash("det")[0];
  det = det ? JSON.parse(det) : {};
  res.render("registerPassword", { det: det, messages: req.flash() });
};

const postPasswordPage = (req, res) => {
  const { password1, password2 } = req.body;

  console.log(password1, " - ", password2);

  if (password1 !== password2) {
    req.flash("det", JSON.stringify({ pas1: password1, pas2: password2 }));
    req.flash("error", "Passwords does not match!");
    res.redirect("/newUser/choosePassword");
  } else {
    req.flash("error", "Registration successful🎉");
    req.flash("color", "text-success");
    res.redirect("/login");
  }
};

module.exports = {
  getPasswordPage,
  postPasswordPage,
};
