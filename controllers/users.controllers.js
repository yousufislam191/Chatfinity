const bcrypt = require("bcrypt");
const { unlink } = require("fs");
const path = require("path");

const User = require("../models/users.model");

const getUser = async (req, res, next) => {
  try {
    const users = await User.find({ role: "user" });
    res.render("users", {
      users: users,
    });
  } catch (err) {
    next(err);
  }
};

// for create new user and send email activation notification
const createNewUser = async (req, res) => {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  try {
    await newUser.save();
    res.status(201).json({
      message: "Your account created successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occured!",
        },
      },
    });
  }
};

// for delete users
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete({
      _id: req.params.id,
    });

    // remove user avatar if any
    if (user.avatar) {
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    res.status(200).json({
      message: "User was removed successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the user!",
        },
      },
    });
  }
};

module.exports = {
  getUser,
  createNewUser,
  deleteUser,
};
