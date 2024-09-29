var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cookieSession = require("cookie-session");

var userPanelRouter = require("./routes/user/index");
var adminPanelRouter = require("./routes/admin/index");
var apiUsersAuthRouter = require("./routes/user/auth");
var apiUsersAdsRouter = require("./routes/user/ads");
var panelAdminApiRouter = require("./routes/admin/admins");
var mongoose = require("mongoose");
var config = require("./config");
mongoose.connect(config.MONGO_URL, config.MONGO_CONFIG_JSON);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("DB OK");
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cookieSession({
    name: "divar",
    keys: ["divar2020"],
    maxAge: 365 * 24 * 60 * 60 * 1000,
  })
);
app.use("/api/users/ads", apiUsersAdsRouter);
app.use("/api/users/auth", apiUsersAuthRouter);
app.use("/api/panel/admins", panelAdminApiRouter);
app.use("/userPanel", userPanelRouter);
app.use("/adminPanel", adminPanelRouter);
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

module.exports = app;
