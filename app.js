const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const { StatusCodes } = require("http-status-codes");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// session
const storeSession = new MongoDBStore({
  uri: "mongodb://127.0.0.1/pweb_login_sistem",
  collection: "sessionCollection",
});
app.use(
  session({
    secret: "mysessionissuperwork",
    cookie: {
      maxAge: 1000 * 60 * 60 * 0.1, // 10 minute
    },
    store: storeSession,
    resave: true,
    saveUninitialized: true,
  })
);

// routes
const authRoutes = require("./app/api/auth/router");
const productsRoutes = require("./app/api/products/routes");
const resetRoutes = require("./app/api/reset/routes");
app.use("/auth", authRoutes);
app.use("/products", productsRoutes);
app.use("/reset", resetRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(StatusCodes.NOT_FOUND).json({
    msg: "Routes tidak ditemukan",
  });
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

app.listen(3000, () => console.log("server up and running"));

module.exports = app;
