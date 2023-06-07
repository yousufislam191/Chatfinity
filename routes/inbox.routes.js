const { getInbox, searchUser } = require("../controllers/inbox.controllers");
const { checkLogin } = require("../middlewares/common/checkLogin");
const {
  decorateHtmlResponse,
} = require("../middlewares/common/decorateHtmlResponse");

const router = require("express").Router();

router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);
router.post("/search", checkLogin, searchUser);

module.exports = router;
