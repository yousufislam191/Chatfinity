const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

const User = require("../models/users.model");

const signUpValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is missing")
    .isLength({ min: 3 })
    .withMessage("Invalid name")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name should only contain alphabet and space"),
  check("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is missing")
    .isEmail()
    .withMessage("Invalid email address")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .withMessage("Invalid email address")
    .custom(async (value) => {
      try {
        const existingUser = await User.findOne({ email: value });
        if (existingUser) {
          throw createError("Email already exists!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 8 })
    .withMessage("Password must have at least 8 characters")
    .isStrongPassword()
    .withMessage(
      "Password is not a strong. Must be one uppercase, lowercase, number and special characters"
    ),
  check("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm password is missing")
    .isLength({ min: 8 })
    .withMessage("Confirm password must have at least 8 characters")
    .custom(async (confirmPassword, { req }) => {
      const password = req.body.password;
      if (password !== confirmPassword) {
        throw createError("Password & confirm password does not match");
      }
    }),
];

const signupValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove uploaded files
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

const loginInValidator = [
  check("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is missing")
    .isEmail()
    .withMessage("Invalid email address")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .withMessage("Invalid email address"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 8 })
    .withMessage("Invalid password"),
];

const loginValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.render("index", {
      data: {
        email: req.body.email,
      },
      errors: mappedErrors,
    });
  }
};
module.exports = {
  signUpValidator,
  signupValidationHandler,
  loginInValidator,
  loginValidationHandler,
};
