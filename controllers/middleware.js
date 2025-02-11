const session = require("express-session");
const SPOLLING = 3600000;

const sessionMiddleware = session({
  secret: "i want to visit japn",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: SPOLLING, httpOnly: false },
});

const verifySession = (req, res, next) => {
  if (req.session.email) {
    res.redirect("/cnatroom");
  } else {
    res.redirect("/login");
  }
};

module.exports = { sessionMiddleware, verifySession };
