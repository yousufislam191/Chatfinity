const {
  getInbox,
  searchUser,
  addConversation,
  getMessages,
  sendMessage,
} = require("../controllers/inbox.controllers");
const attachmentUpload = require("../middlewares/attachmentUpload");
const { checkLogin } = require("../middlewares/common/checkLogin");
const {
  decorateHtmlResponse,
} = require("../middlewares/common/decorateHtmlResponse");

const router = require("express").Router();

router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);
router.post("/search", checkLogin, searchUser);
router.post("/conversation", checkLogin, addConversation);
router.get("/messages/:conversation_id", checkLogin, getMessages);
router.post("/message", checkLogin, attachmentUpload, sendMessage);

module.exports = router;
