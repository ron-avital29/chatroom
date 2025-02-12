const { Contact } = require("../models/contact");
const REGISTER = 30;

//maybe have it in a different file -utils
const emailAlreadyInDataBase = async (email) => {
  const user = await Contact.findOne({ where: { email } });
  return user !== null;
};

const getRegisterPage = (req, res) => {
  const userDetailsCookie = req.cookies.userDetails ? JSON.parse(req.cookies.userDetails) : {};
  res.render("registerEmail", { messages: req.flash(), det: userDetailsCookie });
};

const postRegisterPage = async (req, res) => {
  const { email, firstName, lastName } = req.body;
  const userDetails = {
    lastVisit: new Date().toISOString(),
    email,
    firstName,
    lastName,
  };

  res.cookie("userDetails", JSON.stringify(userDetails), { maxAge: REGISTER * 1000 });
  if (await emailAlreadyInDataBase(email)) {
    req.flash("error", "Email already exists, do you have an account?");
    res.redirect("/newUser/register");
  } else {
    res.redirect("/newUser/choosePassword");
  }
};

module.exports = {
  getRegisterPage,
  postRegisterPage,
};
