const { Contact } = require("../models/contact");
const bcrypt = require("bcrypt");
const { emailAlreadyInDataBase } = require("./utils");
const saltRounds = 10;

const getPasswordPage = (req, res) => {
  let det = req.flash("det")[0];
  det = det ? JSON.parse(det) : {};
  res.render("registerPassword", { title: "choose a password", det: det, messages: req.flash() });
};

const postPasswordPage = async (req, res) => {
  try {
    const { password1, password2 } = req.body;

    const trimmedPassword1 = password1?.trim();
    const trimmedPassword2 = password2?.trim();

    if (!trimmedPassword1 || !trimmedPassword2) {
      req.flash("det", JSON.stringify({ pas1: password1, pas2: password2 }));
      req.flash("error", "Password fields cannot be empty!");
      return res.redirect("/newUser/choosePassword");
    }

    if (password1 !== password2) {
      req.flash("det", JSON.stringify({ pas1: password1, pas2: password2 }));
      req.flash("error", "Passwords do not match!");
      return res.redirect("/newUser/choosePassword");
    }

    if (trimmedPassword1.length < 3 || trimmedPassword2.length > 32) {
      req.flash("det", JSON.stringify({ pas1: password1, pas2: password2 }));
      req.flash("error", "Password must be at least between 3 to 32 chars long!");
      return res.redirect("/newUser/choosePassword");
    }

    const userDetails = req.cookies.userDetails ? JSON.parse(req.cookies.userDetails) : null;
    const hashedPassword = await bcrypt.hash(trimmedPassword1, saltRounds);
    const newUser = {
      email: userDetails.email.trim().toLowerCase(),
      firstName: userDetails.firstName.trim(),
      lastName: userDetails.lastName.trim(),
      password: hashedPassword,
      profilePicSrc: "/images/bear.png",
    };

    if (await emailAlreadyInDataBase(newUser.email)) {
      req.flash("error", "Email already exists, do you have an account?");
      return res.redirect("/newUser/register");
    }

    await Contact.create(newUser);
    res.clearCookie("userDetails");
    req.flash("error", "Registration successful🎉");
    req.flash("color", "text-success");
    res.redirect("/login");
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Something went wrong. Please try again.");
    res.redirect("/newUser/choosePassword");
  }
};

module.exports = {
  getPasswordPage,
  postPasswordPage,
};
