const { emailAlreadyInDataBase } = require("./utils");
const REGISTER = 30;

const getRegisterPage = (req, res) => {
  const userDetailsCookie = req.cookies.userDetails ? JSON.parse(req.cookies.userDetails) : {};
  res.render("registerEmail", { title: "Register", messages: req.flash(), det: userDetailsCookie });
};

const postRegisterPage = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error during registration:", error);
    req.flash("error", "Something went wrong. Please try again.");
    res.redirect("/newUser/register");
  }
};

module.exports = {
  getRegisterPage,
  postRegisterPage,
};
