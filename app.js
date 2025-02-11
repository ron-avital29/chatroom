var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const sequelize = require("./models/index");
const bcrypt = require("bcrypt");

const { Contact } = require("./models/contact");

const { sessionMiddleware, verifySession } = require("./controllers/middleware");
// const registerRouter = require("./routes/users/register");
const logInRouter = require("./routes/logIn");
// const nextRouter = require("./routes/users/next");
// const chatRoomRouter = require("./routes/chatroom");
// const messagesRouter = require("./routes/api");
// const searchRouter = require("./routes/search");
// const notFoundRouter = require("./routes/notFound");

// david commented out
// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");

var app = express();

const SPOLLING = 3600000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.use(sessionMiddleware);
app.use("/", verifySession);
app.use("/login", logInRouter);

// // david added. RON - THIS IS WHERE I STOPPED, SHOULD CONTUNUE FROM HERE I GUESS
// app.use(/^\/(login|register.*)$/, async (req, res, next) => {
//   req.session.email ? res.redirect("/chatroom") : next();
// });

// david added
app.use("/", logInRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = app;
