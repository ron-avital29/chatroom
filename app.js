var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const flash = require("connect-flash");
const sequelize = require("./models/index");

const { sessionMiddleware, verifySession, verifyPremission, detailsExist, verifyApiAccsess } = require("./controllers/middleware");
const logInRouter = require("./routes/logIn");
const registerRouter = require("./routes/register");
const passwordRouter = require("./routes/password");
const chatRoomRouter = require("./routes/chatroom");
const messagesRouter = require("./routes/api");
const searchRouter = require("./routes/search");
const notFoundRouter = require("./routes/notFound");

var app = express();

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
app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.use("/login", verifySession, logInRouter);

app.use("/newUser", verifySession);
app.use("/newUser/register", registerRouter);
app.use("/newUser/choosePassword", detailsExist, passwordRouter);

app.use("/chatroom", verifyPremission);
app.use("/chatroom/chat", chatRoomRouter);
app.use("/chatroom/search", searchRouter);

app.use("/api", verifyApiAccsess, messagesRouter);

app.use("/not-found", notFoundRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.redirect("/not-found");
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
