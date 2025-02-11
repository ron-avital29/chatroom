const express = require("express");
const router = express.Router();

// this should eventually move to the controller, its here rn cuz its easier like this
const getLoginPage = (req, res) => {
  //   const msg = req.cookies.loginInfoErr || "";
  //   if (msg) {
  //     res.clearCookie("loginInfoErr");
  //   }
  res.render("login", {
    title: "Login old friend",
    isRegister: false,
    next: false,
    formTitle: "Log In",
    action: "/users/register",
    errorMessage: "",
    green: false,
  });
};

router.get("/", getLoginPage);

module.exports = router;
