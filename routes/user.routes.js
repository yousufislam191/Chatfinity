const { getUser } = require("../controllers/users.controllers");
const {
  decorateHtmlResponse,
} = require("../middlewares/common/decorateHtmlResponse");

const router = require("express").Router();

router.get("/", decorateHtmlResponse("User"), getUser);

module.exports = router;
