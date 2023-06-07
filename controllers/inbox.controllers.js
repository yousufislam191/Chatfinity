const Conversation = require("../models/conversation.model");
const User = require("../models/users.model");
const escape = require("../utilities/escape");

const getInbox = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      $or: [
        { "creator.id": req.user.userid },
        { "participant.id": req.user.userid },
      ],
    });
    res.locals.data = conversations;
    res.render("inbox");
  } catch (err) {
    next(err);
  }
};

// search user
const searchUser = async (req, res, next) => {
  const user = req.body.user;
  // const searchQuery = user.replace("");

  // const name_search_regex = new RegExp(escape(searchQuery), "i");
  // const email_search_regex = new RegExp("^" + escape(searchQuery) + "$", "i");

  try {
    // if (searchQuery !== "") {
    if (user !== "") {
      const users = await User.find(
        {
          $or: [
            {
              // name: name_search_regex,
              name: user,
            },
            {
              // email: email_search_regex,
              email: user,
            },
          ],
        },
        "name avatar"
      );

      return res.json(users);
    } else {
      throw createError("You must provide some text to search!");
    }
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

module.exports = {
  getInbox,
  searchUser,
};
