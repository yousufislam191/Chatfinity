const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
require("./config/db");

const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.status(200).render("home", {});
// });
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
