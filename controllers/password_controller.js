const { Contact } = require("../models/contact");
const bcrypt = require("bcrypt");
const { emailAlreadyInDataBase } = require("./utils");
const saltRounds = 10;

const getPasswordPage = (req, res) => {
  // logic can be improved here
  let det = req.flash("det")[0];
  det = det ? JSON.parse(det) : {};
  res.render("registerPassword", { title: "choose a password", det: det, messages: req.flash() });
};

const postPasswordPage = async (req, res) => {
  try {
    const { password1, password2 } = req.body;

    if (password1.trim() !== password2.trim()) {
      req.flash("det", JSON.stringify({ pas1: password1, pas2: password2 }));
      req.flash("error", "Passwords do not match!");
      return res.redirect("/newUser/choosePassword");
    }

    const userDetails = req.cookies.userDetails ? JSON.parse(req.cookies.userDetails) : null;

    const hashedPassword = await bcrypt.hash(password1.trim(), saltRounds);
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
