const session = require("express-session");
const SPOLLING = 3600000;

const sessionMiddleware = session({
  secret: "i want to visit japn",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: SPOLLING, httpOnly: false },
});

const verifySession = (req, res, next) => {
  if (req.session.email) {
    res.redirect("/chatroom/chat");
  } else {
    next();
  }
};

const verifyPremission = (req, res, next) => {
  if (req.session.email) {
    next();
  } else {
    req.flash("error", "Please login first");
    res.redirect("/login");
  }
};

const detailsExist = (req, res, next) => {
  const userDetailsCookie = req.cookies.userDetails ? JSON.parse(req.cookies.userDetails) : null;

  if (userDetailsCookie) {
    next();
  } else {
    res.redirect("/newUser/register");
  }
};

const verifyApiAccsess = async (req, res, next) => {
  if (!req.session.email) {
    return res.status(403).send();
  }
  next();
};

module.exports = { sessionMiddleware, verifySession, verifyPremission, detailsExist, verifyApiAccsess };
