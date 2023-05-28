const { getLogin } = require("../controllers/login.controllers");
const {
  decorateHtmlResponse,
} = require("../middlewares/common/decorateHtmlResponse");

const router = require("express").Router();

router.get("/", decorateHtmlResponse("Login"), getLogin);

module.exports = router;
