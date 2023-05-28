const { getInbox } = require("../controllers/inbox.controllers");
const {
  decorateHtmlResponse,
} = require("../middlewares/common/decorateHtmlResponse");

const router = require("express").Router();

router.get("/", decorateHtmlResponse("Inbox"), getInbox);

module.exports = router;
