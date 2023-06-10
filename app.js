const express = require("express");
const cookieParser = require("cookie-parser");
const moment = require("moment");
const path = require("path");
const app = express();
require("./config/db");

const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const loginRouter = require("./routes/login.routes");
const signupRouter = require("./routes/signup.routes");
const userRouter = require("./routes/user.routes");
const inboxRouter = require("./routes/inbox.routes");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "public")));

app.locals.moment = moment;

app.use("/", loginRouter);
app.use("/signup", signupRouter);
app.use("/users", userRouter);
app.use("/inbox", inboxRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
