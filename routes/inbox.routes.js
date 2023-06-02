const { getInbox } = require("../controllers/inbox.controllers");
const { checkLogin } = require("../middlewares/common/checkLogin");
const {
  decorateHtmlResponse,
} = require("../middlewares/common/decorateHtmlResponse");

const router = require("express").Router();

router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

module.exports = router;
