const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
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
  const particapateId = req.user.userid;
  // const searchQuery = user.replace("");

  // const name_search_regex = new RegExp(escape(searchQuery), "i");
  // const email_search_regex = new RegExp("^" + escape(searchQuery) + "$", "i");
  try {
    // if (searchQuery !== "") {
    let users;
    if (user !== "") {
      users = await User.find(
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

      if (users[0]._id == particapateId) {
        return res.json("You have the user");
      } else {
        return res.json(users);
      }
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

// add conversation
const addConversation = async (req, res, next) => {
  try {
    const newConversation = new Conversation({
      creator: {
        id: req.user.userid,
        name: req.user.name,
        avatar: req.user.avatar || null,
      },
      participant: {
        name: req.body.participant,
        id: req.body.id,
        avatar: req.body.avatar || null,
      },
    });

    const result = await newConversation.save();
    res.status(200).json({
      message: "Conversation was added successfully!",
    });
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

// get messages of a conversation
const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversation_id: req.params.conversation_id,
    }).sort("-createdAt");

    const { participant } = await Conversation.findById(
      req.params.conversation_id
    );

    res.status(200).json({
      data: {
        messages: messages,
        participant,
      },
      user: req.user.userid,
      conversation_id: req.params.conversation_id,
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknows error occured!",
        },
      },
    });
  }
};

// send new message
const sendMessage = async (req, res, next) => {
  if (req.body.message || (req.files && req.files.length > 0)) {
    try {
      // save message text/attachment in database
      let attachments = null;

      if (req.files && req.files.length > 0) {
        attachments = [];

        req.files.forEach((file) => {
          attachments.push(file.filename);
        });
      }

      const newMessage = new Message({
        text: req.body.message,
        attachment: attachments,
        sender: {
          id: req.user.userid,
          name: req.user.name,
          avatar: req.user.avatar || null,
        },
        receiver: {
          id: req.body.receiverId,
          name: req.body.receiverName,
          avatar: req.body.avatar || null,
        },
        conversation_id: req.body.conversationId,
      });

      const result = await newMessage.save();

      // emit socket event
      global.io.emit("new_message", {
        message: {
          conversation_id: req.body.conversationId,
          sender: {
            id: req.user.userid,
            name: req.user.username,
            avatar: req.user.avatar || null,
          },
          message: req.body.message,
          attachment: attachments,
          date_time: result.date_time,
        },
      });

      res.status(200).json({
        message: "Successful!",
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: err.message,
          },
        },
      });
    }
  } else {
    res.status(500).json({
      errors: {
        common: "message text or attachment is required!",
      },
    });
  }
};

module.exports = {
  getInbox,
  searchUser,
  addConversation,
  getMessages,
  sendMessage,
};
