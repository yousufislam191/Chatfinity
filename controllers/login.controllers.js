const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const User = require("../models/users.model");

const getLogin = (req, res, next) => {
  return res.render("index");
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        const userObject = {
          userid: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar || null,
          role: user.role || "user",
        };

        const token = jwt.sign(userObject, process.env.JWT_TOKEN, {
          expiresIn: process.env.JWT_TOKEN_EXPIRY,
        });

        const cookie = res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_TOKEN_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        // set logged in user local identifier
        res.locals.loggedInUser = userObject;
        next();
      } else {
        throw createError("Wrong Password! Please try again.");
      }
    } else {
      throw createError("User not found! Please check your email address.");
    }
  } catch (err) {
    res.render("index", {
      data: {
        email: req.body.email,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

const logout = (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logged out");
};

module.exports = {
  getLogin,
  login,
  logout,
};
