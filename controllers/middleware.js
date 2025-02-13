const session = require("express-session");
const SPOLLING = 3600000;

/**
 * Middleware to check if user is logged in.
 */
const sessionMiddleware = session({
  secret: "i want to visit japn",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: SPOLLING, httpOnly: false },
});

/**
 * Middleware to check if user is logged in.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const verifySession = (req, res, next) => {
  if (req.session.email) {
    res.redirect("/chatroom/chat");
  } else {
    next();
  }
};

/**
 * Middleware to check if user has permission.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const verifyPremission = (req, res, next) => {
  if (req.session.email) {
    next();
  } else {
    req.flash("error", "Please login first");
    res.redirect("/login");
  }
};

/**
 * Middleware to check if user details exist.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const detailsExist = (req, res, next) => {
  const userDetailsCookie = req.cookies.userDetails ? JSON.parse(req.cookies.userDetails) : null;

  if (userDetailsCookie) {
    next();
  } else {
    res.redirect("/newUser/register");
  }
};

/**
 * Middleware to check if user has api access.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const verifyApiAccsess = async (req, res, next) => {
  if (!req.session.email) {
    return res.status(403).send();
  }
  next();
};

module.exports = { sessionMiddleware, verifySession, verifyPremission, detailsExist, verifyApiAccsess };
